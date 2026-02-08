export const selectCustomerReviews = (state) => state.pharmacy.reviews;
export const selectNearestStores = (state) => state.pharmacy.nearestStores;
export const selectAllStores = (state) => state.pharmacy.stores;
export const selectSearchProducts = (state) => state.pharmacy.products || [];
export const selectProduct = (state) => state.pharmacy.product;
export const selectCart = (state) => state.pharmacy.cart;
export const selectCurrentPage = (state) => state.pharmacy.currentPage;
export const selectTotalPages = (state) => state.pharmacy.totalPages;
export const selectTotalProducts = (state) => state.pharmacy.totalProducts;
