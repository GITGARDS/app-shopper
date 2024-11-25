import { IMotorista } from "../../models/motorista";

declare module "knex/types/tables" {
  interface Tables {
    motorista: IMotorista;
  }
}
