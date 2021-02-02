import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyColumnTypeCustomVolume1611661847930 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE savesong MODIFY customVolume float`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE savesong MODIFY customVolume int`)
  }

}
