# <p align="center">E-Pharmacy</p>

![image](https://github.com/DianaKryzhanivska/E-Pharmacy/blob/main/assets/home.png)

![image](https://github.com/DianaKryzhanivska/E-Pharmacy/blob/main/assets/register.png)

![image](https://github.com/DianaKryzhanivska/E-Pharmacy/blob/main/assets/login.png)

![image](https://github.com/DianaKryzhanivska/E-Pharmacy/blob/main/assets/stores.png)

![image](https://github.com/DianaKryzhanivska/E-Pharmacy/blob/main/assets/medicine.png)

![image](https://github.com/DianaKryzhanivska/E-Pharmacy/blob/main/assets/product.png)

![image](https://github.com/DianaKryzhanivska/E-Pharmacy/blob/main/assets/cart.png)

An application for a pharmacy that offers to buy the medicines online.
The website is designed with a mobile-first approach. Adaptive design with
breakpoints 320px, 375px, 768px, 1440px. Modal windows for Sign In, Sign Up.

Own API was created for the application [E-Pharmacy Backend API](https://github.com/DianaKryzhanivska/E-Pharmacy-backend)

The possibility of authorization was added to the
application (registration, login, obtaining data about the current user, logout)

It has 7 pages:

- Home page - /home | Page designed to show what this application offers and display nearest stores customers reviews.
- Register page - /register | Register form created with formik and yup libraries.
- Login page - /login | Login form created with formik and yup libraries.
- Stores page - /stores | Page displaying pharmacies with their location.
- Medicine page - /medicine | Page displaying all medicines in
  data base. Category filtering and search by keyword is applied. Custom pagination was created.
- Product page - /product | Page to read description and user's reviews. Posibility of adding medicine to own cart is applied.
- Cart page - /cart | Private page for authorized users. A page for ordering medicines.

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [styled-components](https://styled-components.com)

Additionally libraries used: axios, formik, yup, react-icons, react-toastify,
react-responsive, react-select.
