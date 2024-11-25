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

    const motoristas = [
      {
        id: 1,
        name: "Homer Simpson",
        description:
          "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
        vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
        review: {
          rating: 1,
          comment:
            "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
        },
        value: (rota.distance.value / 1000) * 2.5,
      },
      {
        id: 2,
        name: "Dominic Toretto",
        description:
          "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada",
        vehicle: "Dodge Charger R/T 1970 modificado",
        review: {
          rating: 4.5,
          comment:
            "Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
        },
        value: (rota.distance.value / 1000) * 5,
      },
      {
        id: 3,
        name: "James Bond",
        description:
          "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem",
        vehicle: "Aston Martin DB5 clássico",
        review: {
          rating: 5.5,
          comment:
            "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
        },
        value: (rota.distance.value / 1000) * 10,
      },
    ];

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
      options: motoristas,
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
