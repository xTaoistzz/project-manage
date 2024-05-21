"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Annotorious, ImageAnnotator } from "@annotorious/react";
import "@annotorious/react/annotorious-react.css";

const Home = () => {
  const [token, setToken] = useState(null);
  const handleLogout = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/logout`, {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (error) {}
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <Annotorious>
        <ImageAnnotator>
          <img src="http://localhost:5000/img/9/images/00000001.jpg" alt="Example" />
        </ImageAnnotator>
      </Annotorious>
    </div>
  );
};

export default Home;
