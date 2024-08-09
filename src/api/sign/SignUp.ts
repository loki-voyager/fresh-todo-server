import { Request, Response } from "express";
import User from "../../models/User";
import { validationResult } from "express-validator";
import { hashSync } from "bcrypt";

async function SignUp(req: Request, res: Response) {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res
        .status(400)
        .send({ message: "Error creating users :<", error });
    }
    const { username, password, roles, email,pic } = req.body;
    const approvedRoles = roles || ["user"];
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
    const hash = hashSync(password, Number(process.env.SALT));
    const user = await User.create({
      username,
      password: hash,
      email: email,
      roles: approvedRoles,
      pic
    });
    res.send({ user });
  } catch (error) {
    console.log({ error });
  }
}

export { SignUp };
