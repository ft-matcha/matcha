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
var _elastic_client, _elastic_isConnected;
const { Client } = require('@elastic/elasticsearch');
const esconfig = {
    host: process.env.ES_HOST,
    port: process.env.ES_PORT,
};
class elastic {
    constructor() {
        _elastic_client.set(this, void 0);
        _elastic_isConnected.set(this, void 0);
        __classPrivateFieldSet(this, _elastic_client, null, "f");
        __classPrivateFieldSet(this, _elastic_isConnected, false, "f");
    }
    getClient() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (__classPrivateFieldGet(this, _elastic_isConnected, "f")) {
                    return __classPrivateFieldGet(this, _elastic_client, "f");
                }
                else {
                    __classPrivateFieldSet(this, _elastic_client, new Client(esconfig), "f");
                    __classPrivateFieldSet(this, _elastic_isConnected, true, "f");
                    return __classPrivateFieldGet(this, _elastic_client, "f");
                }
            }
            catch (error) {
                console.error('Elasticsearch connection failed: ' + error.stack);
                return error;
            }
        });
    }
}
_elastic_client = new WeakMap(), _elastic_isConnected = new WeakMap();
exports.elastic = new elastic();
