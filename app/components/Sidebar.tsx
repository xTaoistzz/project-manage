import React from 'react';
import Link from 'next/link';

const SideBar = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Menu</h1>
        <ul>
          <li className="mb-2">
            <Link href="/project/detection/9/UpImg">
              <div className="block p-2 rounded bg-gray-700 hover:bg-gray-600 transition duration-200">Classes</div>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/project/detection/9/UpImg">
              <div className="block p-2 rounded bg-gray-700 hover:bg-gray-600 transition duration-200">Upload Data</div>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/project/detection/9/UpImg">
              <div className="block p-2 rounded bg-gray-700 hover:bg-gray-600 transition duration-200">Annotate</div>
            </Link>
          </li>
        </ul>
      </aside>
      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
}

export default SideBar;