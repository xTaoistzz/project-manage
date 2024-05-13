"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageGallery from "@/app/components/ImgManage/ImgGallery";
import BoundingBox from "@/app/components/BDBox";
import Image from "next/image";

const Detection = ({ params }) => {
  const [active, setActive] = useState("");
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // State เก็บหน้าปัจจุบัน

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
  }, [idproject]);

  // ฟังก์ชันเปลี่ยนหน้า
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // จำนวนรูปภาพต่อหน้า
  const imagesPerPage = 15;
  const startIndex = currentPage * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const visibleImages = images.slice(startIndex, endIndex);

  return (
    <div className="grid grid-rows-4">
      <div className="row-span-3">
        <div className="grid grid-cols-6 gap-4 w-full p-3 h-screen">
          <div className="col-span-5 border-blue-950 border-8 flex justify-center items-center">
            <div className="text-center">
              Show Image Section
              {active && (
                <BoundingBox imageUrl={active.replace("thumbs", "images")} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed p-3 left-0 bottom-0 w-full text-center bg-blue-950">
        <div className="flex overflow-x-auto overflow-hidden rounded-lg shadow-lg cursor-pointer ">
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
          {/* ปุ่มเลื่อนหน้า */}
          {currentPage > 0 && (
            <button onClick={() => goToPage(currentPage - 1)} className="mr-2">
              &lt; หน้าก่อนหน้า
            </button>
          )}
          {images.length > endIndex && (
            <button onClick={() => goToPage(currentPage + 1)}>
              หน้าถัดไป &gt;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detection;
