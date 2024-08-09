import request from "supertest";
import app from "../../src/app";

export const adminGetUserToDoCompletedTest = async ({
  token,
  id,
}: {
  token: string;
  id: string;
}) => {
  const res = await request(app)
    .post("/AdminGetUserToDoCompleted")
    .set({ Authorization: `Bearer ${token}` })
    .send({
      userId: id,
      page: 1,
      limit: 10,
    });

  res.status !== 200 &&
    console.log({ error: res.body.message, status: res.status });

  expect(res.status).toBe(200);
  expect(res.body).toHaveProperty("todos");

  const todos = res.body.todos;

  return todos;
};
