"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import NavMember from "./components/NavMember";
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
    const checkAuthentication = async () => {
      try {
        const response = await axios.get(`${process.env.BACK_URL}/returnUsername`, { withCredentials: true });
        if (response.data) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setAuthenticated(false);
      }
    };
    checkAuthentication();
  }, []);
  return (
    <html lang="en">
      <body>
        {authenticated ? <NavMember/>:<Navbar/> }
          {children}
        {/* <Footer/> */}
        </body>
    </html>
  )
}