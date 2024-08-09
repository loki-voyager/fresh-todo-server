import { Request, Response } from "express";
import User from "../../models/User";
import { validationResult } from "express-validator";

async function AdminUserDelete(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map((error) => error.msg);
      return res.status(400).send({ message: errorMsgs });
    }

    const { id } = req.body;
    let exist = await User.findOne({ _id: id });
    if (!exist) {
      return res.status(400).send({
        message: `User with id: ${id} not found :<`,
      });
    }
    if (exist.roles.includes("admin") || exist.roles.includes("owner")) {
      return res.status(400).send({
        message: `You can't delete admin :<`,
      });
    }
    const deleted = await User.deleteOne({ _id: exist._id });

    if (!deleted.acknowledged) {
      return res.status(400).send({
        message: `Error while user ${id} deleting :<`,
      });
    }

    res.send({ deleted: deleted.acknowledged });
  } catch (error) {
    console.log({ error });
    res.status(500).send({ message: "Server error :<" });
  }
}

export { AdminUserDelete };
