import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle } from 'lucide-react';
import sensorData from '../data/sensorData.json';
import ErrorMessage from './ErrorMessage';

const getObstacleData = () => {
  const obstacles = sensorData.obstacles;
  if (Math.random() < 0.1) { // Simulate 10% chance of connection error
    throw new Error('Failed to connect to obstacle detection sensor');
  }
  return obstacles[Math.floor(Math.random() * obstacles.length)];
};

const ObstacleDetection = ({ feedbackType }) => {
  const [obstacleDetected, setObstacleDetected] = useState(false);

  const { data: obstacle, error, isError } = useQuery({
    queryKey: ['obstacleData'],
    queryFn: getObstacleData,
    refetchInterval: 2000,
    retry: 2,
  });

  useEffect(() => {
    if (obstacle) {
      setObstacleDetected(obstacle.distance < 3);
      if (obstacle.distance < 3) {
        provideFeedback(obstacle);
      }
    }
  }, [obstacle]);

  const provideFeedback = (obstacle) => {
    if (feedbackType === 'haptic') {
      navigator.vibrate([100, 50, 100, 50, 100]);
    } else if (feedbackType === 'audio') {
      const utterance = new SpeechSynthesisUtterance(`Caution! ${obstacle.type} detected ${obstacle.distance} meters ahead.`);
      speechSynthesis.speak(utterance);
    }
  };

  if (isError) {
    return (
      <ErrorMessage 
        message="Unable to connect to obstacle detection sensor."
        resolution="Please check your device's connection and restart the app. If the problem persists, contact support."
      />
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-vibrant-text dark:text-white">Obstacle Detection</h2>
      {obstacleDetected ? (
        <div className="flex items-center text-red-500">
          <AlertTriangle className="mr-2" />
          <span>{`${obstacle.type} detected ${obstacle.distance} meters ahead. Be cautious!`}</span>
        </div>
      ) : (
        <div className="text-green-500">Path is clear.</div>
      )}
    </div>
  );
};

export default ObstacleDetection;