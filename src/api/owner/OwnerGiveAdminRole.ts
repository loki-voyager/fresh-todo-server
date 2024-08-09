import { Request, Response } from "express";
import User from "../../models/User";
import { validationResult } from "express-validator";

async function OwnerGiveAdminRole(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map((error) => error.msg);
      return res.status(400).send({ message: errorMsgs });
    }
    
    const { username } = req.body;
    let exist = await User.findOne({
      $or: [{ username }],
    });
    if (!exist) {
      return res.status(400).send({
        message: `User with username  ${username} not found :<`,
      });
    }

    if (exist.roles.includes("admin")) {
      return res.status(400).send({
        message: `The user with username: ${username} is already an admin :<`,
      });
    }

    exist.set({
      roles: ["admin"],
    });

    await exist.save();

    res.send({ edited: exist });
  } catch (error) {
    console.log({ error });
    res.status(500).send({ message: "Server error :<" });
  }
}

export { OwnerGiveAdminRole };
