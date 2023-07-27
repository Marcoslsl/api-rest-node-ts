import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Teste");
});

router.post("/", (req, res) => {
  console.log(req.body);
  return res.status(StatusCodes.CREATED).json(req.body);
});

export { router };
