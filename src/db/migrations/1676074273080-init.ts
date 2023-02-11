import { MigrationInterface, QueryRunner } from "typeorm";

export class init1676074273080 implements MigrationInterface {
    name = 'init1676074273080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "albums" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "albums" ADD "date" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "albums" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "albums" ADD "date" character varying NOT NULL`);
    }

}
