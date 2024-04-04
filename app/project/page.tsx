"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Project {
  id: number;
  name: string;
  description: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.BACK_URL}/allProject`, {withCredentials:true});
        setProjects(response.data);
      } catch (error) {
        console.error('Error:', error); // Handle error
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-screen-lg">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <div className="grid grid-cols-3 gap-4">
          {projects.map(project => (
            <div key={project.id} className="border border-gray-200 rounded p-4">
              <Link href="/">
                <div className='rounded p-4 hover:shadow-lg transition duration-300 ease-in-out'>
                  <h1 className="text-lg font-semibold mb-2">{project.project_name}</h1>
                  <p className="text-gray-700">{project.description}</p>
                </div>
              </Link>
              
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Link href="/project/create">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Create Project</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Projects;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";

// export default function Home() {
//   const [data, setData] = useState<any[]>([]);

//   const fetchProjects = async () => {
//     try {
//         const response = await axios.get(`${process.env.BACK_URL}/allProject`, {withCredentials: true})
//         setData(response.data)
//         console.log(response.data)
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   return (
//     <>
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <h1 className="text-2xl font-semibold mb-6">Projects</h1>
//         <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Title
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Description
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
                 
//                 </th>

//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {data.map((item, index) => (
//                 <tr key={index}>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">
//                       {item.project_name}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">
//                       {item.description}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">
//                       <Link href="project/edit/{item.idproject}" target="_blank">Edit</Link> | 
//                       <Link href="project/delete/{item.idproject}" target="_blank">Delete</Link>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <Link
//           className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           href="/project/create"
//         >
//           Create a New Project
//         </Link>
//       </div>
//     </>
//   );
// }
