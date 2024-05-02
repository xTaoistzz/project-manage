"use client";


import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-950 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/">
            <div className="text-white font-semibold text-lg">Home</div>
          </Link>
        </div>
        <div className="flex">
          <Link href="/auth/login" className="m-3">
            <div className="p-4 rounded-lg bg-blue-400 hover:bg-blue-500 font-bold text-white shadow-lg shadow-blue-200 transition ease-in-out duration-200 translate-10">Sign-In</div>
          </Link>          
          <Link href="/auth/register" className="m-3">
            <div className="p-4 rounded-lg bg-blue-400 hover:bg-blue-500 font-bold text-white shadow-lg shadow-blue-200 transition ease-in-out duration-200 translate-10">Sign-Up</div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
