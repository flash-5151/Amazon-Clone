import { renderOrderSummery } from "./checkout/orderSummary.js";
import { renderPaymentSummery } from "./checkout/paymentSummery.js";
import { renderHeader } from "./checkout/header.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }).then(() => {
    renderHeader();
    renderOrderSummery();
    renderPaymentSummery();
  }),
]);

// loadProducts(() => {
//   renderHeader();
//   renderOrderSummery();
//   renderPaymentSummery();
// });
