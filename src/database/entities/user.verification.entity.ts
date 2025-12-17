import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from 'typeorm';
import { config } from '../../config';
import { EntityHelper } from '../../utils';

export enum OTP_TYPE {
    SIGN_UP = 'SIGN_UP',
    UPDATE_PASSWORD_CONFIRMATION = 'UPDATE_PASSWORD_CONFIRMATION',
    LOGIN = 'LOGIN',
    RESET_TOKEN = 'RESET_TOKEN',
    FORGOT_PASSWORD = 'FORGOT_PASSWORD',
    ACCOUNT_VERIFICATION = 'ACCOUNT_VERIFICATION'
}

@Entity({
    name: config.postgres.tables.userVerifications,
    orderBy: {
        createdAt: 'DESC'
    }
})
export class UserVerification extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ nullable: false, type: 'enum', enum: OTP_TYPE })
    type: string;

    @Column({ nullable: false, type: 'varchar' })
    otp: string;

    @Column({ nullable: false, type: 'varchar' })
    deviceId: string;

    @Column({ type: 'timestamptz', default: () => 'NOW() + interval \'1 hour\'' })
    expiresAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
