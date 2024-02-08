const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const Swagger = require('../lib/swagger');
const auth = require('./api/auth/index');
const jwt = require('./api/jwt/index');
const profile = require('./api/profile/index');
const user = require('./api/user/index');
class ApiDocs {
    #apiDocsOptions;
    #swagger;

    constructor() {
        this.#apiDocsOptions = {
            ...user,
            ...auth,
            ...profile,
            ...jwt,
        };
        this.#swagger = new Swagger();
    }

    init() {
        this.#swagger.addAPI(this.#apiDocsOptions);
    }

    getSwaggerOption() {
        const { apiOption, setUpOption } = this.#swagger.getOption();

        const specs = swaggerJsDoc(apiOption);

        return {
            swaggerUI,
            specs,
            setUpOption,
        };
    }
}
module.exports = ApiDocs;
export {};
