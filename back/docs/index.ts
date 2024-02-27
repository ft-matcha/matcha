import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import Swagger from '../lib/swagger';
import auth from './api/auth/index';
import jwt from './api/jwt/index';
import user from './api/user/index';
import relation from './api/relation/index';
import alert from './api/alert/index';

class ApiDocs {
    private apiDocsOptions;
    private swagger;

    constructor() {
        this.apiDocsOptions = {
            ...user,
            ...auth,
            ...jwt,
            ...relation,
            ...alert,
        };
        this.swagger = new Swagger();
    }

    init() {
        this.swagger.addAPI(this.apiDocsOptions);
    }

    getSwaggerOption() {
        const { apiOption, setUpOption } = this.swagger.getOption();

        const specs = swaggerJsDoc(apiOption);

        return {
            swaggerUI,
            specs,
            setUpOption,
        };
    }
}

export default new ApiDocs();
