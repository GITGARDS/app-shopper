import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IMotorista } from "../../models";

export const updateById = async (
  id: number,
  cidade: Omit<IMotorista, "id">
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.motorista)
      .update(cidade)
      .where("id", "=", id);

    if (result > 0) return;

    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
  }
};
