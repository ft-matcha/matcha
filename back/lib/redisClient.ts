import { createClient } from 'redis';
import type { RedisClientType } from 'redis';

const redisOption = {
    url: process.env.REDIS_URL,
};

class redisClient {
    private client: RedisClientType = createClient(redisOption);
    constructor() {
        this.client.connect();
    }

    async set(key: string, value: string, expire?: number) {
        try {
            expire ? await this.client.setEx(key, expire, value) : await this.client.set(key, value);
        } catch (error: any) {
            console.error('Redis set failed: ' + error.stack);
            throw error;
        }
    }
    async get(key: string) {
        try {
            const response = await this.client.get(key);
            return response;
        } catch (error: any) {
            console.error('Redis get failed: ' + error.stack);
            throw error;
        }
    }
    async del(key: string) {
        try {
            await this.client.del(key);
        } catch (error: any) {
            console.error('Redis del failed: ' + error.stack);
            throw error;
        }
    }
}

export default new redisClient();
