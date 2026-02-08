// Cart localStorage utility functions

const CART_STORAGE_KEY = "localCart";

export const getCartFromStorage = () => {
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    console.log(`📦 getCartFromStorage: ${cart ? "Found cart" : "No cart"}`);
    if (cart) {
      const parsed = JSON.parse(cart);
      console.log("✅ Parsed cart:", parsed);
      return parsed;
    }
    return { cartProducts: [], total: 0 };
  } catch (error) {
    console.error("❌ Error reading cart from storage:", error);
    return { cartProducts: [], total: 0 };
  }
};

export const saveCartToStorage = (cart) => {
  try {
    console.log("💾 saveCartToStorage called with:", cart);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    console.log("✅ Cart saved to localStorage successfully");
    return true;
  } catch (error) {
    console.error("❌ Error saving cart to storage:", error);
    return false;
  }
};

export const clearCartFromStorage = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    console.log("✅ Cart cleared from localStorage");
    return true;
  } catch (error) {
    console.error("❌ Error clearing cart from storage:", error);
    return false;
  }
};

export const addProductToCart = (product) => {
  try {
    console.log("🛒 addProductToCart called with product:", product);
    const cart = getCartFromStorage();
    console.log("📦 Current cart before adding:", cart);
    
    // Find existing product
    const existingIndex = cart.cartProducts.findIndex(p => {
      const matches = (p.productId?.id === product.productId || p.productId?._id === product.productId);
      console.log(`  Checking product ${p.productId?.id} vs ${product.productId}: ${matches}`);
      return matches;
    });
    
    console.log(`🔍 Found existing product at index: ${existingIndex}`);
    
    if (existingIndex > -1) {
      // Product exists, increase quantity
      cart.cartProducts[existingIndex].quantity += (product.quantity || 1);
      console.log("➕ Incremented existing product quantity to:", cart.cartProducts[existingIndex].quantity);
    } else {
      // New product
      const newProduct = {
        _id: Math.random().toString(36).substr(2, 9),
        productId: {
          id: product.productId,
          _id: product.productId,
          name: product.name || "Product",
          price: product.price || 0,
          brand: product.brand || "N/A",
          thumbnail: product.thumbnail || null,
          photo: product.thumbnail || null,
          prescription_required: product.prescription_required || false
        },
        quantity: product.quantity || 1
      };
      console.log("🆕 Adding new product to cart:", newProduct);
      cart.cartProducts.push(newProduct);
    }
    
    // Recalculate total
    const oldTotal = cart.total;
    cart.total = cart.cartProducts.reduce((sum, p) => 
      sum + ((p.productId?.price || 0) * p.quantity), 0
    );
    console.log(`💰 Total recalculated: ${oldTotal} → ${cart.total}`);
    
    // Save to storage
    saveCartToStorage(cart);
    console.log("✅ Cart updated with product, total items:", cart.cartProducts.length);
    console.log("📊 Final cart object:", cart);
    
    return cart;
  } catch (error) {
    console.error("❌ Error adding product to cart:", error);
    return null;
  }
};
