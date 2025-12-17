import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1759089675745 implements MigrationInterface {
    name = 'Migrations1759089675745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_verifications" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + interval '1 hour'`);
        await queryRunner.query(`ALTER TABLE "turning_communities" ALTER COLUMN "metadata" SET DEFAULT '{"totalSubscriptions": 0, "totalPosts": 0, "totalRep": 0}'`);
        await queryRunner.query(`ALTER TABLE "turning_community_posts" ALTER COLUMN "metadata" SET DEFAULT '{"aggregateVote": 0, "comments": 0, "reposts": 0}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "turning_community_posts" ALTER COLUMN "metadata" SET DEFAULT '{"reposts": 0, "comments": 0, "aggregateVote": 0}'`);
        await queryRunner.query(`ALTER TABLE "turning_communities" ALTER COLUMN "metadata" SET DEFAULT '{"totalRep": 0, "totalPosts": 0, "totalSubscriptions": 0}'`);
        await queryRunner.query(`ALTER TABLE "user_verifications" ALTER COLUMN "expiresAt" SET DEFAULT (now() + '01:00:00')`);
    }

}
