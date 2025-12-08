import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/products?category=${category.name}`} className="block group">
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
        <img src={category.image} alt={category.name} className="w-24 h-24 mx-auto mb-4 object-cover" />
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">{category.name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
