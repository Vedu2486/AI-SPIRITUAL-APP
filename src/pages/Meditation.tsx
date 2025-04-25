import React, { useState } from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { getMeditationGuides } from '../utils/spiritualContent';
import BreathingAnimation from '../components/features/BreathingAnimation';

const Meditation = () => {
  const meditationGuides = getMeditationGuides();
  const [selectedGuide, setSelectedGuide] = useState(meditationGuides[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(selectedGuide.duration * 60);
  const [customDuration, setCustomDuration] = useState(5);
  const [selectedTab, setSelectedTab] = useState<'guided' | 'timer' | 'breathing'>('guided');

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectGuide = (guide: any) => {
    setSelectedGuide(guide);
    setTimeRemaining(guide.duration * 60);
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setTimeRemaining(selectedGuide.duration * 60);
    setIsPlaying(false);
  };

  const handleCustomDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCustomDuration(value > 0 ? value : 1);
    setTimeRemaining(value * 60);
  };

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-8 text-center">
          Meditation Sanctuary
        </h1>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setSelectedTab('guided')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedTab === 'guided'
                  ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Guided Meditation
            </button>
            <button
              onClick={() => setSelectedTab('timer')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedTab === 'timer'
                  ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Meditation Timer
            </button>
            <button
              onClick={() => setSelectedTab('breathing')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedTab === 'breathing'
                  ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              Breathing Exercise
            </button>
          </div>
        </div>

        {/* Guided Meditation */}
        {selectedTab === 'guided' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Choose a Practice
              </h2>
              
              <div className="space-y-2">
                {meditationGuides.map((guide, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectGuide(guide)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedGuide.title === guide.title
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-indigo-500'
                        : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-medium text-gray-900 dark:text-white">{guide.title}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{guide.duration} minutes</div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="mb-6">
                <h3 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white mb-2">
                  {selectedGuide.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {selectedGuide.description}
                </p>
                
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-8 flex flex-col items-center">
                  <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mb-6">
                    {formatTime(timeRemaining)}
                  </div>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={handleTogglePlay}
                      className="p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                    >
                      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                    <button
                      onClick={handleReset}
                      className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      <RotateCcw size={24} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Meditation Tips:</h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                  <li>Find a quiet, comfortable place where you won't be disturbed</li>
                  <li>Sit in a relaxed position with your back straight</li>
                  <li>Close your eyes or maintain a soft gaze</li>
                  <li>Allow thoughts to come and go without judgment</li>
                  <li>Return to the practice whenever your mind wanders</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Timer */}
        {selectedTab === 'timer' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="max-w-md mx-auto text-center">
              <div className="mb-8">
                <Clock className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
                <h2 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white">
                  Meditation Timer
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Set your own meditation duration
                </p>
              </div>
              
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={customDuration}
                  onChange={handleCustomDurationChange}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-4xl font-bold text-indigo-700 dark:text-indigo-300 mt-4">
                  {customDuration} {customDuration === 1 ? 'minute' : 'minutes'}
                </div>
              </div>
              
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-8 mb-8">
                <div className="text-5xl font-bold text-indigo-700 dark:text-indigo-300 mb-6">
                  {formatTime(timeRemaining)}
                </div>
                
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={handleTogglePlay}
                    className="p-4 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                  >
                    {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                  </button>
                  <button
                    onClick={handleReset}
                    className="p-4 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    <RotateCcw size={28} />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 italic">
                "The goal of meditation isn't to control your thoughts, it's to stop letting them control you."
              </p>
            </div>
          </div>
        )}
        
        {/* Breathing Exercise */}
        {selectedTab === 'breathing' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="max-w-md mx-auto text-center">
              <h2 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white mb-4">
                Breathing Exercise
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Use this guided breathing exercise to calm your mind and center your awareness.
              </p>
              
              <div className="mb-8">
                <BreathingAnimation />
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-left">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Benefits of Breath Work:</h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                  <li>Reduces stress and anxiety</li>
                  <li>Improves focus and concentration</li>
                  <li>Balances your nervous system</li>
                  <li>Enhances mindfulness and present moment awareness</li>
                  <li>Helps regulate emotions</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Meditation;