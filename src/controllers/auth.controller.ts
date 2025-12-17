import {Elysia} from 'elysia';
import {AuthService} from '../services';
import {
    checkEmailResponseSchema,
    defaultBadRequestResponseSchema,
    checkEmailSchema, CheckEmail
} from '../schemas';

import {IService} from '../interfaces';


export const AuthController = new Elysia({prefix: '/auth', tags: ['Authentication Service']})
    .decorate('AuthService', new AuthService())
    .post('/check-email', async ({AuthService, body}: {
        AuthService: AuthService;
        body: CheckEmail;
    }): Promise<IService> => {
        const {email} = body;
        return AuthService.checkEmail(email);
    }, {
        body: checkEmailSchema,
        response: {200: checkEmailResponseSchema, 400: defaultBadRequestResponseSchema}
    })