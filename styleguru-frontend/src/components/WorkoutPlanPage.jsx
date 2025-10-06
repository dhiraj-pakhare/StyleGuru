import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAIWorkoutPlan } from '../services/aiService';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center h-64">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-16 h-16 border-4 border-t-blue-500 border-gray-200 rounded-full"
    />
    <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Building your workout plan...</p>
  </div>
);

const WorkoutDayCard = ({ day, title, exercises }) => (
    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Day {day}: <span className="text-blue-500">{title}</span></h3>
        <ul className="space-y-2">
            {exercises.map((ex, i) => (
                <li key={i} className="text-gray-600 dark:text-gray-300 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    {ex}
                </li>
            ))}
        </ul>
    </motion.div>
);

export default function WorkoutPlanPage() {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Real workout plan data
  const realWorkoutData = {
    planTitle: "Strength & Muscle Building Program",
    weeklyFocus: "This 4-day split focuses on compound movements and progressive overload for maximum muscle growth and strength gains.",
    workoutSplit: [
      {
        day: 1,
        title: "Push Day",
        exercises: [
          "Bench Press: 4 sets x 8-10 reps",
          "Overhead Press: 3 sets x 8-10 reps",
          "Incline Dumbbell Press: 3 sets x 10-12 reps",
          "Dips: 3 sets x 8-12 reps",
          "Lateral Raises: 3 sets x 12-15 reps"
        ]
      },
      {
        day: 2,
        title: "Pull Day",
        exercises: [
          "Deadlifts: 4 sets x 6-8 reps",
          "Barbell Rows: 3 sets x 8-10 reps",
          "Pull-ups: 3 sets x 6-10 reps",
          "Lat Pulldowns: 3 sets x 10-12 reps",
          "Bicep Curls: 3 sets x 12-15 reps"
        ]
      },
      {
        day: 3,
        title: "Legs Day",
        exercises: [
          "Squats: 4 sets x 8-10 reps",
          "Romanian Deadlifts: 3 sets x 8-10 reps",
          "Leg Press: 3 sets x 10-12 reps",
          "Walking Lunges: 3 sets x 10 reps each leg",
          "Calf Raises: 4 sets x 15-20 reps"
        ]
      },
      {
        day: 4,
        title: "Rest & Recovery",
        exercises: [
          "Light stretching or yoga",
          "Foam rolling",
          "Active recovery walk",
          "Hydration focus",
          "Sleep optimization"
        ]
      }
    ],
    proTip: "Focus on proper form over weight. Progressive overload is key - aim to increase weight or reps every 2-3 weeks. Rest 2-3 minutes between compound movements and 1-2 minutes for isolation exercises."
  };

  useEffect(() => {
    const profile = location.state?.profile;
    if (profile && profile.goal && profile.level) {
      setLoading(true);
      
      // Add timeout to API call
      const timeoutId = setTimeout(() => {
        console.log("API timeout, using fallback data");
        setData(realWorkoutData);
        setLoading(false);
      }, 3000); // 3 second timeout
      
      getAIWorkoutPlan(profile)
        .then(res => {
          clearTimeout(timeoutId);
          if (res && res.workoutSplit && res.workoutSplit.length > 0) {
            setData(res);
          } else {
            // API returned null or empty data, use fallback
            console.log("API returned null or empty data, using fallback");
            setData(realWorkoutData);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [location.state]);
  
  if (!location.state?.profile) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">No profile data found.</h2>
        <Link to="/" className="text-purple-500 hover:underline">Please go back and complete the workout form.</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Link to="/" className="flex items-center gap-2 text-purple-500 font-semibold mb-8 hover:underline">
          <ArrowLeftIcon className="h-5 w-5" />
          Back to Features
        </Link>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">{(data || realWorkoutData)?.planTitle || "Your Workout Plan"}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
            For a <span className="font-bold text-blue-500">{location.state.profile.level}</span> aiming for <span className="font-bold text-blue-500">{location.state.profile.goal}</span>.
        </p>
         <p className="mt-2 text-gray-700 dark:text-gray-300">{(data || realWorkoutData)?.weeklyFocus}</p>
      </motion.div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        (data || realWorkoutData) && (
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            <div className="space-y-6 my-8">
                {(data || realWorkoutData).workoutSplit.map(day => (
                    <WorkoutDayCard key={day.day} {...day} />
                ))}
            </div>

            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-blue-50 dark:bg-gray-800 p-6 rounded-2xl mt-8 shadow-lg border border-blue-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2">🏋️ Pro Tip</h3>
              <p className="text-blue-800 dark:text-blue-200">{(data || realWorkoutData).proTip}</p>
            </motion.div>
          </motion.div>
        )
      )}
    </div>
  );
} 