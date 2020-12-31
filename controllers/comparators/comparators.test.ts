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
