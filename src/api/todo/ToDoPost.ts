import { Request, Response } from "express";
import User from "../../models/User";
import ToDo from "../../models/ToDo";
import { validationResult } from "express-validator";

async function ToDoPost(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map((error) => error.msg);
      return res.status(400).send({ message: errorMsgs });
    }

    const { decodedToken, body, pic } = req.body;
    const task = await ToDo.create({ userId: decodedToken.id, body, pic });
    res.send({ task });
  } catch (error) {
    console.log({ error });
  }
}

export { ToDoPost };