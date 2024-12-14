import { expect, describe, it } from "vitest";

// eslint-disable-next-line vitest/valid-title
describe("", () => {});

describe("my cool test", () => {
  it("doesn't require hints for a test with a single snapshot", () => {
    expect(2).toMatchSnapshot();
  });

  it("requires hints for a test with multiple snapshots", () => {
    expect(1).toMatchSnapshot("a cool hint");
    // eslint-disable-next-line vitest/prefer-snapshot-hint
    expect(2).toMatchSnapshot();
  });
});
