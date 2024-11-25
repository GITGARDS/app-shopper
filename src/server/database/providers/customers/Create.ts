import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICustomer } from "../../models";

export const create = async (
  customer: Omit<ICustomer, "id">
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.customer)
      .insert(customer)
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao cadastrar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao cadastrar o registro");
  }
};
