import { readFileSync } from "fs";
import { parse } from "../index";

jest.mock("fs");

describe("CSV Parser", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should parse a valid CSV file", () => {
    (readFileSync as jest.Mock).mockReturnValue("name,age\nAlice,30\nBob,25");

    const result = parse("dummy.csv");
    expect(result).toEqual([
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
    ]);
  });

  it("should handle an empty file", () => {
    (readFileSync as jest.Mock).mockReturnValue("");

    const result = parse("dummy.csv");
    expect(result).toEqual([]);
  });

  it("should handle a CSV file with only one line of data (no headers)", () => {
    (readFileSync as jest.Mock).mockReturnValue("Alice,30");

    const result = parse("dummy.csv");
    expect(result).toEqual([{ column1: "Alice", column2: 30 }]);
  });

  it("should handle a CSV file with missing values by filling with empty strings", () => {
    (readFileSync as jest.Mock).mockReturnValue("name,age\nAlice\nBob,25");

    const result = parse("dummy.csv");
    expect(result).toEqual([
      { name: "Alice", age: 0 },
      { name: "Bob", age: 25 },
    ]);
  });

  it("should use a custom delimiter", () => {
    (readFileSync as jest.Mock).mockReturnValue("name|age\nAlice|30\nBob|25");

    const result = parse("dummy.csv", "|");
    expect(result).toEqual([
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
    ]);
  });
});
