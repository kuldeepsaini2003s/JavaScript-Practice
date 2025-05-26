// Product data
const products = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    category: "Audio",
    price: 149.99,
    image: "/api/placeholder/250/180?text=Headphones",
  },
  {
    id: 2,
    name: "Ultra-Slim Laptop",
    category: "Computers",
    price: 999.99,
    image: "/api/placeholder/250/180?text=Laptop",
  },
  {
    id: 3,
    name: "Smart Watch Series 5",
    category: "Wearables",
    price: 299.99,
    image: "/api/placeholder/250/180?text=Smartwatch",
  },
  {
    id: 4,
    name: "Wireless Gaming Mouse",
    category: "Accessories",
    price: 79.99,
    image: "/api/placeholder/250/180?text=Mouse",
  },
  {
    id: 5,
    name: "4K Ultrawide Monitor",
    category: "Displays",
    price: 449.99,
    image: "/api/placeholder/250/180?text=Monitor",
  },
  {
    id: 6,
    name: "Mechanical Gaming Keyboard",
    category: "Accessories",
    price: 129.99,
    image: "/api/placeholder/250/180?text=Keyboard",
  },
  {
    id: 7,
    name: "Portable Bluetooth Speaker",
    category: "Audio",
    price: 89.99,
    image: "/api/placeholder/250/180?text=Speaker",
  },
  {
    id: 8,
    name: "Graphic Tablet",
    category: "Accessories",
    price: 199.99,
    image: "/api/placeholder/250/180?text=Tablet",
  },
  {
    id: 9,
    name: "Wireless Earbuds",
    category: "Audio",
    price: 119.99,
    image: "/api/placeholder/250/180?text=Earbuds",
  },
];

// Cart data
let cart = [];

// Render products
function renderProducts() {
  const productsGrid = document.getElementById("products-grid");
  productsGrid.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-price-section">
                            <div class="product-price">$${product.price.toFixed(
                              2
                            )}</div>
                        </div>
                        <button class="add-to-cart-btn" onclick="addToCart(${
                          product.id
                        })">
                            <span>🛒</span> Add to Cart
                        </button>
                    </div>
                `;
    productsGrid.appendChild(productCard);
  });
}

// Add product to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);

  // Check if product is already in cart
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  updateCart();
}

// Remove product from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
}

// Update product quantity
function updateQuantity(productId, quantity) {
  const item = cart.find((item) => item.id === productId);

  if (item) {
    item.quantity = Math.max(1, quantity);
    updateCart();
  }
}

// Update cart display
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const emptyCartMessage = document.getElementById("empty-cart-message");
  const subtotal = document.getElementById("cart-subtotal");
  const shipping = document.getElementById("cart-shipping");
  const total = document.getElementById("cart-total");

  // Update cart count
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Check if cart is empty
  if (cart.length === 0) {
    emptyCartMessage.style.display = "block";
    // Clear any previous items except the empty message
    cartItems.innerHTML = "";
    cartItems.appendChild(emptyCartMessage);

    subtotal.textContent = "$0.00";
    shipping.textContent = "$0.00";
    total.textContent = "$0.00";
    return;
  }

  // Hide empty cart message
  emptyCartMessage.style.display = "none";

  // Clear cart items
  cartItems.innerHTML = "";
  cartItems.appendChild(emptyCartMessage); // Keep the message element but hidden

  // Add cart items
  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
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
    cartItems.appendChild(cartItem);
  });

  // Calculate subtotal
  const subtotalValue = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  subtotal.textContent = `$${subtotalValue.toFixed(2)}`;

  // Calculate shipping
  const shippingValue = subtotalValue >= 100 ? 0 : 10;
  shipping.textContent =
    shippingValue === 0 ? "FREE" : `$${shippingValue.toFixed(2)}`;

  // Calculate total
  const totalValue = subtotalValue + shippingValue;
  total.textContent = `$${totalValue.toFixed(2)}`;
}

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  renderProducts();
  updateCart();
});
