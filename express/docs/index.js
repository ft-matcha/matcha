const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const Swagger = require('../handler/swagger');
const user = require('./api/user/index');
const jwt = require('./api/jwt/index');

class ApiDocs {
    #apiDocsOptions;
    #swagger;

    constructor() {
        this.#apiDocsOptions = {
            ...user,
            ...jwt,
        };
        this.#swagger = new Swagger();
    }

    init() {
        this.#swagger.addAPI(this.#apiDocsOptions);
    }

    getSwaggerOption() {
        const { apiOption, setUpoption } = this.#swagger.getOption();

        const specs = swaggerJsDoc(apiOption);

        return {
            swaggerUI,
            specs,
            setUpoption,
        };
    }
}

module.exports = ApiDocs;
