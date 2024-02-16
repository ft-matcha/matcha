const redis = require('redis');

class redisClient {
    #host = process.env.REDIS_HOST;
    #port = process.env.REDIS_PORT;
    #connected;
    #client: any;
    constructor() {
        this.#connected = false;
        this.#client = null;
    }
    async getClient() {
        try {
            if (this.#connected) {
                return this.#client;
            } else {
                this.#client = await redis.createClient({
                    url: process.env.REDIS_URL,
                });
                console.log('Redis connected');
                this.#connected = true;
                this.#client.connect();
                return this.#client;
            }
        } catch (error: any) {
            console.error('Redis connection failed: ' + error.stack);
            throw error;
        }
    }
    async set(key: string, value: string) {
        try {
            await this.getClient();
            await this.#client.set(key, value);
        } catch (error: any) {
            console.error('Redis set failed: ' + error.stack);
            throw error;
        }
    }
    async get(key: string) {
        try {
            await this.getClient();
            const response = await this.#client.get(key);
            await this.#client.disconnect();
            return response;
        } catch (error: any) {
            console.error('Redis get failed: ' + error.stack);
            throw error;
        }
    }
}

module.exports = new redisClient();
