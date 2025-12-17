import { ForbiddenError, UnAuthorizedError } from '../exceptions';
import { CustomErrorCode } from '../constants';
import { redisClient, UserAuthTokenRepo, UserRepo } from '../database';
import { UtilClass } from '../utils';
import { DeviceAndAuthHeader } from '../schemas';

export type AuthenticatedUserContext = {
    user: { id: string; email: string; authHeaders: { authToken: string, deviceId: string } }
};

export type AuthUser = { id: string; email: string, authHeaders: { authToken: string, deviceId: string } };

export const requireAuth = async (
    headers: DeviceAndAuthHeader,
    set: { status: number }
): Promise<AuthenticatedUserContext> => {
    const token = headers['x-auth-token'];
    const deviceId = headers['x-device-id'];

    if (!token || typeof token !== 'string') {
        set.status = 401;
        throw new UnAuthorizedError({
            msg: 'Missing auth token',
            errorCode: CustomErrorCode.AUTH_MISSING
        });
    }

    if (!deviceId || typeof deviceId !== 'string') {
        set.status = 401;
        throw new UnAuthorizedError({
            msg: 'Missing device ID',
            errorCode: CustomErrorCode.AUTH_DEVICE_ID_MISSING
        });
    }

    const cacheKey = `turning_token:${token}_${deviceId}`;
    const cachedToken = await redisClient.get(cacheKey) as unknown as string;

    if (!cachedToken) {
        const dbToken = await UserAuthTokenRepo.findOne({ where: { accessToken: token, deviceId } });
        if (!dbToken) {
            throw new ForbiddenError({
                msg: 'Invalid token',
                errorCode: CustomErrorCode.AUTH_INVALID
            });
        } else {
            await redisClient.set(cacheKey, JSON.stringify(cachedToken));
            await redisClient.expire(cacheKey, 60 * 60 * 24 * 7); // 7 days
        }
    }

    const jwtDecodedData = await UtilClass.authenticateJWTToken(token);
    if (!jwtDecodedData) {
        throw new ForbiddenError({
            msg: 'Invalid token',
            errorCode: CustomErrorCode.AUTH_INVALID
        });
    }

    const userExists = await UserRepo.findById(jwtDecodedData.userId);
    if (!userExists) {
        throw new ForbiddenError({
            msg: 'Invalid token',
            errorCode: CustomErrorCode.AUTH_INVALID
        });
    }

    return { user: { id: userExists.id, email: userExists.email, authHeaders: { deviceId, authToken: token } } };
};
