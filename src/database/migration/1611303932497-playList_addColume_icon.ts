import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class playListAddColumeIcon1611303932497 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("playlist", new TableColumn({
      name: "icon",
      type: "varchar"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("playlist", "icon");
  }

}
