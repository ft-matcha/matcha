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
var _redisClient_host, _redisClient_port, _redisClient_connected, _redisClient_client;
const redis = require('redis');
class redisClient {
    constructor() {
        _redisClient_host.set(this, process.env.REDIS_HOST);
        _redisClient_port.set(this, process.env.REDIS_PORT);
        _redisClient_connected.set(this, void 0);
        _redisClient_client.set(this, void 0);
        __classPrivateFieldSet(this, _redisClient_connected, false, "f");
        __classPrivateFieldSet(this, _redisClient_client, null, "f");
    }
    getClient() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (__classPrivateFieldGet(this, _redisClient_connected, "f")) {
                    return __classPrivateFieldGet(this, _redisClient_client, "f");
                }
                else {
                    __classPrivateFieldSet(this, _redisClient_client, yield redis.createClient({
                        url: process.env.REDIS_URL,
                    }), "f");
                    console.log('Redis connected');
                    __classPrivateFieldSet(this, _redisClient_connected, true, "f");
                    __classPrivateFieldGet(this, _redisClient_client, "f").connect();
                    return __classPrivateFieldGet(this, _redisClient_client, "f");
                }
            }
            catch (error) {
                console.error('Redis connection failed: ' + error.stack);
                throw error;
            }
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getClient();
                yield __classPrivateFieldGet(this, _redisClient_client, "f").set(key, value);
            }
            catch (error) {
                console.error('Redis set failed: ' + error.stack);
                throw error;
            }
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getClient();
                const response = yield __classPrivateFieldGet(this, _redisClient_client, "f").get(key);
                yield __classPrivateFieldGet(this, _redisClient_client, "f").disconnect();
                return response;
            }
            catch (error) {
                console.error('Redis get failed: ' + error.stack);
                throw error;
            }
        });
    }
}
_redisClient_host = new WeakMap(), _redisClient_port = new WeakMap(), _redisClient_connected = new WeakMap(), _redisClient_client = new WeakMap();
module.exports = new redisClient();
