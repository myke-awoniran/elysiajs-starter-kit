// import moment from 'moment';
import { config } from '../config';
import PackageJson from '../../package.json';
import { CustomErrorCode } from '../constants';

export enum ErrorFaultType {
    CLIENT = 'client',
    SERVER = 'server',
}

export enum TOKEN_STATUS {
    EXPIRED = 'expired',
    INVALID = 'invalid',
    MISSING = 'missing',
}

export type TokenMeta = {
    status: TOKEN_STATUS;
    type?: string;
    issuedAt?: string;
    expiresAt?: string;
};

export interface ApiErrorOptions {
    httpStatusCode: number;
    status?: string;
    errorCode: CustomErrorCode;
    message: string;
    reason?: any;
    errorMeta?: TokenMeta;
    retryable?: boolean;
    suggestedAction?: string;
    fault?: ErrorFaultType;
    environment?: string;
    apiVersion?: string;
}

export function createApiErrorResponse({
                                           httpStatusCode,
                                           errorCode,
                                           message,
                                           status = 'error',
                                           retryable = false,
                                           suggestedAction = '',
                                           fault = ErrorFaultType.CLIENT,
                                           environment = config.environment,
                                           apiVersion = PackageJson.version,
                                           reason
                                       }: ApiErrorOptions) {
    return {
        success: false,
        status,
        httpStatusCode,
        errorCode,
        message,
        fault,
        retryable,
        suggestedAction,
        reason,
        // timestamp: moment().tz(config.timeZone), TODO, FIX
        environment,
        apiVersion
    };
}


