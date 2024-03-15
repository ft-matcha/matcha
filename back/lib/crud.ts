import fs from 'fs';
import mysql from 'mysql2/promise';
import QueryBuilder from './queryBuilder';
const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: Number(process.env.MYSQL_PORT),
    connectionLimit: 10,
    multipleStatements: true,
};

interface Data {
    set?: {
        [key: string]: string | number | boolean | object | undefined;
    };
    include?: {
        [key: string]: string;
    };
    selectJoin?: {
        [key: string]: string;
    };
    join?: Array<{
        [key: string]: string | any;
    }>;
    where?:
        | Array<{ [key: string]: string | number | undefined | Array<{ [key: string]: string | number }> }>
        | {
              [key: string]: string | number | undefined | Array<{ [key: string]: string | number }>;
          };
    select?: string[];
}

const pool = mysql.createPool(dbConfig);
class crud {
    private connection: mysql.PoolConnection | undefined;
    private table: string;
    private static migration: boolean = false;
    constructor(table: string) {
        this.getConnection();
        this.table = table;
    }
    async migrate() {
        try {
            if (crud.migration) return;
            this.connection = await this.getConnection();
            const sql = await fs.readFileSync(__dirname + '/../sql/init.sql', 'utf-8');
            await this.connection.query(sql);
            console.log('DB migration success');
            crud.migration = true;
            this.connection.release();
        } catch (error: any) {
            console.error('DB migration failed: ' + error.stack);
        }
    }

    async getConnection() {
        try {
            return await pool.getConnection();
        } catch (error: any) {
            throw error;
        }
    }

    async create(data: Data) {
        try {
            this.connection = await this.getConnection();
            const { query, params } = new QueryBuilder()
                .insert(this.table)
                .set(data.set)
                .selectJoin(data.selectJoin)
                .where(data.where)
                .build();
            console.log(this.connection?.format(query, params));
            const response = await this.connection.query(query, params);
            this.connection.release();
            return response;
        } catch (error: any) {
            console.error('DB create failed: ' + error.stack);
            if (this.connection) this.connection.release();
            throw error;
        }
    }

    async readOne(data: Data): Promise<any> {
        try {
            const { query, params } = new QueryBuilder()
                .select([data.join ? this.table + '.*' : '*'])
                .from(this.table)
                .join(data.join)
                .include(data.include)
                .where(data.where)
                .limit(1)
                .build();
            this.connection = await this.getConnection();
            console.log(this.connection.format(query, params));
            const [row] = await this.connection.query<mysql.RowDataPacket[]>(query, params);
            console.log(row);
            this.connection.release();
            return row[0];
        } catch (error: any) {
            console.error('DB read failed: ' + error.stack);
            if (this.connection) this.connection.release();
            throw error;
        }
    }
    async read(data: Data) {
        try {
            this.connection = await this.getConnection();
            const { query, params } = new QueryBuilder()
                .select([data.join ? this.table + '.*' : '*'], data.select)
                .from(this.table)
                .join(data.join)
                .include(data.include)
                .where(data.where)
                .build();
            const [row] = await this.connection.query<mysql.RowDataPacket[]>(query, params);
            this.connection.release();
            return row;
        } catch (error: any) {
            console.error('DB read failed: ' + error.stack);
            if (this.connection) this.connection.release();
            return error;
        }
    }

    async update(data: Data) {
        try {
            const { query, params } = new QueryBuilder()
                .update(this.table)
                .include(data.include)
                .join(data.join)
                .set(data.set)
                .where(data.where)
                .build();
            this.connection = await this.getConnection();
            const response = await this.connection.query(query, params);
            this.connection.release();
            return response;
        } catch (error: any) {
            console.error('DB update failed: ' + error.stack);
            if (this.connection) this.connection.release();
            return error;
        }
    }
    async delete<T>(where: T) {
        try {
            this.connection = await this.getConnection();
            const sql = `DELETE FROM ?? WHERE ?`;
            const response = await this.connection.query(sql, [this.table, where]);
        } catch (error: any) {
            console.error('DB delete failed: ' + error.stack);
            if (this.connection) this.connection.release();
            return error;
        }
    }
}

export default crud;
