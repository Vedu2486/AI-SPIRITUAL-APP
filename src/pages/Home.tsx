import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAI } from '../context/AIContext';
import { Sparkles, BookHeart, Brain, Clock, RefreshCw } from 'lucide-react';
import BreathingAnimation from '../components/features/BreathingAnimation';

const Home = () => {
  const { insight, affirmation, isGenerating, generateNewInsight } = useAI();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate content in after a small delay
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="pt-20 pb-10">
      {/* Hero Section */}
      <section className={`relative py-20 px-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950"></div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-6">
            Discover Your Inner <span className="text-indigo-600 dark:text-indigo-400">Light</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Your AI spiritual companion for mindfulness, meditation, and personal growth on your journey to enlightenment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/meditation" className="btn-primary">
              Start Meditating
            </Link>
            <Link to="/insights" className="btn-secondary">
              Explore Insights
            </Link>
          </div>
        </div>
      </section>

      {/* Daily Insight Card */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform hover:shadow-2xl transition-all duration-300">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif font-semibold text-gray-900 dark:text-white flex items-center">
                  <Sparkles className="h-5 w-5 text-indigo-500 mr-2" />
                  Today's AI Insight
                </h2>
                <button 
                  onClick={generateNewInsight}
                  disabled={isGenerating}
                  className="p-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                >
                  <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                </button>
              </div>
              
              <blockquote className="text-xl italic font-medium text-gray-700 dark:text-gray-300 mb-4 transition-opacity duration-500">
                "{insight}"
              </blockquote>
              
              <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400 mt-6">
                {affirmation}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-900 dark:text-white mb-12">
            Nurture Your Spirit
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <BookHeart className="feature-icon" />
              </div>
              <h3 className="feature-title">Spiritual Journal</h3>
              <p className="feature-text">
                Record your spiritual experiences, dreams, and reflections in your private journal.
              </p>
              <Link to="/journal" className="feature-link">
                Start Writing
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Clock className="feature-icon" />
              </div>
              <h3 className="feature-title">Guided Meditation</h3>
              <p className="feature-text">
                Explore various meditation techniques with customizable timers and guidance.
              </p>
              <Link to="/meditation" className="feature-link">
                Begin Practice
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <Brain className="feature-icon" />
              </div>
              <h3 className="feature-title">AI Insights</h3>
              <p className="feature-text">
                Receive personalized spiritual insights and wisdom tailored to your journey.
              </p>
              <Link to="/insights" className="feature-link">
                Discover More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Breathing Exercise Preview */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-6">
            Take a Mindful Breath
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Experience the calming power of focused breathing with our interactive visualization.
          </p>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
            <BreathingAnimation />
          </div>
          
          <Link to="/meditation" className="btn-primary">
            Explore More Exercises
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;