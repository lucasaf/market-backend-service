import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaGenerate1705342253874 implements MigrationInterface {
  name = 'SchemaGenerate1705342253874';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "resourceId" uuid NOT NULL, "resourceName" character varying NOT NULL, "url" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "location" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product_location" ("id" SERIAL NOT NULL, "quantity" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" uuid, "locationId" uuid, CONSTRAINT "PK_9a8113b3d66e069760bcc1c999a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "image" ADD CONSTRAINT "FK_70e9eed4699ee674d49e0253c40" FOREIGN KEY ("resourceId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_location" ADD CONSTRAINT "FK_db63ee5a35410376b5a4009042f" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_location" ADD CONSTRAINT "FK_7f9aa7ad9e5981a3d162a865d8f" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_location" DROP CONSTRAINT "FK_7f9aa7ad9e5981a3d162a865d8f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_location" DROP CONSTRAINT "FK_db63ee5a35410376b5a4009042f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "image" DROP CONSTRAINT "FK_70e9eed4699ee674d49e0253c40"`,
    );
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "product_location"`);
    await queryRunner.query(`DROP TABLE "location"`);
    await queryRunner.query(`DROP TABLE "image"`);
  }
}
