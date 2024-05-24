"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Annotorious } from '@recogito/annotorious';
import '@recogito/annotorious/dist/annotorious.min.css';
import axios from 'axios';

function App() {
  const imgEl = useRef();
  const [anno, setAnno] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [vocabulary, setVocabulary] = useState([]);
  // Fetch class names
  const fetchClassNames = async () => {
    try {
      const response = await axios.get('http://localhost:5000/detection/class/97', { withCredentials: true });
      setVocabulary(response.data.strClass);
    } catch (error) {
      console.error('Error fetching class names:', error);
    }
  };

  const fetchBoundingBoxes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/detection/bounding_box/388', { withCredentials: true });
      const data = response.data;

      if (anno) {
        anno.setAnnotations(data.annotation);
        const fetchedAnnotations = data.annotation.map(annotation => {
          const shape = annotation.target.selector.value;
          const [x, y, width, height] = shape.split('=')[1].split(':')[1].split(',').map(Number);

          return {
            id: annotation.id,
            x1: x,
            y1: y,
            x2: x + width,
            y2: y + height,
            width,
            height,
            class_label: annotation.body[0].value
          };
        });

        setAnnotations(fetchedAnnotations);
      }
    } catch (error) {
      console.error('Error fetching bounding boxes:', error);
    }
  };

  useEffect(() => {
    let annotorious = null;

    if (imgEl.current) {
      annotorious = new Annotorious({
        image: imgEl.current,
        widgets: [
          {
            widget: 'TAG',
            vocabulary: vocabulary, // Set vocabulary here
          }
        ]
      });

      annotorious.on('createAnnotation', annotation => {
        const shape = annotation.target.selector.value;
        const [x, y, width, height] = shape.split('=')[1].split(':')[1].split(',').map(Number);

        const newAnnotation = {
          id: annotation.id,
          x1: x,
          y1: y,
          x2: x + width,
          y2: y + height,
          width,
          height,
          class_label: annotation.body[0].value
        };

        setAnnotations(prevAnnotations => [...prevAnnotations, newAnnotation]);
      });

      annotorious.on('updateAnnotation', (annotation, previous) => {
        const shape = annotation.target.selector.value;
        const [x, y, width, height] = shape.split('=')[1].split(':')[1].split(',').map(Number);

        const updatedAnnotation = {
          id: annotation.id,
          x1: x,
          y1: y,
          x2: x + width,
          y2: y + height,
          width,
          height,
          class_label: annotation.body[0].value
        };

        setAnnotations(prevAnnotations => prevAnnotations.map(anno =>
          anno.id === annotation.id ? updatedAnnotation : anno
        ));
      });

      annotorious.on('deleteAnnotation', annotation => {
        setAnnotations(prevAnnotations => prevAnnotations.filter(anno => anno.id !== annotation.id));
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
      fetchBoundingBoxes();
    }
  }, [anno]);

  const sendBoundingBoxToBackend = () => {
    const dataToSend = {
      idproject: 97,
      iddetection: 388,
      bounding_box: annotations.map(annotation => ({
        id: annotation.id,
        class_label: annotation.class_label,
        width: annotation.width,
        height: annotation.height,
        x1: annotation.x1,
        x2: annotation.x2,
        y1: annotation.y1,
        y2: annotation.y2
      }))
    };

    axios.post('http://localhost:5000/create/detection/bounding_box', dataToSend, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then(response => {
      console.log('Success:', response.data);
      window.location.reload();
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <button onClick={sendBoundingBoxToBackend}>Send Annotations to Backend</button>
      <img 
        ref={imgEl} 
        src="http://localhost:5000/img/98/images/00000010.jpg" 
        alt="Hallstatt Town Square" />
    </div>
  );
}

export default App;