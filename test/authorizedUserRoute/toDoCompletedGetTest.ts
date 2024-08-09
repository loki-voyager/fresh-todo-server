import request from "supertest";
import app from "../../src/app";

export const toDoCompletedGetTest = async ({ token }: { token: string }) => {
  const res = await request(app)
    .post("/ToDoCompletedGet")
    .set({ Authorization: `Bearer ${token}` })
    .send({
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
