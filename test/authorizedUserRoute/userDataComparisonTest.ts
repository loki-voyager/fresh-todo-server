import request from 'supertest';
import app from '../../src/app';

export const userDataComparisonTest = async({token}:{token:string})=>{
    await request(app)
    .post("/UserDataComparison")
    .set({ Authorization: `Bearer ${token}` })
    .then((res) => {
      res.status !== 200 &&
        console.log({ error: res.body.message, status: res.status });
      expect(res).toBe;
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("user");
    })
}