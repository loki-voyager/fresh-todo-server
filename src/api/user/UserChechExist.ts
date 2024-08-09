import { Request, Response } from "express";
import User from "../../models/User";
import { validationResult } from "express-validator";

async function UserChechExist(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map((error) => error.msg);
      return res.status(400).send({ message: errorMsgs });
    }

    const { username, email } = req.body;
    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res
        .status(400)
        .send({ message: `User with username: ${username} already exist :<` });
    }
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res
        .status(400)
        .send({ message: `User with email: ${email} already exist :<` });
    }
    res.send({ exist: false });
  } catch (error) {
    console.log({ error });
  }
}

export { UserChechExist };
