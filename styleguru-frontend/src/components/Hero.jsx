import React from 'react';
import { motion } from 'framer-motion';

export default function Hero({ onGetStarted }) {
  return (
    <section className="w-full min-h-[80vh] flex flex-col justify-center items-center text-center relative overflow-hidden bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-300 dark:from-purple-900 dark:via-pink-900 dark:to-yellow-900" style={{ zIndex: 1 }}>
      {/* Animated gradient overlays */}
      <div className="absolute inset-0 bg-gradient-diagonal opacity-80 -z-10" />
      <div className="absolute top-0 left-0 w-full h-full bg-white/20 blur-2xl -z-10" />
      {/* Hero Content */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 drop-shadow-lg"
      >
        StyleGuru.ai
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg md:text-2xl text-white/90 font-medium mb-8 max-w-xl mx-auto"
      >
        Your AI-powered style and wellness assistant. Get instant outfit ideas, eyewear tips, diet plans, and more—personalized just for you!
      </motion.p>
      <motion.a
        href="#features"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        whileHover={{ scale: 1.08, background: 'linear-gradient(90deg, #EC4899, #8B5CF6)' }}
        className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg hover:from-pink-500 hover:to-purple-500 transition-all duration-200 text-lg"
        onClick={onGetStarted}
      >
        Get Started
      </motion.a>
    </section>
  );
} 