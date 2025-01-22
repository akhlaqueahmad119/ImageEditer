import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import styles from "./CaptionPage.module.css";

function CaptionPage({ image, onBack }) {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (!fabricCanvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current);
      fabricCanvasRef.current = fabricCanvas;
    }

    const fabricCanvas = fabricCanvasRef.current;

    if (image) {
      fabricCanvas.clear();

      fabric.Image.fromURL(image, { crossOrigin: "anonymous" })
        .then((img) => {
          if (img) {
            img.scaleToWidth(500);
            fabricCanvas.add(img);
            fabricCanvas.renderAll();
            setIsImageLoaded(true);
          } else {
            console.error("Failed to load the image.");
          }
        })
        .catch((error) => {
          console.error("Error loading image:", error);
        });
    }

    return () => {
      if (fabricCanvasRef.current && isImageLoaded) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [image, isImageLoaded]);

  const addText = () => {
    const fabricCanvas = fabricCanvasRef.current;
    if (!fabricCanvas) return;

    const text = new fabric.Textbox("Your Caption", {
      left: 50,
      top: 50,
      fontSize: 20,
      fill: "black",
      hasControls: true,
      lockScalingX: false,
      lockScalingY: false,
    });
    fabricCanvas.add(text);
    fabricCanvas.renderAll();
  };

  const addShape = (shapeType) => {
    const fabricCanvas = fabricCanvasRef.current;
    if (!fabricCanvas) return;

    let shape;
    switch (shapeType) {
      case "triangle":
        shape = new fabric.Triangle({
          width: 100,
          height: 100,
          fill: "blue",
          left: 150,
          top: 150,
        });
        break;
      case "circle":
        shape = new fabric.Circle({
          radius: 50,
          fill: "green",
          left: 150,
          top: 150,
        });
        break;
      case "rectangle":
        shape = new fabric.Rect({
          width: 100,
          height: 60,
          fill: "red",
          left: 150,
          top: 150,
        });
        break;
      case "polygon":
        shape = new fabric.Polygon(
          [
            { x: 100, y: 100 },
            { x: 150, y: 50 },
            { x: 200, y: 100 },
            { x: 150, y: 150 },
          ],
          {
            fill: "purple",
            left: 150,
            top: 150,
          }
        );
        break;
      default:
        return;
    }
    fabricCanvas.add(shape);
    fabricCanvas.renderAll();
  };

  const downloadImage = () => {
    const fabricCanvas = fabricCanvasRef.current;
    if (!fabricCanvas) return;

    const dataURL = fabricCanvas.toDataURL({ format: "png" });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "edited-image.png";
    link.click();
  };

  return (
    <div className={styles.captionPage}>
      <canvas ref={canvasRef} width={600} height={400}></canvas>
      <div>
        <button onClick={onBack}>Back</button>
        <button onClick={addText}>Add Caption</button>
        <button onClick={downloadImage}>Download</button>
        <button onClick={() => addShape("triangle")}>Add Triangle</button>
        <button onClick={() => addShape("circle")}>Add Circle</button>
        <button onClick={() => addShape("rectangle")}>Add Rectangle</button>
        <button onClick={() => addShape("polygon")}>Add Polygon</button>
      </div>
    </div>
  );
}

export default React.memo(CaptionPage);
