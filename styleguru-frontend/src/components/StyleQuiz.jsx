import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCarousel from './ProductCarousel';

const steps = [
  {
    label: 'What is your budget range?',
    name: 'budget',
    options: ['Under ₹1000', '₹1000-₹3000', '₹3000-₹7000', '₹7000+'],
  },
  {
    label: 'Which colors do you prefer?',
    name: 'colors',
    options: ['Neutrals', 'Pastels', 'Brights', 'Dark Tones'],
  },
  {
    label: 'What style do you like most?',
    name: 'style',
    options: ['Casual', 'Formal', 'Sporty', 'Trendy'],
  },
];

// Mock function to generate recommendations based on answers
function getQuizRecommendations(answers) {
  // In real app, call backend or AI here
  return [
    {
      id: '1',
      name: 'Trendy Pastel Hoodie',
      image: '',
      description: 'A soft pastel hoodie perfect for casual outings.',
      price: 1299,
      link: 'https://www.amazon.in/',
      eco: true,
    },
    {
      id: '2',
      name: 'Classic White Sneakers',
      image: '',
      description: 'Versatile sneakers for any style.',
      price: 2499,
      link: 'https://www.flipkart.com/',
      eco: false,
    },
    {
      id: '3',
      name: 'Minimalist Tote Bag',
      image: '',
      description: 'Eco-friendly tote for daily use.',
      price: 899,
      link: 'https://www.amazon.in/',
      eco: true,
    },
  ];
}

export default function StyleQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const handleSelect = (option) => {
    setAnswers((prev) => ({ ...prev, [steps[step].name]: option }));
    setTimeout(() => {
      if (step < steps.length - 1) {
        setStep(step + 1);
      } else {
        // Show result
        const recs = getQuizRecommendations({ ...answers, [steps[step].name]: option });
        setRecommendations(recs);
        setShowResult(true);
      }
    }, 350);
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setShowResult(false);
    setRecommendations([]);
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Find Your Style</h2>
      <div className="mb-4 flex justify-center gap-2">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-8 rounded-full transition-all ${i <= step && !showResult ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-300 dark:bg-gray-700'}`}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="text-lg font-semibold mb-6 text-center">{steps[step].label}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {steps[step].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow hover:from-pink-500 hover:to-purple-500 transition-all focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Your Recommendations</div>
            <ProductCarousel products={recommendations} />
            <button
              onClick={handleRestart}
              className="mt-6 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow hover:from-purple-500 hover:to-pink-500 transition-all"
            >
              Restart Quiz
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 