import { Knex } from "knex";

import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.customer, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome").index().notNullable();
      table.comment(`Tabela usada para armazenar ${ETableNames.customer}s do sistema.`);
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.customer}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.customer).then(() => {
    console.log(`# Dropped table ${ETableNames.customer}`);
  });
}
