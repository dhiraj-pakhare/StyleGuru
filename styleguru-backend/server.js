require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const aiService = require('./services/aiService');

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---

// 1. CORS (Cross-Origin Resource Sharing)
// This is crucial for allowing your React frontend to communicate with this backend.
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004',
    'http://localhost:3005',
    // Add your production frontend URL here, e.g., 'https://your-styleguru-app.com'
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests) or from whitelisted origins
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
app.use(cors(corsOptions));

// 2. JSON Body Parser
// This allows your server to understand JSON data sent in request bodies.
app.use(express.json());


// --- API ROUTES ---

// Updated generic handler to support async service functions
const createProfileRoute = (serviceFunction) => async (req, res, next) => {
    try {
        const profile = req.body;
        if (!profile) {
            return res.status(400).json({ error: 'Profile data is required.' });
        }
        // Await the async service function
        const recommendations = await serviceFunction(profile);
        res.json(recommendations);
    } catch (error) {
        // Pass any errors to the global error handler
        next(error);
    }
};

// Updated handler for product suggestions
app.post('/api/product-suggestions', async (req, res, next) => {
    try {
        const { profile, productType } = req.body;
        if (!profile || !productType) {
            return res.status(400).json({ error: 'Profile and productType are required.' });
        }
        const recommendations = await aiService.getAIProductSuggestions(profile, productType);
        res.json(recommendations);
    } catch (error) {
        next(error);
    }
});

app.post('/api/outfit-suggestions', createProfileRoute(aiService.getAIOutfitSuggestions));
app.post('/api/eyewear-recommendations', createProfileRoute(aiService.getAIEyewearRecommendations));
app.post('/api/accessories-suggestions', createProfileRoute(aiService.getAIAccessoriesSuggestions));
app.post('/api/diet-plan', createProfileRoute(aiService.getAIDietPlan));
app.post('/api/care-routine', createProfileRoute(aiService.getAICareRoutine));
app.post('/api/workout-plan', createProfileRoute(aiService.getAIWorkoutPlan));


// --- GLOBAL ERROR HANDLER ---
// This middleware catches any errors that occur in your routes.
// It should be the LAST piece of middleware added.
app.use((err, req, res, next) => {
    console.error("=====================");
    console.error("UNHANDLED SERVER ERROR:", err.stack || err);
    console.error("=====================");
    res.status(500).json({ error: 'An unexpected internal server error occurred.' });
});


// --- SERVER START ---
app.listen(PORT, () => {
  console.log(`StyleGuru.ai backend server is running on http://localhost:${PORT}`);
});
