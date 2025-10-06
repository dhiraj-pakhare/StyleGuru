import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

const steps = [
  { id: 'style', name: 'Your Style' },
  { id: 'body', name: 'Body & Face' },
  { id: 'details', name: 'Preferences' },
];

// Placeholder options - these can be expanded later
const styleOptions = ["Casual", "Formal", "Streetwear", "Bohemian", "Minimalist", "Sporty"];
const bodyTypeOptions = ["Pear", "Hourglass", "Apple", "Rectangle", "Inverted Triangle"];
const faceShapeOptions = ["Oval", "Round", "Square", "Heart", "Diamond"];

export default function StyleProfileForm({ open, onClose, onSubmit }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    preferredStyles: [],
    bodyType: '',
    faceShape: '',
    skinTone: '#ffffff',
    height: '',
    weight: '',
  });

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleStyleToggle = (style) => {
    setFormData(prev => {
      const newStyles = prev.preferredStyles.includes(style)
        ? prev.preferredStyles.filter(s => s !== style)
        : [...prev.preferredStyles, style];
      return { ...prev, preferredStyles: newStyles };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden"
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Your Style Profile</h2>
              <p className="text-gray-500 dark:text-gray-400">Step {currentStep + 1} of {steps.length}: {steps[currentStep].name}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {/* Step 1: Style Preferences */}
              {currentStep === 0 && (
                 <motion.div key="step0" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                   <h3 className="text-lg font-semibold mb-4">Which styles do you prefer?</h3>
                   <div className="flex flex-wrap gap-3">
                     {styleOptions.map(style => (
                       <button type="button" key={style} onClick={() => handleStyleToggle(style)} className={`px-4 py-2 rounded-full font-medium transition-all ${formData.preferredStyles.includes(style) ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                         {style}
                       </button>
                     ))}
                   </div>
                 </motion.div>
              )}
              
              {/* Step 2: Body & Face Shape */}
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                   <div className="space-y-6">
                      <div>
                        <label className="block text-lg font-semibold mb-2">What's your body type?</label>
                        <div className="flex flex-wrap gap-3">
                            {bodyTypeOptions.map(opt => (
                                <button type="button" key={opt} onClick={() => setFormData(p => ({...p, bodyType: opt}))} className={`px-4 py-2 rounded-full font-medium transition-all ${formData.bodyType === opt ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                    {opt}
                                </button>
                            ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-lg font-semibold mb-2">And your face shape?</label>
                         <div className="flex flex-wrap gap-3">
                            {faceShapeOptions.map(opt => (
                                <button type="button" key={opt} onClick={() => setFormData(p => ({...p, faceShape: opt}))} className={`px-4 py-2 rounded-full font-medium transition-all ${formData.faceShape === opt ? 'bg-purple-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                    {opt}
                                </button>
                            ))}
                        </div>
                      </div>
                   </div>
                </motion.div>
              )}

              {/* Step 3: Details */}
              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="skinTone" className="block text-lg font-semibold mb-2">Skin Tone</label>
                      <input type="color" name="skinTone" value={formData.skinTone} onChange={handleChange} className="w-full h-12 p-1 rounded-lg cursor-pointer"/>
                    </div>
                    <div>
                      <label htmlFor="height" className="block text-lg font-semibold mb-2">Height (cm)</label>
                      <input type="number" name="height" placeholder="e.g., 175" value={formData.height} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-transparent focus:border-purple-500 focus:ring-0" />
                    </div>
                    <div>
                      <label htmlFor="weight" className="block text-lg font-semibold mb-2">Weight (kg)</label>
                      <input type="number" name="weight" placeholder="e.g., 70" value={formData.weight} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-transparent focus:border-purple-500 focus:ring-0" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                {currentStep > 0 && (
                  <button type="button" onClick={handlePrev} className="px-6 py-2 rounded-lg font-semibold text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                    Back
                  </button>
                )}
              </div>
              <div>
                {currentStep < steps.length - 1 ? (
                  <button type="button" onClick={handleNext} className="px-6 py-2 rounded-lg font-semibold text-white bg-purple-500 hover:bg-purple-600 transition">
                    Next
                  </button>
                ) : (
                  <button type="submit" className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition">
                    Get Recommendations
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
} 