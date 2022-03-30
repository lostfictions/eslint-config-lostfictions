// eslint-disable-next-line jest/valid-title
describe("", () => {});

describe("my cool test", () => {
  it("doesn't require hints for a test with a single snapshot", () => {
    expect(2).toMatchSnapshot();
  });

  it("requires hints for a test with multiple snapshots", () => {
    expect(1).toMatchSnapshot("a cool hint");
    expect(2).toMatchSnapshot();
  });
});
