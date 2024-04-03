// components/Card.js

import React from 'react';

const Card = ({ title, description, onClick }) => {
  return (
    <div className="w-full sm:w-auto flex flex-wrap px-2 mb-4" onClick={onClick}>
      <div className="w-full sm:w-1/3 md:w-1/3 lg:w-1/3 px-2">
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <div className="px-6 py-4">
            <h2 className="font-bold text-xl mb-2">{title}</h2>
            <p className="text-gray-700 text-base">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;