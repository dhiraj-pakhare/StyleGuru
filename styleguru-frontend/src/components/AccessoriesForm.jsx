import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

const outfits = ["Casual Weekend", "Business Formal", "Evening Gala", "Beach Vacation"];
const styles = ["Minimalist", "Bold & Statement", "Trendy & Modern", "Classic & Timeless"];

export default function AccessoriesForm({ open, onClose, onSubmit }) {
  const [outfit, setOutfit] = useState('');
  const [style, setStyle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!outfit || !style) return;
    onSubmit({ outfit, style });
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Accessories Suggestions</h2>
              <p className="text-gray-500 dark:text-gray-400">Find the perfect finishing touches.</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-3">What's the occasion/outfit?</label>
              <div className="flex flex-wrap gap-3">
                {outfits.map(opt => (
                  <button type="button" key={opt} onClick={() => setOutfit(opt)} className={`px-5 py-2 rounded-full font-medium transition-all text-base ${outfit === opt ? 'bg-purple-500 text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-lg font-semibold mb-3">What's your accessory style?</label>
              <div className="flex flex-wrap gap-3">
                {styles.map(opt => (
                  <button type="button" key={opt} onClick={() => setStyle(opt)} className={`px-5 py-2 rounded-full font-medium transition-all text-base ${style === opt ? 'bg-purple-500 text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button type="submit" disabled={!outfit || !style} className="px-8 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed">
                Find Accessories
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
} 