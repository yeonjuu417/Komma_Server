import { MigrationInterface, QueryRunner, TableColumn, TableIndex } from "typeorm";

export class AddColumnSonglistPlay1611573135706 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE songlist ADD play BOOLEAN DEFAULT false;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("songlist", "play");
  }

}
