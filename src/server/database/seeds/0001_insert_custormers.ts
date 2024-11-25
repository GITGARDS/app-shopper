import { Knex } from "knex";

import { ETableNames } from "../ETableNames";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.customer).count<
    [{ count: number }]
  >("* as count");
  if (!Number.isInteger(count) || Number(count) > 0) return;

  const customerToInsert = customer;
  await knex(ETableNames.customer).insert(customerToInsert);
};

const customer = [
  {
    nome: "Customers1",
  },
  {
    nome: "Customer2",
  },
  {
    nome: "Customer3",
  },
];
