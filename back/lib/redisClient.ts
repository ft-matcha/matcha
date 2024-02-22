import { createClient } from 'redis';

class redisClient {
    private connected;
    private static url = process.env.REDIS_URL;
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
                this.client = createClient({ url: redisClient.url });
                this.connected = true;
                await this.client.connect();
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
    async del(key: string) {
        try {
            await this.getClient();
            await this.client.del(key);
        } catch (error: any) {
            console.error('Redis del failed: ' + error.stack);
            throw error;
        }
    }
}

export default new redisClient();
