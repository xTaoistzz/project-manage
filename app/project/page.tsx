"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState<any[]>([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${process.env.BACK_URL}/allProject`, {
        withCredentials: true,
      });
      setData(response.data.project);
      console.log(response.data.project);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Projects</h1>
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                ></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {item.project_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {item.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      <Link href={`/project/edit/${item.idproject}`}>
                        <div className="text-blue-500 hover:text-blue-700">
                          Edit
                        </div>
                      </Link>
                      <Link
                        href="project/delete/{item.idproject}"
                        target="_blank"
                      >
                        Delete
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          href="/project/create"
        >
          Create a New Project
        </Link>
      </div>
    </>
  );
}

// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Projects = () => {
//   const [projects, setProjects] = useState("");

//   useEffect(() => {
//     const fetchProjectsData = async () => {
//       try {
//         const response = await axios.get(`${process.env.BACK_URL}/allProject`, {
//           withCredentials: true,
//         }); // เปลี่ยนเส้นทางตามความเหมาะสม
//         setProjects(response.data.project);
//         console.error("Failed to get projects:", response.data.message);
//       } catch (error) {
//         console.error("Error fetching projects:", error);
//       }
//     };

//     fetchProjectsData();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Projects</h1>
//       <div className="grid grid-cols-2 gap-4">
//         {projects.map((data) => (
//           <div
//             className="bg-white p-4 rounded border border-gray-300"
//             key={data.idproject}
//           >
//             <h2 className="text-lg font-semibold mb-2">
//               {data.project_name}
//             </h2>
//             <p className="text-gray-600">{data.description}</p>
//             <p className="text-gray-600">{data.root_path}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Projects;
