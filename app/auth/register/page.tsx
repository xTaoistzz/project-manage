"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    conPassword: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.BACK_URL}/register`,
        formData
      );
      console.log(response.data); // Handle success response
      // Redirect to login page
      router.push("/auth/login");
    } catch (error) {
      let alertmsg = error.response.data
      if (alertmsg.type == 'failed') {
        let label = document.getElementById("msg-username");
        label.innerHTML = alertmsg.message
      }
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Sign-Up</h2>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <div className="mb-1">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-3">
            <label
              id = "msg-username"
              htmlFor="username"
              className="block text-sm font-medium text-red-700"
            ></label>
          </div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="mb-1">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-3">
            <label
              id = "msg-email"
              htmlFor="username"
              className="block text-sm font-medium text-red-700"
            ></label>
          </div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="mb-1">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <div className="mb-1">
            <input
              type="password"
              name="conPassword"
              value={formData.conPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Sign-Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
