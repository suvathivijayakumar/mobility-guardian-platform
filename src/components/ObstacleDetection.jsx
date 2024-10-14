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
    refetchInterval: 2000, // Refetch every 2 seconds to simulate real-time updates
  });

  useEffect(() => {
    if (sensorData) {
      setObstacleDetected(sensorData);
      if (sensorData) {
        provideFeedback();
      }
    }
  }, [sensorData]);

  const provideFeedback = () => {
    if (feedbackType === 'haptic') {
      // Simulate haptic feedback
      navigator.vibrate([100, 50, 100, 50, 100, 50, 100]);
    } else if (feedbackType === 'audio') {
      // Simulate audio feedback
      const utterance = new SpeechSynthesisUtterance("Caution! Obstacle detected.");
      speechSynthesis.speak(utterance);
    }
  };

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