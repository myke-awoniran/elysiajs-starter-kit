import { User } from './user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { config } from '../../config';
import { EntityHelper } from '../../utils';

@Entity({
    name: config.postgres.tables.userSettings,
    orderBy: {
        createdAt: 'DESC'
    }
})
export class UserSettings extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'uuid', unique: true })
    userId: string;

    @OneToOne(() => User, (user) => user.settings)
    @JoinColumn({ name: 'userId' })
    user: string;

    @Column({ nullable: false, type: 'boolean', default: true })
    allowNotification: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}