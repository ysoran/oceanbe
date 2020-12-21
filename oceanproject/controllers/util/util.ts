import { IPort } from "../../interfaces/interfaces";
export const calculatePortCoordinates = (portFullData: IPort) => {
  let port_lat: number = 99999;
  let port_lng: number = 99999;
  if (portFullData.location && String(portFullData.location).trim() !== "") {
    let portCoordinates = portFullData.location.split(" ");
    let first = portCoordinates[0];
    let second = portCoordinates[1];
    if (first.length === 5) {
      port_lat = parseInt(first.slice(0, 2)) + parseInt(first.slice(2, 4)) / 60;
    } else if (first.length === 6) {
      port_lng = parseInt(first.slice(0, 3)) + parseInt(first.slice(3, 5)) / 60;
    }
    if (second.length === 5) {
      port_lat =
        parseInt(second.slice(0, 2)) + parseInt(second.slice(2, 4)) / 60;
    } else if (second.length === 6) {
      port_lng =
        parseInt(second.slice(0, 3)) + parseInt(second.slice(3, 5)) / 60;
    }
  }
  return { port_lat, port_lng };
};
