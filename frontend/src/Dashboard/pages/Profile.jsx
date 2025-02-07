import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faPhone, 
  faLocationDot,
  faProjectDiagram,
  faCalendarCheck
} from '@fortawesome/free-solid-svg-icons';
import StatCard from '../components/cards/StatCard';

const Profile = () => {
  const [profileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    avatar: 'https://via.placeholder.com/150',
    bio: 'Senior Software Developer with 5+ years of experience in React and Node.js',
  });

  const stats = [
    {
      title: 'Projects Completed',
      value: '47',
      icon: <FontAwesomeIcon icon={faProjectDiagram} size="2x" />,
      change: 12.5
    },
    {
      title: 'Tasks Done',
      value: '156',
      icon: <FontAwesomeIcon icon={faCalendarCheck} size="2x" />,
      change: 8.2
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img 
            src={profileData.avatar} 
            alt="Profile" 
            className="w-32 h-32 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{profileData.name}</h1>
            <p className="text-gray-600 mb-4">{profileData.bio}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <FontAwesomeIcon icon={faEnvelope} />
                <span>{profileData.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FontAwesomeIcon icon={faPhone} />
                <span>{profileData.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{profileData.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Additional Profile Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {['React', 'Node.js', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Git'].map((skill) => (
              <span 
                key={skill}
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {['Updated profile picture', 'Completed project X', 'Added new skill'].map((activity, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">{activity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
