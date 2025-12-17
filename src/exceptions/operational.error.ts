import { CustomErrorCode } from '../constants';
import { ErrorFaultType } from './global.error';

export class CustomError extends Error {
    httpStatusCode: number;
    message: string;
    errorCode: CustomErrorCode;
    fault: ErrorFaultType;
    isOperational: true;
    retryable: false; // it's operational error

    constructor({ message, httpStatusCode, errorCode, name, fault = ErrorFaultType.CLIENT }: {
        message: string,
        httpStatusCode: number,
        errorCode: CustomErrorCode,
        name?: string;
        fault?: ErrorFaultType;
    }) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
        this.httpStatusCode = httpStatusCode;
        this.isOperational = true;
        this.message = message;
        this.name = name || 'error';
        this.retryable = false;
        this.fault = fault;
        this.errorCode = errorCode;
    }
}

export class BadRequestError extends CustomError {
    constructor({ msg, errorCode }: { msg?: string, errorCode: CustomErrorCode }) {
        super({ message: msg || 'BadRequestError', httpStatusCode: 400, errorCode });
        this.name = 'BadRequestError';
        this.errorCode = errorCode || CustomErrorCode.BAD_REQUEST;
    }
}

export class UnAuthorizedError extends CustomError {
    constructor({ msg, errorCode }: { msg?: string, errorCode: CustomErrorCode }) {
        super({ message: msg || 'UnAuthorized', httpStatusCode: 401, errorCode });
        this.name = 'UnAuthorizedError';
        this.errorCode = errorCode || CustomErrorCode.ACCESS_DENIED;
    }
}

export class ForbiddenError extends CustomError {
    constructor({ msg, errorCode }: { msg?: string, errorCode: CustomErrorCode }) {
        super({ message: msg || 'Forbidden', httpStatusCode: 403, errorCode });
        this.name = 'ForbiddenError';
        this.errorCode = errorCode || CustomErrorCode.ACTION_NOT_ALLOWED;
    }
}

export class ServiceUnavailableError extends CustomError {
    constructor({ msg, errorCode }: { msg?: string, errorCode: CustomErrorCode }) {
        super({ message: msg || 'Service Unavailable', httpStatusCode: 503, errorCode });
        this.name = 'ServiceUnavailableError';
        this.errorCode = errorCode;
    }
}

export class NotFoundError extends CustomError {
    constructor({ msg, errorCode }: { msg?: string, errorCode: CustomErrorCode }) {
        super({ message: msg || 'NotFoundError', httpStatusCode: 404, errorCode });
        this.name = 'NotFoundError';
        this.errorCode = errorCode || CustomErrorCode.RESOURCE_NOT_FOUND;
    }
}
