import React, { useState, useEffect } from 'react';

const BreathingAnimation = () => {
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [counter, setCounter] = useState(4);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev === 1) {
          // Move to next phase
          if (breathPhase === 'inhale') {
            setBreathPhase('hold');
            return 4; // Hold for 4 seconds
          } else if (breathPhase === 'hold') {
            setBreathPhase('exhale');
            return 6; // Exhale for 6 seconds
          } else if (breathPhase === 'exhale') {
            setBreathPhase('rest');
            return 2; // Rest for 2 seconds
          } else {
            setBreathPhase('inhale');
            return 4; // Inhale for 4 seconds
          }
        } else {
          return prev - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, breathPhase]);

  const handleToggle = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setBreathPhase('inhale');
      setCounter(4);
    }
  };

  const getInstructions = () => {
    switch (breathPhase) {
      case 'inhale':
        return 'Inhale slowly...';
      case 'hold':
        return 'Hold your breath...';
      case 'exhale':
        return 'Exhale gently...';
      case 'rest':
        return 'Rest...';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative mb-8">
        <div
          className={`w-40 h-40 rounded-full flex items-center justify-center transition-all duration-1000 ${
            breathPhase === 'inhale'
              ? 'scale-125 bg-indigo-100 dark:bg-indigo-900/30'
              : breathPhase === 'hold'
              ? 'scale-125 bg-purple-100 dark:bg-purple-900/30'
              : breathPhase === 'exhale'
              ? 'scale-100 bg-blue-100 dark:bg-blue-900/30'
              : 'scale-100 bg-gray-100 dark:bg-gray-800'
          }`}
        >
          <div
            className={`w-32 h-32 rounded-full flex items-center justify-center text-3xl font-bold transition-all duration-1000 ${
              breathPhase === 'inhale'
                ? 'scale-125 bg-indigo-200 dark:bg-indigo-800/30 text-indigo-800 dark:text-indigo-200'
                : breathPhase === 'hold'
                ? 'scale-125 bg-purple-200 dark:bg-purple-800/30 text-purple-800 dark:text-purple-200'
                : breathPhase === 'exhale'
                ? 'scale-100 bg-blue-200 dark:bg-blue-800/30 text-blue-800 dark:text-blue-200'
                : 'scale-100 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            {counter}
          </div>
        </div>
      </div>

      <p className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-6">{getInstructions()}</p>

      <button
        onClick={handleToggle}
        className={`px-6 py-3 rounded-full font-medium transition-colors ${
          isActive
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-indigo-500 hover:bg-indigo-600 text-white'
        }`}
      >
        {isActive ? 'Stop' : 'Start Breathing Exercise'}
      </button>
    </div>
  );
};

export default BreathingAnimation;