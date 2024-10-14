import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AlertTriangle } from 'lucide-react';

const simulateSensorData = () => {
  // Simulate obstacle detection (random for demo purposes)
  return Math.random() < 0.3; // 30% chance of detecting an obstacle
};

const ObstacleDetection = ({ feedbackType }) => {
  const [obstacleDetected, setObstacleDetected] = useState(false);

  const { data: sensorData } = useQuery({
    queryKey: ['sensorData'],
    queryFn: simulateSensorData,
    refetchInterval: 1000, // Refetch every second to simulate real-time updates
  });

  useEffect(() => {
    if (sensorData) {
      setObstacleDetected(sensorData);
    }
  }, [sensorData]);

  useEffect(() => {
    if (obstacleDetected) {
      if (feedbackType === 'haptic') {
        // Simulate haptic feedback
        navigator.vibrate(200);
      } else if (feedbackType === 'audio') {
        // Simulate audio feedback
        const audio = new Audio('https://www.soundjay.com/buttons/beep-07.wav');
        audio.play();
      }
    }
  }, [obstacleDetected, feedbackType]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-vibrant-text dark:text-white">Obstacle Detection</h2>
      {obstacleDetected ? (
        <div className="flex items-center text-red-500">
          <AlertTriangle className="mr-2" />
          <span>Obstacle detected! Please be cautious.</span>
        </div>
      ) : (
        <div className="text-green-500">Path is clear.</div>
      )}
    </div>
  );
};

export default ObstacleDetection;