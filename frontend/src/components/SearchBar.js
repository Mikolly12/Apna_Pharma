import React from 'react';

const SearchBar = () => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for medicines and products..."
          className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="absolute right-0 top-0 mt-2 mr-2 px-4 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
