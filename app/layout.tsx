"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NavMember from "./components/NavMember";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [authenticated, setAuthenticated] = useState(false)
  useEffect(() => {
    const isAuthenticated = axios.get(`http://localhost:5000/returnUsername`);
    setAuthenticated(isAuthenticated);
  }, []);
  return (
    <html lang="en">
      <body>
        {authenticated ? <NavMember/>: <Navbar/>}
          {children}
        {/* <Footer/> */}
        </body>
    </html>
  )
}