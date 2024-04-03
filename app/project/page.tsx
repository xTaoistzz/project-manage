// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";

// export default function Home() {

//   const fetchProjects = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/allProject");
//       setProjects(response.data);
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
//                   Type
//                 </th>
//                 <th
//                   scope="col"
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   Author
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {projects.map((project: any) => (
//                 <tr key={project.id}>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm font-medium text-gray-900">
//                       {project_name}
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
