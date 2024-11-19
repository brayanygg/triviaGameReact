import { dbConnection } from "./db.js";
import express from "express";

const port = 5000;

const app = express();

app.get("/preguntas", async (req, res) => {
  res.send(await dbConnection());
});

app.listen(port, () => {
  console.log(`servidor iniciado en el puerto: ${port}`);
});
