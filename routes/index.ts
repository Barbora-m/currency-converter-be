import { Router } from "express";
import axios from "axios";

const RATES_URL =
  "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt";

export const router = Router();

router.get("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  try {
    const { data } = await axios.get<string>(RATES_URL);

    const rows = data.split("\n").filter(Boolean);

    const [date, order] = rows.shift()!.split(" #");

    rows.shift();

    const rates = rows.map((row) => {
      const [country, currency, amount, code, rate] = row.split("|");

      return {
        country,
        currency,
        amount: Number(amount),
        code,
        rate: parseFloat(rate),
      };
    });

    res.json({ date, order: Number(order), rates });
  } catch (error) {
    console.error(error);

    res.status(500).send((error as Error).message)
  }
});
