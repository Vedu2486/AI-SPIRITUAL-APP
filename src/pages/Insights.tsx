import React, { useState, useEffect } from 'react';
import { useAI } from '../context/AIContext';
import { Sparkles, RefreshCw, Search, BookOpen } from 'lucide-react';
import { getRandomQuote, getAllQuotes } from '../utils/spiritualContent';

const Insights = () => {
  const { insight, affirmation, isGenerating, generateNewInsight, generateNewAffirmation } = useAI();
  const [activeTab, setActiveTab] = useState<'ai' | 'quotes'>('ai');
  const [searchTerm, setSearchTerm] = useState('');
  const [quotes, setQuotes] = useState(getAllQuotes());
  const [filteredQuotes, setFilteredQuotes] = useState(getAllQuotes());
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favoriteQuotes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favoriteQuotes', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredQuotes(quotes);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredQuotes(
        quotes.filter(
          quote => 
            quote.text.toLowerCase().includes(term) || 
            quote.author.toLowerCase().includes(term)
        )
      );
    }
  }, [searchTerm, quotes]);

  const toggleFavorite = (quoteText: string) => {
    if (favorites.includes(quoteText)) {
      setFavorites(favorites.filter(q => q !== quoteText));
    } else {
      setFavorites([...favorites, quoteText]);
    }
  };

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-8 text-center">
          Spiritual Insights
        </h1>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'ai'
                  ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Sparkles className="h-4 w-4 inline-block mr-1" />
              AI Insights
            </button>
            <button
              onClick={() => setActiveTab('quotes')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'quotes'
                  ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <BookOpen className="h-4 w-4 inline-block mr-1" />
              Wisdom Quotes
            </button>
          </div>
        </div>

        {/* AI Insights Content */}
        {activeTab === 'ai' && (
          <div className="space-y-8">
            {/* Daily Insight */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white">AI Spiritual Insight</h2>
                  <button 
                    onClick={generateNewInsight}
                    disabled={isGenerating}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                  >
                    <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <blockquote className="text-xl italic font-medium text-gray-700 dark:text-gray-300 mb-6 transition-opacity duration-300">
                  "{insight}"
                </blockquote>
              </div>
            </div>
            
            {/* Daily Affirmation */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-teal-500 px-6 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white">Today's Affirmation</h2>
                  <button 
                    onClick={generateNewAffirmation}
                    disabled={isGenerating}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                  >
                    <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-xl font-medium text-center text-indigo-600 dark:text-indigo-400 transition-opacity duration-300">
                  {affirmation}
                </p>
              </div>
            </div>
            
            {/* More AI Features Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Inspiration for Your Practice
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Our AI-generated insights are designed to spark spiritual growth and self-reflection. 
                Use these insights as contemplation seeds for your meditation practice or journal writing.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                  <h4 className="font-medium text-indigo-700 dark:text-indigo-300 mb-2">
                    How to Use These Insights
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                    <li>Contemplate the meaning in your meditation</li>
                    <li>Use as prompts for your spiritual journal</li>
                    <li>Share with friends to spark meaningful discussions</li>
                    <li>Set as intentions for your daily practice</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <h4 className="font-medium text-purple-700 dark:text-purple-300 mb-2">
                    Benefits of Affirmations
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-disc list-inside">
                    <li>Reprogram limiting beliefs</li>
                    <li>Cultivate a positive mindset</li>
                    <li>Align your thoughts with your spiritual goals</li>
                    <li>Increase self-awareness and mindfulness</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quotes Content */}
        {activeTab === 'quotes' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Spiritual Wisdom Library
                </h2>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search quotes or authors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              
              {/* Filters */}
              <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
                <button
                  onClick={() => setSearchTerm('')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    searchTerm === ''
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  All Quotes
                </button>
                <button
                  onClick={() => setSearchTerm('favorite')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    searchTerm === 'favorite'
                      ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Favorites
                </button>
                <button
                  onClick={() => setSearchTerm('rumi')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    searchTerm === 'rumi'
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Rumi
                </button>
                <button
                  onClick={() => setSearchTerm('carl jung')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    searchTerm === 'carl jung'
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Carl Jung
                </button>
                <button
                  onClick={() => setSearchTerm('love')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    searchTerm === 'love'
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Love
                </button>
              </div>
              
              {/* Quotes List */}
              <div className="space-y-4">
                {filteredQuotes.length === 0 ? (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                    No quotes found matching your search.
                  </p>
                ) : (
                  filteredQuotes.map((quote, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <div className="flex justify-between">
                        <blockquote className="text-lg text-gray-700 dark:text-gray-300">
                          "{quote.text}"
                        </blockquote>
                        <button
                          onClick={() => toggleFavorite(quote.text)}
                          className={`ml-2 text-xl ${
                            favorites.includes(quote.text)
                              ? 'text-pink-500'
                              : 'text-gray-300 dark:text-gray-600 hover:text-pink-500 dark:hover:text-pink-500'
                          }`}
                        >
                          ❤
                        </button>
                      </div>
                      <p className="text-sm text-right mt-2 text-indigo-600 dark:text-indigo-400">
                        — {quote.author}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;