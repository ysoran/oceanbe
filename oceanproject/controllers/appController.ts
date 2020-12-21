const fs = require("fs");
import { Request, Response } from "express";

import { IShipInterface, IPort } from "../interfaces/interfaces";
import { filterShips } from "./comparators/filter";
import { fillPorts } from "./util/fillPorts";

let portArray: Array<IPort>;
(async () => {
  portArray = await fillPorts();
})();

const findPort = (port: string) => {
  let data = {} as IPort;
  portArray.forEach((each: IPort) => {
    if (each.name === port) {
      data = each;
      return;
    }
  });
  return data;
};

const getShips = (req: Request, res: Response) => {
  try {
    let rawdata: string = fs.readFileSync(process.env.SHIP_DATA_URL);
    let shipData: Array<IShipInterface> = JSON.parse(rawdata);
    res.header("Access-Control-Allow-Origin", "*");
    let portFullData = findPort(req.body.params.port);
    let filteredData = filterShips(
      shipData,
      req.body.params.startDate,
      req.body.params.endDate,
      portFullData,
      req.body.params.distance,
      req.body.params.includeIdleVessels
    );
    res.json({ port: portFullData, ships: filteredData });
  } catch (err) {
    res.status(500).json({
      status: err,
      message: "Something wrong with reading ships",
    });
  }
};

const getPorts = async (req: Request, res: Response) => {
  try {
    res.json(portArray);
  } catch (err) {
    res.json({ err, message: "error" });
  }
};

export { getShips, getPorts };
