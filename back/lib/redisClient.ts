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
                    host: this.#host,
                    port: this.#port,
                });
                this.#connected = true;
                return this.#client;
            }
        } catch (error: any) {
            console.error('Redis connection failed: ' + error.stack);
            return error;
        }
    }
}

module.exports = new redisClient();
