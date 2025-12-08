import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import allProducts from '../data/products.json';

const ProductListPage = () => {
  const [products, setProducts] = useState(allProducts);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const location = useLocation();

  useEffect(() => {
    // This is where you would fetch products from an API
    // For now, we use the local JSON file
    const params = new URLSearchParams(location.search);
    const category = params.get('category');

    if (category) {
      const filtered = allProducts.filter(p => p.category === category);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [location.search]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Products</h1>
      {/* Add filtering and sorting UI here */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
