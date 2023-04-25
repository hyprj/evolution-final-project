import { isField, isWinningValue, normalizeField, sumNumbers } from "./utils";

describe("isField", () => {
  it("should return true for numeric fields", () => {
    expect(isField(1)).toBe(true);
  });

  it("should return true for numeric fields", () => {
    expect(isField(0)).toBe(true);
  });

  it("should return true for numeric fields", () => {
    expect(isField(36)).toBe(true);
  });

  it("should return true for non-numeric fields", () => {
    expect(isField("red")).toBe(true);
  });

  it("should return false for invalid fields", () => {
    expect(isField("invalid")).toBe(false);
  });

  it("should return false for invalid fields", () => {
    expect(isField("split")).toBe(false);
  });

  it("should return false for invalid fields", () => {
    expect(isField("line")).toBe(false);
  });
});

describe("normalizeField", () => {
  it("Should return unchanged value", () => {
    expect(normalizeField(1)).toBe(1);
  });

  it("should convert '1' to to number 1", () => {
    expect(normalizeField("1")).toBe(1);
  });

  it("Should return unchanged value", () => {
    expect(normalizeField("split_1-2")).toBe("split_1_2");
  });

  it("Should throw error for invalid field", () => {
    expect(normalizeField("44")).toThrowError();
  });

  it("should throw error for invalid field", () => {
    expect(normalizeField("invalidsplit")).toThrowError();
  });
});

describe("isWinningValue", () => {
  it("should return true for winning numeric value", () => {
    expect(isWinningValue(0, 0)).toBe(true);
  });
  it("should return true for winning line value", () => {
    expect(isWinningValue("line_1-6", 5)).toBe(true);
  });
  it("should return true for split winning value", () => {
    expect(isWinningValue("split_35-36", 35)).toBe(true);
  });
  it("should return true for corner winning value", () => {
    expect(isWinningValue("corner_16-20", 17)).toBe(true);
  });
  it("should return false for losing numeric value", () => {
    expect(isWinningValue(4, 3)).toBe(false);
  });
  it("should return false for losing column value", () => {
    expect(isWinningValue("1-34", 2)).toBe(false);
  });
});

describe("sumNumbers", () => {
  it("Should return valid value", () => {
    expect(sumNumbers([])).toBe(0);
  });
  it("Should return valid value", () => {
    expect(sumNumbers([10])).toBe(10);
  });
  it("Should return valid value", () => {
    expect(sumNumbers([0, 0, 0])).toBe(0);
  });
  it("Should return valid value", () => {
    expect(sumNumbers([1, 2, 3])).toBe(6);
  });
  it("Should return valid value", () => {
    expect(sumNumbers([0, 11, 0, 2])).toBe(13);
  });
});
