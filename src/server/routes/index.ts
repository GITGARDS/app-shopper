import { Router } from "express";
import {
  CustomersController,
  estimate,
  estimateValidation,
  MotoristasController,
} from "../controllers";

const router = Router();

router.get("/", (_, res) => {
  return res.send("APP-SHOPPER");
});

router.post("/ride/estimate", estimateValidation, estimate);

router.get(
  "/motoristas",
  MotoristasController.getAllValidation,
  MotoristasController.getAll
);
router.post(
  "/motoristas",
  MotoristasController.createValidation,
  MotoristasController.create
);
router.get(
  "/motoristas/:id",
  MotoristasController.getByIdValidation,
  MotoristasController.getById
);
router.put(
  "/motoristas/:id",
  MotoristasController.updateByIdValidation,
  MotoristasController.updateById
);
router.delete(
  "/motoristas/:id",
  MotoristasController.deleteByIdValidation,
  MotoristasController.deleteById
);

router.get(
  "/customers",
  CustomersController.getAllValidation,
  CustomersController.getAll
);
router.post(
  "/customers",
  CustomersController.createValidation,
  CustomersController.create
);
router.get(
  "/customers/:id",
  CustomersController.getByIdValidation,
  CustomersController.getById
);
router.put(
  "/customers/:id",
  CustomersController.updateByIdValidation,
  CustomersController.updateById
);
router.delete(
  "/customers/:id",
  CustomersController.deleteByIdValidation,
  CustomersController.deleteById
);

export { router };

