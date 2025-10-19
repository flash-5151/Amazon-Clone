import { formatCurrency } from "../../scripts/utils/money.js";
describe("Test suit:formatCurrency", () => {
  it("converts cents  into dollars", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });
  it("works wit 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  it("rounds up the nearest cents", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });
});
