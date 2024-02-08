"use strict";
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
var _ApiDocs_apiDocsOptions, _ApiDocs_swagger;
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const Swagger = require('../lib/swagger');
const auth = require('./api/auth/index');
const jwt = require('./api/jwt/index');
const profile = require('./api/profile/index');
const user = require('./api/user/index');
class ApiDocs {
    constructor() {
        _ApiDocs_apiDocsOptions.set(this, void 0);
        _ApiDocs_swagger.set(this, void 0);
        __classPrivateFieldSet(this, _ApiDocs_apiDocsOptions, Object.assign(Object.assign(Object.assign(Object.assign({}, user), auth), profile), jwt), "f");
        __classPrivateFieldSet(this, _ApiDocs_swagger, new Swagger(), "f");
    }
    init() {
        __classPrivateFieldGet(this, _ApiDocs_swagger, "f").addAPI(__classPrivateFieldGet(this, _ApiDocs_apiDocsOptions, "f"));
    }
    getSwaggerOption() {
        const { apiOption, setUpOption } = __classPrivateFieldGet(this, _ApiDocs_swagger, "f").getOption();
        const specs = swaggerJsDoc(apiOption);
        return {
            swaggerUI,
            specs,
            setUpOption,
        };
    }
}
_ApiDocs_apiDocsOptions = new WeakMap(), _ApiDocs_swagger = new WeakMap();
module.exports = ApiDocs;
