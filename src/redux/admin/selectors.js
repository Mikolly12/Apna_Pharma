export const selectAdminIsLoggedIn = (state) => state.adminAuth.isLoggedIn;
export const selectAdminUser = (state) => state.adminAuth.user;
export const selectAdminToken = (state) => state.adminAuth.token;
export const selectAdminIsLoading = (state) => state.adminAuth.isLoading;
export const selectAdminError = (state) => state.adminAuth.error;
