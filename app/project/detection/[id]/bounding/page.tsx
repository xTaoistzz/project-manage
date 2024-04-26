"use client";
import axios from "axios";
export default function Bounding({ params }: { params: { id: string } }) {
  const idproject = params.id;
  const getIMG = async() => {
    try {
      // เปลี่ยนเป็น idproject ที่ต้องการส่งไป
      const response = await axios.get(
        `${process.env.BACK_URL}/images/pull`,
        idproject, 
        
      );

      console.log("Data fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return <button onClick={getIMG}>getIMG</button>;
}
