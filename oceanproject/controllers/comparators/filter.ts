import { calculatePortCoordinates } from "../util/util";
import {
  compareType,
  compareIdle,
  compareTime,
  comparePort,
  compareDistance,
} from "../comparators/comparators";
import { IShipInterface, IPort } from "../../interfaces/interfaces";

//each.LATITUDE- LONGITUDE / 600000 removed - human readable format

const compareDistanceWrapper = (
  each: IShipInterface,
  port_lng: number,
  port_lat: number,
  dist: number
): boolean => {
  let result: boolean | any =
    port_lng !== 99999 &&
    port_lat !== 99999 &&
    each.LATITUDE &&
    each.LONGITUDE &&
    compareDistance(dist, each.LATITUDE, each.LONGITUDE, port_lat, port_lng);

  return result;
};

const compareTimeAndPortWrapper = (
  each: IShipInterface,
  startDate: string,
  endDate: string,
  portFullData: IPort
): boolean => {
  let result: boolean | any =
    each.DEST !== "" &&
    compareTime(startDate, endDate, each.ETA) &&
    comparePort(each.DEST, portFullData);
  return result;
};

export const filterShips = (
  shipData: Array<IShipInterface>,
  startDate: string,
  endDate: string,
  portFullData: IPort,
  dist: number,
  includeIdleVessels: boolean
): Array<IShipInterface> => {
  let filterData: Array<IShipInterface> = [];

  const { port_lat, port_lng } = calculatePortCoordinates(portFullData);
  filterData = shipData
    .filter((each: IShipInterface) =>
      compareIdle(each.DEST, includeIdleVessels)
    )
    .filter(
      (each: IShipInterface) =>
        compareType(each.TYPE) &&
        (compareTimeAndPortWrapper(each, startDate, endDate, portFullData) ||
          compareDistanceWrapper(each, port_lng, port_lat, dist))
    );

  return filterData;
};
