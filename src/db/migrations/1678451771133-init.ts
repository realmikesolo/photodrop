import { MigrationInterface, QueryRunner } from "typeorm";

export class init1678451771133 implements MigrationInterface {
    name = 'init1678451771133'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "photos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "relativePath" character varying, "name" character varying NOT NULL, "type" character varying NOT NULL, "phoneNumbers" character varying NOT NULL, "albumId" integer, CONSTRAINT "PK_5220c45b8e32d49d767b9b3d725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_f012e62aaf25a8210ed0d935f0e" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_f012e62aaf25a8210ed0d935f0e"`);
        await queryRunner.query(`DROP TABLE "photos"`);
    }

}
