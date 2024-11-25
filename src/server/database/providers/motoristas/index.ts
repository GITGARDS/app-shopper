import * as count from "./Count";
import * as create from "./Create";
import * as deleteById from "./DeleteById";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as updateById from "./UpdateById";

export const MotoristasProvider = {
  ...deleteById,
  ...updateById,
  ...getById,
  ...create,
  ...getAll,
  ...count,
};
