import { Request, Response } from "express";
import User from "../../models/User";
import { validationResult } from "express-validator";

async function UserPic(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map((error) => error.msg);
      return res.status(400).send({ message: errorMsgs });
    }

    const { data } = req.body;
    let exist = await User.findOne({
      $or: [{ username: data }, { email: data }],
    });
    if (!exist) {
      res.send({ pic: [] });
    } else res.send({ pic: exist.pic });
  } catch (error) {
    console.log({ error });
  }
}

export { UserPic };
