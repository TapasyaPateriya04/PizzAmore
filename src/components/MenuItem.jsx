// eslint-disable-next-line no-unused-vars
import React from 'react';

// Fetching menu items

// eslint-disable-next-line react/prop-types
const MainItem = ({ pizza }) => {
  // eslint-disable-next-line react/prop-types
  const { name, description, price, imageUrl } = pizza;

  return (
    <div className="bg-gray-800 dark:bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-64 object-cover object-center"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-400 mt-2">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold">{price}</span>
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainItem;
