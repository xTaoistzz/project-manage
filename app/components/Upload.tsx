"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const ImageUploader = ({ idproject, type }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      setSelectedFiles([...selectedFiles, ...acceptedFiles]);
    },
    [selectedFiles]
  );

  const removeFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const uploadFiles = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file, index) => {
      formData.append(`image`, file);
    });
    formData.append("idproject", idproject);
    formData.append("type", type);

    try {
      const response = await axios.post(
        `${process.env.BACK_URL}/uploadImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("Upload successful:", response.data);
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  return (
    <div className="min-h-screen flex flex-col items-center ">
      {selectedFiles.length > 0 && (
        <button
          onClick={uploadFiles}
          className=" bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 my-5 "
        >
          Upload Image
        </button>
      )}
      <div
        className="p-4 border border-dashed border-gray-400 rounded-lg text-center"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          Drag 'n' drop some images here, or click to select images
        </p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {selectedFiles.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={`Image ${index + 1}`}
                className="h-32 w-full object-cover rounded"
              />
              <button
                onClick={() => removeFile(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
