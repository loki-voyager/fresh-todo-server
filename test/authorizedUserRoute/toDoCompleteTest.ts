import request from "supertest";
import app from "../../src/app";

export const toDoCompleteTest = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  await request(app)
    .post("/ToDoComplete")
    .set({ Authorization: `Bearer ${token}` })
    .send({
      id,
    })
    .then((res) => {
      res.status !== 200 &&
        console.log({ error: res.body.message, status: res.status });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("completed");
    });
};
