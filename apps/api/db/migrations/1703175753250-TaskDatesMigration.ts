import { MigrationInterface, QueryRunner } from 'typeorm';

export class TaskDatesMigration1703175753250 implements MigrationInterface {
  name = 'TaskDatesMigration1703175753250';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" ADD "createdAt" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT NOW()`,
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD "updatedAt" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT NOW()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "createdAt"`);
  }
}
