import { Request, Response } from "express";
import nodemailer from "nodemailer";
import Verification from "../../models/Verification";
import { hashSync } from "bcrypt";
import { generateAccessToken } from "../../function/GenerateAccessToken";
import { generateMessage } from "../../function/GenerateMessage";
import { validationResult } from "express-validator";

async function UserCreateVerification(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map((error) => error.msg);
      return res.status(400).send({ message: errorMsgs });
    }

    const { email, username } = req.body;

    if (!email || !username) {
      return res
        .status(400)
        .send({ message: "Email and username are required." });
    }

    const code = generateMessage(8);

    const exist = await Verification.findOne({
      $or: [{ username }, { email }],
    });


    if (exist) {
      await Verification.deleteOne({
        $or: [{ username }, { email }],
      });
    }

    const hash = hashSync(code, Number(process.env.SALT));
    const craeteVerState = await Verification.create({
      username,
      email,
      code: hash,
    });
    const token = await generateAccessToken({
      id: craeteVerState._id,
      roles: ["candidateForVerification"],
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
        subject: "Email Verification On FreshToDo",
        text: `Your verification code is: ${code}`,
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

export { UserCreateVerification };
