import {Elysia} from 'elysia';
import {AuthController, UserController} from "../controllers";


export const router = new Elysia();

// USAGE EXAMPLE HERE - Myke
router.use(AuthController);
router.use(UserController);
