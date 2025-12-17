import {BaseRepository} from './base.repository';

import {User, UserAuth, UserAuthToken, UserSettings, UserVerification} from "../entities";

export const UserRepo = new BaseRepository<User>(User);
export const UserVerificationRepo = new BaseRepository<UserVerification>(UserVerification);
export const UserAuthRepo = new BaseRepository<UserAuth>(UserAuth);
export const UserAuthTokenRepo = new BaseRepository<UserAuthToken>(UserAuthToken);
export const UserSettingsRepo = new BaseRepository<UserSettings>(UserSettings);
