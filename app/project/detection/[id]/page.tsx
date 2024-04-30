"use client"
import { useEffect, useState } from "react"
import axios from "axios"

const Detection = ({ params }: { params: { id: any } }) => {
  const idproject = params.id
  const [data,setData] = useState('');
  useEffect(() => {
    const getImg = () => {

    }
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/detection/allDetection/${idproject}`,{withCredentials:true} );
        setData(response.data.detection)
        let data = response.data.detection
        data.forEach((data) => {
          console.log(data.image_path)
        });
      } catch (error) {
        console.error('Error fetching detection data:', error);
      }
      
    }  
    fetch();
  }, [idproject])
}

export default Detection