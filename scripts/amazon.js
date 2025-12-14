import { cart, addToCart } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";

const renderDetails = document.querySelector(".js-products-grid");
renderDetails.innerHTML = "Loading...";
renderDetails.style.display = "flex";
renderDetails.style.justifyContent = "center";
renderDetails.style.alignItems = "center";
renderDetails.style.minHeight = "300px"; // important for vertical centering
renderDetails.style.fontSize = "20px";
renderDetails.style.fontWeight = "500";

loadProducts(() => {
  renderProductsGrid();
});

function renderProductsGrid() {
  let productsHTML = "";
  products.forEach((product) => {
    productsHTML += `
  <div class="product-container"> 
    <div class="product-image-container">
      <img
        class="product-image"
        src="${product.image}"
      />
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars" src="${product.getStarsUrl()}" />
      <div class="product-rating-count link-primary">${
        product.rating.count
      }</div>
    </div>

    <div class="product-price">${product.getPrice()}</div>

    <div class="product-quantity-container">
      <select>
        <option selected value="1">
          1
        </option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

      ${product.extraInfoHtml()}

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png" />
      Added
    </div>
      <p class="js-add-animation-${product.id}"></p>
    <button class="add-to-cart-button button-primary js-add-to-cart"
    data-product-id="${product.id}" >Add to Cart</button>
  </div>
`;
  });
  renderDetails.innerHTML = productsHTML;
  renderDetails.innerHTML = productsHTML;

  // reset layout back to grid
  renderDetails.style.display = "grid";
  renderDetails.style.justifyContent = "";
  renderDetails.style.alignItems = "";
  renderDetails.style.minHeight = "";

  function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  }

  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      const p = document.querySelector(
        `.js-add-animation-${button.dataset.productId}`
      );
      p.innerHTML = `Added`;
      p.style.marginBottom = "5px";
      p.style.display = "flex";
      p.style.alignItems = "center";
      p.style.justifyContent = "center";
      p.style.color = "white";
      p.style.backgroundColor = "green";
      p.style.fontSize = "16px";
      p.style.border = "0px";
      p.style.borderRadius = "50px";
      p.style.height = "30px";
      addToCart(productId);
      updateCartQuantity();
      setTimeout(() => {
        p.innerHTML = "";
        p.style.display = "none";
      }, 1000);
    });
  });
}
