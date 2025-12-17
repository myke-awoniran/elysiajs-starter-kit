import {config as envConfig} from 'dotenv';

envConfig();

import appInstance from './app';
import {connectDB, connectRedis,} from './database';
import {config} from './config';
import {Logger} from './helpers';


export enum APP_ENVIRONMENTS {
    PRODUCTION = 'production',
    DEVELOPMENT = 'development',
    STAGING = 'staging'
}

//-----------------------------------------------//
//-----------------------------------------------//
//-----------------------------------------------//
//----------------Main Server File-----------------//
//-----------------------------------------------//
//-----------------------------------------------//
//-----------------------------------------------//

(async () => {
    try {
        const redisServer = await connectRedis();


        await connectDB();
        Logger.Info('Server is starting...');

        appInstance.listen(config.port, () => {
            Logger.Info(`App is running at ${appInstance.server?.hostname}:${appInstance.server?.port || 3000}`);
        });

        const cleanup = async () => {
            await appInstance.stop();
            await redisServer.quit();
        };

        process.on('exit', cleanup).on('SIGINT', cleanup).on('SIGTERM', cleanup);
    } catch (error) {
        console.log(error);
        Logger.Error('Error during server startup:', error);
        process.exit(1);
    }
})();

