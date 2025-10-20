import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { products, getproduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummery } from "./paymentSummery.js";
import { renderHeader } from "./header.js";

export function renderOrderSummery() {
  let cartSummeryHTML = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getproduct(productId);
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.delivaryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummeryHTML += `<div class="cart-item-container
      js-cart-item-container
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">Delivery date: ${dateString}</div>

      <div class="cart-item-details-grid">
      <img
        class="product-image"
        src="${matchingProduct.image}"
      />

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">${matchingProduct.getPrice()}
          </div>
        <div class="product-quantity js-product-quantity-${matchingProduct.id}">
          <span>   <span class="quantity-label">${
            cartItem.quantity
          }</span> </span>
          <!-- Update -->
          <span class="update-quantity-link link-primary js-updating-${
            cartItem.productId
          }"

          >
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-link
          js-delete-link-${matchingProduct.id}" 
          data-product-id='${matchingProduct.id}'>
            Delete
          </span>
      </div>
      </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${delivaryOptionsHTML(matchingProduct, cartItem)}
        </div>
    </div>
  </div>
  `;
  });
  function delivaryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.delivaryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");
      const priceString =
        deliveryOption.priceCents == 0
          ? "FREE Shipping"
          : `$${formatCurrency(deliveryOption.priceCents)} -Shipping`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `<div class="delivery-option
              js-delivery-option"
              data-product-id='${matchingProduct.id}'
              data-delivery-option-id='${deliveryOption.id}'
              >
        <input
          type="radio"
          ${isChecked ? "checked" : ""} 
          class="delivery-option-input"
          name="${matchingProduct.id}"
        />
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString}</div>
        </div>
      </div>`;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummeryHTML;
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document
        .querySelector(`.js-cart-item-container-${productId}`)
        .remove();
      renderPaymentSummery();
      renderHeader();
    });
  });
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummery();
      renderPaymentSummery();
      renderHeader();
    });
  });
  let qty = document.querySelector(".quantity-label").innerHTML;
  function renderQty() {
    document.querySelector(".quantity-label").innerHTML = qty;
  }
  // update
  // document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  //   button.addEventListener("click", () => {
  //     const productId = button.dataset.productId;
  //     document.querySelector(
  //       `.js-add-animation-${button.dataset.productId}`
  //     ).innerHTML = `Added`;
  cart.forEach((cartItem) => {
    const updateButton = document.querySelector(
      `.js-updating-${cartItem.productId}`
    );
    updateButton.addEventListener("click", () => {
      const updateHTML = `
      <input class='js-input-box-${cartItem.productId}' type='number' value='${cartItem.quantity}' />
      <button class='js-save-button-${cartItem.productId} update-quantity-link link-primary'>Save</button>
    `;
      updateButton.innerHTML = updateHTML;

      const saveButton = document.querySelector(
        `.js-save-button-${cartItem.productId}`
      );
      saveButton.addEventListener("click", () => {
        const inputBox = document.querySelector(
          `.js-input-box-${cartItem.productId}`
        );
        const newQuantity = parseInt(inputBox.value, 10);

        if (isNaN(newQuantity) || newQuantity <= 0) {
          alert("Please enter a valid quantity.");
          return;
        }

        cartItem.quantity = newQuantity;

        localStorage.setItem("cart", JSON.stringify(cart));

        renderOrderSummery();
        renderPaymentSummery();
        renderHeader();
      });

      const inputBox = document.querySelector(
        `.js-input-box-${cartItem.productId}`
      );
      inputBox.focus();
    });
  });
}
