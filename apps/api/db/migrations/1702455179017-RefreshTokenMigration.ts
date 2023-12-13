import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefreshTokenMigration1702455179017 implements MigrationInterface {
  name = 'RefreshTokenMigration1702455179017';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "refreshToken" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
  }
}
