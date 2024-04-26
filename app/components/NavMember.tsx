"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';

const NavMember: React.FC = () => {
    const router = useRouter();
    const handleLogout = async () => {
        Cookies.remove('username');
        axios.get(`${process.env.BACK_URL}/logout`)
        router.push('/');
    };
    return (
        <nav className="bg-blue-950 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link href="/">
              <div className="text-white font-semibold text-lg">Home</div>
            </Link>
          </div>
          <div className="flex">
            <Link href="/project" className="m-3">
              <div className="text-white font-semibold text-lg">Projects</div>
            </Link>          
              <button onClick={handleLogout} className='text-white font-semibold m-3'>Logout</button>
          </div>
        </div>
      </nav>
    )
}
export default NavMember