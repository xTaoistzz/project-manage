import React from "react";
import {useRouter} from "next/navigation";
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
                    <button className="btn btn-primary bg-blue-500 text-white font-bold py-2 px-4 rounded">Classification</button>
                    <button className="btn btn-secondary bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={handleDetection}>Detection</button>
                    <button className="btn btn-success bg-blue-500 text-white font-bold py-2 px-4 rounded">Segmentation</button>
                </div>
                <div className="flex mt-2 justify-center">
                    <button className="bg-yellow-500 text-white font-bold py-2 px-4 rounded m-3" onClick={handleEditClick}>Edit</button>
                    <button className="bg-red-500 text-white font-bold py-2 px-4 rounded m-3">Delete</button>
                </div>
            </div>
        </div>
    )
}
export default Card;