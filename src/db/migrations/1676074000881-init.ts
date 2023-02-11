import { MigrationInterface, QueryRunner } from "typeorm";

export class init1676074000881 implements MigrationInterface {
    name = 'init1676074000881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "albums" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "location" character varying NOT NULL, "date" character varying NOT NULL, "photographerId" integer, CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photographers" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "fullname" text, "email" text, CONSTRAINT "UQ_65925670555479e375ad60c5586" UNIQUE ("login"), CONSTRAINT "PK_9ecef0afe25ec4afcb5216e7f45" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "albums" ADD CONSTRAINT "FK_61a519d4467f403742af63fb87f" FOREIGN KEY ("photographerId") REFERENCES "photographers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "albums" DROP CONSTRAINT "FK_61a519d4467f403742af63fb87f"`);
        await queryRunner.query(`DROP TABLE "photographers"`);
        await queryRunner.query(`DROP TABLE "albums"`);
    }

}
