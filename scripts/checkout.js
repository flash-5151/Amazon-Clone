import { renderOrderSummery } from "./checkout/orderSummary.js";
import { renderPaymentSummery } from "./checkout/paymentSummery.js";
import { renderHeader } from "./checkout/header.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";

Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve();
    }),
      new Promise((resolve) => {
        loadCart(() => {
          resolve();
        });
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
