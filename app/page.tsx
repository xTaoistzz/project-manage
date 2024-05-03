"use client"
import { useState, useEffect } from "react";
import axios from "axios";
function YourComponent() {
    const [token, setToken] = useState(null);
    const handleLogout = async() => {
        try {
            const res = await axios.get(`http://localhost:5000/logout`,{ withCredentials:true});
            console.log(res.data)
        } catch (error) {
            
        }
    }
    // useEffect(() => {
    //     const GetName = async() => {
    //         const res = await axios.get(`http://localhost:5000/returnUsername`, {withCredentials:true});
    //         console.log(res.data)
    //     }
    //     GetName()
    // }, []); 
    return (
        <div>
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default YourComponent;