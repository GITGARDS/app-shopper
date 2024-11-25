import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { IMotorista } from "../../database/models";
import { MotoristasProvider } from "../../database/providers/motoristas";
import { validation } from "../../shared/middleware";

type IBodyProps = Omit<IMotorista, "id">;

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required(),
      descricao: yup.string().required(),
      carro: yup.string().required(),
      avaliacao: yup.string().required(),
      taxa: yup.number().required(),
      kmMinimo: yup.number().required(),
    })
  ),
}));

export const create = async (
  req: Request<object, object, IMotorista>,
  res: Response
) => {
  const result = await MotoristasProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
