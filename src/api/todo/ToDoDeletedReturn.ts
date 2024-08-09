import { Request, Response } from "express";
import ToDo from "../../models/ToDo";
import ToDoDeleted from "../../models/ToDoDeleted";
import { validationResult } from "express-validator";

async function ToDoDeletedReturn(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map((error) => error.msg);
      return res.status(400).send({ message: errorMsgs });
    }

    const { id, decodedToken } = req.body;
    let exist = await ToDoDeleted.findOne({ _id: id });
    if (!exist) {
      return res.status(400).send({
        message: `Deleted ToDo with id: ${id} not found :<`,
      });
    }

    if (exist.userId.toString() !== decodedToken.id) {
      return res.status(400).send({
        message: `You are not the owner of the ToDo ${exist._id} :<`,
      });
    }

    const todoExist = await ToDo.findOne({ _id: exist._id });
    if (todoExist) {
      return res.status(400).send({
        message: `Todo with this id: ${id} has already been returned to todo:<`,
      });
    }

    const returned = await ToDo.create({
      body: exist.body,
      date: exist.generated,
      userId: exist.userId,
      status: exist.status,
      pic: exist.pic,
    });

    if (!returned) {
      return res.status(400).send({
        message: `Error while todo ${id} returned to todo :<`,
      });
    }

    const deletecompleted = await ToDoDeleted.deleteOne({ _id: exist._id });

    if (!deletecompleted.acknowledged) {
      return res.status(400).send({
        message: `Error while todo ${id} compliting :<`,
      });
    }

    res.send({ todo: returned });
  } catch (error) {
    console.log({ error });
    res.status(500).send({ message: "Server error :<" });
  }
}

export { ToDoDeletedReturn };
