const fs = require('fs');
const mysql = require('mysql2/promise');
const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: Number(process.env.MYSQL_PORT),
    connectionLimit: 10,
};
const pool = mysql.createPool(dbConfig);

class Crud {
    #connection: any;
    #table: any;
    constructor(table: string) {
        this.#connection = null;
        this.#table = table;
    }
    async migrate() {
        try {
            await this.getConnection();
            const sqlScript = await fs.promises.readFile(__dirname + '/../migration/init.sql', 'utf-8');
            const queries = sqlScript.split('--');
            for (const query of queries) {
                if (query.trim()) {
                    await this.#connection.query(query);
                }
            }
            console.log('DB migration success');
            this.#connection.release();
        } catch (error: any) {
            console.error('DB migration failed: ' + error.stack);
        }
    }

    async getConnection() {
        try {
            this.#connection = await pool.getConnection();
            return this.#connection;
        } catch (error: any) {
            throw error;
        }
    }

    async create(data: JSON) {
        await this.getConnection();
        const sql = `INSERT INTO ${this.#table} SET ?`;
        try {
            const response = await this.#connection.query(sql, data).JSON;
            this.#connection.release();
            return response;
        } catch (error: any) {
            console.error('DB create failed: ' + error.stack);
            if (this.#connection) this.#connection.release();
            return error;
        }
    }
    async readOne(email: string) {
        await this.getConnection();
        const sql = `SELECT * FROM ${this.#table} WHERE ? LIMIT 1`;
        try {
            const user = await this.#connection.query(sql, { email });
            this.#connection.release();
            return user[0][0];
        } catch (error: any) {
            console.error('DB read failed: ' + error.stack);
            if (this.#connection) this.#connection.release();
            return error;
        }
    }
    async read(data: any) {
        await this.getConnection();
        const sql = `SELECT * FROM ${this.#table}`;
        try {
            const users = await this.#connection.query(sql, data);
            this.#connection.release();
            return users[0];
        } catch (error: any) {
            console.error('DB read failed: ' + error.stack);
            if (this.#connection) this.#connection.release();
            return error;
        }
    }
    async update(body: any) {
        try {
            const { data, where } = body;
            await this.getConnection();
            const sql = `UPDATE ${this.#table} SET ? WHERE ?`;
            const response = await this.#connection.query(sql, data, where);
            this.#connection.release();
            return response;
        } catch (error: any) {
            console.error('DB update failed: ' + error.stack);
            if (this.#connection) this.#connection.release();
            return error;
        }
    }
    async delete(email: string) {
        try {
            await this.getConnection();
            const sql = `DELETE FROM ${this.#table} WHERE email = ${email}`;
            const response = await this.#connection.query(sql);
        } catch (error: any) {
            console.error('DB delete failed: ' + error.stack);
            if (this.#connection) this.#connection.release();
            return error;
        }
    }
}

module.exports = Crud;
