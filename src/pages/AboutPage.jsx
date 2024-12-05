// AboutPage.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-red-500 dark:text-red-400 mb-8">
          About PizzAmore
        </h1>
        <div className="lg:flex items-center space-x-12">
          {/* Image Section */}
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <img
              src="https://via.placeholder.com/500"
              alt="About PizzAmore"
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Text Section */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Story
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              At PizzAmore, we believe in the power of delicious, fresh, and healthy vegetarian pizzas.
              Our mission is to offer pizza lovers a high-quality, plant-based pizza experience with every bite.
              All our pizzas are made from the finest ingredients, ensuring they are both tasty and healthy.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Whether you are enjoying a classic Margherita or trying one of our exclusive chef specials, we promise you
              a mouthwatering experience. Join us in our journey to bring the love of vegetarian pizzas to the world!
            </p>

            {/* Call to Action */}
            <div className="text-center">
              <a
                href="#order"
                className="bg-red-500 dark:bg-red-700 text-white font-bold py-2 px-6 rounded hover:bg-red-600 dark:hover:bg-red-800 transition duration-300"
              >
                Order Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
