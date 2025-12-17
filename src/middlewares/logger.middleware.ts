import {Elysia} from 'elysia';
import {Logger} from '../helpers';

export const loggerMiddleware = new Elysia()
    .onRequest(({request, set}) => {
        const {method, url} = request;
        Logger.Info(`[Request] ${method} ${url}`);
        if (url.endsWith('.php') || url.includes('wp-') || url.includes('.env')) {
            set.status = 404;
            return 'LOL';
        }
    });
// .onAfterHandle(({ request, response, set,  }) => {
//     const { method, url, headers } = request;
//     // const status = response.status;
//     console.log(request, response, method, url, headers);
//     Logger.Info(`[${new Date().toISOString()}] ${method} ${url} ${headers.values()} - - ${headers.get('user-agent')}`);
// });