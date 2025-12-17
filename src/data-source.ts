import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config(); // this is important to be in this position -myke

import {DataSource, DataSourceOptions} from 'typeorm';
import {config} from './config';

const isProd = config.environment === 'production';

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: config.postgres.credentials.uri,
    synchronize: true,
    migrationsRun: true,
    dropSchema: false,
    keepConnectionAlive: true,
    logging: isProd,
    // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    // migrations: [__dirname + '/migrations/**/*{.ts,.js}']
    entities: ['src/database/entities/*.ts'],
    migrations: ['src/database/migrations/*.ts']
} as DataSourceOptions);