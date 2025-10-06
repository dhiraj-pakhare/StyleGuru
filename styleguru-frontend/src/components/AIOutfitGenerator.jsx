import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCarousel from './ProductCarousel';

const mockOutfit = {
  image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=400&h=400',
  products: [
    {
      id: 'ai1',
      name: 'AI Denim Jacket',
      image: '',
      description: 'Trendy denim jacket, perfect for layering.',
      price: 2199,
      link: 'https://www.amazon.in/',
      eco: true,
    },
    {
      id: 'ai2',
      name: 'White Tee',
      image: '',
      description: 'Classic white t-shirt for any look.',
      price: 599,
      link: 'https://www.flipkart.com/',
      eco: false,
    },
    {
      id: 'ai3',
      name: 'Chunky Sneakers',
      image: '',
      description: 'Comfortable and stylish sneakers.',
      price: 2999,
      link: 'https://www.amazon.in/',
      eco: false,
    },
  ],
};

export default function AIOutfitGenerator() {
  const [inputType, setInputType] = useState('photo');
  const [photo, setPhoto] = useState(null);
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setResult(mockOutfit);
      setLoading(false);
    }, 1200);
  };

  const handleRestart = () => {
    setPhoto(null);
    setDesc('');
    setResult(null);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto my-8 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">AI Outfit Generator</h2>
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleGenerate}
            className="flex flex-col gap-6 items-center"
          >
            <div className="flex gap-4 mb-2">
              <button
                type="button"
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${inputType === 'photo' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white'}`}
                onClick={() => setInputType('photo')}
              >
                Upload Photo
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${inputType === 'desc' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white'}`}
                onClick={() => setInputType('desc')}
              >
                Describe Yourself
              </button>
            </div>
            {inputType === 'photo' ? (
              <div className="flex flex-col items-center gap-2">
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="mb-2" />
                {photo && <img src={photo} alt="Preview" className="w-24 h-24 rounded-full object-cover border-2 border-pink-400" />}
              </div>
            ) : (
              <textarea
                className="w-full rounded-lg px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 text-base"
                placeholder="Describe your style, body type, or preferences..."
                value={desc}
                onChange={e => setDesc(e.target.value)}
                rows={3}
              />
            )}
            <button
              type="submit"
              disabled={loading || (inputType === 'photo' ? !photo : !desc.trim())}
              className="mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate Outfit'}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="mb-4">
              <img src={result.image} alt="AI Outfit" className="w-40 h-40 rounded-xl object-cover border-4 border-pink-400 shadow-lg" />
            </div>
            <div className="text-lg font-bold mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Your AI-Generated Outfit</div>
            <ProductCarousel products={result.products} />
            <button
              onClick={handleRestart}
              className="mt-6 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow hover:from-purple-500 hover:to-pink-500 transition-all"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 