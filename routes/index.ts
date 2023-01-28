import { Router } from "express";

export const router = Router();

router.get("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  res.json({});
});
