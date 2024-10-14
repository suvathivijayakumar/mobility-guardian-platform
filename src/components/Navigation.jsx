import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MapPin, ArrowRight, ArrowLeft, ArrowUp, ArrowDown } from 'lucide-react';
import sensorData from '../data/sensorData.json';

const getNavigationData = () => {
  const directions = sensorData.navigation;
  return directions[Math.floor(Math.random() * directions.length)];
};

const Navigation = ({ feedbackType }) => {
  const [currentDirection, setCurrentDirection] = useState('');

  const { data: navigationData } = useQuery({
    queryKey: ['navigationData'],
    queryFn: getNavigationData,
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (navigationData) {
      setCurrentDirection(navigationData.instruction);
      provideFeedback(navigationData);
    }
  }, [navigationData]);

  const provideFeedback = (direction) => {
    if (feedbackType === 'haptic') {
      switch (direction.instruction) {
        case 'Turn right':
          navigator.vibrate([100, 50, 100]);
          break;
        case 'Turn left':
          navigator.vibrate([100, 50, 100, 50, 100]);
          break;
        case 'Go straight':
          navigator.vibrate(200);
          break;
        case 'You have arrived':
          navigator.vibrate([200, 100, 200, 100, 200]);
          break;
      }
    } else if (feedbackType === 'audio') {
      const utterance = new SpeechSynthesisUtterance(`${direction.instruction}. Continue for ${direction.distance} meters.`);
      speechSynthesis.speak(utterance);
    }
  };

  const getDirectionIcon = () => {
    switch (currentDirection) {
      case 'Turn right':
        return <ArrowRight className="h-8 w-8" />;
      case 'Turn left':
        return <ArrowLeft className="h-8 w-8" />;
      case 'Go straight':
        return <ArrowUp className="h-8 w-8" />;
      case 'You have arrived':
        return <MapPin className="h-8 w-8" />;
      default:
        return <ArrowDown className="h-8 w-8" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-2xl font-semibold mb-4 text-vibrant-text dark:text-white">Navigation</h2>
      <div className="flex items-center justify-center mb-4">
        {getDirectionIcon()}
      </div>
      <p className="text-lg text-center text-vibrant-text dark:text-white">{currentDirection}</p>
      {navigationData && (
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          Continue for {navigationData.distance} meters
        </p>
      )}
    </div>
  );
};

export default Navigation;