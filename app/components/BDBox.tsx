"use client";

import React, { useState, useRef, useEffect } from 'react';

interface BoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  height: number;
}

const ImageWithBoundingBox: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [boxes, setBoxes] = useState<BoundingBox[]>([]);
  const [undoStack, setUndoStack] = useState<BoundingBox[][]>([]);
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
        ctx.strokeRect(box.x1, box.y1, box.width, box.height);
      });
    };
    image.src = imageUrl;
  }, [imageUrl, boxes]);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setStartPoint({ x, y });
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);

    const { x: x1, y: y1 } = startPoint;
    const { x: x2, y: y2 } = endPoint;

    const newBox: BoundingBox = {
      x1: Math.min(x1, x2),
      y1: Math.min(y1, y2),
      x2: Math.max(x1, x2),
      y2: Math.max(y1, y2),
      width: Math.abs(x2 - x1),
      height: Math.abs(y2 - y1),
    };
    setBoxes(prevBoxes => [...prevBoxes, newBox]);
    setUndoStack(prevUndoStack => [...prevUndoStack, boxes]);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setEndPoint({ x, y });
  };

  const handleSaveButtonClick = () => {
    console.log(boxes);
    // In real-world usage, you can use the bounding box data for further processing, such as sending it to a server to save in a database
  };

  const handleUndoButtonClick = () => {
    if (undoStack.length > 0) {
      const boxes = undoStack[undoStack.length - 1];
      const newUndoStack = undoStack.slice(0, -1);
      setBoxes(boxes);
      setUndoStack(newUndoStack);
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ cursor: 'crosshair' }}
      />
      <button onClick={handleSaveButtonClick} className='m-3 inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500'>Save</button>
      <button onClick={handleUndoButtonClick} className='m-3 inline-block rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500'>Undo</button>
    </div>
  );
};

export default ImageWithBoundingBox;