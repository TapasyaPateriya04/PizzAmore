// eslint-disable-next-line no-unused-vars
import React from 'react';
import './footer.css';
const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold">PizzAmore</div>
          <div className="flex space-x-6">
            <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
        <div className="text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} PizzAmore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
