import Moment from "moment";
import { IPort } from "../../interfaces/interfaces";

const compareTime = (startDate: string, endDate: string, eta: string) => {
  let m = eta.slice(0, 2);
  let d = eta.slice(3, 5);
  let h = eta.slice(6, 8);
  let mi = eta.slice(9, 11);
  let currentMonth = Moment().month();
  let shipArrivalDate = undefined;
  if (currentMonth > parseInt(m)) {
    shipArrivalDate = Moment(
      (m === "00" ? Moment().month() : m) +
        "-" +
        (m === "00" ? Moment().date() : d) +
        "-" +
        (Moment().year() + 1) +
        " " +
        (h === "24" ? Moment().hour() : h) +
        ":" +
        (mi === "60" ? Moment().minute() : mi),
      "MM-DD-YYYY hh:mm"
    );
  } else {
    shipArrivalDate = Moment(
      (m === "00" ? Moment().month() : m) +
        "-" +
        (d === "00" ? Moment().date() : d) +
        "-" +
        Moment().year() +
        " " +
        (h === "24" ? Moment().hour() : h) +
        ":" +
        (mi === "60" ? Moment().minute() : mi),
      "MM-DD-YYYY hh:mm"
    );
  }
  let suitable = false;
  try {
    suitable =
      Moment(startDate).isSameOrBefore(shipArrivalDate) &&
      Moment(endDate).isSameOrAfter(shipArrivalDate);
    return suitable;
  } catch (err) {
    return suitable;
  }
};

const compareIdle = (dest: string, includeIdleVessels: boolean) => {
  return includeIdleVessels || (dest !== "" && dest !== "0" && dest !== "-");
};

const comparePort = (portName: string, port: IPort) => {
  let code = port.country_code + " " + port.city_code;
  return (
    (portName.length > 1 &&
      portName.length < 4 &&
      (portName.includes(code) || code.includes(portName))) ||
    (port.name &&
      port.name.toLowerCase().trim().includes(portName.toLowerCase().trim())) ||
    (code &&
      code.toLowerCase().trim().includes(portName.toLowerCase().trim())) ||
    (port.name && portName.length > 5 && portName.includes(port.name))
  );
};

const compareType = (type: number) => {
  return String(type).charAt(0) === "8";
};

const compareDistance = (
  dist: number,
  lat: number,
  lng: number,
  port_lat: number,
  port_lng: number
): boolean => {
  const R = 3958.8; // Radius of the Earth in miles
  let rlat1 = lat * (Math.PI / 180); // Convert degrees to radians
  let rlat2 = port_lat * (Math.PI / 180); // Convert degrees to radians
  let difflat = rlat2 - rlat1; // Radian difference (latitudes)
  let difflon = (port_lng - lng) * (Math.PI / 180); // Radian difference (longitudes)

  let d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return dist - d > 0;
};

export { compareTime, compareIdle, comparePort, compareType, compareDistance };
