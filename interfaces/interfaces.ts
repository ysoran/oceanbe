interface IShipInterface {
  MMSI: number;
  TIME: string;
  LONGITUDE: number;
  LATITUDE: number;
  COG: number;
  SOG: number;
  HEADING: number;
  ROT: number;
  NAVSTAT: number;
  IMO: number;
  NAME: string;
  CALLSIGN: string;
  TYPE: number;
  A: number;
  B: number;
  C: number;
  D: number;
  DRAUGHT: number;
  DEST: string;
  ETA: string;
}

interface IPort {
  name: string;
  country_code: string;
  city_code: string;
  location: string;
  value: string;
}

export { IShipInterface, IPort };
