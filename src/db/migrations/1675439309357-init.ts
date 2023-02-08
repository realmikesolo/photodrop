import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1675439309357 implements MigrationInterface {
  name = 'init1675439309357';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "photographers" ("id" SERIAL NOT NULL, "login" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "fullname" character varying, "email" character varying, CONSTRAINT "UQ_65925670555479e375ad60c5586" UNIQUE ("login"), CONSTRAINT "PK_9ecef0afe25ec4afcb5216e7f45" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "photographers"`);
  }
}
