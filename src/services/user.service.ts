import {
    UserRepo
} from '../database';
import {IService} from '../interfaces';
import {NotFoundError} from '../exceptions';
import {CustomErrorCode} from '../constants';

export class UserService {

    public async getProfile(userId: string): Promise<IService> {
        const user = await UserRepo.findById(userId);
        if (!user) {
            throw new NotFoundError({msg: 'User profile not found', errorCode: CustomErrorCode.RESOURCE_NOT_FOUND});
        }
        return {
            status: 200,
            success: true,
            message: 'Profile retrieval successful.',
            data: {
                user
            }
        };
    }

}