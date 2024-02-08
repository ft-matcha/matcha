const { Client } = require('@elastic/elasticsearch');

const esconfig = {
    host: process.env.ES_HOST,
    port: process.env.ES_PORT,
};

class elastic {
    #client: any;
    #isConnected;
    constructor() {
        this.#client = null;
        this.#isConnected = false;
    }
    async getClient() {
        try {
            if (this.#isConnected) {
                return this.#client;
            } else {
                this.#client = new Client(esconfig);
                this.#isConnected = true;
                return this.#client;
            }
        } catch (error: any) {
            console.error('Elasticsearch connection failed: ' + error.stack);
            return error;
        }
    }
}

exports.elastic = new elastic();
