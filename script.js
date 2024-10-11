const quantityRadios = document.querySelectorAll('input[name="quantity"]');
const sizeSelect = document.getElementById("size");
const colorSelect = document.getElementById("color");
const totalPriceElement = document.getElementById("total-price");
const addToCartButton = document.getElementById("add-to-cart");
const cartItemsElement = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");

// Product data
const products = [
  { quantity: 1, discount: 0.1, price: 24 },
  { quantity: 2, discount: 0.2, price: 24 },
  { quantity: 3, discount: 0.3, price: 24 },
];

// Cart array
let cart = [];

// Function to calculate total price
function calculateTotalPrice() {
  const selectedQuantity = parseInt(
    document.querySelector('input[name="quantity"]:checked').value
  );
  const selectedProduct = products.find(
    (product) => product.quantity === selectedQuantity
  );
  const basePrice = selectedProduct.price;
  const discount = selectedProduct.discount;

  const totalPrice = basePrice * (1 - discount);
  totalPriceElement.textContent = totalPrice.toFixed(2) + " USD";
}

// Function to add product to cart
function addToCart() {
  const selectedQuantity = parseInt(
    document.querySelector('input[name="quantity"]:checked').value
  );
  const selectedSize = sizeSelect.value;
  const selectedColor = colorSelect.value;

  // Create a cart item object
  const cartItem = {
    product: products.find((product) => product.quantity === selectedQuantity),
    size: selectedSize,
    color: selectedColor,
  };

  cart.push(cartItem);

  // Update cart display
  updateCartDisplay();

  alert("Product added to cart!");
}

// Function to update cart display
function updateCartDisplay() {
  cartItemsElement.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.textContent = `${item.product.quantity}x ${item.product.price} USD`;
    cartItemsElement.appendChild(listItem);

    total += item.product.price * item.product.quantity;
  });

  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Event listeners
quantityRadios.forEach((radio) => {
  radio.addEventListener("change", calculateTotalPrice);
});

sizeSelect.addEventListener("change", calculateTotalPrice);
colorSelect.addEventListener("change", calculateTotalPrice);

addToCartButton.addEventListener("click", addToCart);
// script.js

const totalPriceSpan = document.getElementById("total-price");
const productPriceText = document.querySelector(".product-price-text");

// Function to update price and display selected size and color
function updatePriceAndSelection() {
  const selectedQuantity = document.querySelector(
    'input[name="quantity"]:checked'
  ).value;
  const selectedSize = sizeSelect.value;
  const selectedColor = colorSelect.value;

  // Calculate the price based on the selected quantity and discount
  let price;
  switch (selectedQuantity) {
    case "1":
      price = 10.0;
      break;
    case "2":
      price = 18.0;
      break;
    case "3":
      price = 24.0;
      break;
    default:
      price = 0; // Handle invalid quantity
  }

  // Update the total price
  totalPriceSpan.textContent = `$${price.toFixed(2)} USD`;

  // Update the product price text with selected size and color
  productPriceText.textContent = `Your selected size is ${selectedSize} and color is ${selectedColor}.`;
}

// Add event listeners to size and color select elements
sizeSelect.addEventListener("change", updatePriceAndSelection);
colorSelect.addEventListener("change", updatePriceAndSelection);

// Initial price update based on the default selection
updatePriceAndSelection();
