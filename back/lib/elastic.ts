const { Client } = require('elastic');

const esconfig = {
    node: process.env.ES_NODE,
};
class elastic {
    #client: any;
    #isConnected;
    #index;
    #isIndexCreated;
    constructor() {
        this.#client = null;
        this.#isConnected = false;
        this.#index = 'matcha';
        this.#isIndexCreated = false;
    }
    async getClient() {
        try {
            if (this.#isConnected) {
                return this.#client;
            } else {
                this.#client = await new Client(esconfig);
                if (this.#isIndexCreated == false) {
                    await this.createIndex(this.#index);
                }
                this.#isConnected = true;
                console.log('Elasticsearch connected');
                return this.#client;
            }
        } catch (error: any) {
            console.error('Elasticsearch connection failed: ' + error.stack);
            throw error;
        }
    }
    async createIndex(index: string) {
        try {
            const response = await this.#client.indices.create({
                index,
            });
            return response;
        } catch (error: any) {
            throw error;
        }
    }
    async index(id: string, document: JSON) {
        try {
            await this.getClient();
            const response = await this.#client.index({
                index: this.#index,
                id: id,
                document: document,
            });
            return response;
        } catch (error: any) {
            throw error;
        }
    }
}

module.exports = new elastic();
