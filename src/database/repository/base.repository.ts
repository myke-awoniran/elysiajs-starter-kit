import { DeepPartial, FindManyOptions, FindOneOptions, ObjectLiteral, Repository, Transaction } from 'typeorm';
import { AppDataSource } from '../../data-source';

export class BaseRepository<T extends ObjectLiteral> {
    protected readonly repository: Repository<T>;

    constructor(
        private readonly entity: { new(): T }
    ) {
        this.repository = AppDataSource.getRepository(this.entity);
    }

    find = async (options?: {
        where?: FindManyOptions<T>['where'];
        select?: (keyof T)[];
        relations?: FindManyOptions<T>['relations'];
    }) => {
        return this.repository.find({
            where: options?.where,
            select: options?.select as any,
            relations: options?.relations
        });
    };

    findOne = async (options?: {
        where: FindOneOptions<T>['where'];
        select?: (keyof T)[];
        relations?: FindOneOptions<T>['relations'];
    }) => {
        return this.repository.findOne({
            where: options?.where,
            select: options?.select as any,
            relations: options?.relations
        });
    };

    findById = async (id: string, options?: {
        select?: (keyof T)[];
        relations?: FindOneOptions<T>['relations'];
    }) => {
        return this.repository.findOne({
            where: { id } as any,
            select: options?.select as any,
            relations: options?.relations
        });
    };

    findOneAndUpdate = async (
        where: FindOneOptions<T>['where'],
        updateData: DeepPartial<T>
    ) => {
        const entity = await this.repository.findOneBy(where as any);
        if (!entity) {
            return null;
        }

        const updated = this.repository.merge(entity, updateData);
        return this.repository.save(updated);
    };

    findOneAndDelete = async (
        where: FindOneOptions<T>['where']
    ) => {
        const entity = await this.repository.findOneBy(where as any);
        if (!entity) {
            return null;
        }

        await this.repository.remove(entity);
        return entity;
    };

    upsert = async (
        where: FindOneOptions<T>['where'],
        data: DeepPartial<T>
    ) => {
        const existing = await this.repository.findOneBy(where as any);
        if (existing) {
            const updated = this.repository.merge(existing, data);
            return this.repository.save(updated);
        } else {
            return this.repository.save(data);
        }
    };

    create = async (data: DeepPartial<T>): Promise<T> => {
        const entity = this.repository.create(data);
        return this.repository.save(entity);
    };

    getRepo = () => {
        return this.repository;
    };

    save = async (entity: T): Promise<T> => {
        return this.repository.save(entity);
    };
    
    getEntityManager = () => {
        return this.repository.manager;
    };

    increment = async (where: FindOneOptions<T>['where'], property: keyof T, value: number) => {
        return this.repository.increment(where as any, property as string, value);
    };

    decrement = async (where: FindOneOptions<T>['where'], property: keyof T, value: number) => {
        return this.repository.decrement(where as any, property as string, value);
    };

}
