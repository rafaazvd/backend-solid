import { MigrationInterface, QueryRunner, Table } from "typeorm";

          export class CreateProduct1611942204779 implements MigrationInterface {

          public async up(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.createTable(
            new Table({
            name: 'products',
            columns: [
              {
                name: 'id',
                type: 'varchar',
                isPrimary: true,
              },
              {
                name: 'title',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'type',
                type: 'varchar',
              },
              {
                name: 'description',
                type: 'varchar',
              },
              {
                name: 'filename',
                type: 'varchar',
              },
              {
                name: 'height',
                type: 'integer',
              },
              {
                name: 'width',
                type: 'integer',
              },
              {
                name: 'price',
                type: 'decimal',
              },
              {
                name: 'rating',
                type: 'integer',
              },
              {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
              },
              {
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
              },
            ],
          }),
          );
          }

          public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropTable('products');
          }

          }
