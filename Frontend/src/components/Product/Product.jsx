import React from "react";
import { Container } from "./Product.styled";
import ProductOverview from "./ProductOverview/ProductOverview";
import TabsContainer from "./TabsContainer/TabsContainer";

const Product = () => {
  return (
    <>
      <section>
        <Container>
          <ProductOverview />
          <TabsContainer />
        </Container>
      </section>
    </>
  );
};

export default Product;
