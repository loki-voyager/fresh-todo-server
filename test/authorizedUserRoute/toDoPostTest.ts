import request from "supertest";
import app from "../../src/app";

export const toDoPostTest = async ({ token }: { token: string }) => {
  await request(app)
    .post("/ToDoPost")
    .set({ Authorization: `Bearer ${token}` })
    .send({ body: "test todo post from jest #1 user 'test'" })
    .then((res) => {
      res.status !== 200 &&
        console.log({ error: res.body.message, status: res.status });
      expect(res).toBe;
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("task");
    });

  await request(app)
    .post("/ToDoPost")
    .set({ Authorization: `Bearer ${token}` })
    .send({ body: "test todo post from jest #2 user 'test'" })
    .then((res) => {
      res.status !== 200 &&
        console.log({ error: res.body.message, status: res.status });
      expect(res).toBe;
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("task");
    });
  await request(app)
    .post("/ToDoPost")
    .set({ Authorization: `Bearer ${token}` })
    .send({ body: "test todo post from jest #3 user 'test'" })
    .then((res) => {
      res.status !== 200 &&
        console.log({ error: res.body.message, status: res.status });
      expect(res).toBe;
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("task");
    });

  await request(app)
    .post("/ToDoPost")
    .set({ Authorization: `Bearer ${token}` })
    .send({ body: "test todo post from jest #4 user 'test'" })
    .then((res) => {
      res.status !== 200 &&
        console.log({ error: res.body.message, status: res.status });
      expect(res).toBe;
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("task");
    });

  await request(app)
    .post("/ToDoPost")
    .set({ Authorization: `Bearer ${token}` })
    .send({ body: "test todo post from jest #5 user 'test'" })
    .then((res) => {
      res.status !== 200 &&
        console.log({ error: res.body.message, status: res.status });
      expect(res).toBe;
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("task");
    });
};
