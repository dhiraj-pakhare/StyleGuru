import React, { useState } from 'react';
import HomeFeed from './HomeFeed';
import OutfitSuggestor from './OutfitSuggestor';
import EyewearSuggestor from './EyewearSuggestor';
import DietPlanForm from './DietPlanForm';
import CareRoutineForm from './CareRoutineForm';
import AIOutfitGenerator from './AIOutfitGenerator';
import StyleQuiz from './StyleQuiz';
import Chatbot from './Chatbot';

const TABS = [
  { id: 'outfit', label: 'Outfit & Accessories', component: <OutfitSuggestor /> },
  { id: 'eyewear', label: 'Eyewear', component: <EyewearSuggestor /> },
  { id: 'diet', label: 'Diet Plan', component: <DietPlanForm /> },
  { id: 'care', label: 'Skin & Hair Care', component: <CareRoutineForm /> },
  { id: 'aioutfit', label: 'AI Outfit Generator', component: <AIOutfitGenerator /> },
  { id: 'quiz', label: 'Style Quiz', component: <StyleQuiz /> },
  { id: 'chatbot', label: 'Chatbot', component: <Chatbot /> },
];

export default function HomePage() {
  const [tab, setTab] = useState('outfit');

  return (
    <>
      <HomeFeed />
      {/* Navigation Tabs for AI Features */}
      <div className="flex flex-wrap gap-4 justify-center mt-8 mb-4 px-4">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${tab === t.id ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {/* Render selected tab component */}
      <div className="max-w-4xl mx-auto p-4">
        {TABS.find(t => t.id === tab)?.component}
      </div>
    </>
  );
} 