import { createClient, RedisClientType } from 'redis';
import { Logger } from '../helpers';
import { config } from '../config';
import { AppDataSource } from '../data-source';

const client = createClient({
    url: config.redis.uri
});

export interface IRedisClient extends RedisClientType {
}

export const connectDB = async () => {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }
        Logger.Info('📦 Database connected successfully!');
    } catch (error) {
        console.log(error);
        Logger.Error('❌ Database connection error:', error);
        process.exit(1);
    }
};

export const connectRedis = async (): Promise<IRedisClient> => {
    client.on('error', (err: unknown) => console.log('Redis Client Error', err));
    await client.connect();
    const isConnected = client.isReady;
    if (isConnected) {
        Logger.Info('Redis Connection Established');
    }
    return client as unknown as IRedisClient;
};

export const redisClient = client;