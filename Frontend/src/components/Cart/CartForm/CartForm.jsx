import React, { useState, useMemo } from "react";
import {
  Form,
  InputBox,
  OrderBox,
  PaymentBox,
  RadioBox,
  SubTitle,
  SubmitBtn,
  Text,
  TotalBox,
} from "./CartForm.styled";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../../redux/pharmacy/selectors";
import { selectUser } from "../../../redux/auth/selectors";
import { useFormik } from "formik";
import { orderSchema } from "schemas/yupSchemas";
import { cartCheckout } from "../../../redux/pharmacy/operations";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const total = Number(cart?.total).toFixed(2) || 0;

  // Check if any item in cart requires prescription
  const prescriptionRequiredItems = useMemo(() => {
    if (!cart?.cartProducts) return [];
    return cart.cartProducts.filter(item => item.productId?.prescription_required);
  }, [cart?.cartProducts]);

  const isPrescriptionRequired = prescriptionRequiredItems.length > 0;

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      payment: "cash",
    },
    validationSchema: orderSchema,
    onSubmit: (values) => {
      if (!cart || !cart.cartProducts || cart.cartProducts.length === 0) {
        toast.error("Please select product to make an order");
        return;
      }

      // 🔴 BLOCK CHECKOUT: If prescription-required items exist, user must have uploaded from cart page
      if (isPrescriptionRequired) {
        toast.error("Please upload prescriptions for all prescription-required items in your cart before checkout.");
        return;
      }

      setIsLoading(true);
      
      // Update values with current payment method
      const orderData = {
        ...values,
        payment: paymentMethod,
      };

      dispatch(cartCheckout(orderData))
        .unwrap()
        .then((response) => {
          // Create complete order data with cart items and total
          const completeOrderData = {
            ...response,
            ...values, // Include form data (name, email, phone, address)
            orderItems: cart.cartProducts.map(item => ({
              productName: item.productId?.name || "Product",
              name: item.productId?.name || "Product",
              quantity: item.quantity,
              priceAtPurchase: item.productId?.price || 0,
            })),
            totalAmount: cart.total,
            cartTotal: cart.total,
          };

          // Clear cart after successful order - reset to empty
          setTimeout(() => {
            if (paymentMethod === "upi" || paymentMethod === "bank") {
              navigate("/payment", { state: { orderData: completeOrderData } });
            } else {
              navigate("/home");
            }
          }, 500);
          
          // Show confirmation for cash on delivery
          if (paymentMethod !== "upi" && paymentMethod !== "bank") {
            toast.success("Order placed successfully! Wait for our call to confirm.");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          toast.error("Failed to create order. Please try again.");
          console.error("Order error:", error);
          setIsLoading(false);
        });
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <SubTitle>Enter shipping info </SubTitle>
        <Text>
          Enter your delivery address where you get the product. You can also
          send any other location where you send the products.
        </Text>
        <InputBox>
          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter text"
              onChange={formik.handleChange}
              value={formik.values.name.trim()}
            />
            {formik.errors.name && formik.touched.name ? (
              <span>{formik.errors.name}</span>
            ) : null}
          </label>
          <label htmlFor="email">
            Email
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter text"
              onChange={formik.handleChange}
              value={formik.values.email.trim()}
            />
            {formik.errors.email && formik.touched.email ? (
              <span>{formik.errors.email}</span>
            ) : null}
          </label>
          <label htmlFor="phone">
            Phone
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter text"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <span>{formik.errors.phone}</span>
            ) : null}
          </label>
          <label htmlFor="address">
            Address
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter text"
              onChange={formik.handleChange}
              value={formik.values.address}
            />
            {formik.errors.address && formik.touched.address ? (
              <span>{formik.errors.address}</span>
            ) : null}
          </label>
        </InputBox>

        <PaymentBox>
          <SubTitle>Payment method</SubTitle>
          <Text>
            You can pay us in a multiple way in our payment gateway system.
          </Text>
          <RadioBox>
            <label htmlFor="cash">
              <input
                type="radio"
                id="cash"
                name="payment"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash On Delivery
            </label>
            <label htmlFor="bank">
              <input
                type="radio"
                id="bank"
                name="payment"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Bank
            </label>
            <label htmlFor="upi">
              <input
                type="radio"
                id="upi"
                name="payment"
                value="upi"
                checked={paymentMethod === "upi"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              UPI
            </label>
            {formik.errors.payment && formik.touched.payment ? (
              <span>{formik.errors.payment}</span>
            ) : null}
          </RadioBox>
        </PaymentBox>
        <OrderBox>
          <SubTitle>Order details </SubTitle>
          <Text>
            Shipping and additionnal costs are calculated based on values you
            have entered.
          </Text>
          <TotalBox>
            <p>Total:</p>
            <p>{`₹ ${total}`}</p>
          </TotalBox>
        </OrderBox>
        <SubmitBtn 
          type="submit" 
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Place order"}
        </SubmitBtn>
      </Form>
    </>
  );
};

export default CartForm;
