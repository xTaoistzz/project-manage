// pages/YourPage.js
"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const Detection = ({ params }: { params: { id: string } }) => {
  const [images, setImages] = useState([]);
  const idproject = params.id;
  const externalImageUrls = [];
  useEffect(() => {
    const fetchExternalImages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/detection/allDetection/${idproject}`,
          { withCredentials: true }
        );
        const data = response.data.detection;
        data.forEach(async (data) => {
          externalImageUrls.push(data.image_path);
        });
      } catch (error) {
        console.error("Error fetching images:", error);
      }
      console.log(externalImageUrls);
    };
    fetchExternalImages();
    putImg();
  }, []);
  return (
    <div>
      <h1>External Image Display</h1>
      <div>

      </div>
    </div>
  );
};

export default Detection;
