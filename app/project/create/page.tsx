"use client"

import React, { useState } from 'react';

const Form = () => {
  const [projectName, setProjectName] = useState('');
  const [selectedProjects, setSelectedProjects] = useState<{ [key: string]: boolean }>({
    Classification: false,
    Detection: false,
    Segmentation: false,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
    console.log('Project Name:', projectName);
    const selectedProjectType = Object.keys(selectedProjects).find((type) => selectedProjects[type]);
    console.log('Project Type:', selectedProjectType);
  };

  const handleProjectTypeChange = (type: string) => {
    setSelectedProjects((prevSelectedProjects) => ({
      ...Object.keys(prevSelectedProjects).reduce((acc, key) => {
        acc[key] = key === type;
        return acc;
      }, {}),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className='p-8'>
      <div className="mb-4">
        <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Project Name</label>
        <input
          id="projectName"
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">Project Type</label>
        <div className="mt-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.keys(selectedProjects).map((type) => (
            <label key={type} className={`flex items-center p-4 rounded-lg shadow-md bg-white ${selectedProjects[type] ? 'border-2 border-indigo-500' : ''}`}>
              <input
                type="radio"
                value={type}
                checked={selectedProjects[type]}
                onChange={() => handleProjectTypeChange(type)}
                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>
      <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
};

export default Form;