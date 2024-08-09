import { generateAccessToken } from "../../src/function/GenerateAccessToken";
import User from "../../src/models/User";

export const takeToken = async ({ username }: { username: string }) => {
  const ownerUser = await User.findOne({ username });
  if (ownerUser) {
    return await generateAccessToken({
      id: ownerUser._id,
      roles: ownerUser.roles,
    });
  }
  return "";
};
