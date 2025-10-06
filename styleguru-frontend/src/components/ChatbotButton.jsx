import React from 'react';
import { motion } from 'framer-motion';

export default function ChatbotButton({ onClick, unread }) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg hover:scale-110 transition-transform focus:outline-none"
        aria-label="Open Chatbot"
        onClick={onClick}
      >
        {/* Chat icon */}
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 0 1-4-.8L3 21l1.13-3.39C3.42 16.18 3 14.64 3 13c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {/* Pulse effect */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-60 animate-ping"></span>
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full px-2 py-0.5 shadow animate-bounce">
            {unread}
          </span>
        )}
      </motion.button>
    </div>
  );
} 