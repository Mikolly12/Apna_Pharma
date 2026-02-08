import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const Layout = () => {
  const location = useLocation();
  const pageType = location.pathname.split("/")[1];

  return (
    <main>
      <Header pageType={pageType} />
      <Suspense fallback="Loading...">
        <Outlet />
      </Suspense>
      <Footer />
    </main>
  );
};

export default Layout;
