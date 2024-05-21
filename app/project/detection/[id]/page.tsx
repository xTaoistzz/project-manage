"use client"

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamic import components
const ImageUploader = dynamic(() => import('../../../components/Upload'), { ssr: false });
const Detection = dynamic(() => import('../../../components/Detection'), { ssr: false });

export default function MainDec( {params} ) {
  const [content, setContent] = useState('main');
  console.log(params.id)
  return (
    <div className="flex min-h-screen bg-white">
      <aside className="w-52 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Menu</h1>
        <ul>
          <li className="mb-2">
            <Link href="/project/detection/9/UpImg">
              <div className="block p-2 rounded bg-gray-700 hover:bg-gray-600 transition duration-200">Classes</div>
            </Link>
          </li>
          <li className="mb-2">
            <button
              onClick={() => setContent('upload')}
              className="w-full text-left block p-2 rounded bg-gray-700 hover:bg-gray-600 transition duration-200"
            >
              Upload Data
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => setContent('annotate')}
              className="w-full text-left block p-2 rounded bg-gray-700 hover:bg-gray-600 transition duration-200"
            >
              Annotate
            </button>
          </li>
          <li className="mb-2">
            <button
              onClick={() => setContent('annotate')}
              className="w-full text-left block p-2 rounded bg-gray-700 hover:bg-gray-600 transition duration-200"
            >
              Export
            </button>
          </li>
        </ul>
      </aside>
      <main className="flex-1 p-4">
        {content === 'main' && (
          <>
            <h1 className="text-3xl font-bold">Welcome to the Main Content</h1>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa.
            </p>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa.
            </p>
          </>
        )}
        {content === 'upload' && <ImageUploader idproject={params.id} type="detection" />}
        {content === 'annotate' && <Detection idproject={params.id} />}
      </main>
    </div>
  );
}