import request from "supertest";
import app from "../../src/app";

export const userEditTest = async ({ token }: { token: string }) => {
  await request(app)
    .post("/UserEdit")
    .set({ Authorization: `Bearer ${token}` })
    .send({
      user: {
        oldUsername: "test",
        username: "string",
        password: "qweqwe",
        email: "muvmaker@gmail.com",
        pic: [],
      },
    })
    .then((res) => {
      res.status !== 200 &&
        console.log({ error: res.body.message, status: res.status });
      expect(res).toBe;
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("edited");
    });

  await request(app)
    .post("/UserEdit")
    .set({ Authorization: `Bearer ${token}` })
    .send({
      user: {
        oldUsername: "string",
        username: "test",
        password: "qweqwe",
        email: "muvmaker@gmail.com",
        pic: [],
      },
    })
    .then((res) => {
      res.status !== 200 &&
        console.log({ error: res.body.message, status: res.status });
      expect(res).toBe;
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("edited");
    });
};
