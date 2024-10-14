import React, { useState, useEffect } from 'react';
import { User, Calendar, Bell } from 'lucide-react';
import ObstacleDetection from '../components/ObstacleDetection';
import Navigation from '../components/Navigation';
import ActivityTracker from '../components/ActivityTracker';
import userProfileData from '../data/userProfile.json';

const Dashboard = () => {
  const [feedbackType, setFeedbackType] = useState(userProfileData.preferredFeedback);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfileData));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h1 className="text-4xl font-semibold text-vibrant-text dark:text-white mb-6">Welcome, {userProfileData.name}</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Here you can manage your mobility assistance needs.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-vibrant-primary dark:bg-vibrant-secondary p-6 rounded-lg shadow-md">
          <User className="h-12 w-12 text-white mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">Profile</h2>
          <p className="text-white">Manage your personal information and preferences.</p>
        </div>
        <div className="bg-vibrant-secondary dark:bg-vibrant-primary p-6 rounded-lg shadow-md">
          <Calendar className="h-12 w-12 text-white mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">Schedule</h2>
          <p className="text-white">View and manage your upcoming appointments.</p>
        </div>
        <div className="bg-vibrant-accent dark:bg-vibrant-accent p-6 rounded-lg shadow-md">
          <Bell className="h-12 w-12 text-vibrant-text mb-4" />
          <h2 className="text-2xl font-semibold text-vibrant-text mb-2">Notifications</h2>
          <p className="text-vibrant-text">Stay updated with important alerts and reminders.</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-vibrant-text dark:text-white mb-4">Feedback Preferences</h2>
        <select
          value={feedbackType}
          onChange={(e) => setFeedbackType(e.target.value)}
          className="bg-white dark:bg-gray-700 text-vibrant-text dark:text-white border border-gray-300 dark:border-gray-600 rounded px-4 py-2"
        >
          <option value="audio">Audio</option>
          <option value="haptic">Haptic</option>
        </select>
      </div>

      <ActivityTracker />
      <Navigation feedbackType={feedbackType} />
      <ObstacleDetection feedbackType={feedbackType} />
    </div>
  );
};

export default Dashboard;