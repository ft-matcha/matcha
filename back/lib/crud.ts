import fs from 'fs';
import mysql from 'mysql2/promise';
const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: Number(process.env.MYSQL_PORT),
    connectionLimit: 10,
    multipleStatements: true,
};

interface update {
    data: updateData;
    where: {
        [key: string]: string | number;
    };
    include?: {
        [key: string]: boolean;
    };
}
interface create {
    data: createData;
    include?: {
        [key: string]: boolean;
    };
}
interface updateData {
    [key: string]: string | number | boolean | object | undefined;
}
interface createData {
    [key: string]: string | number | boolean | object | undefined;
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
            const sql = await fs.promises.readFile(__dirname + '/../sql/init.sql', 'utf-8');
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
    async create(data: createData) {
        try {
            this.connection = await this.getConnection();
            let value: any = [[this.table]];
            Object.keys(data).forEach((key) => {
                if (typeof data[key] === 'object') data[key] = JSON.stringify(data[key]);
            });
            const sql = fs.readFileSync(__dirname + '/../sql/create.sql', 'utf-8');
            value.push(data);
            const response = await this.connection.query(sql, value);
            this.connection.release();
            return response;
        } catch (error: any) {
            console.error('DB create failed: ' + error.stack);
            if (this.connection) this.connection.release();
            throw error;
        }
    }

    async readOne(data: any): Promise<any> {
        try {
            const { where, include } = data;
            let value: any[] = [[this.table]];
            let sql = fs.readFileSync(__dirname + '/../sql/readOne.sql', 'utf-8');
            if (include) {
                Object.keys(include).forEach((key) => {
                    if (include[key] === true) {
                        value[0].push(key);
                    }
                });
            }
            if (Array.isArray(where)) {
                where.map((item: any, index) => {
                    Object.entries(item).forEach(([key, values], i) => {
                        value.push({
                            [key]: values,
                        });
                        if (i !== Object.keys(item).length - 1) {
                            sql += ` AND ?`;
                        }
                    });
                    if (index !== where.length - 1) {
                        sql += ` OR ?`;
                    }
                });
            } else {
                Object.entries(where).forEach(([key, values], i) => {
                    value.push({
                        [key]: values,
                    });
                    if (i !== Object.keys(where).length - 1) {
                        sql += ` AND ?`;
                    }
                });
            }
            this.connection = await this.getConnection();
            const [row] = await this.connection.query<mysql.RowDataPacket[]>(sql, value);
            this.connection.release();
            return row[0];
        } catch (error: any) {
            console.error('DB read failed: ' + error.stack);
            if (this.connection) this.connection.release();
            throw error;
        }
    }
    async read(data: any) {
        try {
            this.connection = await this.getConnection();
            const { where, include } = data;
            let value: any = [[this.table]];
            let sql: string;
            if (fs.existsSync(__dirname + `/../sql/read${this.table}.sql`)) {
                sql = fs.readFileSync(__dirname + `/../sql/read${this.table}.sql`, 'utf-8');
            } else {
                sql = fs.readFileSync(__dirname + '/../sql/read.sql', 'utf-8');
            }
            if (include) {
                Object.keys(include).forEach((key) => {
                    if (include[key] === true) {
                        value[0].push(key);
                    }
                });
            }
            if (typeof where === 'string') {
                value.push(where);
            } else if (typeof where === 'object') {
                Object.keys(where).forEach((key, idx) => {
                    if (idx !== Object.keys(where).length - 1) {
                        sql += ' AND ?';
                    }
                    value.push({
                        [key]: where[key],
                    });
                });
            }
            console.log(this.connection.format(sql, value));
            // if (Array.isArray(where)) {
            //     where.map((item: any, index) => {
            //         Object.entries(item).forEach(([key, values], i) => {
            //             let valueJson: any = {};
            //             valueJson[key] = values;
            //             value.push(valueJson);
            // if (i !== Object.keys(item).length - 1) {
            //     sql += ` AND ?`;
            // }
            // });
            // if (index !== where.length - 1) {
            //     sql += ` OR ?`;
            // }
            // });
            // }
            const [row] = await this.connection.query(sql, value);
            this.connection.release();
            return row;
        } catch (error: any) {
            console.error('DB read failed: ' + error.stack);
            if (this.connection) this.connection.release();
            return error;
        }
    }

    async update(body: update) {
        try {
            const { data, where, include } = body;
            let sql = fs.readFileSync(__dirname + '/../sql/update.sql', 'utf-8');
            let value: any = [[this.table]];
            if (include) {
                sql = fs.readFileSync(__dirname + `/../sql/update${this.table}.sql`, 'utf-8');
                Object.keys(include).forEach((key) => {
                    if (include[key] === true) {
                        value[0].push(key);
                    }
                });
            }
            if (Object.keys(data).length === 0) throw new Error('No data to update');
            Object.keys(data).forEach((key) => {
                if (typeof data[key] === 'object') data[key] = JSON.stringify(data[key]);
            });
            value.push(data);
            Object.keys(where).forEach((key, idx) => {
                if (idx !== Object.keys(where).length - 1) {
                    sql += ' AND ?';
                }
                value.push({
                    [key]: where[key],
                });
            });
            this.connection = await this.getConnection();
            const response = await this.connection.query(sql, value);
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
