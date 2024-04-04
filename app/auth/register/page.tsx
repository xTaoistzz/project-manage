"use client"

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    conPassword: ''
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.BACK_URL}/register`, formData);
      console.log(response.data); // Handle success response
      // Redirect to login page
      router.push('/auth/login');
    } catch (error) {
      console.error('Error:', error); // Handle error
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="conPassword"
              value={formData.conPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;