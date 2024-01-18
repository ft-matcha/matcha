const ApiDocs = require('../docs/index');

function getSwaggerOption() {
    const apiDocs = new ApiDocs();
    apiDocs.init();

    return apiDocs.getSwaggerOption();
}

module.exports = (app) => {
    const { swaggerUI, specs, setUpoption } = getSwaggerOption();

    app.use('/swagger', swaggerUI.serve, swaggerUI.setup(specs, setUpoption));
};
