"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';

const Detection = () => {
  const [images, setImages] = useState([]);
  const idProject = usePathname(); 

  const handleUploadImage = async () => {
    try {
      const formData = new FormData();
      images.forEach((image, index) => {
        formData.append(`image${index}`, image);
      });
      formData.append('idproject', idProject); 

      const response = await axios.post('http://localhost:5000/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials:true,
      });

      console.log('Images uploaded successfully!', response.data);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    setImages([...images, ...files]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl mb-4">Image Detection</h1>
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          multiple  // อนุญาตให้เลือกไฟล์หลายไฟล์
          className="mb-4"
        />
        <button
          onClick={handleUploadImage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Upload Images
        </button>
      </div>
    </div>
  );
};

export default Detection;