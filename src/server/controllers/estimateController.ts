import axios from "axios";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { IEstimate } from "../database/models/estimate";
import { validation } from "../shared/middleware";

interface IBodyProps extends IEstimate {}

export const estimateValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      customer_id: yup.string().required(),
      origin: yup.string().required(),
      destination: yup.string().required(),
    })
  ),
}));

export const estimate = async (
  req: Request<object, object, IEstimate>,
  res: Response
) => {
  const { origin, destination } = req.body;

  if (origin === destination) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error_description:
        "Os dados fornecidos no corpo da requisição são inválidos",
    });
  }

  try {
    const response = await axios.get(String(process.env.DIRECTIONS_URL), {
      params: {
        origin,
        destination,
        key: String(process.env.GOOGLE_API_KEY),
      },
    });

    const rota = response.data.routes[0].legs[0];

    const retorno = {
      origin: {
        latitude: rota.start_location.lat,
        longitude: rota.start_location.lng,
      },
      destination: {
        latitude: rota.end_location.lat,
        longitude: rota.end_location.lng,
      },
      distance: rota.distance.value,
      duration: rota.duration.text,
      options: [
        {
          id: 0,
          name: "",
          description: "",
          vehicle: "",
          review: {
            rating: 0,
            comment: "",
          },
          value: 0,
        },
      ],
      routeResponse: response.data,
    };

    console.log("response", retorno);
    // return res
    //   .status(StatusCodes.OK)
    //   .json({ valor: "Operação realizada com sucesso" });

    return res.status(StatusCodes.OK).json(retorno);
    // return res.status(StatusCodes.OK).json(rota);
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.BAD_REQUEST).json({
      error_description:
        "Os dados fornecidos no corpo da requisição são inválidos",
    });
  }
};
