import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

const bodyTypes = ["Pear", "Apple", "Hourglass", "Rectangle", "Inverted Triangle"];
const styles = ["Casual", "Formal", "Party", "Streetwear", "Minimalist"];
const seasons = ["Spring", "Summer", "Autumn", "Winter"];

export default function OutfitSuggestionsForm({ open, onClose, onSubmit }) {
  const [bodyType, setBodyType] = useState('');
  const [preferredStyle, setPreferredStyle] = useState('');
  const [season, setSeason] = useState('');
  const [color, setColor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bodyType || !preferredStyle || !season) return;
    onSubmit({ bodyType, preferredStyle, season, color });
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Outfit Suggestions</h2>
              <p className="text-gray-500 dark:text-gray-400">Describe your desired style.</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-3">What's your body type?</label>
              <div className="flex flex-wrap gap-3">
                {bodyTypes.map(opt => (
                  <button type="button" key={opt} onClick={() => setBodyType(opt)} className={`px-5 py-2 rounded-full font-medium transition-all text-base ${bodyType === opt ? 'bg-purple-500 text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-lg font-semibold mb-3">Select a style.</label>
              <div className="flex flex-wrap gap-3">
                {styles.map(opt => (
                  <button type="button" key={opt} onClick={() => setPreferredStyle(opt)} className={`px-5 py-2 rounded-full font-medium transition-all text-base ${preferredStyle === opt ? 'bg-purple-500 text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-lg font-semibold mb-3">Choose a season.</label>
              <div className="flex flex-wrap gap-3">
                {seasons.map(opt => (
                  <button type="button" key={opt} onClick={() => setSeason(opt)} className={`px-5 py-2 rounded-full font-medium transition-all text-base ${season === opt ? 'bg-purple-500 text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="color-pref" className="block text-lg font-semibold mb-3">Color preference (optional)</label>
              <input
                id="color-pref"
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="e.g., pastels, monochrome, earthy tones"
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button type="submit" disabled={!bodyType || !preferredStyle || !season} className="px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
                Get Suggestions
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
} 