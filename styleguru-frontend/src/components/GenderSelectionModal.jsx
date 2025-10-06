import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

const genders = [
  { key: 'Male', label: 'Male', icon: '♂️' },
  { key: 'Female', label: 'Female', icon: '♀️' },
  { key: 'Other', label: 'Other', icon: '⚧️' },
];

export default function GenderSelectionModal({ open, onClose, onSelect }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md mx-4"
          >
            <div className="p-8 text-center">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Select Your Identity</h2>
                 <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-8">This helps us tailor recommendations for you.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {genders.map(gender => (
                  <motion.button
                    key={gender.key}
                    onClick={() => onSelect(gender.key)}
                    className="p-6 rounded-xl bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center text-center transition-colors hover:bg-purple-100 dark:hover:bg-purple-900/50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-4xl mb-2">{gender.icon}</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{gender.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 