import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ModalFocusTrap from './ModalFocusTrap';

const BADGES = [
  { key: 'quiz', label: 'Quiz Master', icon: 'quiz', color: 'from-purple-500 to-pink-500' },
  { key: 'wishlist', label: 'Wishlist Pro', icon: 'favorite', color: 'from-pink-500 to-green-500' },
  { key: 'share', label: 'Social Sharer', icon: 'share', color: 'from-blue-500 to-pink-500' },
  { key: 'aioutfit', label: 'AI Stylist', icon: 'smart_toy', color: 'from-yellow-400 to-purple-500' },
];

function getAchievements() {
  // Mock: read from localStorage, or return all as unlocked for demo
  return {
    quiz: !!localStorage.getItem('quizCompleted'),
    wishlist: (JSON.parse(localStorage.getItem('wishlist') || '[]').length >= 3),
    share: !!localStorage.getItem('sharedProduct'),
    aioutfit: !!localStorage.getItem('aiOutfitUsed'),
  };
}

export default function AchievementsModal({ open, onClose }) {
  const [achievements, setAchievements] = useState({});

  useEffect(() => {
    if (open) setAchievements(getAchievements());
  }, [open]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
        {/* Modal */}
        <ModalFocusTrap open={open} onClose={onClose}>
          <motion.div
            initial={{ scale: 0.8, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md mx-auto sm:my-12 p-0"
          >
            <button
              aria-label="Close achievements"
              onClick={onClose}
              className="absolute top-2 right-2 z-10 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow hover:scale-110 transition"
            >
              <span className="material-icons text-gray-700 dark:text-gray-200">close</span>
            </button>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 min-h-[300px] flex flex-col items-center">
              <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">My Achievements</h2>
              <div className="flex flex-wrap gap-6 justify-center">
                {BADGES.map(badge => (
                  <div key={badge.key} className="flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-lg mb-2 ${achievements[badge.key] ? '' : 'opacity-40 grayscale'}`}>
                      <span className="material-icons text-white text-3xl">{badge.icon}</span>
                    </div>
                    <div className={`text-sm font-semibold ${achievements[badge.key] ? 'text-pink-500' : 'text-gray-400'}`}>{badge.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center text-gray-500 text-sm">Unlock badges by using features and sharing StyleGuru.ai!</div>
            </div>
          </motion.div>
        </ModalFocusTrap>
      </motion.div>
    </AnimatePresence>
  );
} 