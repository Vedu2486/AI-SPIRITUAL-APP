// Collection of spiritual insights
const insights = [
  "The universe doesn't give you what you ask for with your thoughts; it gives you what you demand with your actions.",
  "Your perception creates your reality. Change your perception, change your life.",
  "Everything in life is vibration. Match the frequency of the reality you want.",
  "You are not a drop in the ocean. You are the entire ocean in a drop.",
  "The wound is the place where the Light enters you.",
  "What you seek is seeking you.",
  "We are not human beings having a spiritual experience. We are spiritual beings having a human experience.",
  "The soul always knows what to do to heal itself. The challenge is to silence the mind.",
  "Awareness is the greatest agent for change.",
  "When you connect to the silence within you, that is when you can make sense of the disturbance going on around you.",
  "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.",
  "The privilege of a lifetime is to become who you truly are.",
];

// Collection of affirmations
const affirmations = [
  "I am connected to the divine wisdom of the universe.",
  "My spirit is strong, my mind is clear, my body is healthy.",
  "I release what no longer serves me to make space for what inspires me.",
  "I am worthy of peace, joy, and all the blessings that come my way.",
  "My potential to succeed is infinite.",
  "I trust the journey even when I do not understand it.",
  "Today, I choose peace over worry and faith over fear.",
  "I am grateful for the abundance that flows into my life.",
  "My thoughts are powerful, and I choose them wisely.",
  "I embrace my spiritual growth with openness and curiosity.",
  "Divine energy flows through me, guiding my actions and decisions.",
  "I am exactly where I need to be on my spiritual journey.",
];

// Collection of meditation guidance
const meditationGuides = [
  {
    title: "Breath Awareness",
    description: "Focus on the sensation of your breath entering and leaving your body. Notice the rise and fall of your chest and abdomen.",
    duration: 5,
  },
  {
    title: "Body Scan",
    description: "Bring awareness to each part of your body, starting from your toes and moving up to the crown of your head.",
    duration: 10,
  },
  {
    title: "Loving-Kindness",
    description: "Generate feelings of love and compassion for yourself, then extend those feelings to others.",
    duration: 15,
  },
  {
    title: "Chakra Alignment",
    description: "Focus on each of your seven chakras, visualizing them as spinning wheels of energy in perfect balance.",
    duration: 20,
  },
  {
    title: "Third Eye Activation",
    description: "Direct your attention to the space between your eyebrows, connecting with your intuition and inner wisdom.",
    duration: 10,
  },
  {
    title: "Sound Meditation",
    description: "Focus on the ambient sounds around you without judging or analyzing them, simply being aware of their presence.",
    duration: 5,
  },
];

// Spiritual quotes
const quotes = [
  { text: "The spiritual journey is the unlearning of fear and the acceptance of love.", author: "Marianne Williamson" },
  { text: "We are not human beings having a spiritual experience. We are spiritual beings having a human experience.", author: "Pierre Teilhard de Chardin" },
  { text: "The wound is the place where the Light enters you.", author: "Rumi" },
  { text: "When you connect to the silence within you, that is when you can make sense of the disturbance going on around you.", author: "Stephen Richards" },
  { text: "The privilege of a lifetime is to become who you truly are.", author: "Carl Jung" },
  { text: "Your vision will become clear only when you can look into your own heart.", author: "Carl Jung" },
  { text: "The spiritual life does not remove us from the world but leads us deeper into it.", author: "Henri J.M. Nouwen" },
  { text: "You are the universe, expressing itself as a human for a little while.", author: "Eckhart Tolle" },
  { text: "The universe is not outside of you. Look inside yourself; everything that you want, you already are.", author: "Rumi" },
  { text: "We are all just walking each other home.", author: "Ram Dass" },
  { text: "Enlightenment is not a matter of imagining figures of light, but of making the darkness conscious.", author: "Carl Jung" },
  { text: "When you realize nothing is lacking, the whole world belongs to you.", author: "Lao Tzu" },
];

// Spiritual practices
const practices = [
  { 
    name: "Mindful Breathing", 
    description: "Take 5 minutes to focus solely on your breath. Inhale for 4 counts, hold for 4 counts, exhale for 6 counts." 
  },
  { 
    name: "Gratitude Practice", 
    description: "List 3 things you're grateful for each morning and reflect on why they bring you joy." 
  },
  { 
    name: "Sacred Reading", 
    description: "Read a few pages from a spiritual text, pausing to contemplate the meaning deeply." 
  },
  { 
    name: "Sound Bath", 
    description: "Listen to singing bowls or other healing frequencies for 10 minutes with closed eyes." 
  },
  { 
    name: "Walking Meditation", 
    description: "Walk slowly and deliberately, focusing on each step and your connection to the earth." 
  },
  { 
    name: "Forgiveness Ritual", 
    description: "Write down something you need to forgive (in yourself or others), then burn or tear the paper." 
  },
  { 
    name: "Energy Cleansing", 
    description: "Visualize a bright light flowing through your body, clearing any stagnant energy." 
  },
  { 
    name: "Intentional Silence", 
    description: "Practice complete silence for 30 minutes, allowing thoughts to come and go without attachment." 
  },
];

// Helper functions to get random content
export const getRandomInsight = () => {
  return insights[Math.floor(Math.random() * insights.length)];
};

export const getRandomAffirmation = () => {
  return affirmations[Math.floor(Math.random() * affirmations.length)];
};

export const getRandomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

export const getMeditationGuides = () => {
  return meditationGuides;
};

export const getPractices = () => {
  return practices;
};

export const getAllQuotes = () => {
  return quotes;
};