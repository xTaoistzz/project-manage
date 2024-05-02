// pages/YourPage.js
"use client";

import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ImageGallery from "@/app/components/ImgManage/ImgGallery";
import BoundingBox from "@/app/components/BDBox";

const Detection = ({ params }) => {
  const [images, setImages] = useState([]);
  const idproject = params.id;
  useEffect(() => {
    const fetchExternalImages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/detection/allDetection/${idproject}`,
          { withCredentials: true }
        );
        const data = response.data.detection;
        console.log(data);
        const externalImageUrls = data.map((img) => {
          return `http://localhost:5000/img/${idproject}/thumbs/${img.image_path}`;
        });
        setImages(externalImageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchExternalImages();
  }, []);
  const imageUrl = "http://localhost:5000/img/8/images/00000015.png";
  return (
    <div className="grid grid-cols-1 gap-4 transition-[grid-template-columns] lg:grid-cols-[120px_1fr] lg:gap-8 lg:[&:has(>*:first-child:hover)]:grid-cols-[160px_1fr]">
      <div className="bg-blue-500 rounded-lg bg-gray-200"></div>
      <div className="grid gap-4 text-center object-center rounded-lg bg-gray-200">
        <div className="p-5 flex justify-center items-center min-h-5xl font-bold">
          <BoundingBox imageUrl={imageUrl} />
        </div>
        <div className=" min-h-xl flex flex-col justify-center items-center bg-gray-100">
          <div className="mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">Select Image : </h1>
            {images.length > 0 ? (
              <ImageGallery imageUrls={images} />
            ) : (
              <p className="text-center">Loading...</p>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Detection;

// replace with your image URL
