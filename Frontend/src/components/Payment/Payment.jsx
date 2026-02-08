import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  PaymentContainer,
  PaymentContent,
  PaymentHeader,
  PaymentDetails,
  LoadingSpinner,
  ErrorMessage,
  PaymentMethods,
  PaymentOption,
  PaymentButton,
  OrderSummary,
  OrderItem,
  TotalAmount,
} from "./Payment.styled";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderData = location.state?.orderData;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const paymentMethods = [
    {
      id: "upi",
      icon: "💬",
      name: "UPI Payment",
      description: "Google Pay, PhonePe, BHIM, PayTM",
    },
    {
      id: "card",
      icon: "💳",
      name: "Debit/Credit Card",
      description: "Visa, Mastercard, American Express",
    },
    {
      id: "netbanking",
      icon: "🏦",
      name: "Net Banking",
      description: "HDFC, ICICI, Axis, SBI, and 50+ banks",
    },
    {
      id: "wallet",
      icon: "👛",
      name: "Digital Wallets",
      description: "PayTM, Amazon Pay, Freecharge",
    },
  ];

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      setError("Please select a payment method");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate payment processing
      const paymentTime = selectedPaymentMethod === "upi" ? 2000 : 3000;
      await new Promise((resolve) => setTimeout(resolve, paymentTime));

      // Clear the cart from localStorage
      localStorage.removeItem("localCart");
      console.log("✅ Cart cleared from localStorage after successful payment");

      // Show success message
      toast.success("🎉 Payment successful! Your order has been confirmed.", {
        position: "top-center",
        autoClose: 3000,
      });

      // Redirect to home after success
      setTimeout(() => {
        navigate("/home", { state: { paymentSuccess: true } });
      }, 2000);
    } catch (err) {
      setError("Payment failed. Please try again.");
      toast.error("❌ Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!orderData) {
    return (
      <PaymentContainer>
        <PaymentContent>
          <PaymentHeader>
            <h1>Order Error</h1>
            <p>Order data not found. Please try again.</p>
          </PaymentHeader>
          <ErrorMessage>
            We couldn't find your order details. Please go back and try again.
          </ErrorMessage>
          <PaymentButton onClick={() => navigate("/cart")}>
            Back to Cart
          </PaymentButton>
        </PaymentContent>
      </PaymentContainer>
    );
  }

  const totalAmount = parseFloat(orderData?.totalAmount || orderData?.cartTotal || 0).toFixed(2);
  const orderId = orderData?.id?.substring(0, 8) || orderData?.orderNumber || Date.now().toString().slice(-8);

  console.log("💳 Payment Component - orderData:", orderData);
  console.log("💳 Total Amount:", totalAmount);
  console.log("💳 Order Items:", orderData?.orderItems);

  return (
    <PaymentContainer>
      <PaymentContent>
        <PaymentHeader>
          <h1>🔐 Secure Payment Checkout</h1>
          <p>Order #{orderId}</p>
        </PaymentHeader>

        <div style={{ display: "flex", gap: "30px", marginTop: "40px", flexWrap: "wrap" }}>
          {/* Payment Methods */}
          <PaymentMethods>
            <h2>Select Payment Method</h2>

            {paymentMethods.map((method) => (
              <PaymentOption
                key={method.id}
                selected={selectedPaymentMethod === method.id}
                onClick={() => setSelectedPaymentMethod(method.id)}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={selectedPaymentMethod === method.id}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                />
                <div>
                  <h4>{method.icon} {method.name}</h4>
                  <p>{method.description}</p>
                </div>
              </PaymentOption>
            ))}

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <PaymentButton
              onClick={handlePayment}
              disabled={loading}
              style={{ marginTop: "30px" }}
            >
              {loading ? (
                <>
                  <LoadingSpinner /> Processing...
                </>
              ) : (
                `Pay ₹${totalAmount}`
              )}
            </PaymentButton>

            <div style={{ marginTop: "20px", fontSize: "12px", color: "#999", textAlign: "center" }}>
              <p>🔒 Your payment is secure and encrypted</p>
              <p>✓ All major payment methods accepted</p>
            </div>
          </PaymentMethods>

          {/* Order Summary */}
          <OrderSummary>
            <h2>Order Summary</h2>

            <PaymentDetails>
              <h3>Delivery Details</h3>
              <p>
                <strong>Name:</strong> {orderData?.name || orderData?.customerName || "Not provided"}
              </p>
              <p>
                <strong>Email:</strong> {orderData?.email || "Not provided"}
              </p>
              <p>
                <strong>Phone:</strong> {orderData?.phone || "Not provided"}
              </p>
              <p>
                <strong>Address:</strong> {orderData?.address || "Not provided"}
              </p>
            </PaymentDetails>

            {orderData?.orderItems && orderData.orderItems.length > 0 ? (
              <PaymentDetails>
                <h3>Order Items ({orderData.orderItems.length})</h3>
                {orderData.orderItems.map((item, index) => (
                  <OrderItem key={index}>
                    <span>
                      {item.productName || item.name || `Item ${index + 1}`}
                      {item.quantity && ` × ${item.quantity}`}
                    </span>
                    <span>₹{((item.priceAtPurchase || 0) * (item.quantity || 1)).toFixed(2)}</span>
                  </OrderItem>
                ))}
              </PaymentDetails>
            ) : (
              <PaymentDetails>
                <h3>Order Items</h3>
                <p style={{ color: "#999" }}>No items in this order</p>
              </PaymentDetails>
            )}

            <TotalAmount>
              <h3>Total Amount</h3>
              <p>₹{totalAmount}</p>
            </TotalAmount>

            <div style={{ marginTop: "15px", fontSize: "12px", color: "#666", lineHeight: "1.6" }}>
              <p>✓ Free delivery on orders above ₹200</p>
              <p>✓ No hidden charges</p>
              <p>✓ Secure SSL encrypted payment</p>
            </div>
          </OrderSummary>
        </div>
      </PaymentContent>
    </PaymentContainer>
  );
};

export default Payment;
