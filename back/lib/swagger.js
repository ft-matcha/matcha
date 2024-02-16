"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Swagger_instances, _a, _Swagger_uniqueSwaggerInstance, _Swagger_paths, _Swagger_option, _Swagger_setUpOption, _Swagger_init, _Swagger_processAPI;
const swaggerOpenApiVersion = '3.0.0';
const swaggerInfo = {
    title: 'Swagger API',
    version: '0.0.1',
    description: 'Swagger API Information',
};
const swaggerTags = [
    {
        name: 'user',
        description: '사용자 API',
    },
    {
        name: 'JWT',
        description: 'JWT API',
    },
];
const swaggerSchemes = ['http', 'https'];
const swaggerSecurityDefinitions = {
    ApiKeyAuth: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
    },
};
const swaggerProduces = ['application/json'];
const swaggerServers = [
    {
        url: 'https://localhost:8000/api/v1',
        description: '로컬 서버',
    },
];
const swaggerSecurityScheme = {
    bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Token',
        name: 'Authorization',
        description: '인증 토큰 값을 넣어주세요.',
        in: 'header',
    },
};
const swaggerComponents = {
    JWT_ERROR: {
        description: 'jwt token Error',
        type: 'object',
        properties: {
            401: {
                type: 'Error token 변조 에러',
            },
        },
    },
    SERVER_ERROR: {
        description: 'SERVER ERROR',
        type: 'object',
        properties: {
            500: {
                type: 'Internal Error',
                code: 800,
            },
        },
    },
    DB_ERROR: {
        description: 'SERVER DB ERROR',
        type: 'object',
        properties: {
            500: {
                type: 'DB ERROR',
                code: 500,
            },
        },
    },
};
class Swagger {
    /**
     *
     * @returns {Swagger}
     */
    constructor() {
        _Swagger_instances.add(this);
        _Swagger_paths.set(this, [{}]);
        _Swagger_option.set(this, {});
        _Swagger_setUpOption.set(this, {});
        if (!__classPrivateFieldGet(_a, _a, "f", _Swagger_uniqueSwaggerInstance)) {
            __classPrivateFieldGet(this, _Swagger_instances, "m", _Swagger_init).call(this);
            __classPrivateFieldSet(_a, _a, this, "f", _Swagger_uniqueSwaggerInstance);
        }
        return __classPrivateFieldGet(_a, _a, "f", _Swagger_uniqueSwaggerInstance);
    }
    addAPI(api) {
        __classPrivateFieldGet(this, _Swagger_paths, "f").push(api);
    }
    getOption() {
        const path = __classPrivateFieldGet(this, _Swagger_instances, "m", _Swagger_processAPI).call(this);
        __classPrivateFieldGet(this, _Swagger_option, "f").definition.paths = path;
        return {
            apiOption: __classPrivateFieldGet(this, _Swagger_option, "f"),
            setUpOption: __classPrivateFieldGet(this, _Swagger_setUpOption, "f"),
        };
    }
}
_a = Swagger, _Swagger_paths = new WeakMap(), _Swagger_option = new WeakMap(), _Swagger_setUpOption = new WeakMap(), _Swagger_instances = new WeakSet(), _Swagger_init = function _Swagger_init() {
    __classPrivateFieldSet(this, _Swagger_option, {
        definition: {
            openapi: swaggerOpenApiVersion,
            info: swaggerInfo,
            servers: swaggerServers,
            schemes: swaggerSchemes,
            securityDefinitions: swaggerSecurityDefinitions,
            /* open api 3.0.0 version option */
            produces: swaggerProduces,
            components: {
                securitySchemes: swaggerSecurityScheme,
                schemas: swaggerComponents,
            },
            tags: swaggerTags,
        },
        apis: [],
    }, "f");
    __classPrivateFieldSet(this, _Swagger_setUpOption, {
        explorer: true,
    }, "f");
}, _Swagger_processAPI = function _Swagger_processAPI() {
    const path = {};
    for (let i = 0; i < __classPrivateFieldGet(this, _Swagger_paths, "f").length; i += 1) {
        for (const [key, value] of Object.entries(__classPrivateFieldGet(this, _Swagger_paths, "f")[i])) {
            path[key] = value;
        }
    }
    return path;
};
_Swagger_uniqueSwaggerInstance = { value: void 0 };
module.exports = Swagger;
