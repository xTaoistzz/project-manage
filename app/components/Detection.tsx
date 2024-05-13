// components/Detection.js
'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import BoundingBox from "@/app/components/BDBox";

const Detection = ({ idproject }) => {
  const [active, setActive] = useState("");
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchExternalImages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/detection/allDetection/${idproject}`,
          { withCredentials: true }
        );
        const data = response.data.detection;
        const externalImageUrls = data.map((img) => {
          return `http://localhost:5000/img/${idproject}/thumbs/${img.image_path}`;
        });
        setImages(externalImageUrls);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchExternalImages();
  }, [idproject]);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const imagesPerPage = 15;
  const totalPages = Math.ceil(images.length / imagesPerPage);
  const startIndex = currentPage * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const visibleImages = images.slice(startIndex, endIndex);

  return (
    <div className="grid grid-rows-4 h-full">
      <div className="row-span-3">
        <div className="grid grid-cols-6 gap-6 w-full p-3 h-full">
          <div className="col-span-6 border-blue-950 border-8 flex justify-center items-center">
            <div className="text-center">
              Show Image Section
              {active && (
                <BoundingBox imageUrl={active.replace("thumbs", "images")} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 text-center bg-blue-950">
        <div className="flex overflow-x-auto overflow-hidden rounded-lg shadow-lg cursor-pointer">
          {visibleImages.map((url, index) => (
            <Image
              onClick={() => setActive(url)}
              key={index}
              src={url}
              width={100}
              height={100}
              className={`rounded-lg shadow-lg h-auto m-1 object-cover w-32 ${
                active === url ? "border-2 border-yellow-400" : ""
              }`}
              alt={`Image ${startIndex + index + 1}`}
            />
          ))}
        </div>
        <div className="mt-2">
          {currentPage > 0 && (
            <button onClick={() => goToPage(currentPage - 1)} className="mr-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
              &lt; หน้าก่อนหน้า
            </button>
          )}
          <span className="text-white mx-2">Page {currentPage + 1} of {totalPages}</span>
          {images.length > endIndex && (
            <button onClick={() => goToPage(currentPage + 1)} className="ml-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
              หน้าถัดไป &gt;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detection;