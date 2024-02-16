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
const { Client } = require('elastic');
const fs = require('fs');
const esconfig = {
    node: process.env.ES_NODE,
    auth: {
        username: 'elastic',
        password: '1523',
    },
    // tls: {
    //     ca: fs.readFileSync('/app/certs/http_ca.crt'),
    //     rejectUnauthorized: false,
    // },
    // openssl s_client -connect elasticsearch:9200 -servername elasticsearch -showcerts -quiet | openssl x509 -fingerprint -sha256 -noout -in /dev/stdin
};
class elastic {
    constructor() {
        this.client = null;
        this.isConnected = false;
        this.index = 'matcha';
    }
    getClient() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.isConnected) {
                    return this.client;
                }
                else {
                    console.log(esconfig);
                    this.client = yield new Client(esconfig);
                    this.isConnected = true;
                    return this.client;
                }
            }
            catch (error) {
                console.error('Elasticsearch connection failed: ' + error.stack);
                throw error;
            }
        });
    }
    createIndex(index) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getClient();
                const exists = yield this.client.indices.exists({ index });
                if (exists) {
                    console.error('Index already exists');
                    return;
                }
                const response = yield this.client.indices.create({
                    index,
                });
                return response;
            }
            catch (error) {
                console.error('Elasticsearch createIndex failed: ' + error.stack);
                return error;
            }
        });
    }
    create(id, document) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getClient();
                const response = yield this.client.index({
                    index: this.index,
                    id: id,
                    document: document,
                });
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getClient();
                const response = yield this.client.get({
                    index: this.index,
                    id: id,
                });
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    search(key, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getClient();
                var match = {};
                match[key] = query;
                const response = yield this.client.search({
                    query: {
                        match,
                    },
                });
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
module.exports = new elastic();
