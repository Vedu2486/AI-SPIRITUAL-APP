import React, { createContext, useState, useContext, ReactNode } from 'react';
import { getRandomInsight, getRandomAffirmation } from '../utils/spiritualContent';

interface AIContextType {
  insight: string;
  affirmation: string;
  isGenerating: boolean;
  generateNewInsight: () => void;
  generateNewAffirmation: () => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const useAI = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

interface AIProviderProps {
  children: ReactNode;
}

export const AIProvider = ({ children }: AIProviderProps) => {
  const [insight, setInsight] = useState(getRandomInsight());
  const [affirmation, setAffirmation] = useState(getRandomAffirmation());
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNewInsight = () => {
    setIsGenerating(true);
    // Simulate AI generation with timeout
    setTimeout(() => {
      setInsight(getRandomInsight());
      setIsGenerating(false);
    }, 1500);
  };

  const generateNewAffirmation = () => {
    setIsGenerating(true);
    // Simulate AI generation with timeout
    setTimeout(() => {
      setAffirmation(getRandomAffirmation());
      setIsGenerating(false);
    }, 1500);
  };

  const value = {
    insight,
    affirmation,
    isGenerating,
    generateNewInsight,
    generateNewAffirmation,
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
};