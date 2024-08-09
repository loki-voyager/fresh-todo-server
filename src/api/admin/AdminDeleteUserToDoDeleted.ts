import { Request, Response } from "express";
import ToDoDeleted from "../../models/ToDoDeleted";
import { validationResult } from "express-validator";

async function AdminDeleteUserToDoDeleted(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map((error) => error.msg);
      return res.status(400).send({ message: errorMsgs });
    }
    const { id } = req.body;

    const exist = await ToDoDeleted.findOne({ _id: id });
    if (!exist) {
      return res.status(400).send({
        message: `ToDo with id: ${id} not found:<`,
      });
    }

    const deleted = await ToDoDeleted.deleteOne({ _id: exist._id });

    if (!deleted.acknowledged) {
      return res.status(400).send({
        message: `Error while todo ${id} deleting :<`,
      });
    }

    res.send({ deleted: deleted.acknowledged });
  } catch (error) {
    console.log({ error });
  }
}

export { AdminDeleteUserToDoDeleted };
