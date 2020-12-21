const { doesNotMatch } = require("assert");
const request = require("supertest");
const app = require("../index");
describe("Get endpoints", () => {
  it("should create a new resp", async () => {
    const res = await request(app).get("/getPorts").send();
    expect(res.statusCode).toEqual(200);
    expect(res).toHaveProperty("header");
  });
});

describe("Post endpoints", () => {
  it("should create a new resp", async () => {
    const res = await request(app)
      .get("/getShips")
      .then((res) => {
        expect(res.statusCode).toEqual(404);
      });

    await request(app)
      .post("/getShips")
      .set("Content-type", "application/json")
      .send({
        params: {
          distance: "12333",
          endDate: "Mon Dec 21 2020 08:23:57 GMT+0300",
          includeIdleVessels: false,
          port: "Istanbul",
          startDate: "Fri Dec 18 2020 08:23:57 GMT+0300",
        },
      })
      .then((res) => {
        expect(res.statusCode).toEqual(500);
        expect(res.text).toEqual(
          '{"status":{},"message":"Something wrong with reading ships"}'
        );
      });
  });
});
