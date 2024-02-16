const fs = require('fs');
const mysql = require('mysql2/promise');
const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: Number(process.env.MYSQL_PORT),
    connectionLimit: 10,
    multipleStatements: true,
};

const model = {
    gender: String,
    preferences: String,
    biography: String,
    tag: JSON,
    age: Number,
    image: JSON,
    viewList: JSON,
    region: String,
};

const pool = mysql.createPool(dbConfig);

class Crud {
    private connection: any;
    private table: any;
    constructor(table: string) {
        this.connection = null;
        this.table = table;
    }
    async migrate() {
        try {
            await this.getConnection();
            const sql = await fs.promises.readFile(__dirname + '/../migration/init.sql', 'utf-8');
            await this.connection.query(sql);
            console.log('DB migration success');
            this.connection.release();
        } catch (error: any) {
            console.error('DB migration failed: ' + error.stack);
        }
    }

    async getConnection() {
        try {
            this.connection = await pool.getConnection();
            return this.connection;
        } catch (error: any) {
            throw error;
        }
    }

    async create(data: JSON) {
        try {
            await this.getConnection();
            const sql = `INSERT INTO ${this.table} SET ?`;
            const response = await this.connection.query(sql, data).JSON;
            this.connection.release();
            return response;
        } catch (error: any) {
            console.error('DB create failed: ' + error.stack);
            if (this.connection) this.connection.release();
            throw error;
        }
    }

    async readOne(data: any) {
        try {
            const { where, include } = data;
            let sql = '';
            if (include) {
                const table = Object.keys(include);
                const keys = Object.keys(model);
                let columns = '';
                keys.forEach((key) => {
                    columns += `'${key}', ${table}.${key}`;
                    if (keys.indexOf(key) !== keys.length - 1) columns += ', ';
                });
                sql = `
                SELECT ${this.table}.*, JSON_OBJECT(${columns}) AS ${table}
                FROM ${this.table}
                LEFT JOIN ${table} ON ${this.table}.id = ${table}.userId
                WHERE ?;
                `;
            } else {
                sql = `SELECT * FROM ${this.table} WHERE ?`;
            }
            await this.getConnection();
            const user = await this.connection.query(sql, where);
            this.connection.release();
            return user[0][0];
        } catch (error: any) {
            console.error('DB read failed: ' + error.stack);
            if (this.connection) this.connection.release();
            throw error;
        }
    }
    async read(data: any) {
        await this.getConnection();
        const sql = `SELECT * FROM ${this.table}`;
        try {
            const users = await this.connection.query(sql, data);
            this.connection.release();
            return users[0];
        } catch (error: any) {
            console.error('DB read failed: ' + error.stack);
            if (this.connection) this.connection.release();
            return error;
        }
    }
    async update(body: any) {
        try {
            const { data, where } = body;
            await this.getConnection();
            const sql = `UPDATE ${this.table} SET ? WHERE ?`;
            const response = await this.connection.query(sql, data, where);
            this.connection.release();
            return response;
        } catch (error: any) {
            console.error('DB update failed: ' + error.stack);
            if (this.connection) this.connection.release();
            return error;
        }
    }
    async delete(email: string) {
        try {
            await this.getConnection();
            const sql = `DELETE FROM ${this.table} WHERE email = ${email}`;
            const response = await this.connection.query(sql);
        } catch (error: any) {
            console.error('DB delete failed: ' + error.stack);
            if (this.connection) this.connection.release();
            return error;
        }
    }
}

module.exports = Crud;
export {};
