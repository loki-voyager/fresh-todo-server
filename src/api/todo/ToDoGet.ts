import { Request, Response } from "express";
import User from "../../models/User";
import ToDo from "../../models/ToDo";

async function ToDoGet(req: Request, res: Response) {
  try {
    const { decodedToken, page, limit } = req.body;

    if (page === undefined || limit === undefined || page <= 0 || limit <= 0) {
      return res.status(400).send({
        message: "Page and Limit must be greater than 0.",
      });
    }

    const totalCount = await ToDo.countDocuments({ userId: decodedToken.id });
    const pages = Math.ceil(totalCount / limit) || 1;
    let skip;
    if (pages == 1) skip = 0;
    else skip = (page - 1) * limit;
    const todos = await ToDo.find({ userId: decodedToken.id })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);
    res.status(200).send({ todos, totalCount, pages });
  } catch (error) {
    console.log({ error });
  }
}

export { ToDoGet };
