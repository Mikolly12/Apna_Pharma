// Test file to verify cart functionality
import { getCartFromStorage, saveCartToStorage, addProductToCart } from "./utils/cartStorage";

console.log("=== Testing Cart Storage Functions ===");

// Test 1: Get empty cart
console.log("\n1. Testing getCartFromStorage on empty localStorage:");
const emptyCart = getCartFromStorage();
console.log("Result:", emptyCart);

// Test 2: Add product to cart
console.log("\n2. Testing addProductToCart:");
const product1 = {
  productId: "1",
  quantity: 1,
  name: "Aspirin",
  price: 100,
  brand: "Bayer",
  thumbnail: null
};
const cart1 = addProductToCart(product1);
console.log("Cart after adding product 1:", cart1);

// Test 3: Verify localStorage persisted
console.log("\n3. Testing getCartFromStorage after add:");
const retrievedCart = getCartFromStorage();
console.log("Retrieved from localStorage:", retrievedCart);

// Test 4: Add duplicate product (should increment)
console.log("\n4. Testing addProductToCart with duplicate:");
const cart2 = addProductToCart(product1);
console.log("Cart after adding product 1 again:", cart2);

// Test 5: Add different product
console.log("\n5. Testing addProductToCart with different product:");
const product2 = {
  productId: "2",
  quantity: 1,
  name: "Vitamin C",
  price: 150,
  brand: "Nature's Way",
  thumbnail: null
};
const cart3 = addProductToCart(product2);
console.log("Cart after adding product 2:", cart3);

// Test 6: Verify in localStorage
console.log("\n6. Checking raw localStorage value:");
const rawStorage = localStorage.getItem("localCart");
console.log("Raw localStorage value:", rawStorage);
if (rawStorage) {
  console.log("Parsed raw value:", JSON.parse(rawStorage));
}

console.log("\n=== Tests Complete ===");
