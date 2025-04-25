import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Circle, MoreHorizontal, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { getPractices } from '../utils/spiritualContent';

interface Practice {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
  completedDates: string[];
}

const Practices = () => {
  // Initialize practices from the spiritual content and local storage
  const [practices, setPractices] = useState<Practice[]>(() => {
    const savedPractices = localStorage.getItem('spiritualPractices');
    if (savedPractices) {
      return JSON.parse(savedPractices);
    } else {
      // Initialize with default practices
      return getPractices().map(practice => ({
        id: Math.random().toString(36).substr(2, 9),
        name: practice.name,
        description: practice.description,
        isCompleted: false,
        completedDates: [],
      }));
    }
  });
  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isAddingPractice, setIsAddingPractice] = useState(false);
  const [newPractice, setNewPractice] = useState({ name: '', description: '' });
  const [editingPracticeId, setEditingPracticeId] = useState<string | null>(null);
  const [practiceStreak, setPracticeStreak] = useState<number>(0);
  
  useEffect(() => {
    localStorage.setItem('spiritualPractices', JSON.stringify(practices));
  }, [practices]);
  
  useEffect(() => {
    // Calculate practice streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let currentStreak = 0;
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const completed = practices.some(practice => 
        practice.completedDates.includes(dateString)
      );
      
      if (completed) {
        currentStreak++;
      } else if (i > 0) { // Don't break streak for today
        break;
      }
    }
    
    setPracticeStreak(currentStreak);
  }, [practices]);

  const toggleCompleted = (practiceId: string) => {
    setPractices(practices.map(practice => {
      if (practice.id === practiceId) {
        const isDateCompleted = practice.completedDates.includes(selectedDate);
        const updatedDates = isDateCompleted
          ? practice.completedDates.filter(date => date !== selectedDate)
          : [...practice.completedDates, selectedDate];
        
        return {
          ...practice,
          completedDates: updatedDates,
          isCompleted: !isDateCompleted,
        };
      }
      return practice;
    }));
  };

  const handleAddPractice = () => {
    if (!newPractice.name.trim()) return;
    
    const practice: Practice = {
      id: Math.random().toString(36).substr(2, 9),
      name: newPractice.name,
      description: newPractice.description,
      isCompleted: false,
      completedDates: [],
    };
    
    setPractices([...practices, practice]);
    setNewPractice({ name: '', description: '' });
    setIsAddingPractice(false);
  };

  const handleUpdatePractice = (practiceId: string) => {
    if (!newPractice.name.trim()) return;
    
    setPractices(practices.map(practice => 
      practice.id === practiceId
        ? { ...practice, name: newPractice.name, description: newPractice.description }
        : practice
    ));
    
    setNewPractice({ name: '', description: '' });
    setEditingPracticeId(null);
  };

  const handleEditPractice = (practice: Practice) => {
    setNewPractice({ name: practice.name, description: practice.description });
    setEditingPracticeId(practice.id);
  };

  const handleDeletePractice = (practiceId: string) => {
    setPractices(practices.filter(practice => practice.id !== practiceId));
    if (editingPracticeId === practiceId) {
      setEditingPracticeId(null);
      setNewPractice({ name: '', description: '' });
    }
  };

  const getCompletedPracticesForDate = (date: string) => {
    return practices.filter(practice => practice.completedDates.includes(date)).length;
  };

  const generateCalendarDays = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      const dayName = i === 0 ? 'Today' : i === 1 ? 'Yesterday' : date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayOfMonth = date.getDate();
      
      days.push({
        date: dateString,
        dayName,
        dayOfMonth,
        completedCount: getCompletedPracticesForDate(dateString),
      });
    }
    
    return days.reverse();
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-8 text-center">
          Spiritual Practices
        </h1>
        
        {/* Stats Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 text-center">
              <p className="text-sm text-indigo-700 dark:text-indigo-300 mb-1">Current Streak</p>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{practiceStreak} days</p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
              <p className="text-sm text-purple-700 dark:text-purple-300 mb-1">Today's Progress</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {getCompletedPracticesForDate(new Date().toISOString().split('T')[0])}/{practices.length}
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-1">Total Practices</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{practices.length}</p>
            </div>
          </div>
        </div>
        
        {/* Calendar Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6 overflow-x-auto">
          <div className="flex space-x-4 min-w-max">
            {calendarDays.map((day) => (
              <button
                key={day.date}
                onClick={() => setSelectedDate(day.date)}
                className={`px-3 py-2 rounded-lg transition-colors flex-1 min-w-[80px] ${
                  selectedDate === day.date
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-300 dark:border-indigo-700'
                    : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <p className="text-xs text-gray-500 dark:text-gray-400">{day.dayName}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">{day.dayOfMonth}</p>
                <div className="flex items-center justify-center mt-1">
                  <div className={`h-2 w-2 rounded-full ${day.completedCount > 0 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 ml-1">{day.completedCount}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Practices List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-indigo-500" />
              {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h2>
            
            <button
              onClick={() => {
                setIsAddingPractice(true);
                setEditingPracticeId(null);
                setNewPractice({ name: '', description: '' });
              }}
              className="px-3 py-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Practice
            </button>
          </div>
          
          {isAddingPractice && (
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                Add New Practice
              </h3>
              <div className="space-y-3">
                <div>
                  <label htmlFor="practice-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Practice Name
                  </label>
                  <input
                    type="text"
                    id="practice-name"
                    value={newPractice.name}
                    onChange={(e) => setNewPractice({ ...newPractice, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., Morning Meditation"
                  />
                </div>
                <div>
                  <label htmlFor="practice-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    id="practice-description"
                    rows={2}
                    value={newPractice.description}
                    onChange={(e) => setNewPractice({ ...newPractice, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Describe your practice..."
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsAddingPractice(false)}
                    className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddPractice}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                  >
                    Add Practice
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {editingPracticeId && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                Edit Practice
              </h3>
              <div className="space-y-3">
                <div>
                  <label htmlFor="edit-practice-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Practice Name
                  </label>
                  <input
                    type="text"
                    id="edit-practice-name"
                    value={newPractice.name}
                    onChange={(e) => setNewPractice({ ...newPractice, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="edit-practice-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    id="edit-practice-description"
                    rows={2}
                    value={newPractice.description}
                    onChange={(e) => setNewPractice({ ...newPractice, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => {
                      setEditingPracticeId(null);
                      setNewPractice({ name: '', description: '' });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdatePractice(editingPracticeId)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            {practices.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  You haven't added any spiritual practices yet.
                </p>
                <button
                  onClick={() => setIsAddingPractice(true)}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                  Add Your First Practice
                </button>
              </div>
            ) : (
              practices.map((practice) => {
                const isCompleted = practice.completedDates.includes(selectedDate);
                
                return (
                  <div 
                    key={practice.id}
                    className={`p-4 rounded-lg border transition-colors ${
                      isCompleted
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <button
                          onClick={() => toggleCompleted(practice.id)}
                          className={`mt-0.5 mr-3 transition-colors ${
                            isCompleted
                              ? 'text-green-500 hover:text-green-600'
                              : 'text-gray-400 dark:text-gray-600 hover:text-gray-500 dark:hover:text-gray-500'
                          }`}
                        >
                          {isCompleted ? <CheckCircle className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
                        </button>
                        <div>
                          <h3 className={`font-medium ${
                            isCompleted
                              ? 'text-green-700 dark:text-green-400'
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {practice.name}
                          </h3>
                          {practice.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {practice.description}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-1">
                        <button
                          onClick={() => handleEditPractice(practice)}
                          className="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePractice(practice.id)}
                          className="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        
        {/* Inspiration Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h2 className="text-xl font-semibold mb-4">Practice Wisdom</h2>
          <blockquote className="italic mb-4">
            "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
          </blockquote>
          <p className="text-right text-indigo-100">— Aristotle</p>
        </div>
      </div>
    </div>
  );
};

export default Practices;