import React from "react";
const ImageGallery = ({ imageUrls }) => {
  return (
    <div className="flex overflow-x-auto overflow-hidden rounded-lg shadow-lg cursor-pointer">
      {imageUrls.map((url, index) => (
        <img
          key={index}
          src={url}
          className="rounded-lg shadow-lg w-32 h-32 m-3 object-cover"
          alt={`Image ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
