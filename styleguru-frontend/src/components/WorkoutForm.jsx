import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

const fitnessGoals = ["General Fitness", "Strength Training", "Cardio Endurance", "Flexibility"];
const experienceLevels = ["Beginner", "Intermediate", "Advanced"];

export default function WorkoutForm({ open, onClose, onSubmit }) {
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goal || !level) return;
    onSubmit({ goal, level });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg mx-4"
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Workout Planner</h2>
              <p className="text-gray-500 dark:text-gray-400">Design a workout plan just for you.</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold mb-3">What is your primary fitness goal?</label>
                <div className="flex flex-wrap gap-3">
                  {fitnessGoals.map(opt => (
                    <button type="button" key={opt} onClick={() => setGoal(opt)} className={`px-5 py-2 rounded-full font-medium transition-all text-base ${goal === opt ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
               <div>
                <label className="block text-lg font-semibold mb-3">What is your experience level?</label>
                <div className="flex flex-wrap gap-3">
                  {experienceLevels.map(opt => (
                    <button type="button" key={opt} onClick={() => setLevel(opt)} className={`px-5 py-2 rounded-full font-medium transition-all text-base ${level === opt ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button type="submit" disabled={!goal || !level} className="px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
                Build My Workout
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
} 