import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 90000,
  globals: {
    // when we are testing we want to use a slightly different config
    // to allow for jest types
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
      useESM: true,
    },
  },
};

export default config;
