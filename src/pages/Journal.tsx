import React, { useState, useEffect } from 'react';
import { BookHeart, Plus, Calendar, Edit2, Trash2, Save, X, Moon, Sun, Cloud, ThumbsUp, Heart } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  mood: 'happy' | 'peaceful' | 'reflective' | 'grateful' | 'challenged';
  favorite: boolean;
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('spiritualJournalEntries');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<JournalEntry>({
    id: '',
    date: new Date().toISOString().split('T')[0],
    title: '',
    content: '',
    mood: 'peaceful',
    favorite: false
  });
  
  const [filter, setFilter] = useState<'all' | 'favorites' | string>('all');

  useEffect(() => {
    localStorage.setItem('spiritualJournalEntries', JSON.stringify(entries));
  }, [entries]);

  const handleNewEntry = () => {
    setIsEditing(true);
    setCurrentEntry({
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      title: '',
      content: '',
      mood: 'peaceful',
      favorite: false
    });
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setIsEditing(true);
    setCurrentEntry({ ...entry });
  };

  const handleSaveEntry = () => {
    if (!currentEntry.title.trim() || !currentEntry.content.trim()) return;
    
    if (entries.some(entry => entry.id === currentEntry.id)) {
      setEntries(entries.map(entry => 
        entry.id === currentEntry.id ? currentEntry : entry
      ));
    } else {
      setEntries([currentEntry, ...entries]);
    }
    
    setIsEditing(false);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
    if (currentEntry.id === id) {
      setIsEditing(false);
    }
  };

  const handleToggleFavorite = (id: string) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, favorite: !entry.favorite } : entry
    ));
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy':
        return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'peaceful':
        return <Moon className="h-5 w-5 text-indigo-500" />;
      case 'reflective':
        return <Cloud className="h-5 w-5 text-blue-500" />;
      case 'grateful':
        return <ThumbsUp className="h-5 w-5 text-green-500" />;
      case 'challenged':
        return <Heart className="h-5 w-5 text-red-500" />;
      default:
        return <Moon className="h-5 w-5 text-indigo-500" />;
    }
  };

  const filteredEntries = filter === 'all'
    ? entries
    : filter === 'favorites'
      ? entries.filter(entry => entry.favorite)
      : entries.filter(entry => entry.mood === filter);

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white">
            <BookHeart className="h-8 w-8 inline-block mr-3 text-indigo-500" />
            Spiritual Journal
          </h1>
          
          <button
            onClick={handleNewEntry}
            className="btn-primary"
          >
            <Plus className="h-5 w-5 mr-1" /> New Entry
          </button>
        </div>
        
        <div className="mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All Entries
            </button>
            <button
              onClick={() => setFilter('favorites')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === 'favorites'
                  ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Favorites
            </button>
            <button
              onClick={() => setFilter('happy')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center transition-colors ${
                filter === 'happy'
                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Sun className="h-4 w-4 mr-1" /> Happy
            </button>
            <button
              onClick={() => setFilter('peaceful')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center transition-colors ${
                filter === 'peaceful'
                  ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Moon className="h-4 w-4 mr-1" /> Peaceful
            </button>
            <button
              onClick={() => setFilter('reflective')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center transition-colors ${
                filter === 'reflective'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Cloud className="h-4 w-4 mr-1" /> Reflective
            </button>
            <button
              onClick={() => setFilter('grateful')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center transition-colors ${
                filter === 'grateful'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <ThumbsUp className="h-4 w-4 mr-1" /> Grateful
            </button>
            <button
              onClick={() => setFilter('challenged')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center transition-colors ${
                filter === 'challenged'
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Heart className="h-4 w-4 mr-1" /> Challenged
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Entry List Section */}
          <div className="md:col-span-1 space-y-4">
            {filteredEntries.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">No entries found</p>
                <button
                  onClick={handleNewEntry}
                  className="mt-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                >
                  Create your first entry
                </button>
              </div>
            ) : (
              filteredEntries.map(entry => (
                <div
                  key={entry.id}
                  onClick={() => handleEditEntry(entry)}
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 cursor-pointer transition-all hover:shadow-md ${
                    currentEntry.id === entry.id ? 'ring-2 ring-indigo-500' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                      {entry.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {getMoodIcon(entry.mood)}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(entry.id);
                        }}
                        className={`p-1 rounded transition-colors ${
                          entry.favorite
                            ? 'text-pink-500'
                            : 'text-gray-400 hover:text-pink-500'
                        }`}
                      >
                        ❤
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                    {entry.content}
                  </p>
                  <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Entry Editor/Viewer Section */}
          <div className="md:col-span-2">
            {isEditing ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {currentEntry.id && entries.some(e => e.id === currentEntry.id) ? 'Edit Entry' : 'New Entry'}
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveEntry}
                      className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
                      title="Save"
                    >
                      <Save className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      title="Cancel"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={currentEntry.title}
                      onChange={(e) => setCurrentEntry({ ...currentEntry, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Entry title"
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        value={currentEntry.date}
                        onChange={(e) => setCurrentEntry({ ...currentEntry, date: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    
                    <div className="w-1/2">
                      <label htmlFor="mood" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Mood
                      </label>
                      <select
                        id="mood"
                        value={currentEntry.mood}
                        onChange={(e) => setCurrentEntry({ ...currentEntry, mood: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="happy">Happy</option>
                        <option value="peaceful">Peaceful</option>
                        <option value="reflective">Reflective</option>
                        <option value="grateful">Grateful</option>
                        <option value="challenged">Challenged</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Journal Entry
                    </label>
                    <textarea
                      id="content"
                      rows={12}
                      value={currentEntry.content}
                      onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Write your spiritual experience, reflections, or insights..."
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      id="favorite"
                      checked={currentEntry.favorite}
                      onChange={(e) => setCurrentEntry({ ...currentEntry, favorite: e.target.checked })}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="favorite" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Mark as favorite
                    </label>
                  </div>
                </div>
              </div>
            ) : currentEntry.id && entries.some(e => e.id === currentEntry.id) ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white">
                    {currentEntry.title}
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditEntry(currentEntry)}
                      className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteEntry(currentEntry.id)}
                      className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(currentEntry.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    {getMoodIcon(currentEntry.mood)}
                    <span className="ml-1 capitalize">{currentEntry.mood}</span>
                  </div>
                  {currentEntry.favorite && (
                    <div className="flex items-center text-pink-500">
                      ❤ Favorite
                    </div>
                  )}
                </div>
                
                <div className="prose dark:prose-invert max-w-none">
                  <p className="whitespace-pre-line">{currentEntry.content}</p>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
                <BookHeart className="h-16 w-16 text-indigo-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Your Spiritual Journal
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Record your spiritual experiences, insights, and reflections to deepen your practice.
                </p>
                <button
                  onClick={handleNewEntry}
                  className="btn-primary"
                >
                  <Plus className="h-5 w-5 mr-1" /> Create New Entry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;