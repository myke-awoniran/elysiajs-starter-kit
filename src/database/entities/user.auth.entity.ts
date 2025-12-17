import {
    Entity, PrimaryGeneratedColumn,
    Column, CreateDateColumn, UpdateDateColumn,
    DeleteDateColumn, JoinColumn, OneToOne, BeforeInsert
} from 'typeorm';

import { config } from '../../config';
import { EntityHelper } from '../../utils';
import { User } from './user.entity';


export enum AUTH_TYPE {
    EMAIL = 'EMAIL',
    GOOGLE = 'GOOGLE',
    APPLE = 'APPLE'
}


@Entity({
    name: config.postgres.tables.userAuths,
    orderBy: {
        createdAt: 'DESC'
    }
})
export class UserAuth extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'uuid', unique: true })
    userId: string;

    @OneToOne(() => User, (user) => user.id, { cascade: true })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ unique: true, nullable: false, type: 'varchar' })
    email: string;

    @Column({ nullable: false, type: 'varchar' })
    passcode: string;

    @BeforeInsert()
    async hashPasscodeBeforeInsert() {
        this.passcode = await Bun.password.hash(this.passcode);
    }

    @Column({ nullable: false, type: 'enum', enum: AUTH_TYPE })
    authType: string;

    @Column({ type: 'varchar', nullable: false })
    currentDeviceId: string;

    @Column('text', { array: true, default: '{}' })
    recognisedDevices!: string[];

    async verifyPasscode(plainPasscode: string): Promise<boolean> {
        return Bun.password.verify(plainPasscode, this.passcode);
    }

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}