import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { IMotorista } from "../../database/models";
import { MotoristasProvider } from "../../database/providers/motoristas";
import { validation } from "../../shared/middleware";

interface IParamProps {
  id?: number;
}

type IBodyProps = Omit<IMotorista, "id">;

export const updateByIdValidation = validation((getSchema) => ({
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
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const updateById = async (
  req: Request<IParamProps, object, IBodyProps>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.',
      },
    });
  }

  const result = await MotoristasProvider.updateById(req.params.id, req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
