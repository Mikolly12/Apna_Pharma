import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { pharmacyReducer } from "./pharmacy/slice";
import { authReducer } from "./auth/slice";
import { adminAuthReducer } from "./admin/slice";
import { adminProductsReducer } from "./admin/adminProductsSlice";
import { adminOrdersReducer } from "./admin/adminOrdersSlice";
import adminCustomersReducer from "./admin/adminCustomersSlice";
import adminSuppliersReducer from "./admin/adminSuppliersSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "accessToken", "refreshToken", "isLoggedIn"],
};

const adminAuthPersistConfig = {
  key: "adminAuth",
  storage,
  whitelist: ["token", "isLoggedIn"],
};

const pharmacyPersistConfig = {
  key: "pharmacy",
  storage,
};

const rootReducer = {
  auth: persistReducer(authPersistConfig, authReducer),
  adminAuth: persistReducer(adminAuthPersistConfig, adminAuthReducer),
  pharmacy: persistReducer(pharmacyPersistConfig, pharmacyReducer),
  adminProducts: adminProductsReducer,
  adminOrders: adminOrdersReducer,
  adminCustomers: adminCustomersReducer,
  adminSuppliers: adminSuppliersReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
