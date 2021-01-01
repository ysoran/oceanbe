import {
  compareTime,
  compareIdle,
  comparePort,
  compareType,
  compareDistance,
} from "./comparators";
import Moment from "moment";

test("compareTime works", () => {
  let timeIsSuitable = compareTime(
    Moment(new Date().toISOString()).format("MM/DD/YY").toString(),
    Moment(new Date().toISOString())
      .add(3, "day")
      .format("MM/DD/YY")
      .toString(),
    Moment(new Date().toISOString()).add(2, "day").format("MM/DD/YY").toString()
  );
  expect(timeIsSuitable).toBe(true);
});

test("compareTime fails with wrong input", () => {
  let timeIsSuitable = compareTime(
    Moment(new Date().toISOString()).format("MM/DD/YY").toString(),
    Moment(new Date().toISOString())
      .add(3, "day")
      .format("MM/DD/YY")
      .toString(),
    Moment(new Date().toISOString()).add(5, "day").format("MM/DD/YY").toString()
  );
  expect(timeIsSuitable).toBe(false);
});

test("comparePort function works", () => {
  let port = {
    name: "london",
    country_code: "england",
    city_code: "ln",
    location: "ln",
    value: "ln",
  };
  let result = comparePort("london", port);
  let result2 = comparePort("new york", port);
  expect(result).toBe(true);
  expect(result2).toBe(false);
});
