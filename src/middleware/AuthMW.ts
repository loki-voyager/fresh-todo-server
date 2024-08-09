import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

function AuthMW(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).send({ message: "User is not authorized :<" });
    }
    const decoded = jwt.verify(token, config.key_secret);

    req.body.decodedToken = decoded;

    next();
  } catch (error) {
    console.log({ error });
    return res.status(400).send({ message: "User is not authorized :<" });
  }
}

export { AuthMW };
