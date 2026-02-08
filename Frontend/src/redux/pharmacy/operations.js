import { createAsyncThunk } from "@reduxjs/toolkit";
import instance, { setToken } from "../instance";
import { toast } from "react-toastify";
import { getCartFromStorage, saveCartToStorage } from "../../utils/cartStorage";
import { getCategoryName } from "../../utils/categoryMapping";

export const getCustomerReviews = createAsyncThunk(
  "reviews",
  async (body, { rejectWithValue }) => {
    try {
      const { limit = 3 } = body;
      const response = await instance.get(`/customer-reviews?limit=${limit}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getNearestStores = createAsyncThunk(
  "nearest-stores",
  async (body, { rejectWithValue }) => {
    try {
      const { limit = 6 } = body;
      const response = await instance.get(`/stores/nearest?limit=${limit}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllStores = createAsyncThunk(
  "all-stores",
  async (body, { rejectWithValue }) => {
    try {
      const { limit = "" } = body;
      const response = await instance.get(`/stores?limit=${limit}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSearchProducts = createAsyncThunk(
  "products/getAll",
  async (filterParams = {}, { rejectWithValue }) => {
    try {
      const { category = "", name = "", page = 1, limit = 12 } = filterParams;
      
      console.log("========================================");
      console.log("🚀 [THUNK] getSearchProducts called with:", { category, name, page, limit });
      
      const response = await instance.get("/api/products");
      console.log("📡 [API] Response received:", response.status);
      
      // Handle different API response formats
      let products = response.data;
      if (typeof products === 'object' && !Array.isArray(products)) {
        // If response is wrapped in an object, try to extract array
        products = products.data || response.data.content || response.data.products || [];
      }
      products = Array.isArray(products) ? products : [];
      
      console.log(`📦 [API] Total products available: ${products.length}`);
      
      if (products.length === 0) {
        console.warn("⚠️ [WARNING] No products found in API response!");
        return [];
      }
      
      // Log first product structure
      if (products.length > 0) {
        console.log("📋 [API] First product structure:", products[0]);
      }
      
      // Add thumbnail
      products = products.map(product => ({
        ...product,
        categoryName: getCategoryName(product),
        thumbnail: product.thumbnail || 
                   product.productResources?.find(r => r.isPrimary)?.url || 
                   product.productResources?.[0]?.url || 
                   `https://via.placeholder.com/200x200?text=${encodeURIComponent(product.name)}`
      }));
      
      console.log(`✅ [TRANSFORM] Added thumbnails to ${products.length} products`);
      
      // CATEGORY FILTER
      if (category && category.trim() !== "") {
        const beforeCat = products.length;
        products = products.filter(p => {
          const pCategory = (p.categoryName || "").toLowerCase().trim();
          const filterCategory = category.toLowerCase().trim();
          const match = pCategory.includes(filterCategory) || filterCategory.includes(pCategory);
          return match;
        });
        console.log(`🏷️ [FILTER-CAT] "${category}": ${beforeCat} → ${products.length} products`);
      }
      
      // NAME/SEARCH FILTER - THIS IS THE MAIN ONE
      if (name && name.trim() !== "") {
        const beforeName = products.length;
        console.log(`🔎 [FILTER-NAME] Searching for "${name}" in ${beforeName} products...`);
        
        products = products.filter(p => {
          const productName = (p.name || "").toLowerCase();
          const productBrand = (p.brand || "").toLowerCase();
          const searchTerm = name.toLowerCase();
          
          const nameMatch = productName.includes(searchTerm);
          const brandMatch = productBrand.includes(searchTerm);
          const matches = nameMatch || brandMatch;
          
          if (matches) {
            console.log(`   ✓ "${p.name}" (${p.brand}) matches "${name}"`);
          }
          return matches;
        });
        
        console.log(`🔎 [FILTER-NAME] "${name}": ${beforeName} → ${products.length} products`);
      }
      
      console.log(`✅ [RESULT] FINAL: ${products.length} products to return`);
      console.log("========================================");
      
      return products;
      
    } catch (error) {
      console.error("❌ [ERROR] getSearchProducts FAILED:", error);
      console.error("   Error message:", error.message);
      console.error("   Error response:", error.response?.data);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get product by ID (Spring Boot)
export const getProductById = createAsyncThunk(
  "products/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/api/products/${id}`);
      
      // Add image URL if not present
      if (response.data) {
        response.data.thumbnail = response.data.thumbnail || 
                                   response.data.productResources?.find(r => r.isPrimary)?.url || 
                                   response.data.productResources?.[0]?.url || 
                                   `https://via.placeholder.com/200x200?text=${encodeURIComponent(response.data.name)}`;
      }
      
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching product:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/* Cart Operations */

export const getCartItems = createAsyncThunk(
  "cart-items",
  async (_, { rejectWithValue }) => {
    console.log("📥 getCartItems called - Using localStorage only");
    try {
      const cart = getCartFromStorage();
      console.log("📦 Cart from localStorage:", cart);
      return cart;
    } catch (localError) {
      console.error("❌ localStorage read failed:", localError);
      return { cartProducts: [], total: 0 };
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart-add",
  async (body, { rejectWithValue, getState }) => {
    console.log("🛒 addToCart called with:", body);
    
    try {
      // Get current cart from localStorage
      let cart = getCartFromStorage();
      console.log("📥 Current cart from localStorage:", cart);
      
      // Find or create product entry
      const existingIndex = cart.cartProducts.findIndex(p => 
        p.productId?.id === body.productId || p.productId?._id === body.productId
      );
      
      if (existingIndex > -1) {
        // Product exists, increment quantity
        cart.cartProducts[existingIndex].quantity += (body.quantity || 1);
        console.log("➕ Incremented product quantity to:", cart.cartProducts[existingIndex].quantity);
      } else {
        // Add new product
        cart.cartProducts.push({
          _id: Math.random().toString(36).substr(2, 9),
          productId: {
            id: body.productId,
            _id: body.productId,
            name: body.name || "Product",
            price: body.price || 0,
            brand: body.brand || "N/A",
            thumbnail: body.thumbnail || null,
            photo: body.thumbnail || null,
            prescription_required: body.prescription_required || false
          },
          quantity: body.quantity || 1
        });
        console.log("🆕 Added new product to cart");
      }
      
      // Recalculate total
      cart.total = cart.cartProducts.reduce((sum, p) => 
        sum + ((p.productId?.price || 0) * p.quantity), 0
      );
      
      // Save to localStorage
      saveCartToStorage(cart);
      
      console.log("✅ Cart updated successfully:", cart);
      console.log("💾 Saved to localStorage");
      
      return cart;
    } catch (error) {
      console.error("❌ Error in addToCart:", error);
      // Return empty cart as fallback
      return { cartProducts: [], total: 0 };
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart-update",
  async (body, { rejectWithValue }) => {
    try {
      const response = await instance.put(`/api/cart/update/${body.id}`, body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteFromCart = createAsyncThunk(
  "cart-remove",
  async (id, { rejectWithValue }) => {
    console.log("🗑️  deleteFromCart: Attempting to delete item with id:", id);
    try {
      const response = await instance.delete(`/api/cart/remove/${id}`);
      
      // Check if response is valid JSON (not HTML redirect)
      if (typeof response.data === 'string' && response.data.includes('<html')) {
        console.log("❌ Got HTML response (redirect), using localStorage fallback");
        throw new Error("API returned HTML instead of JSON");
      }
      
      console.log("✅ deleteFromCart API Success:", response.data);
      toast.success("Product removed from cart");
      return response.data;
    } catch (error) {
      console.log("❌ deleteFromCart API Error, using localStorage fallback");
      console.log("Error details:", error.message);
      
      // Fallback: Remove from localStorage
      try {
        const cart = JSON.parse(localStorage.getItem("localCart")) || { cartProducts: [], total: 0 };
        console.log("📦 Cart before deletion:", cart);
        
        // Filter out the item with matching _id
        const beforeCount = cart.cartProducts.length;
        cart.cartProducts = cart.cartProducts.filter(p => {
          const match = p._id === id;
          console.log(`  Checking item: _id=${p._id}, id=${id}, match=${match}`);
          return !match;
        });
        const afterCount = cart.cartProducts.length;
        console.log(`  Removed ${beforeCount - afterCount} item(s). Remaining: ${afterCount}`);
        
        // Recalculate total
        cart.total = cart.cartProducts.reduce((sum, p) => sum + ((p.productId?.price || 0) * p.quantity), 0);
        console.log("📦 Cart after deletion:", cart);
        
        // Save back to localStorage
        localStorage.setItem("localCart", JSON.stringify(cart));
        console.log("💾 Saved updated cart to localStorage");
        
        toast.success("Product removed from cart");
        return cart;
      } catch (localError) {
        console.error("❌ localStorage fallback failed:", localError);
        toast.error("Failed to remove product from cart");
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  }
);

export const decreaseQuantity = createAsyncThunk(
  "cart-decrease",
  async (body, { rejectWithValue }) => {
    try {
      const response = await instance.put(`/api/cart/update/${body.id}`, body);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart-clear",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.delete("/api/cart/clear");
      toast.success("Cart cleared");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const cartCheckout = createAsyncThunk(
  "cart-checkout",
  async (body, { rejectWithValue }) => {
    try {
      const response = await instance.post("/api/order", body);
      toast.success("Order placed successfully. Wait for a call to confirm.");
      return response.data;
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const uploadPrescription = createAsyncThunk(
  "upload-prescription",
  async ({ file, userId, orderId }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);
      if (orderId) {
        formData.append("orderId", orderId);
      }

      const response = await instance.post("/api/prescriptions/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Prescription uploaded successfully!");
        return response.data.data;
      } else {
        toast.error(response.data.message || "Failed to upload prescription");
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Failed to upload prescription";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);
