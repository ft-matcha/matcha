const redis = require('redis');

class redisClient {
    private host = process.env.REDIS_HOST;
    private port = process.env.REDIS_PORT;
    private url = process.env.REDIS_URL;
    private connected;
    private client: any;
    constructor() {
        this.connected = false;
        this.client = null;
    }
    async getClient() {
        try {
            if (this.connected) {
                return this.client;
            } else {
                console.log(this.url);
                this.client = await redis.createClient({
                    url: this.url,
                });
                console.log('Redis connected');
                this.connected = true;
                this.client.connect();
                return this.client;
            }
        } catch (error: any) {
            console.error('Redis connection failed: ' + error.stack);
            throw error;
        }
    }
    async set(key: string, value: string) {
        try {
            await this.getClient();
            await this.client.set(key, value);
        } catch (error: any) {
            console.error('Redis set failed: ' + error.stack);
            throw error;
        }
    }
    async get(key: string) {
        try {
            await this.getClient();
            const response = await this.client.get(key);
            return response;
        } catch (error: any) {
            console.error('Redis get failed: ' + error.stack);
            throw error;
        }
    }
}

module.exports = new redisClient();
