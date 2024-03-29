import React from 'react';

const projects = [
  {
    name: 'Project 1',
    type: 'Type A',
    description: 'Description for Project 1',
  },
  {
    name: 'Project 2',
    type: 'Type B',
    description: 'Description for Project 2',
  },
  {
    name: 'Project 3',
    type: 'Type C',
    description: 'Description for Project 3',
  },
  {
    name: 'Project 4',
    type: 'Type D',
    description: 'Description for Project 4',
  },
  // Add more projects as needed
];

const ProjectList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {projects.map((project, index) => (
        <div key={index} className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-2">{project.name}</h2>
          <p className="text-sm text-gray-600 mb-1">{project.type}</p>
          <p className="text-sm text-gray-700">{project.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
