import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICustomer } from "../../models";

export const updateById = async (
  id: number,
  cidade: Omit<ICustomer, "id">
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.customer)
      .update(cidade)
      .where("id", "=", id);

    if (result > 0) return;

    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
  }
};
