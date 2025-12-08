import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products.json';
import { CartContext } from '../contexts/CartContext';
import Button from '../components/Button';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className="container mx-auto px-4 py-8 text-center">Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-md" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-2xl font-semibold text-blue-600 my-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-gray-600 mb-4"><span className="font-semibold">Usage:</span> {product.usage}</p>
          <Button onClick={() => addToCart(product)}>Add to Cart</Button>
        </div>
      </div>

      <div className="my-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Reviews</h2>
        {product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <p className="font-semibold">{review.user}</p>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
