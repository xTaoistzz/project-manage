"use client";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import React, { use, useState } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.BACK_URL}/login`, { username, password }, {withCredentials: true});      
      setErrorMessage('');
      // Show success message
      alert('Sign in successful!');
      // Redirect to home page
      window.location='/project'
    } catch (error) {
      // Handle error
      let alertmsg = error.response.data
      console.log(alertmsg.message)
      setErrorMessage(alertmsg.message)

    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold mb-4">Sign-In</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input

          id="username"
          type="text"
          placeholder="กรอกชื่อผู้ใช้งาน"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input 
          id="password"
          type="password"
          value={password}
          placeholder="กรอกรหัสผ่าน"
          required
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm"
        />
      </div >
      <div className="mb-1 text-center">
      <label id="msg-login" htmlFor="Alert" className="block text-sm font-medium text-red-700">{errorMessage}</label>
      </div>
      <button 
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
      >
        Login
      </button>
    </form>
    {response && <p className="mt-4 text-green-500">{response}</p>}
  </div>
  );
};

export default Login;