import request from "supertest";
import app from "../../src/app";

export const signInTest = async ({
  data,
  password,
}: {
  data: string;
  password: string;
}) => {
  await request(app)
    .post("/SignIn")
    .send({
      data,
      password,
    })
    .then((res) => {
      res.status !== 200 &&
        console.log({ error: res.body.message, status: res.status });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("user");
    });
};
