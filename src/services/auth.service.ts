import {
    AUTH_TYPE,
    OTP_TYPE,
    redisClient,
    UserAuthRepo,
    UserAuthTokenRepo,
    UserRepo,
    UserSettingsRepo,
    UserVerificationRepo
} from '../database';

import { IService } from '../interfaces';
import { JwtType, UtilClass } from '../utils';
import { BadRequestError, UnAuthorizedError } from '../exceptions';
import { CustomErrorCode } from '../constants';
import { MoreThanOrEqual } from 'typeorm';



export class AuthService {
    /**
     * Check if the email is already registered
     * @param email - The email to check
     * @returns IService - Service response with email registration status
     */
    public async checkEmail(email: string): Promise<IService> {
        const transformedEmail = email.toLowerCase();
        const validEmail = UtilClass.validateEmail(transformedEmail);
        if (!validEmail) {
            throw new BadRequestError({ msg: 'Provide a valid email address', errorCode: CustomErrorCode.BAD_REQUEST });
        }
        const userExists = await UserRepo.findOne({ where: { email: transformedEmail } });

        return {
            status: 200,
            success: true,
            message: 'Email check successful',
            data: {
                email,
                isRegistered: !!userExists
            }
        };
    }


}