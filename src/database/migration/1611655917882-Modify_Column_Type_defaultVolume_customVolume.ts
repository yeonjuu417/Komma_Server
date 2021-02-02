import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyColumnTypeDefaultVolumeCustomVolume1611655917882 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE songlist CHANGE defaltVolume defaultVolume int;`);
    await queryRunner.query(`ALTER TABLE songlist MODIFY defaultVolume float`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE songlist CHANGE defaultVolume defaltVolume float;`);
    await queryRunner.query(`ALTER TABLE songlist MODIFY defaltVolume int`)
  }

}
