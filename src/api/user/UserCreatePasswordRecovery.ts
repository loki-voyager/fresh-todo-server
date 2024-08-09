import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { hashSync } from "bcrypt";
import { generateAccessToken } from "../../function/GenerateAccessToken";
import { generateMessage } from "../../function/GenerateMessage";
import password_recovery from "../../models/PasswordRecovery";
import User from "../../models/User";
import { validationResult } from "express-validator";

async function UserCreatePasswordRecovery(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map((error) => error.msg);
      return res.status(400).send({ message: errorMsgs });
    }

    const { email } = req.body;

    if (!email) {
      return res.status(400).send({ message: "Email are required." });
    }

    const code = generateMessage(8);

    const exist = await password_recovery.findOne({ email });
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: `User with email: ${email} not found` });
    }

    if (exist) {
      await password_recovery.deleteOne({ email });
    }

    const hash = hashSync(code, Number(process.env.SALT));
    const craeteVerState = await password_recovery.create({
      username: user.username,
      email,
      code: hash,
    });
    const token = await generateAccessToken({
      id: craeteVerState._id,
      roles: ["candidateForPasswordRecovery"],
    });
    const craeteVerStateWithToken = {
      ...craeteVerState.toObject(),
      token,
    };
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "9heathcliff@gmail.com",
        pass: "irct zgzq tzyr pfmm",
      },
    });

    let info;
    try {
      info = await transporter.sendMail({
        from: '"Owner of FreshToDo" <9heathcliff@gmail.com>',
        to: email,
        subject: "Password Recovery On FreshToDo",
        text: `Your code for password recovery: ${code}`,
      });
    } catch (sendError) {
      return res.status(400).send({
        message: "Failed to send email.",
      });
    }

    if (info.rejected.length > 0) {
      return res.status(400).send({
        message: `Failed to send email to ${info.rejected.join(", ")}`,
      });
    }

    res.status(200).send({ craeteVerStateWithToken });
  } catch (error) {
    console.log({ error });
  }
}

export { UserCreatePasswordRecovery };
