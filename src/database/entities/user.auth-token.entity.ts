import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn, JoinColumn, OneToOne
} from 'typeorm';
import { config } from '../../config';
import { EntityHelper } from '../../utils';
import { User } from './user.entity';

@Entity({
    name: config.postgres.tables.userAuthTokens,
    orderBy: {
        createdAt: 'DESC'
    }
})
export class UserAuthToken extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'uuid', unique: true })
    userId: string;

    @OneToOne(() => User, (user) => user.id, { cascade: true })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ nullable: true, type: 'varchar' })
    fcmToken: string;

    @Column({ nullable: false, type: 'varchar' })
    accessToken: string;

    @Column({ nullable: false, type: 'varchar' })
    refreshToken: string;

    @Column({ nullable: false, type: 'varchar' })
    deviceId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
