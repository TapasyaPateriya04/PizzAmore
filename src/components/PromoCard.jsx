// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
const PromoCard = ({ promo }) => {
  // eslint-disable-next-line react/prop-types
  const { title, description, imageUrl, buttonText, buttonLink } = promo;

  return (
    <div className="bg-gray-800 dark:bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-64 object-cover object-center"
      />
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <a
          href={buttonLink}
          className="inline-block bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg transition duration-200"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
};

export default PromoCard;
