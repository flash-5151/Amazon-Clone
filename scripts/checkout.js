import { renderOrderSummery } from "./checkout/orderSummary.js";
import { renderPaymentSummery } from "./checkout/paymentSummery.js";
import { renderHeader } from "./checkout/header.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";
import { loadProducts } from "../data/products.js";
loadProducts(() => {
  renderHeader();
  renderOrderSummery();
  renderPaymentSummery();
});
