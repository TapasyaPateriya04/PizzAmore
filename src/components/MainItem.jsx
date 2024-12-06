// src/pages/MainItem.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';

const MainItem = ({ item }) => {
  return (
    <div className="menu-item">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>${item.price}</p>
    </div>
  );
};

export default MainItem;
