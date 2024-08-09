import request from "supertest";
import app from "../../src/app";

export const ownerTakeAdminRoleTest = async ({
  token,
  username,
}: {
  token: string;
  username: string;
}) => {
  await request(app)
    .post("/OwnerTakeTheAdminRole")
    .set({ Authorization: `Bearer ${token}` })
    .send({
      username,
    })
    .then((res) => {
      res.status !== 200 &&
        console.log({ error: res.body.message, status: res.status });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("edited");
    });
};
