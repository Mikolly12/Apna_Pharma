import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import Button from '../components/Button';

const CartPage = () => {
  const { cart } = useContext(CartContext);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-4">
                <div className="flex items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div>
                  <p>Quantity: {item.quantity}</p>
                  {/* Add buttons to increase/decrease quantity here */}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Button className="mt-6">Proceed to Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
