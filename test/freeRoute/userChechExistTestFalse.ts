import request from "supertest";
import app from "../../src/app";

export const userChechExistTestFalse = async ({
  username,
  email,
}: {
  username: string;
  email: string;
}) => {
  await request(app)
    .post("/UserChechExist")
    .send({
      username,
      email,
    })
    .then((res) => {
      res.status !== 200 &&
        console.log({ error: res.body.message, status: res.status });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("exist");
    });
};
