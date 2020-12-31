const application = require("../index");
const request = require("supertest");
const fs = require("fs");

const MOCK_FILE_INFO = [
  {
    MMSI: 371372000,
    TIME: "2020-12-19 21:32:27 GMT",
    LONGITUDE: -131.15151,
    LATITUDE: 54.38891,
    COG: 135.8,
    SOG: 2.8,
    HEADING: 163,
    ROT: 0,
    NAVSTAT: 0,
    IMO: 9660035,
    NAME: "MALTO HOPE",
    CALLSIGN: "3FDP4",
    TYPE: 70,
    A: 144,
    B: 25,
    C: 19,
    D: 8,
    DRAUGHT: 5.5,
    DEST: "CA PRR",
    ETA: "12-19 14:00",
  },
];

afterEach((done) => {
  application.server.close();
  done();
});

describe("Get endpoints", () => {
  it("should create a new resp", async (done) => {
    const mockfs = await jest.spyOn(fs, "readFileSync");
    done();
    mockfs.mockImplementation(() => JSON.stringify(MOCK_FILE_INFO));
    const res = await request(application.app).get("/getPorts");
    expect(res.statusCode).toEqual(200);
    expect(res).toHaveProperty("header");
  });
});

describe("Post endpoints", () => {
  it("should create a new resp", async (done) => {
    const res1 = await request(application.app)
      .get("/getShips")
      .then(() => {
        done();
      });
    expect(res1).toEqual(undefined);
    const res = await request(application.app)
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
      .then(() => {
        done();
      });

    expect(res.statusCode).toEqual(300);
  });
});
