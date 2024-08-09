import { Request, Response } from "express";
import User from "../../models/User";
import { hashSync } from "bcrypt";
import { validationResult } from "express-validator";

type EditUserType = {
  oldUsername: string;
  username: string;
  password: string;
  email: string;
  pic: string[];
};

interface UserEditRequest extends Request {
  body: {
    user: EditUserType;
    decodedToken: {
      id: string;
    };
  };
}

async function UserEdit(req: UserEditRequest, res: Response) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMsgs = errors.array().map((error) => error.msg);
      return res.status(400).send({ message: errorMsgs });
    }

    const { user, decodedToken } = req.body;
    let exist = await User.findOne({
      $or: [{ username: user.oldUsername }],
    });

    if (!exist) {
      return res.status(400).send({
        message: `User with username or email ${user.oldUsername} not found :<`,
      });
    }

    if (exist._id.toString() !== decodedToken.id) {
      return res.status(400).send({
        message: `You are not the owner of the account ${user.oldUsername} :<`,
      });
    }

    const hash = hashSync(user.password, Number(process.env.SALT));

    exist.set({
      username: user.username,
      password: hash,
      email: user.email,
      pic: user.pic,
    });

    await exist.save();

    res.send({ edited: exist });
  } catch (error) {
    console.log({ error });
    res.status(500).send({ message: "Server error :<" });
  }
}

export { UserEdit };
export type { EditUserType };
