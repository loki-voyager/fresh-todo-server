import request from "supertest";
import app from "../../src/app";

export const userPicTest = async ({ token }: { token: string }) => {
  await request(app)
    .post("/UserPic")
    .set({ Authorization: `Bearer ${token}` })
    .send({ data: "test" })
    .then((res) => {
      res.status !== 200 &&
        console.log({ error: res.body.message, status: res.status });
      expect(res).toBe;
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("pic");
    });
};
