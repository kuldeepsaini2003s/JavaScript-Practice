let products;
let cartItems = [];

function getCartItems() {
  const existingCartItems = localStorage.getItem("cartItems");

  if (existingCartItems) {
    cartItems = JSON.parse(existingCartItems);
  } else {
    cartItems = [];
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
}

async function renderProducts() {
  const productsGrid = document.getElementById("products-grid");
  productsGrid.innerHTML = "";
  const data = await fetch("https://fakestoreapi.com/products");
  products = await data.json();

  products && products?.length > 0
    ? products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList = "product-card";
        productCard.innerHTML = `        
          <div class="product-image">
            <img src="${product?.image}" alt="${product?.title}" />
          </div>
          <div class="product-info">
            <div class="product-category">${product?.category}</div>
            <h3 class="product-name">${product?.title}</h3>
            <div class="product-price-section">
              <div class="product-price">$${product?.price.toFixed(2)}</div>
            </div>
            <button
              class="add-to-cart-btn"
              onclick="addToCart(${product?.id})"
            >
              <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg></span> Add to Cart
            </button>
          </div>`;
        productsGrid.appendChild(productCard);
      })
    : `<p>Loading...</p>}`;
  updateCart();
}

async function addToCart(productId) {
  const product = products.find((item) => item.id === productId);

  const existingItem = cartItems?.find((item) => item.id === product.id);

  if (existingItem) {
    alert("product already added to cart!");
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }
  updateCart();
}

function removeFromCart(productId) {
  cartItems = cartItems.filter((item) => item.id !== productId);
  updateCart();
}

function updateQuantity(productId, quantity) {
  const item = cartItems.find((item) => item.id === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
    updateCart();
  }
}

function updateCart() {
  const cartContainer = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const emptyCartMessage = document.getElementById("empty-cart-message");
  cartContainer.innerHTML = "";
  if (cartItems.length === 0) {
    emptyCartMessage.style.display = "block";
    cartCount.innerHTML = cartItems.length;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    cartContainer.innerHTML = "";
    cartContainer.appendChild(emptyCartMessage);
    return;
  }

  emptyCartMessage.style.display = "none";

  cartItems.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList = "cart-item";
    cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.title}</div>
                        <div class="cart-item-price">$${(
                          item.price * item.quantity
                        ).toFixed(2)}</div>
                        <div class="cart-item-controls">
                            <div class="qty-control">
                                <button class="qty-btn" onclick="updateQuantity(${
                                  item.id
                                }, ${item.quantity - 1})">-</button>
                                <input type="number" class="qty-input" value="${
                                  item.quantity
                                }" min="1" 
                                       onchange="updateQuantity(${
                                         item.id
                                       }, parseInt(this.value))">
                                <button class="qty-btn" onclick="updateQuantity(${
                                  item.id
                                }, ${item.quantity + 1})">+</button>
                            </div>
                            <button class="remove-btn" onclick="removeFromCart(${
                              item.id
                            })">Remove</button>
                        </div>
                    </div>
                `;
    cartContainer.appendChild(cartItem);
  });
  cartCount.innerHTML = cartItems.length;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

document.addEventListener("DOMContentLoaded", function () {
  renderProducts();
  getCartItems();
});
