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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Crud_connection, _Crud_table;
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const promise_1 = __importDefault(require("mysql2/promise"));
// const mysql = require('mysql2/promise');
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
const pool = promise_1.default.createPool(dbConfig);
class Crud {
    constructor(table) {
        _Crud_connection.set(this, void 0);
        _Crud_table.set(this, void 0);
        __classPrivateFieldSet(this, _Crud_connection, null, "f");
        __classPrivateFieldSet(this, _Crud_table, table, "f");
    }
    migrate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection();
                const sql = yield fs.promises.readFile(__dirname + '/../migration/init.sql', 'utf-8');
                yield __classPrivateFieldGet(this, _Crud_connection, "f").query(sql);
                console.log('DB migration success');
                __classPrivateFieldGet(this, _Crud_connection, "f").release();
            }
            catch (error) {
                console.error('DB migration failed: ' + error.stack);
            }
        });
    }
    getConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                __classPrivateFieldSet(this, _Crud_connection, yield pool.getConnection(), "f");
                return __classPrivateFieldGet(this, _Crud_connection, "f");
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
                const sql = `INSERT INTO ${__classPrivateFieldGet(this, _Crud_table, "f")} SET ?`;
                const response = yield __classPrivateFieldGet(this, _Crud_connection, "f").query(sql, data).JSON;
                __classPrivateFieldGet(this, _Crud_connection, "f").release();
                return response;
            }
            catch (error) {
                console.error('DB create failed: ' + error.stack);
                if (__classPrivateFieldGet(this, _Crud_connection, "f"))
                    __classPrivateFieldGet(this, _Crud_connection, "f").release();
                return error;
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
                SELECT ${__classPrivateFieldGet(this, _Crud_table, "f")}.*, JSON_OBJECT(${columns}) AS ${table}
                FROM ${__classPrivateFieldGet(this, _Crud_table, "f")}
                LEFT JOIN ${table} ON ${__classPrivateFieldGet(this, _Crud_table, "f")}.id = ${table}.userId
                WHERE ?;
                `;
                }
                else {
                    sql = `SELECT * FROM WHERE ?`;
                }
                yield this.getConnection();
                const user = yield __classPrivateFieldGet(this, _Crud_connection, "f").query(sql, where);
                __classPrivateFieldGet(this, _Crud_connection, "f").release();
                return user[0][0];
            }
            catch (error) {
                console.error('DB read failed: ' + error.stack);
                if (__classPrivateFieldGet(this, _Crud_connection, "f"))
                    __classPrivateFieldGet(this, _Crud_connection, "f").release();
                throw error;
            }
        });
    }
    read(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection();
            const sql = `SELECT * FROM ${__classPrivateFieldGet(this, _Crud_table, "f")}`;
            try {
                const users = yield __classPrivateFieldGet(this, _Crud_connection, "f").query(sql, data);
                __classPrivateFieldGet(this, _Crud_connection, "f").release();
                return users[0];
            }
            catch (error) {
                console.error('DB read failed: ' + error.stack);
                if (__classPrivateFieldGet(this, _Crud_connection, "f"))
                    __classPrivateFieldGet(this, _Crud_connection, "f").release();
                return error;
            }
        });
    }
    update(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, where } = body;
                yield this.getConnection();
                const sql = `UPDATE ${__classPrivateFieldGet(this, _Crud_table, "f")} SET ? WHERE ?`;
                const response = yield __classPrivateFieldGet(this, _Crud_connection, "f").query(sql, data, where);
                __classPrivateFieldGet(this, _Crud_connection, "f").release();
                return response;
            }
            catch (error) {
                console.error('DB update failed: ' + error.stack);
                if (__classPrivateFieldGet(this, _Crud_connection, "f"))
                    __classPrivateFieldGet(this, _Crud_connection, "f").release();
                return error;
            }
        });
    }
    delete(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection();
                const sql = `DELETE FROM ${__classPrivateFieldGet(this, _Crud_table, "f")} WHERE email = ${email}`;
                const response = yield __classPrivateFieldGet(this, _Crud_connection, "f").query(sql);
            }
            catch (error) {
                console.error('DB delete failed: ' + error.stack);
                if (__classPrivateFieldGet(this, _Crud_connection, "f"))
                    __classPrivateFieldGet(this, _Crud_connection, "f").release();
                return error;
            }
        });
    }
}
_Crud_connection = new WeakMap(), _Crud_table = new WeakMap();
module.exports = Crud;
