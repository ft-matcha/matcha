"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    constructor(table) {
        this.connection = null;
        this.table = table;
    }
    migrate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection();
                const sql = yield fs.promises.readFile(__dirname + '/../migration/init.sql', 'utf-8');
                yield this.connection.query(sql);
                console.log('DB migration success');
                this.connection.release();
            }
            catch (error) {
                console.error('DB migration failed: ' + error.stack);
            }
        });
    }
    getConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.connection = yield pool.getConnection();
                return this.connection;
            }
            catch (error) {
                throw error;
            }
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection();
                const sql = `INSERT INTO ${this.table} SET ?`;
                const response = yield this.connection.query(sql, data).JSON;
                this.connection.release();
                return response;
            }
            catch (error) {
                console.error('DB create failed: ' + error.stack);
                if (this.connection)
                    this.connection.release();
                throw error;
            }
        });
    }
    readOne(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { where, include } = data;
                let sql = '';
                if (include) {
                    const table = Object.keys(include);
                    const keys = Object.keys(model);
                    let columns = '';
                    keys.forEach((key) => {
                        columns += `'${key}', ${table}.${key}`;
                        if (keys.indexOf(key) !== keys.length - 1)
                            columns += ', ';
                    });
                    sql = `
                SELECT ${this.table}.*, JSON_OBJECT(${columns}) AS ${table}
                FROM ${this.table}
                LEFT JOIN ${table} ON ${this.table}.id = ${table}.userId
                WHERE ?;
                `;
                }
                else {
                    sql = `SELECT * FROM ${this.table} WHERE ?`;
                }
                yield this.getConnection();
                const user = yield this.connection.query(sql, where);
                this.connection.release();
                return user[0][0];
            }
            catch (error) {
                console.error('DB read failed: ' + error.stack);
                if (this.connection)
                    this.connection.release();
                throw error;
            }
        });
    }
    read(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection();
            const sql = `SELECT * FROM ${this.table}`;
            try {
                const users = yield this.connection.query(sql, data);
                this.connection.release();
                return users[0];
            }
            catch (error) {
                console.error('DB read failed: ' + error.stack);
                if (this.connection)
                    this.connection.release();
                return error;
            }
        });
    }
    update(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, where } = body;
                yield this.getConnection();
                const sql = `UPDATE ${this.table} SET ? WHERE ?`;
                const response = yield this.connection.query(sql, data, where);
                this.connection.release();
                return response;
            }
            catch (error) {
                console.error('DB update failed: ' + error.stack);
                if (this.connection)
                    this.connection.release();
                return error;
            }
        });
    }
    delete(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection();
                const sql = `DELETE FROM ${this.table} WHERE email = ${email}`;
                const response = yield this.connection.query(sql);
            }
            catch (error) {
                console.error('DB delete failed: ' + error.stack);
                if (this.connection)
                    this.connection.release();
                return error;
            }
        });
    }
}
module.exports = Crud;
