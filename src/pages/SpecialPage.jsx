// eslint-disable-next-line no-unused-vars
import React from 'react';

const specialItems = [
  {
    id: 1,
    name: 'Truffle Mushroom Delight',
    description: 'Gourmet pizza with truffle oil, wild mushrooms, and mozzarella.',
    price: '₹499',
    tag: 'Limited Time',
  },
  {
    id: 2,
    name: 'Spicy Paneer Extravaganza',
    description: 'Spicy paneer, jalapeños, and red chili flakes for a fiery experience.',
    price: '₹449',
    tag: 'Chef’s Special',
  },
  {
    id: 3,
    name: 'Mediterranean Veggie',
    description: 'A mix of olives, sun-dried tomatoes, and feta cheese.',
    price: '₹469',
    tag: 'New Arrival',
  },
];

const SpecialPage = () => {
  // Optional Order Button Handler

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-12">
  <div className="container mx-auto px-4">
    <h1 className="text-4xl font-bold text-center text-red-500 dark:text-red-400 mb-8">
      Today’s Specials
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {specialItems.map((item) => (
        <div
          key={item.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 hover:border-2 hover:border-red-500 dark:hover:border-red-400"
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
              {item.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-red-500 dark:text-red-400">
                {item.price}
              </span>
              <span className="bg-red-500 dark:bg-red-700 text-white px-3 py-1 rounded-full text-xs">
                {item.tag}
              </span>
            </div>
            {/* Order Now Button */}
            <div className="mt-4">
              <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg transition duration-300 transform hover:scale-105">
                Order Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
};

export default SpecialPage;
