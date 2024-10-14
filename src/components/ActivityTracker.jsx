import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Footprints, Ruler } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import activityData from '../data/activityData.json';

const getStoredActivityData = () => {
  const storedData = localStorage.getItem('activityData');
  return storedData ? JSON.parse(storedData) : activityData;
};

const simulateActivityData = () => {
  const lastActivity = getStoredActivityData().slice(-1)[0];
  const date = new Date(lastActivity.date);
  date.setDate(date.getDate() + 1);
  
  const steps = Math.floor(Math.random() * 1000) + 7000;
  const distance = (steps * 0.762) / 1000;
  
  return {
    date: date.toISOString().split('T')[0],
    steps,
    distance: distance.toFixed(2)
  };
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
      const newHistory = [...activityHistory, currentActivity].slice(-7);
      setActivityHistory(newHistory);
      localStorage.setItem('activityData', JSON.stringify(newHistory));
    }
  }, [currentActivity]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-2xl font-semibold mb-4 text-vibrant-text dark:text-white">Activity Tracker</h2>
      <div className="flex justify-around mb-4">
        <div className="flex items-center">
          <Footprints className="h-6 w-6 mr-2 text-vibrant-primary" />
          <span className="text-lg font-semibold text-vibrant-text dark:text-white">
            {currentActivity?.steps || activityHistory[activityHistory.length - 1].steps} steps
          </span>
        </div>
        <div className="flex items-center">
          <Ruler className="h-6 w-6 mr-2 text-vibrant-secondary" />
          <span className="text-lg font-semibold text-vibrant-text dark:text-white">
            {currentActivity?.distance || activityHistory[activityHistory.length - 1].distance} km
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={activityHistory}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
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