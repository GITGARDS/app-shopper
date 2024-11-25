import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { MotoristasProvider } from "../../database/providers/motoristas";
import { validation } from "../../shared/middleware";

interface IQueryProps {
  id?: yup.Maybe<number | undefined>;
  page?: yup.Maybe<number | undefined>;
  limit?: yup.Maybe<number | undefined>;
  filter?: yup.Maybe<string | undefined>;
}
export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().notRequired().moreThan(0),
      limit: yup.number().notRequired().moreThan(0),
      id: yup.number().integer().notRequired().default(0),
      filter: yup.string().notRequired(),
    })
  ),
}));

export const getAll = async (
  req: Request<object, object, object, IQueryProps>,
  res: Response
) => {
  const result = await MotoristasProvider.getAll(
    req.query.page || 1,
    req.query.limit || 7,
    req.query.filter || "",
    Number(req.query.id)
  );
  const count = await MotoristasProvider.count(String(req.query.filter));

  console.log("idUsuario", req.headers.idUsuario);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message },
    });
  }

  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", count);

  return res.status(StatusCodes.OK).json(result);
};
