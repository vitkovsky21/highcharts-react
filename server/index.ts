import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import express from "express";

import { startBackWithBase } from "./db";

import chartRouter from './app/routes/chart.routes';

const app = express();

var corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/chart", chartRouter);

startBackWithBase();
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to an application." });
  console.log(req);
});

const port = Number(process.env.SERVER_PORT) || 3001;
app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
