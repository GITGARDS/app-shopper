import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  return res.send("APP-SHOPPER");
});

export { router };

