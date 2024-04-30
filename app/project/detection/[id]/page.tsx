"use client"
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const Upload = ({ params }: { params: { id: string } }) => {
  const [files, setFiles] = useState([]);
  const idproject = params.id
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleUpload = async () => {
    try {
      const type = 1 //detections
      const formData = new FormData();
      files.forEach(file => {
        formData.append('image', file);
        formData.append('idproject', idproject)
        formData.append('type', type)
      });
      
      await axios.post('http://localhost:5000/uploadImage',formData,{withCredentials:true});
      setFiles([]);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const hasUploadedImages = files.length > 0;

  return (
    <div className="container mx-auto mt-10">
      <div {...getRootProps({ className: 'dropzone border-2 border-dashed p-10' })}>
        <input {...getInputProps()} accept="image/*" />
        <p className="text-center">Drag 'n' drop some images here, or click to select images</p>
      </div>
      <div className="mt-4 grid grid-cols-6 gap-4">
        {files.map((file, index) => (
          <div key={file.name} className="flex justify-center items-center relative">
            <img
              src={file.preview}
              alt={file.name}
              className="w-32 h-32 object-cover rounded"
            />
            <button
              onClick={() => removeFile(index)}
              className="absolute top-0 center-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none"
              style={{ transform: 'translate(50%, -50%)' }}
            >
              X
            </button>
          </div>
        ))}
      </div>
      {hasUploadedImages && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleUpload}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default Upload;