import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

const Header = () => {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">E-Pharmacy</Link>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li><Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link></li>
            <li><Link to="/products" className="text-gray-600 hover:text-blue-600">Products</Link></li>
            <li>
              <Link to="/cart" className="relative text-gray-600 hover:text-blue-600">
                Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>
            <li><Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link></li>
            <li><Link to="/profile" className="text-gray-600 hover:text-blue-600">Profile</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
