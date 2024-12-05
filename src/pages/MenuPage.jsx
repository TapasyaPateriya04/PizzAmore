// eslint-disable-next-line no-unused-vars
import React from 'react';
import MainItem from './MainItem';
import './menu.css';

// Vegetarian pizza menu items
const vegMenuItems = [
  { id: 1, name: 'Margherita', description: 'Classic delight with 100% real mozzarella cheese.', price: '₹299', imageUrl: 'https://your-image-url.com/margherita.jpg' },
  { id: 2, name: 'Veggie Supreme', description: 'Loaded with a variety of fresh vegetables.', price: '₹349', imageUrl: 'https://your-image-url.com/veggie-supreme.jpg' },
  { id: 3, name: 'Paneer Tikka', description: 'Topped with spicy paneer cubes, capsicum, and onions.', price: '₹399', imageUrl: 'https://your-image-url.com/paneer-tikka.jpg' },
  { id: 4, name: 'Farmhouse', description: 'A delicious combination of mushrooms, tomatoes, and onions.', price: '₹359', imageUrl: 'https://your-image-url.com/farmhouse.jpg' },
  { id: 5, name: 'Corn Delight', description: 'Sweet corn, cheese, and a touch of herbs.', price: '₹329', imageUrl: 'https://your-image-url.com/corn-delight.jpg' },
];

const MenuPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-red-500 dark:text-red-400 mb-8">
          Our Vegetarian Menu
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vegMenuItems.map((item) => (
            <MainItem key={item.id} pizza={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
