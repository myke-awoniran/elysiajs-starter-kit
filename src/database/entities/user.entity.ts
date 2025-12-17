import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToOne, OneToMany
} from 'typeorm';
import { config } from '../../config';
import { EntityHelper } from '../../utils';
import { UserSettings } from './user.settings.entity';

@Entity({
    name: config.postgres.tables.users,
    orderBy: {
        createdAt: 'DESC'
    }
})
export class User extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    lastName: string;

    @Column({ type: 'varchar', nullable: true })
    bio: string;

    @Column({ type: 'varchar', nullable: true })
    coverPhoto: string;

    @Column({ type: 'varchar', nullable: false, unique: true })
    username: string;

    @Column({ type: 'varchar', nullable: true })
    avatar: string;

    @Column({ unique: true, nullable: false, type: 'varchar' })
    email: string;

    @Column({ nullable: false, type: 'varchar' })
    firstName: string;

    @OneToOne(() => UserSettings, (userSettings) => userSettings.user, {
        eager: true
    })
    settings: UserSettings;

    @Column({
        type: 'int',
        default: 0
    })
    unreadNotificationCount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}