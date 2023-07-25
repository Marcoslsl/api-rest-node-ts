import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Teste");
});

router.post("/", (req, res) => {
  console.log(req.body);
  return res.send("Teste");
});

export { router };
