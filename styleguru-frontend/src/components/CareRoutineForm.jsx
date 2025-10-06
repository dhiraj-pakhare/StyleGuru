import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

const skinTypes = ["Oily", "Dry", "Combination", "Normal", "Sensitive"];
const hairTypes = ["Straight", "Wavy", "Curly", "Coily"];

export default function CareRoutineForm({ open, onClose, onSubmit }) {
  const [skinType, setSkinType] = useState('');
  const [hairType, setHairType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!skinType || !hairType) return;
    onSubmit({ skinType, hairType });
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skin & Hair Care Routine</h2>
              <p className="text-gray-500 dark:text-gray-400">Get a routine tailored to your needs.</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold mb-3">What is your skin type?</label>
                <div className="flex flex-wrap gap-3">
                  {skinTypes.map(opt => (
                    <button type="button" key={opt} onClick={() => setSkinType(opt)} className={`px-5 py-2 rounded-full font-medium transition-all text-base ${skinType === opt ? 'bg-purple-500 text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
               <div>
                <label className="block text-lg font-semibold mb-3">And your hair type?</label>
                <div className="flex flex-wrap gap-3">
                  {hairTypes.map(opt => (
                    <button type="button" key={opt} onClick={() => setHairType(opt)} className={`px-5 py-2 rounded-full font-medium transition-all text-base ${hairType === opt ? 'bg-purple-500 text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700'}`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button type="submit" disabled={!skinType || !hairType} className="px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
                Generate My Routine
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
} 