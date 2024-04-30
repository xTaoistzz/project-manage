"use client"

import ImageUploader from "@/app/components/Upload";

const Detection = ({ params }: { params: { id: any } }) => {
  const idproject = params.id
  return (
    <div className=" flex flex-col items-center justify-center">
      <div className="">Upload Image</div>
      <ImageUploader idproject={idproject} type="detection" />
    </div>
  );
};

export default Detection;