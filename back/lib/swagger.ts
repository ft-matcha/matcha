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
    static #uniqueSwaggerInstance: any;
    #paths = [{}];
    #option: any = {};
    #setUpOption = {};

    /**
     *
     * @returns {Swagger}
     */
    constructor() {
        if (!Swagger.#uniqueSwaggerInstance) {
            this.#init();
            Swagger.#uniqueSwaggerInstance = this;
        }

        return Swagger.#uniqueSwaggerInstance;
    }

    #init() {
        this.#option = {
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
        };
        this.#setUpOption = {
            explorer: true,
        };
    }

    addAPI(api: any) {
        this.#paths.push(api);
    }

    #processAPI() {
        const path: any = {};

        for (let i = 0; i < this.#paths.length; i += 1) {
            for (const [key, value] of Object.entries(this.#paths[i])) {
                path[key] = value;
            }
        }

        return path;
    }

    getOption() {
        const path = this.#processAPI();
        this.#option.definition.paths = path;

        return {
            apiOption: this.#option,
            setUpOption: this.#setUpOption,
        };
    }
}

module.exports = Swagger;
