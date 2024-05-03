import React from "react";
import Image from "next/image";
const ImageGallery = ({ imageUrls }) => {
  return (
    <div className="flex overflow-x-auto overflow-hidden rounded-lg shadow-lg cursor-pointer">
      {imageUrls.map((url, index) => (
        <Image
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
