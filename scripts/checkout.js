import { renderOrderSummery } from "./checkout/orderSummary.js";
import { renderPaymentSummery } from "./checkout/paymentSummery.js";
import { renderHeader } from "./checkout/header.js";
import "../data/cart-oop.js";

renderHeader();
renderOrderSummery();
renderPaymentSummery();
console.log("loadded");
