import { dbConnection } from "./db.js";
import express from "express";
import cors from "cors";

const port = 5000;
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.get("/preguntas", async (req, res) => {
  res.send(await dbConnection());
});

app.listen(port, () => {
  console.log(`servidor iniciado en el puerto: ${port}`);
});
