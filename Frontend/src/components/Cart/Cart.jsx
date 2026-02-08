import React, { useEffect } from "react";
import { Container, MainWrapper, Title } from "./Cart.styled";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../redux/pharmacy/operations";
import CartForm from "./CartForm/CartForm";
import PreviewCartItems from "./PreviewCartItems/PreviewCartItems";

const Cart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  return (
    <>
      <section>
        <Container>
          <Title>Cart</Title>
          <MainWrapper>
            <CartForm />
            <PreviewCartItems />
          </MainWrapper>
        </Container>
      </section>
    </>
  );
};

export default Cart;
