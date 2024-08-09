import { Request, Response } from "express";
import ToDoDeleted from "../../models/ToDoDeleted";
import ToDoCompleted from "../../models/ToDoCompleted";
import { validationResult } from "express-validator";

async function ToDoDeleteCompleted(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map((error) => error.msg);
      return res.status(400).send({ message: errorMsgs });
    }

    const { id, decodedToken } = req.body;
    const exist = await ToDoCompleted.findOne({ _id: id });
    if (!exist) {
      return res.status(400).send({
        message: `ToDo with id: ${id} not found:<`,
      });
    }

    const _id = exist?._id;
    const userId = exist?.userId;
    const body = exist?.body;
    const pic = exist?.pic;
    const status = exist?.status;
    const generated = exist?.generated;

    if (userId && userId.toString() !== decodedToken.id) {
      return res.status(400).send({
        message: `You are not owner of todo:<`,
      });
    }

    const deletedToDoExist = await ToDoDeleted.findOne({ deletedToDoId: id });

    if (deletedToDoExist) {
      return res.status(400).send({
        message: `Todo with this id: ${id} has already been deleted:<`,
      });
    }

    const movingToDeleted = await ToDoDeleted.create({
      body: body,
      pic: pic,
      status: status,
      userId: userId,
      generated: generated,
    });

    if (!movingToDeleted) {
      return res.status(400).send({
        message: `Error while todo ${id} moving to deleted todo :<`,
      });
    }

    const deleted = await ToDoCompleted.deleteOne({ _id: _id });

    if (deleted && !deleted.acknowledged) {
      if (!deleted.acknowledged) {
        return res.status(400).send({
          message: `Error while todo ${id} deleting :<`,
        });
      }
    }

    deleted && res.send({ deleted: deleted.acknowledged });
  } catch (error) {
    console.log({ error });
    res.status(500).send({ message: "Server error :<" });
  }
}

export { ToDoDeleteCompleted };
