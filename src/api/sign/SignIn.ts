import { Request, Response } from "express";
import User from "../../models/User";
import { compareSync } from "bcrypt";
import { generateAccessToken } from "../../function/GenerateAccessToken";
import { validationResult } from "express-validator";

async function SignIn(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map((error) => error.msg);
      return res.status(400).send({ message: errorMsgs });
    }

    const { data, password } = req.body;
    let exist = await User.findOne({
      $or: [{ username: data }, { email: data }],
    });
    if (!exist) {
      return res.status(400).send({
        message: `User with username or email ${data} not found :<`,
      });
    }
    const checkPass = compareSync(password, exist.password);
    if (!checkPass) {
      return res.status(400).send({ message: "Incorrect password :<" });
    }
    const token = await generateAccessToken({
      id: exist._id,
      roles: exist.roles,
    });
    const userWithToken = {
      ...exist.toObject(),
      token,
    };
    res.send({ user: userWithToken });
  } catch (error) {
    console.log({ error });
    res.status(500).send({ message: "Server error :<" });
  }
}

export { SignIn };
