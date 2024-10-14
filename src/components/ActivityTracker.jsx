import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Footprints, Ruler } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const simulateActivityData = () => {
  const steps = Math.floor(Math.random() * 1000) + 500; // Random steps between 500 and 1500
  const distance = (steps * 0.762) / 1000; // Approximate distance in km (average step length 76.2 cm)
  return { steps, distance: distance.toFixed(2) };
};

const getStoredActivityData = () => {
  const storedData = localStorage.getItem('activityData');
  return storedData ? JSON.parse(storedData) : [];
};

const ActivityTracker = () => {
  const [activityHistory, setActivityHistory] = useState(getStoredActivityData());

  const { data: currentActivity } = useQuery({
    queryKey: ['activityData'],
    queryFn: simulateActivityData,
    refetchInterval: 60000, // Update every minute
  });

  useEffect(() => {
    if (currentActivity) {
      const newHistory = [...activityHistory, { ...currentActivity, date: new Date().toISOString() }];
      setActivityHistory(newHistory.slice(-7)); // Keep only the last 7 days
      localStorage.setItem('activityData', JSON.stringify(newHistory.slice(-7)));
    }
  }, [currentActivity]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-2xl font-semibold mb-4 text-vibrant-text dark:text-white">Activity Tracker</h2>
      <div className="flex justify-around mb-4">
        <div className="flex items-center">
          <Footprints className="h-6 w-6 mr-2 text-vibrant-primary" />
          <span className="text-lg font-semibold text-vibrant-text dark:text-white">
            {currentActivity?.steps || 0} steps
          </span>
        </div>
        <div className="flex items-center">
          <Ruler className="h-6 w-6 mr-2 text-vibrant-secondary" />
          <span className="text-lg font-semibold text-vibrant-text dark:text-white">
            {currentActivity?.distance || 0} km
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={activityHistory}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="steps" stroke="#FF6B6B" name="Steps" />
          <Line yAxisId="right" type="monotone" dataKey="distance" stroke="#4ECDC4" name="Distance (km)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityTracker;