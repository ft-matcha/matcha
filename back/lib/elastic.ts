const { Client } = require('elastic');
const fs = require('fs');

const esconfig = {
    node: process.env.ES_NODE,
    auth: {
        username: 'elastic',
        password: '1523',
    },
    // tls: {
    //     ca: fs.readFileSync('/app/certs/http_ca.crt'),
    //     rejectUnauthorized: false,
    // },
    // openssl s_client -connect elasticsearch:9200 -servername elasticsearch -showcerts -quiet | openssl x509 -fingerprint -sha256 -noout -in /dev/stdin
};
class elastic {
    private client: any;
    private isConnected;
    private index;
    constructor() {
        this.client = null;
        this.isConnected = false;
        this.index = 'matcha';
    }
    async getClient() {
        try {
            if (this.isConnected) {
                return this.client;
            } else {
                console.log(esconfig);
                this.client = await new Client(esconfig);
                this.isConnected = true;
                return this.client;
            }
        } catch (error: any) {
            console.error('Elasticsearch connection failed: ' + error.stack);
            throw error;
        }
    }
    async createIndex(index: string) {
        try {
            await this.getClient();
            const exists = await this.client.indices.exists({ index });
            if (exists) {
                console.error('Index already exists');
                return;
            }
            const response = await this.client.indices.create({
                index,
            });
            return response;
        } catch (error: any) {
            console.error('Elasticsearch createIndex failed: ' + error.stack);
            return error;
        }
    }
    async create(id: string, document: JSON) {
        try {
            await this.getClient();
            const response = await this.client.index({
                index: this.index,
                id: id,
                document: document,
            });
            return response;
        } catch (error: any) {
            throw error;
        }
    }
    async get(id: string) {
        try {
            await this.getClient();
            const response = await this.client.get({
                index: this.index,
                id: id,
            });
            return response;
        } catch (error: any) {
            throw error;
        }
    }
    async search(key: string, query: string) {
        try {
            await this.getClient();
            var match: { [key: string]: string } = {};
            match[key] = query;
            const response = await this.client.search({
                query: {
                    match,
                },
            });
            return response;
        } catch (error: any) {
            throw error;
        }
    }
}

module.exports = new elastic();
export {};
