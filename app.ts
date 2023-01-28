import express from "express";

import { router } from "./routes";

const init = () => {
  const port = process.env.PORT ?? 8000;

  const app = express();

  app.use(express.json());

  app.use("/", router);

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
};

init();
