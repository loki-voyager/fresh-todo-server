import { Request, Response } from "express";
import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

type DecodedToken = {
  id: String;
  roles: string[];
  iat: number;
  exp: number;
};

function RoleMW(roles: String[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        if (roles[0] == "candidateForRegistration") {
          return res.status(400).send({ message: "You are not a candidate for registration :<" });
        } else {
          return res.status(400).send({ message: "User is not authorized :<" });
        }
      }
      const decoded = jwt.verify(token, config.key_secret);
      const { roles: rolesFromToken } = decoded as DecodedToken;
      let access = false;
      rolesFromToken.forEach((role: string) => {
        if (roles.includes(role)) {
          access = true;
        }
      });
      if (!access) {
        return res.status(400).send({ message: "You don't have access :<" });
      }
      next();
    } catch (error) {
      console.log({ error });
      return res.status(400).send({ message: "User is not authorized :<" });
    }
  };
}

export { RoleMW };
