import { cart, countQuantity } from "../../data/cart.js";
import { getproduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

let totalPrice = 0;
let totalCents = 0;
export function renderPaymentSummery() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {
    const product = getproduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  totalCents = totalBeforeTaxCents + taxCents;
  totalPrice = totalCents;
  const paymentSummeryHTML = `
  <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div>Items (${countQuantity()}):</div>
      <div class="payment-summary-money">$${formatCurrency(
        productPriceCents
      )}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(
        shippingPriceCents
      )}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(
        totalBeforeTaxCents
      )}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummeryHTML;

  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      const orderItems = cart.map((cartItem) => {
        const product = getproduct(cartItem.productId);
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

        const deliveryDate = dayjs()
          .add(deliveryOption.delivaryDays, "days")
          .toISOString();
        return {
          productId: product.id,
          name: product.name,
          image: product.image,
          priceCents: product.priceCents,
          quantity: cartItem.quantity,
          arrivingDate: deliveryDate,
        };
      });

      const orderData = {
        id: crypto.randomUUID(),
        items: orderItems,
        totalCents: totalCents,
        orderDate: dayjs().toISOString(),
      };

      try {
        await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart }),
        });

        addOrder(orderData); // ✅ SAVE FULL DETAILS
      } catch (error) {
        console.log("error");
      }

      window.location.href = "orders.html";
    });
}
