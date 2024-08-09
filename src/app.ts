import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { router } from "./router";
import bodyParser from 'body-parser';
import { config } from "./config";

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cors());
app.use("/", router);

let server: any;

export const start = async () => {
  return new Promise<void>((resolve, reject) => {
    server = app.listen(config.port, async () => {
      try {
        console.log({ "Express server running at port": Number(config.port) });
        await mongoose.connect(config.todo_uri).then(async () => {
          const collections = await mongoose.connection.db.listCollections().toArray();
          console.log({ "Collections:": collections.map((col) => col.name) });
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
};

export const stop = async () => {
  return new Promise<void>((resolve) => {
    if (server) {
      server.close(() => {
        console.log("Server closed");
        resolve();
      });
    } else {
      resolve();
    }
  });
};

export default app;
