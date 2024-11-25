import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { AnyObject, Maybe, ObjectSchema, ValidationError } from "yup";

type TProperty = "body" | "header" | "params" | "query";

type TGetSChema = <T extends Maybe<AnyObject>>(
  schema: ObjectSchema<T>
) => ObjectSchema<T>;

type TAllSchemas = Record<TProperty, ObjectSchema<any>>;

type TAllGetSChemas = (getSchema: TGetSChema) => Partial<TAllSchemas>;

type TValidation = (getAllSchema: TAllGetSChemas) => RequestHandler;

export const validation: TValidation =
  (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas((schema) => schema);

    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).map(([key, schema]) => {
      try {
        schema.validateSync(req[key as TProperty], {
          abortEarly: false,
        });
      } catch (err) {
        const yupError = err as ValidationError;
        const errors: Record<string, string> = {};
        yupError.inner.map((error) => {
          if (error.path !== undefined) {
            errors[error.path] = error.message;
          }
        });
        errorsResult[key] = errors;
      }
    });

    if (Object.entries(errorsResult).length === 0) {
      return next();
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error_description:
          "Os dados fornecidos no corpo da requisição são inválidos",
      });
    }
  };
