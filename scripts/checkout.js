import { renderOrderSummery } from "./checkout/orderSummary.js";
import { renderPaymentSummery } from "./checkout/paymentSummery.js";
import { renderHeader } from "./checkout/header.js";
// import "../data/cart-class.js";
// import "../data/backend-practice.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

async function loadPage() {
  try {
    // throw "error1"
    await loadProductsFetch();
    const value = await new Promise((resolve, reject) => {
      //throw "error2"
      loadCart(() => {
        // reject("error3")
        resolve("value 2");
      });
    });
  } catch (error) {
    console.log("error");
  }

  renderHeader();
  renderOrderSummery();
  renderPaymentSummery();
}
loadPage();
/*
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
*/

// loadProducts(() => {
//   renderHeader();
//   renderOrderSummery();
//   renderPaymentSummery();
// });
