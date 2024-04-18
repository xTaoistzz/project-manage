"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
            <div className="text-white font-semibold text-lg">Sign-In</div>
          </Link>          
          <Link href="/auth/register" className="m-3">
            <div className="text-white font-semibold text-lg">Sign-Up</div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
