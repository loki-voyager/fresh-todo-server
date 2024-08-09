import { Request, Response } from "express";
import User from "../../models/User";
import { validationResult } from "express-validator";

async function UserDelete(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map((error) => error.msg);
      return res.status(400).send({ message: errorMsgs });
    }

    const { data, decodedToken } = req.body;
    let exist = await User.findOne({
      $or: [{ username: data }, { email: data }],
    });
    if (!exist) {
      return res.status(400).send({
        message: `User with username or email ${data} not found :<`,
      });
    }

    if (exist._id.toString() !== decodedToken.id) {
      return res.status(400).send({
        message: `You are not the owner of the account ${data} :<`,
      });
    }

    const deleted = await User.deleteOne({ _id: exist._id });

    if (!deleted.acknowledged) {
      return res.status(400).send({
        message: `Error while user ${data} deleting :<`,
      });
    }

    res.send({ deleted: deleted.acknowledged });
  } catch (error) {
    console.log({ error });
    res.status(500).send({ message: "Server error :<" });
  }
}

export { UserDelete };
