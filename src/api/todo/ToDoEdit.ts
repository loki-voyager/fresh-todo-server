import { Request, Response } from "express";
import ToDo from "../../models/ToDo";
import { validationResult } from "express-validator";

async function ToDoEdit(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map((error) => error.msg);
      return res.status(400).send({ message: errorMsgs });
    }
    
    const { id, decodedToken, body, pic } = req.body;
    let exist = await ToDo.findOne({ _id: id });
    if (!exist) {
      return res.status(400).send({
        message: `ToDo with id: ${id} not found :<`,
      });
    }

    if (exist.userId.toString() !== decodedToken.id) {
      return res.status(400).send({
        message: `You are not the owner of the ToDo ${exist._id} :<`,
      });
    }

    exist.set({
      body,
      pic,
    });

    await exist.save();

    res.send({ edited: exist });
  } catch (error) {
    console.log({ error });
    res.status(500).send({ message: "Server error :<" });
  }
}

export { ToDoEdit };
