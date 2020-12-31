import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  automock: false,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node", "css"],
};

export default config;
