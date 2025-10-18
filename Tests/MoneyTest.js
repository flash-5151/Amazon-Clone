import { formatCurrency } from "../scripts/utils/money.js";
console.log("Test suits:");
console.log("testing with base case:");

if (formatCurrency(1095) === "10.95") {
  console.log("passed");
} else {
  console.log("not passed!");
}
console.log("testing with edge case:");

if (formatCurrency(2000.4) === "20.00") {
  console.log("passed");
} else {
  console.log("not passed!");
}
