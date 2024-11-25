import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { ICustomer } from "../../database/models";
import { CustomersProvider } from "../../database/providers/customers";
import { validation } from "../../shared/middleware";

type IBodyProps = Omit<ICustomer, "id">;

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required(),
    })
  ),
}));

export const create = async (
  req: Request<object, object, ICustomer>,
  res: Response
) => {
  const result = await CustomersProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
