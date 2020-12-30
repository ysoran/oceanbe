import { IPort } from "../../interfaces/interfaces";
const { Dataset } = require("data.js");
const readline = require("readline");
const path = "https://datahub.io/core/un-locode/datapackage.json";

export const fillPorts = async () => {
  const portArray: Array<IPort> = [];
  try {
    const dataset = await Dataset.load(path);
    for (const id in dataset.resources) {
      if (dataset.resources[id]._descriptor.name === "code-list") {
        const file = dataset.resources[id];
        const stream = await file.stream();
        const readLine = readline.createInterface({
          input: stream,
          crlfDelay: Infinity,
        });
        for await (const line of readLine) {
          const content = line.split(",");
          const type = content[7].slice(0, 1);
          if (type === "1") {
            portArray.push({
              country_code: content[1],
              city_code: content[2],
              name: content[3],
              location: content[10],
              value: line,
            });
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
  return portArray;
};
