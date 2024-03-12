import { Client } from 'elastic';

const esconfig = {
    node: process.env.ES_NODE,
    // auth: {
    //     username: 'elastic',
    //     password: '1523',
    // },
    // tls: {
    //     ca: fs.readFileSync('/app/certs/http_ca.crt'),
    //     rejectUnauthorized: false,
    // },
};
class elastic {
    private client: Client = new Client(esconfig);
    private index;
    constructor() {
        this.index = 'matcha';
    }
    async createIndex(index: string) {
        try {
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
    async create<T>(id: string, document: T) {
        try {
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
            const response = await this.client.get({
                index: this.index,
                id: id,
            });
            return response;
        } catch (error: any) {
            throw error;
        }
    }
    async update(email: string, data: any) {
        try {
            const exists = await this.client.exists({ index: this.index, id: email });
            if (!exists) {
                const response = await this.create(email, data);
                return response;
            }
            const response = await this.client.update({
                index: this.index,
                id: email,
                doc: data,
            });
            return response;
        } catch (error: any) {
            console.error('Elasticsearch update failed: ' + error.stack);
            throw error;
        }
    }
    async search(data: any) {
        try {
            const response = await this.client.search({
                index: this.index,
                query: data,
            });
            return response;
        } catch (error: any) {
            throw error;
        }
    }
}

export default new elastic();
