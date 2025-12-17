import 'reflect-metadata';
import { Elysia } from 'elysia';
import { router } from './versions';
import { swagger } from '@elysiajs/swagger';
import { opentelemetry } from '@elysiajs/opentelemetry';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { loggerMiddleware } from './middlewares';
import PackageJson from '../package.json';
import cors from '@elysiajs/cors';
import { createApiErrorResponse, ErrorFaultType, CustomError } from './exceptions';
import { CustomErrorCode } from './constants';
import { config } from './config';

export enum GLOBAL_ERROR_CODES {
    VALIDATION = 'VALIDATION',
    UNDEFINED_ROUTES = 'NOT_FOUND',
    JWT_ERROR = 'JsonWebTokenError',
}

const app = new Elysia({ tags: ['Home'] });

app.onRequest(({ set }) => {
    set.headers['x-powered-by'] = `SERVER v${PackageJson.version}`;
});


app.use(
    opentelemetry({
        spanProcessors: [
            new BatchSpanProcessor(
                new OTLPTraceExporter({
                    url: 'https://api.axiom.co/v1/traces',
                    headers: {
                        Authorization: `Bearer ${config.axiom.token}`,
                        'X-Axiom-Dataset': config.axiom.dataSet
                    }
                })
            )
        ]
    })
);

// Warning, do not abstract, It will lose its type inference.
app.onError(({ error, set, code }) => {

    const { ...err } = error;

    if (code === GLOBAL_ERROR_CODES.VALIDATION) {
        console.log(error);
        // @ts-ignore
        const formattedMessage = Object.values(err.validator?.schema.properties).map((field) => `${field.error}`).join(';');
        set.status = 422;
        return createApiErrorResponse({
            httpStatusCode: 422,
            errorCode: CustomErrorCode.VALIDATION_ERROR,
            message: formattedMessage,
            fault: ErrorFaultType.CLIENT
        });
    }

    if (code === GLOBAL_ERROR_CODES.UNDEFINED_ROUTES) {
        set.status = 404;
        return createApiErrorResponse({
            httpStatusCode: 404,
            errorCode: CustomErrorCode.RESOURCE_NOT_FOUND,
            message: 'Resource Endpoint not found on server.',
            fault: ErrorFaultType.CLIENT
        });
    }

    if (error instanceof CustomError) {
        set.status = error.httpStatusCode;
        return createApiErrorResponse({
            httpStatusCode: error.httpStatusCode,
            errorCode: error.errorCode,
            message: error.message,
            fault: error.fault
        });
    }

    // @ts-ignore
    if (err.name === GLOBAL_ERROR_CODES.JWT_ERROR) {
        set.status = 403;
        return createApiErrorResponse({
            httpStatusCode: 403,
            errorCode: CustomErrorCode.AUTH_INVALID,
            message: 'Invalid token',
            suggestedAction: 'There is an error with your auth token',
            fault: ErrorFaultType.CLIENT
        });
    }

    console.log(err, error);
    // Fallback error
    set.status = 500;
    return createApiErrorResponse({
        httpStatusCode: 500,
        errorCode: CustomErrorCode.INTERNAL_SERVER_ERROR,
        message: 'An unexpected error occurred',
        suggestedAction: 'This is on us, our engineers are working to sort it out',
        fault: ErrorFaultType.SERVER
    });
});



app.use(cors({
    origin: /^(https?:\/\/)?([a-z0-9-]+\.)?<<INPUT YOUR DOMAIN NAME HERE - MYKE>>\.app$/
}));


app.use(
    swagger({
        documentation: {
            info: {
                title: 'API Infrastructure Documentation',
                version: PackageJson.version,
                description: 'API Documentation for the Infrastructure of the <<INPUT YOUR DOMAIN NAME HERE - MYKE>>.app application.'
            }
        },
        path: '/docs',
        scalarVersion: 'latest'
    })
);

app.use(loggerMiddleware);

app.get('/', () => {
    return {
        success: true,
        status: 200,
        message: 'Hello World!',
        timezone: 'America/New_York',
        apiVersion: PackageJson.version
    };
});

app.use(router); // v1

export default app;