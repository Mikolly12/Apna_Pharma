import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import Button from './Button';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:opacity-80 transition-opacity" />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
        <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
        <div className="mt-4">
          <Button onClick={() => addToCart(product)}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
