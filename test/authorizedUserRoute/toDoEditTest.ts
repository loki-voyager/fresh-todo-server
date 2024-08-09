import request from "supertest";
import app from "../../src/app";

export const toDoEditTest = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  await request(app)
    .post("/ToDoEdit")
    .set({ Authorization: `Bearer ${token}` })
    .send({
      id,
      body: "edited test todo post from jest user 'test'",
    })
    .then((res) => {
      res.status !== 200 &&
        console.log({ error: res.body.message, status: res.status });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("edited");
    });
};
