"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Edit = () => {
  const pathname = usePathname();
  const paths = pathname.split("/");
  const idproject = paths[paths.length - 1];
  const [data, setData] = useState('');
  const [type, setType] = useState('');
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${process.env.BACK_URL}/project/${idproject}`,
          {
            withCredentials: true,
          }
        );
        setData(response.data.project);
        console.log(response.data.project);
        const data = response.data.project
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchProjects(); // ดึงข้อมูลโปรเจคเมื่อ Component นี้ถูก Render
  }, []); // ใช้งาน useEffect ตอน Component ถูก Mount เท่านั้น
  const handleCreateDetection = async () => {
    try {
      await axios.post(`${process.env.BACK_URL}/create/detection`, { idproject }, { withCredentials:true,});
      console.log('Detection created successfully');
    } catch (error) {
      console.log('Error creating detection:', error);
    }
  };
  return (
    <>
 <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Edit Project</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Project Name:</h2>
          <p className="text-lg">{data.project_name}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Description:</h2>
          <p className="text-lg">{data.description}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Select Options:</h2>
          <div className="flex flex-col gap-4">
            <div
              className={`border p-4 rounded cursor-pointer ${type === 'Classification' ? 'bg-blue-100' : ''}`}
              onClick={() => setType('Classification')}
            >
              <h3 className="text-lg font-semibold mb-2">Classification</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <Link href={`/project/detection/${idproject}`}>
            <div
              className={`border p-4 rounded cursor-pointer ${type === 'Detection' ? 'bg-blue-100' : ''}`}
              onClick={() => setType('Detection')}
            >
              <h3 className="text-lg font-semibold mb-2">Detection</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>              
            </Link>

            <div
              className={`border p-4 rounded cursor-pointer ${type === 'Segmentation' ? 'bg-blue-100' : ''}`}
              onClick={() => setType('Segmentation')}
            >
              <h3 className="text-lg font-semibold mb-2">Segmentation</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
          <button onClick={handleCreateDetection} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Create Detection</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Edit;
