import { Request, Response } from "express";
import ToDo from "../../models/ToDo";
import ToDoCompleted from "../../models/ToDoCompleted";
import { validationResult } from "express-validator";

async function ToDoComplete(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map((error) => error.msg);
      return res.status(400).send({ message: errorMsgs });
    }

    const { id, decodedToken } = req.body;
    let exist = await ToDo.findOne({ _id: id });
    if (!exist) {
      return res.status(400).send({
        message: `ToDo with id: ${id} not found:<`,
      });
    }

    if (exist.userId.toString() !== decodedToken.id) {
      return res.status(400).send({
        message: `You are not owner of todo:<`,
      });
    }

    const completedExist = await ToDoCompleted.findOne({ _id: id });
    if (completedExist) {
      return res.status(400).send({
        message: `Todo with this id: ${id} has already been complite:<`,
      });
    }

    const movingToCompleted = await ToDoCompleted.create({
      body: exist.body,
      pic: exist.pic,
      status: exist.status,
      userId: exist.userId,
      generated: exist.date,
      todoId: exist._id,
    });

    if (!movingToCompleted) {
      return res.status(400).send({
        message: `Error while todo ${id} moving to completed todo :<`,
      });
    }

    const completed = await ToDo.deleteOne({ _id: exist._id });

    if (!completed.acknowledged) {
      return res.status(400).send({
        message: `Error while todo ${id} compliting :<`,
      });
    }

    res.send({ completed: completed.acknowledged });
  } catch (error) {
    console.log({ error });
    res.status(500).send({ message: "Server error :<" });
  }
}

export { ToDoComplete };
