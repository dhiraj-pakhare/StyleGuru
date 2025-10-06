import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Chatbot from './Chatbot';

export default function ChatbotModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
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
          <motion.div
            initial={{ scale: 0.8, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-lg mx-auto sm:my-12 p-0"
          >
            <button
              aria-label="Close chatbot"
              onClick={onClose}
              className="absolute top-2 right-2 z-10 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow hover:scale-110 transition"
            >
              <span className="material-icons text-gray-700 dark:text-gray-200">close</span>
            </button>
            <Chatbot />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 