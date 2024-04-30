// components/ImageWithBoundingBox.tsx

import React, { useState, useRef, useEffect } from 'react';

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ImageWithBoundingBox: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const [boxes, setBoxes] = useState<BoundingBox[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      // draw bounding boxes
      boxes.forEach(box => {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(box.x, box.y, box.width, box.height);
      });
    };
    image.src = imageUrl;
  }, [imageUrl, boxes]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const newBox: BoundingBox = { x, y, width: 50, height: 50 }; // example, you can adjust size as needed
    setBoxes(prevBoxes => [...prevBoxes, newBox]);
  };

  return <canvas ref={canvasRef} onClick={handleCanvasClick} />;
};

export default ImageWithBoundingBox;