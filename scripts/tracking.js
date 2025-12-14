import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export function renderTrackingPage() {
  const totalItems = JSON.parse(localStorage.getItem("totalItems"));
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");
  let ordersHTML = "";
  orders.forEach((order) => {
    if (order.id === orderId) {
      order.items.forEach((item) => {
        if (item.productId === productId) {
          const isDelivered = dayjs(item.arrivingDate).isSame(dayjs(), "day");
          ordersHTML = `
            <div class="order-tracking">
              <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
              </a>

              <div class="delivery-date">Arriving On ${dayjs(
                item.arrivingDate
              ).format("dddd, MMMM D")}</div>

              <div class="product-info">
                ${item.name}
              </div>

              <div class="product-info">Quantity: ${item.quantity}</div>

              <img
                class="product-image"
                src="${item.image}"
              />
              <div class="progress-labels-container">
                <div class="progress-label">Shipped</div>
                <div class="progress-label ${
                  isDelivered ? "" : "current-status"
                }">In progrss</div>
                <div class="progress-label ${
                  isDelivered ? "current-status" : ""
                }">Delivered</div>
              </div>

              <div class="progress-bar-container">
                <div class=${
                  isDelivered ? "progress-bar-full" : "progress-bar-half"
                }></div>
              </div>

            </div>

      `;
        }
      });
    }
  });

  document.querySelector(".main").innerHTML = ordersHTML;
  document.querySelector(".js-cart-quantity").innerHTML = totalItems;
}
renderTrackingPage();
