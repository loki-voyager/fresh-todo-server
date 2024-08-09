import jwt from "jsonwebtoken";
import { config } from "../config";
import { Types } from "mongoose";

async function generateAccessToken({
  id,
  roles
}: {
  id: Types.ObjectId;
  roles?: String[];
  username?:String;
}) {
  const payload = {
    id,
    roles
  };
  return jwt.sign(payload,config.key_secret,{expiresIn:"24h"})
}

export { generateAccessToken };
