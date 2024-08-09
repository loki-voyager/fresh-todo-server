import { Request, Response } from "express";
import { compareSync, hashSync } from "bcrypt";
import User from "../../models/User";
import password_recovery from "../../models/PasswordRecovery";
import { validationResult } from "express-validator";

async function UserPasswordRecovery(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map((error) => error.msg);
      return res.status(400).send({ message: errorMsgs });
    }

    const { email, code, password } = req.body;

    if (!email || !code || !password) {
      return res
        .status(400)
        .send({
          message: "Incomplete data entered, email, code and password required",
        });
    }

    const exist = await password_recovery.findOne({ email });
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({
        message: `User with email ${email} not found :<`,
      });
    }
    if (!exist || !exist.code) {
      return res.status(400).send({
        message: `User with email ${email} for verification not found :<`,
      });
    }

    const checkPass = compareSync(code, exist.code);

    if (!checkPass) {
      return res.status(400).send({ message: "Incorrect code :<" });
    }

    const hash = hashSync(password, Number(process.env.SALT));

    user.set({
      password: hash,
    });

    await user.save();

    res.send({ user });
  } catch (error) {
    console.log({ error });
  }
}

export { UserPasswordRecovery };
