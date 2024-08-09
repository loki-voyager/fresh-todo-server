import { Request, Response } from "express";
import User from "../../models/User";
import { generateAccessToken } from "../../function/GenerateAccessToken";
import { validationResult } from "express-validator";

async function UserDataComparison(req: Request, res: Response) {
  try {
    const { decodedToken } = req.body;
    const exist = await User.findOne({ _id: decodedToken.id });
    if (!exist) {
      return res.status(400).send({
        message: `User from local not found :<`,
      });
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
  }
}

export { UserDataComparison };
