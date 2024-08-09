import { Request, Response } from "express";
import User from "../../models/User";
import ToDoCompleted from "../../models/ToDoCompleted";
import { validationResult } from "express-validator";

async function AdminGetUserToDoCompleted(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map((error) => error.msg);
      return res.status(400).send({ message: errorMsgs });
    }

    const { userId, page, limit } = req.body;
    if (page === undefined || limit === undefined || page <= 0 || limit <= 0) {
      return res.status(400).send({
        message: "Page and Limit must be greater than 0.",
      });
    }
    const exist = await User.findOne({ _id: userId });
    if (!exist) {
      return res.status(400).send({
        message: `User with id: ${userId} not found :<`,
      });
    }

    const totalCount = await ToDoCompleted.countDocuments({ userId });
    const pages = Math.ceil(totalCount / limit) || 1;
    let skip;
    if (pages == 1) skip = 0;
    else skip = (page - 1) * limit;
    const todos = await ToDoCompleted.find({ userId })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);
    res.status(200).send({ todos, totalCount, pages });
  } catch (error) {
    console.log({ error });
  }
}

export { AdminGetUserToDoCompleted };
