import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { formatCurrency } from "../scripts/utils/money.js";

export const orders = JSON.parse(localStorage.getItem("orders")) || [];
console.log("All orders:", orders);

export function addOrder(order) {
  orders.unshift(order);
  localStorage.setItem("orders", JSON.stringify(orders));
}
let totalItems = 0;
orders.forEach((order) => {
  order.items.forEach((item) => {
    totalItems += item.quantity;
  });
});
localStorage.setItem("totalItems", JSON.stringify(totalItems));
document.addEventListener("DOMContentLoaded", () => {
  renderOrders();
});
export function renderOrders() {
  let ordersHTML = "";

  orders.forEach((order) => {
    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div class="order-placed-date">
                ${dayjs(order.orderDate).format("MMMM D")}
              </div>
            </div>

            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div class="order-amount">
                $${formatCurrency(order.totalCents)}
              </div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Items:</div>
            <div class="order-items-count">${order.items.reduce(
              (sum, item) => sum + item.quantity,
              0
            )}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${order.items
            .map(
              (item) => `
            <div class="product-image-container">
              <img src="${item.image}" />
            </div>

            <div class="product-details">
              <div class="product-name">${item.name}</div>

              <div class="product-delivery-date">
                Arriving on: ${dayjs(item.arrivingDate).format("dddd, MMMM D")}
              </div>

              <div class="product-quantity">
                Quantity: ${item.quantity}
              </div>
              
              <button class="buy-again-button button-primary js-buy-again ">
                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${
                item.productId
              }">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  });

  document.querySelector(".js-orders-grid").innerHTML = ordersHTML;
  document.querySelector(".js-cart-quantity").innerHTML = totalItems;
  document.querySelectorAll(".js-buy-again").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.href = "checkout.html";
    });
  });
}
