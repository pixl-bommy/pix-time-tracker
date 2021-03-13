var IGNORE_PATTERNS = ["/node_modules/", "/dist/"];

module.exports = {
   preset: "ts-jest",
   testEnvironment: "jsdom",
   coverageDirectory: "./.reports/coverage",
   collectCoverageFrom: ["**/*.ts", "**/*.tsx"],
   coveragePathIgnorePatterns: IGNORE_PATTERNS,
   testMatch: ["**/*.test.ts", "**/*.test.tsx"],
   testPathIgnorePatterns: IGNORE_PATTERNS,
   moduleNameMapper: {
      "@/(.*)": ["<rootDir>/src/$1"],
      "\\.(scss|css)$": "<rootDir>/mocks/stylesheet.mock.js",
   },
};
