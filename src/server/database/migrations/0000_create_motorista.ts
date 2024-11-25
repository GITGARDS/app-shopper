import { Knex } from "knex";

import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.motorista, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome").index().notNullable();
      table.string("descricao").notNullable();
      table.string("carro").notNullable();
      table.string("avaliacao").notNullable();
      table.double("taxa").notNullable();
      table.double("kmMinimo").notNullable();
      table.comment("Tabela usada para armazenar motoristas do sistema.");
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.motorista}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.motorista).then(() => {
    console.log(`# Dropped table ${ETableNames.motorista}`);
  });
}
