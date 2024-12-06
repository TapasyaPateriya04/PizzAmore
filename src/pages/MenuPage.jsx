// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
//import { fetchMenuItems } from '../api'; 
import MainItem from '../components/MainItem';
import "../styles/menu.css";


const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await setMenuItems(); // Fetch menu items from API
        setMenuItems(items);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Failed to load menu items');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);   

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-12 text-center">
        <h2>Loading Menu...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-12 text-center">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-red-500 dark:text-red-400 mb-8">
          Our Vegetarian Menu
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <MainItem key={item.id} pizza={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
