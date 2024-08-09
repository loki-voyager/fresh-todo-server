import { Request, Response } from "express";
import User from "../../models/User";
import { validationResult } from "express-validator";

async function AdminGetOneUser(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map((error) => error.msg);
      return res.status(400).send({ message: errorMsgs });
    }

    const { id } = req.body;
    const user = await User.findOne({ _id: id });
    let exist = await User.findOne({ _id: id });
    if (!exist) {
      return res.status(400).send({
        message: `User with id: ${id} not found :<`,
      });
    }
    res.send({ user });
  } catch (error) {
    console.log({ error });
  }
}

export { AdminGetOneUser };
