# Admin Dashboard Integration Guide

## Overview
The admin dashboard has been successfully integrated into the main E-Pharmacy frontend. Admins can now access a dedicated dashboard by clicking the "Admin Login" button on the login page.

## Features Implemented

### 1. **Separate Admin Login Page** (`/admin-login`)
   - Located at: `/src/components/AdminLogin/AdminLogin.jsx`
   - Allows admins to login with email and password
   - Styled consistently with the main login page
   - Redirects to `/admin/dashboard` on successful login

### 2. **Admin Dashboard** (`/admin/dashboard`)
   - Located at: `/src/components/AdminDashboard/AdminDashboard.jsx`
   - Protected route - requires admin authentication
   - Features include:
     - **Dashboard Overview**: Quick statistics view
     - **Product Management**: Manage pharmaceutical products
     - **Order Management**: View and manage customer orders
     - **Customer Management**: View registered customers
     - **Supplier Management**: Manage pharmaceutical suppliers

### 3. **Redux State Management**
   - **Admin Auth Reducer**: `/src/redux/admin/slice.js`
   - **Admin Operations**: `/src/redux/admin/operations.js`
   - **Admin Selectors**: `/src/redux/admin/selectors.js`
   - Persistent storage for admin token and login state

### 4. **Protected Routes**
   - **AdminPrivateRoute**: `/src/routes/AdminPrivateRoute.jsx`
   - Ensures only authenticated admins can access the dashboard
   - Redirects to `/admin-login` if not authenticated

## File Structure

```
src/
├── components/
│   ├── AdminLogin/
│   │   ├── AdminLogin.jsx
│   │   └── AdminLogin.styled.js
│   ├── AdminDashboard/
│   │   ├── AdminDashboard.jsx
│   │   └── AdminDashboard.styled.js
│   └── App.jsx (Updated with admin routes)
├── redux/
│   ├── admin/
│   │   ├── operations.js
│   │   ├── slice.js
│   │   └── selectors.js
│   └── store.js (Updated with admin reducer)
└── routes/
    ├── AdminPrivateRoute.jsx
    └── PrivateRoute.jsx
```

## Setup Instructions

### 1. Backend Configuration
Update the admin API endpoint in `/src/redux/admin/operations.js`:

```javascript
const ADMIN_API = axios.create({
  baseURL: "http://localhost:3001/api", // Change to your admin backend URL
});
```

### 2. User Flow

#### Customer Login:
1. User clicks "Login" button on login page
2. Customer dashboard opens after successful authentication

#### Admin Login:
1. User clicks "Admin Login" button on login page
2. Redirected to `/admin-login` page
3. Admin enters credentials
4. On success, redirected to `/admin/dashboard`
5. Admin can manage products, orders, customers, and suppliers

### 3. Logout
- Both customer and admin have separate logout functionality
- Admin logout clears admin token from localStorage
- User is redirected to login page

## API Endpoints Required

The admin backend should have the following endpoints:

```
POST /api/user/login
  - Request: { email, password }
  - Response: { token, user: { name, email, _id }, name, email, _id }

POST /api/user/logout
  - Clears admin session

GET /api/user/user-info
  - Returns: { user: { email, name, _id } }

GET /api/products (for future implementation)
GET /api/orders (for future implementation)
GET /api/customers (for future implementation)
GET /api/suppliers (for future implementation)
```

## Customization

### Add New Sections to Dashboard
Edit `/src/components/AdminDashboard/AdminDashboard.jsx`:

1. Add a new `NavItem` in the sidebar
2. Add a new conditional section with `{activeSection === "newSection" && ...}`
3. Implement your content

### Update Styling
- Admin colors use green (#59B17A) as primary color
- Edit `/src/components/AdminDashboard/AdminDashboard.styled.js` for customization
- Uses styled-components library

## Future Enhancements

- [ ] Fetch actual data from admin API endpoints
- [ ] Add product CRUD operations
- [ ] Add order status management
- [ ] Implement customer search and filters
- [ ] Add supplier management features
- [ ] Analytics and reporting dashboard
- [ ] User activity logs
- [ ] Admin profile management

## Troubleshooting

### Admin Login Not Working
1. Verify the admin backend is running on the correct port (default: 3001)
2. Check that the API endpoint in operations.js matches your backend URL
3. Ensure credentials are correct

### Logout Issues
1. Check browser console for errors
2. Verify localStorage is accessible
3. Ensure logoutThunk is properly handling token removal

### Routing Issues
1. Verify AdminPrivateRoute is protecting the /admin/dashboard path
2. Check Redux store configuration includes adminAuth reducer
3. Clear browser cache and localStorage if needed

## Integration Notes

- Admin state is kept separate from customer state (different Redux slices)
- Both customer and admin use the same login page but different auth backends
- Admin token is stored in localStorage with key "adminToken"
- Admin can logout without affecting customer sessions and vice versa
