import { cart, addToCart } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";

const renderDetails = document.querySelector(".js-products-grid");

// Loader
renderDetails.innerHTML = `
  <div class="loader-container">
    <div class="spinner"></div>
  </div>
`;

loadProducts(() => {
  renderProductsGrid();
});

function renderProductsGrid() {
  let productsHTML = "";

  products.forEach((product) => {
    productsHTML += `
      <div class="product-container"> 
        <div class="product-image-container">
          <img class="product-image" src="${product.image}" />
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsUrl()}" />
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">${product.getPrice()}</div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            ${Array.from(
              { length: 10 },
              (_, i) => `
              <option value="${i + 1}" ${i === 0 ? "selected" : ""}>
                ${i + 1}
              </option>
            `
            ).join("")}
          </select>
        </div>

        ${product.extraInfoHtml()}

        <div class="product-spacer"></div>

        <p class="js-add-animation-${product.id}"></p>

        <button
          class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  renderDetails.innerHTML = productsHTML;

  attachAddToCartEvents();
  updateCartQuantity();
}

function attachAddToCartEvents() {
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;

      const quantitySelect = document.querySelector(
        `.js-quantity-selector-${productId}`
      );
      const quantity = Number(quantitySelect?.value) || 1;

      // ✅ Add to cart ONCE
      addToCart(productId, quantity);
      updateCartQuantity();

      // ✅ Animation
      const p = document.querySelector(`.js-add-animation-${productId}`);
      p.textContent = "Added";
      p.style.marginBottom = "5px";
      p.style.display = "flex";
      p.style.alignItems = "center";
      p.style.justifyContent = "center";
      p.style.color = "white";
      p.style.backgroundColor = "green";
      p.style.fontSize = "16px";
      p.style.borderRadius = "50px";
      p.style.height = "30px";

      setTimeout(() => {
        p.textContent = "";
        p.style.display = "none";
      }, 1000);
    });
  });
}

function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  const cartQuantityElement = document.querySelector(".js-cart-quantity");
  if (cartQuantityElement) {
    cartQuantityElement.textContent = cartQuantity;
  }
}

window.searchItem = () => {
  const raw_input = document.querySelector(".js-search-bar");
  let count = 0;
  const input = raw_input.value;
  products.forEach((product) => {
    if (input === product.name) {
      count++;
      renderDetails.innerHTML = `
      <div class="product-container"> 
        <div class="product-image-container">
          <img class="product-image" src="${product.image}" />
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsUrl()}" />
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">${product.getPrice()}</div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            ${Array.from(
              { length: 10 },
              (_, i) => `
              <option value="${i + 1}" ${i === 0 ? "selected" : ""}>
                ${i + 1}
              </option>
            `
            ).join("")}
          </select>
        </div>

        ${product.extraInfoHtml()}

        <div class="product-spacer"></div>

        <p class="js-add-animation-${product.id}"></p>

        <button
          class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
    }
  });
  if (count == 0) {
    renderDetails.innerHTML = "NOT FOUND";
  }
};
window.handleSearch = (event) => {
  if (event.key === "Enter") {
    searchItem();
  }
};
