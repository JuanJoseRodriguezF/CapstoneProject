// jest.config.ts
import type { Config } from "jest";

const config: Config = {
  projects: [
    {
      displayName: "dom",
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
      transform: {
        "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
      },
      moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" },
      testMatch: ["**/__tests__/storage.test.ts", "**/__tests__/recommender.test.ts"],
    },
    {
      displayName: "node",
      testEnvironment: "node",
      transform: {
        "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
      },
      moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" },
      testMatch: ["**/__tests__/api.*.test.ts"],
    },
  ],
};

export default config;
