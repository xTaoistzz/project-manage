//This is Component for Segmentations

"use client";
import React, { useEffect, useRef, useState } from "react";
import { Annotorious } from "@recogito/annotorious";
import "@recogito/annotorious/dist/annotorious.min.css";
import axios from "axios";

function ImageWithPolygon({ idproject, idsegmentation, imageUrl }) {
  const imgEl = useRef();
  const [anno, setAnno] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [vocabulary, setVocabulary] = useState([]);

  // Fetch class names
  const fetchClassNames = async () => {
    try {
      const response = await axios.get(
        `${process.env.BACK_URL}/segmentation/class/${idproject}`,
        { withCredentials: true }
      );
      setVocabulary(response.data.strClass);
    } catch (error) {
      console.error("Error fetching class names:", error);
    }
  };

  // Fetch bounding boxes
  const fetchPolygon = async () => {
    try {
      const response = await axios.get(
        `${process.env.BACK_URL}/segmentation/polygon/${idsegmentation}`,
        { withCredentials: true }
      );
      const data = response.data;

      if (anno) {
        anno.setAnnotations(data.annotation);
        const fetchedAnnotations = data.annotation.map((annotation) => {
          const shape = annotation.target.selector.value;
          const points = shape.match(/points="([^"]*)"/)[1];

          return {
            id: annotation.id,
            points: points,
            class_label: annotation.body[0].value,
          };
        });

        setAnnotations(fetchedAnnotations);
      }
    } catch (error) {
      console.error("Error fetching bounding boxes:", error);
    }
  };

  useEffect(() => {
    let annotorious = null;

    if (imgEl.current) {
      annotorious = new Annotorious({
        image: imgEl.current,
        tools: ["polygon"], // Specify only polygon tool
        widgets: [
          {
            widget: "TAG",
            vocabulary: vocabulary, // Set vocabulary here
          },
        ],
      });
      annotorious.setDrawingTool("polygon");
      annotorious.on("createAnnotation", (annotation) => {
        console.log(annotation);
        const shape = annotation.target.selector.value;
        const points = shape.match(/points="([^"]*)"/)[1];

        const newAnnotation = {
          id: annotation.id,
          points: points,
          class_label: annotation.body[0].value,
        };

        setAnnotations((prevAnnotations) => [
          ...prevAnnotations,
          newAnnotation,
        ]);
      });

      annotorious.on("updateAnnotation", (annotation, previous) => {
        const shape = annotation.target.selector.value;
        const points = shape.match(/points="([^"]*)"/)[1];

        const updatedAnnotation = {
          id: annotation.id,
          points: points,
          class_label: annotation.body[0].value,
        };

        setAnnotations((prevAnnotations) =>
          prevAnnotations.map((anno) =>
            anno.id === annotation.id ? updatedAnnotation : anno
          )
        );
      });

      annotorious.on("deleteAnnotation", (annotation) => {
        setAnnotations((prevAnnotations) =>
          prevAnnotations.filter((anno) => anno.id !== annotation.id)
        );
      });

      setAnno(annotorious);
    }

    // Cleanup: destroy current instance
    return () => annotorious?.destroy();
  }, [vocabulary]); // Run effect when vocabulary changes

  // Fetch class names and bounding boxes when component mounts
  useEffect(() => {
    fetchClassNames();
  }, []);

  useEffect(() => {
    if (anno) {
      fetchPolygon();
    }
  }, [anno]);

  const sendPolygonToBackend = () => {
    const dataToSend = {
      idproject: idproject,
      idsegmentation: idsegmentation,
      polygon: annotations.map((annotation) => ({
        id: annotation.id,
        class_label: annotation.class_label,
        points: annotation.points,
      })),
    };

    axios
      .post("${process.env.BACK_URL}/create/segmentation/polygon", dataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log("Success:", response.data);
        fetchPolygon();
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <button onClick={sendPolygonToBackend}>
        Send Annotations to Backend
      </button>
      <img
        onLoad={() => {
          fetchClassNames();
          fetchPolygon();
        }}
        ref={imgEl}
        src={imageUrl}
        alt="Hallstatt Town Square"
        style={{ cursor: "crosshair" }}
      />
    </div>
  );
}

export default ImageWithPolygon;
