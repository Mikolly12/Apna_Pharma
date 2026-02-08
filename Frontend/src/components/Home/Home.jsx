import React from "react";
import MainBanner from "./MainBanner/MainBanner";
import PromoBanners from "./PromoBanners/PromoBanners";
import AddPharmacyPromo from "./AddPharmacyPromo/AddPharmacyPromo";
//import Reviews from "./Reviews/Reviews";
//import NearestStores from "./NearestStores/NearestStores";

const Home = () => {
  return (
    <>
      <MainBanner />
      <PromoBanners />
      {/* <NearestStores /> */}

      <AddPharmacyPromo />
      {/*<Reviews /> */}
    </>
  );
};

export default Home;
