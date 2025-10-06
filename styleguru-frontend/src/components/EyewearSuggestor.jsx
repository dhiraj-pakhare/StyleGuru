import React, { useState } from 'react';
import { getProductRecommendations } from '../firebase';
import ProductRecommendations from './ProductRecommendations';

export default function EyewearSuggestor() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetRecommendations = async () => {
    setLoading(true);
    setError('');
    setProducts([]);
    try {
      const recs = await getProductRecommendations('eyewear');
      setProducts(recs);
    } catch (err) {
      setError('Sorry, could not fetch recommendations.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Face Shape Eyewear Recommendations</h2>
      <button
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow hover:from-pink-500 hover:to-purple-500 transition-all"
        onClick={handleGetRecommendations}
        disabled={loading}
      >
        {loading ? 'Thinking...' : 'Get Recommendation'}
      </button>
      <ProductRecommendations products={products} loading={loading} error={error} />
    </div>
  );
} 