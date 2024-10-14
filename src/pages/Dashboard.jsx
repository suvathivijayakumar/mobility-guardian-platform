import React from 'react';
import { User, Calendar, Bell } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h1 className="text-4xl font-semibold text-vibrant-text dark:text-white mb-6">Welcome to Mobility Assistance Platform</h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Here you can manage your mobility assistance needs.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    </div>
  );
};

export default Dashboard;