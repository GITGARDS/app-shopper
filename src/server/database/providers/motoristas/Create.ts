import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IMotorista } from "../../models";

export const create = async (
  cidade: Omit<IMotorista, "id">
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.motorista)
      .insert(cidade)
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
