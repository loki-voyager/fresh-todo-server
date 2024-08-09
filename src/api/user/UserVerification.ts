import { Request, Response } from "express";
import Verification from "../../models/Verification";
import { compareSync, hashSync } from "bcrypt";
import { generateAccessToken } from "../../function/GenerateAccessToken";
import { validationResult } from "express-validator";

async function UserVerification(req: Request, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map((error) => error.msg);
      return res.status(400).send({ message: errorMsgs });
    }
    
    const { email, username, code } = req.body;

    if (!email || !username) {
      return res
        .status(400)
        .send({ message: "Email and username are required." });
    }

    const exist = await Verification.findOne({ email });

    if (!exist || !exist.code) {
      return res.status(400).send({
        message: `User with email ${email} for verification not found :<`,
      });
    }

    const checkPass = compareSync(code, exist.code);

    if (!checkPass) {
      return res.status(400).send({ message: "Incorrect code :<" });
    }

    const token = await generateAccessToken({
      id: exist._id,
      roles: ["candidateForRegistration"],
    });
    res.send({ tokenForRegistration: token });
  } catch (error) {
    console.log({ error });
  }
}

export { UserVerification };
