// Debug helper - add this to window object for console testing
export const cartDebug = {
  // Check localStorage
  checkLocalStorage: () => {
    const cart = localStorage.getItem("localCart");
    console.log("=== localStorage Check ===");
    console.log("Raw value:", cart);
    if (cart) {
      try {
        const parsed = JSON.parse(cart);
        console.log("Parsed value:", parsed);
        console.log("Items in cart:", parsed?.cartProducts?.length || 0);
        return parsed;
      } catch (e) {
        console.error("Failed to parse:", e);
        return null;
      }
    }
    console.log("No cart in localStorage");
    return null;
  },

  // Clear localStorage
  clearStorage: () => {
    localStorage.removeItem("localCart");
    console.log("✅ Cleared localStorage");
  },

  // Manually add a test product
  addTestProduct: () => {
    const testProduct = {
      productId: "test-1",
      quantity: 1,
      name: "Test Medicine",
      price: 100,
      brand: "TestBrand",
      thumbnail: null
    };
    console.log("Adding test product:", testProduct);
    // This will need dispatch from a React component
    console.log("Call this from Medicine page: dispatch(addToCart(testProduct))");
  },

  // Check Redux state
  getReduxState: () => {
    console.log("To check Redux state, use Redux DevTools extension");
    console.log("Or access window.__REDUX_DEVTOOLS_EXTENSION__ if available");
  }
};

// Export for use in console
window.cartDebug = cartDebug;
console.log("🔧 Cart Debug Helper loaded. Use window.cartDebug.checkLocalStorage() in console");
