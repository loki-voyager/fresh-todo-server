import request from "supertest";
import app from "../../src/app";

export const adminGetOneUserTest = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  const res = await request(app)
    .post("/AdminGetOneUser")
    .set({ Authorization: `Bearer ${token}` })
    .send({
      id,
    });

  res.status !== 200 &&
    console.log({ error: res.body.message, status: res.status });

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("user");

  const user = res.body.user;

  return user;
};
