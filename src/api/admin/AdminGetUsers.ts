import { Request, Response } from "express";
import User from "../../models/User";
import { validationResult } from "express-validator";

async function AdminGetUsers(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map((error) => error.msg);
      return res.status(400).send({ message: errorMsgs });
    }

    const { page, limit } = req.body;
    const totalCount = await User.countDocuments();
    const pages = Math.ceil(totalCount / limit) || 1;
    let skip;
    if (pages == 1) skip = 0
    else skip = (page - 1) * limit;
    const users = await User.find()
    .sort({date:-1 })
    .skip(skip)
    .limit(limit);
    res.status(200).send({ users, totalCount, pages });
  } catch (error) {
    console.log({ error });
  }
}

export { AdminGetUsers };
