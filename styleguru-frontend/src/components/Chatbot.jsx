import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiChatbotService } from '../services/aiChatbotService';
import { streamAIReply } from '../firebase';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am StyleGuru AI. How can I help you today? 💫' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chatEndRef = useRef(null);

  // Clear conversation function
  const clearConversation = () => {
    setMessages([{ role: 'assistant', content: 'Hi! I am StyleGuru AI. How can I help you today? 💫' }]);
    aiChatbotService.clearConversation();
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');

    // Add user message immediately
    setMessages((msgs) => [...msgs, { role: 'user', content: userMsg }]);
    setLoading(true);
    setError('');

    try {
      // Start a streaming assistant message placeholder
      let assistantIndex;
      setMessages((prev) => {
        assistantIndex = prev.length + 1; // after adding user
        return [...prev, { role: 'assistant', content: '' }];
      });

      let buffer = '';
      await streamAIReply(userMsg, (chunk, done) => {
        buffer += chunk;
        setMessages((prev) => {
          const copy = [...prev];
          // last message is assistant placeholder
          copy[copy.length - 1] = { role: 'assistant', content: buffer };
          return copy;
        });
      });
    } catch (err) {
      console.error('Chatbot streaming error:', err);
      try {
        const aiReply = await aiChatbotService.processMessage(userMsg);
        setMessages((msgs) => [...msgs, { role: 'assistant', content: aiReply }]);
      } catch (fallbackErr) {
        const fallbackResponse = "I'm here to help! I can assist with fashion advice, skincare routines, haircare tips, fitness plans, and nutrition guidance. What would you like to know?";
        setMessages((msgs) => [...msgs, { role: 'assistant', content: fallbackResponse }]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto my-4 p-2 sm:p-4 bg-white dark:bg-gray-900 rounded-2xl shadow-xl flex flex-col h-[70vh] min-h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">StyleGuru Chatbot</h2>
        <button
          onClick={clearConversation}
          className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          title="Clear conversation"
        >
          Clear
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-1 sm:px-2 py-2 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-2xl shadow-lg text-base whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-br-md'
                    : 'bg-gradient-to-r from-purple-100 to-pink-200 dark:from-purple-900 dark:to-pink-900 text-gray-900 dark:text-white rounded-bl-md'
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-200 dark:from-purple-900 dark:to-pink-900 text-gray-900 dark:text-white shadow animate-pulse">
                AI is thinking...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {['Fashion advice', 'Skincare tips', 'Hair care', 'Workout plans', 'Nutrition help'].map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => {
              setInput(suggestion);
              setTimeout(() => {
                const event = { preventDefault: () => {} };
                sendMessage(event);
              }, 100);
            }}
            className="px-3 py-1 text-xs bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800 text-purple-700 dark:text-purple-200 rounded-full hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-700 dark:hover:to-pink-700 transition-all"
          >
            {suggestion}
          </button>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex items-center gap-2 mt-4">
        <input
          className="flex-1 rounded-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-base sm:text-lg"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow hover:from-pink-500 hover:to-purple-500 transition-all disabled:opacity-50 text-base sm:text-lg"
        >
          Send
        </button>
      </form>
      {error && <div className="text-red-500 text-center mt-2">{error}</div>}
    </div>
  );
} 