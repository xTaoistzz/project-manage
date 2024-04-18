import React from "react";
import {useRouter} from "next/navigation";
import { AiFillSetting } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";

const Card = ({ data }) => {
    const router = useRouter()
    const handleEditClick = () => {
        router.push(`/project/edit/${data.idproject}`)
    }

    const handleDetection = () => {
        router.push(`/project/detection/${data.idproject}`)
    }
    return (
        <div className="card bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-bold mb-2">{data.project_name}</h2>
            <p className="text-gray-600 mb-3">{data.description}</p>
            <div className="flex flex-col">
                <div className="grid grid-cols-1 gap-2">
                    <button className=" bg-blue-500 text-white font-bold py-2 px-4 rounded">Classification</button>
                    <button className=" bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={handleDetection}>Detection</button>
                    <button className=" bg-blue-500 text-white font-bold py-2 px-4 rounded">Segmentation</button>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 justify-center">
                    <button className="bg-yellow-500 text-white font-bold py-2 px-4 rounded m-3 flex items-center justify-center" onClick={handleEditClick}><AiFillSetting className=" text-4xl"/></button>
                    <button className="bg-red-500 text-white font-bold py-2 px-4 rounded m-3 flex items-center justify-center"><BsFillTrash3Fill className="text-4xl"/></button>
                </div>
            </div>
        </div>
    )
}
export default Card;