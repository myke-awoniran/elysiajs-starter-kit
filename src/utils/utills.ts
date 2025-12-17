import * as jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';
import {Logger} from '../helpers';
import {config} from '../config';
import {APP_ENVIRONMENTS} from "../index";

interface UtilInterface {
    readonly quickOTP: {
        otp: string;
        otpExpires: number;
    };

    JWTDigitalSign(parameter: DigitalSignPayload): string;

    authenticateJWTToken(parameter: string): Promise<string | jwt.JwtPayload>;
}

export interface Cursor {
    seqId: number;
    createdAt?: string; // optional for more complex use cases
}

export enum CURSOR_DIRECTION {
    BEFORE = 'BEFORE',
    AFTER = 'AFTER',
}


export interface DigitalSignPayload {
    email: string;
    userId: string;
    jwtType: string;
    deviceId: string;
    adminId?: string;
}

export enum JwtType {
    USER = 'USER',
    NEW_USER = 'NEW_USER',
    FORGOT_PASSWORD = 'FORGOT_PASSWORD',
    REFRESH_TOKEN = 'REFRESH_TOKEN',
    UPDATE_PASSWORD = 'UPDATE_PASSWORD_CONFIRMATION',
}

class UtilityService implements UtilInterface {

    public JWTDigitalSign(body: DigitalSignPayload) {
        const encryptionKey = Buffer.from(config.jwtPrivateKey, 'base64').toString();
        if (body.jwtType === JwtType.REFRESH_TOKEN) {
            return jwt.sign({
                jwtType: JwtType.REFRESH_TOKEN, userId: body.userId, email: body.email, deviceId: body.deviceId
            }, encryptionKey /**{ expiresIn: 60 * 60 }*/); // refresh token does not expires
        }

        if (body.jwtType === JwtType.USER) {
            return jwt.sign({
                email: body.email,
                userId: body.userId,
                jwtType: JwtType.USER,
                deviceId: body.deviceId
            }, encryptionKey, {expiresIn: '4W'});
        }

        if (body.jwtType === JwtType.NEW_USER) {
            return jwt.sign({
                email: body.email,
                userId: body.userId,
                jwtType: JwtType.NEW_USER,
                deviceId: body.deviceId
            }, encryptionKey, {expiresIn: 60 * 60});
        }

        if (body.jwtType === JwtType.UPDATE_PASSWORD) {
            return jwt.sign({
                email: body.email,
                userId: body.userId,
                jwtType: JwtType.UPDATE_PASSWORD,
                deviceId: body.deviceId
            }, encryptionKey, {expiresIn: 60 * 60});
        }

        if (body.jwtType === JwtType.FORGOT_PASSWORD) {
            return jwt.sign({
                jwtType: JwtType.FORGOT_PASSWORD, email: body.email, deviceId: body.deviceId
            }, encryptionKey, {expiresIn: 60 * 60});
        }


        throw new Error('type not supported yet');
    }

    public async authenticateJWTToken(token: string): Promise<DigitalSignPayload> {
        const decoded = jwt.verify(token, Buffer.from(config.jwtPrivateKey, 'base64').toString());
        return decoded as unknown as DigitalSignPayload;
    }

    public get quickOTP(/**no parameter */) {
        const otpExpires = Date.now() + 60 * 60 * 1000;
        let otp;
        if (config.environment !== APP_ENVIRONMENTS.PRODUCTION) {
            otp = '123456';
        } else {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                specialChars: false,
                lowerCaseAlphabets: false,
                digits: true
            });
        }
        return {otpExpires, otp};
    }

    public validateEmail(email: string): boolean {
        const emailPattern: RegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (emailPattern.test(email)) {
            // Check if the email contains a "+" character
            if (email.includes('+')) {
                Logger.Error('user trying to use a duplicate email with \'+\' character', `userEmail: ${email}`);
                return false;
            } else {
                Logger.Info('Email is valid.');
                return true;
            }
        } else {
            return false;
        }
    }


}

export const UtilClass = new UtilityService();