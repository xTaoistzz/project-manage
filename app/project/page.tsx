"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import Card from "../components/Card";

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
// const Initailize = useRef(false)
  useEffect(() => {
    // if (!Initailize.current) {
    //   Initailize.current = true
      fetchProjects();
    // }    
  }, []);

  return (
    <>
      <div>
        <div className="text-center font-bold text-xl mt-3">
          <h1>Project</h1>
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-4 p-3">
            {data.map((card, index) => (
              <div
                key={index}
                className="card bg-white shadow-md rounded-lg p-3"
              >
                <Card data={card} />
              </div>
            ))}
          </div>
        </div>
        <div className=" text-center m-4">
          <Link
            className="mt-4 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            href="/project/create"
          >
            Create a New Project
          </Link>
        </div>
      </div>
    </>
  );
}