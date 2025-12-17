import {Elysia, t} from 'elysia';
import {UserService} from '../services';
import {
    notFoundErrorSchema,
    DeviceAndAuthHeader,
    deviceAndAuthHeader,
} from '../schemas';

import {AuthenticatedUserContext, AuthUser, requireAuth} from '../middlewares';

export const UserController = new Elysia({prefix: '/users', tags: ['User Service']})
    .decorate('UserService', new UserService())
    .derive<AuthenticatedUserContext>(async (context) => {
        const headers = context.headers as unknown as DeviceAndAuthHeader;
        const set = context.set as unknown as { status: number };
        return requireAuth(headers, set);
    })
    .get('/me', async ({UserService, user}: {
        UserService: UserService;
        user: AuthUser
    }) => {
        const userId = user.id;
        return UserService.getProfile(userId);
    }, {
        headers: deviceAndAuthHeader,
        response: {/**200: userProfileResponseSchema**/ 404: notFoundErrorSchema}
    })