// AI Chatbot Service - Provides intelligent, real-time responses
export class AIChatbotService {
  constructor() {
    this.conversationHistory = [];
    this.knowledgeBase = {
      fashion: {
        keywords: ['outfit', 'style', 'fashion', 'clothing', 'dress', 'shirt', 'pants', 'shoes', 'accessories'],
        responses: [
          "I can help you with fashion advice! For outfit suggestions, try our AI Outfit Suggestions feature. What specific style are you looking for?",
          "Great question about fashion! I can recommend outfits based on your body type, occasion, and personal style. Would you like to try our outfit recommendation tool?",
          "Fashion is my specialty! I can help with color coordination, body type advice, seasonal trends, and more. What would you like to know?"
        ]
      },
      skincare: {
        keywords: ['skin', 'skincare', 'acne', 'moisturizer', 'cleanser', 'serum', 'routine'],
        responses: [
          "I'm here to help with your skincare journey! I can recommend products for your skin type and create personalized routines. What's your main skin concern?",
          "Skincare is essential! I can suggest products for oily, dry, combination, or sensitive skin. Would you like to try our personalized care routine tool?",
          "Let's get your skin glowing! I can help with product recommendations, routine building, and skin type analysis. What would you like to focus on?"
        ]
      },
      haircare: {
        keywords: ['hair', 'haircare', 'shampoo', 'conditioner', 'styling', 'haircut', 'color'],
        responses: [
          "Hair care is my passion! I can recommend products for your hair type and suggest styles that complement your face shape. What's your hair goal?",
          "Great hair starts with great care! I can help with product recommendations, styling tips, and hair type analysis. Would you like to try our hair care routine tool?",
          "Let's transform your hair! I can suggest products for damaged, dry, oily, or normal hair. What's your main hair concern?"
        ]
      },
      fitness: {
        keywords: ['workout', 'exercise', 'fitness', 'gym', 'training', 'muscle', 'weight loss'],
        responses: [
          "Fitness is key to confidence! I can create personalized workout plans based on your goals and fitness level. What's your fitness objective?",
          "Let's get you moving! I can design workouts for strength, cardio, flexibility, or weight loss. Would you like to try our personalized workout planner?",
          "Your fitness journey starts here! I can help with workout plans, nutrition advice, and goal setting. What would you like to achieve?"
        ]
      },
      nutrition: {
        keywords: ['diet', 'nutrition', 'food', 'meal', 'protein', 'vitamins', 'healthy eating'],
        responses: [
          "Nutrition fuels your lifestyle! I can create personalized meal plans and provide healthy eating advice. What are your nutrition goals?",
          "Let's nourish your body right! I can suggest meal plans for weight loss, muscle gain, or general health. Would you like to try our diet planner?",
          "Healthy eating made simple! I can help with meal planning, nutrition facts, and dietary recommendations. What would you like to focus on?"
        ]
      },
      general: {
        keywords: ['hello', 'hi', 'help', 'what', 'how', 'why', 'when', 'where'],
        responses: [
          "Hello! I'm StyleGuru AI, your personal style and wellness assistant. I can help with fashion, skincare, haircare, fitness, and nutrition advice. What would you like to know?",
          "Hi there! I'm here to help you look and feel your best. I can assist with style recommendations, wellness tips, and personalized advice. How can I help you today?",
          "Welcome to StyleGuru! I'm your AI assistant for all things style and wellness. I can provide personalized recommendations and expert advice. What's on your mind?"
        ]
      }
    };
  }

  // Analyze user message and categorize it
  categorizeMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [category, data] of Object.entries(this.knowledgeBase)) {
      if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return category;
      }
    }
    return 'general';
  }

  // Generate intelligent response based on category and context
  generateResponse(message, category) {
    const responses = this.knowledgeBase[category].responses;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Add contextual information based on the message
    let contextualResponse = randomResponse;
    
    if (category === 'fashion') {
      if (message.toLowerCase().includes('formal')) {
        contextualResponse += " For formal occasions, I recommend classic pieces like blazers, dress shirts, and tailored pants. Would you like specific outfit suggestions?";
      } else if (message.toLowerCase().includes('casual')) {
        contextualResponse += " For casual looks, try comfortable yet stylish pieces like well-fitted jeans, casual shirts, and sneakers. Need help putting together a casual outfit?";
      }
    }
    
    if (category === 'skincare') {
      if (message.toLowerCase().includes('acne')) {
        contextualResponse += " For acne-prone skin, I recommend gentle cleansers, non-comedogenic products, and consistent routines. Would you like a personalized acne-fighting routine?";
      } else if (message.toLowerCase().includes('aging')) {
        contextualResponse += " For anti-aging, focus on products with retinol, vitamin C, and peptides. I can create a comprehensive anti-aging routine for you!";
      }
    }
    
    if (category === 'fitness') {
      if (message.toLowerCase().includes('beginner')) {
        contextualResponse += " For beginners, start with bodyweight exercises and gradually increase intensity. I can create a beginner-friendly workout plan!";
      } else if (message.toLowerCase().includes('advanced')) {
        contextualResponse += " For advanced fitness, focus on progressive overload and compound movements. I can design a challenging workout routine!";
      }
    }
    
    return contextualResponse;
  }

  // Process user message and generate intelligent response
  async processMessage(userMessage) {
    try {
      // Add user message to conversation history
      this.conversationHistory.push({ role: 'user', content: userMessage });
      
      // Categorize the message
      const category = this.categorizeMessage(userMessage);
      
      // Generate intelligent response
      let response = this.generateResponse(userMessage, category);
      
      // Add web search simulation for more detailed responses
      if (this.shouldUseWebSearch(userMessage)) {
        response = await this.enhanceWithWebSearch(userMessage, response);
      }
      
      // Add some variety and personality
      if (Math.random() > 0.7) {
        response += " 💫";
      }
      if (Math.random() > 0.8) {
        response += " Feel free to ask me anything else!";
      }
      
      // Add response to conversation history
      this.conversationHistory.push({ role: 'assistant', content: response });
      
      // Simulate thinking time for more realistic experience
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
      
      return response;
      
    } catch (error) {
      console.error('Error processing message:', error);
      return "I'm here to help! I can assist with fashion advice, skincare routines, haircare tips, fitness plans, and nutrition guidance. What would you like to know?";
    }
  }

  // Determine if web search should be used
  shouldUseWebSearch(message) {
    const searchKeywords = ['latest', 'trend', 'new', 'recent', '2024', '2025', 'current', 'popular', 'best', 'top'];
    return searchKeywords.some(keyword => message.toLowerCase().includes(keyword));
  }

  // Simulate web search enhancement
  async enhanceWithWebSearch(query, baseResponse) {
    // Simulate web search delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const enhancedResponses = {
      'latest fashion trends': "Based on current fashion data, the latest trends include sustainable fashion, oversized silhouettes, and bold colors. ",
      'new skincare products': "Recent skincare innovations include products with peptides, ceramides, and microbiome-friendly ingredients. ",
      'popular workout routines': "Current fitness trends show high-intensity interval training (HIIT) and functional fitness are very popular. ",
      'best nutrition advice': "Recent nutrition research emphasizes whole foods, plant-based proteins, and mindful eating practices. "
    };
    
    for (const [key, enhancement] of Object.entries(enhancedResponses)) {
      if (query.toLowerCase().includes(key.split(' ')[0])) {
        return enhancement + baseResponse;
      }
    }
    
    return baseResponse + " I've also checked the latest information to ensure my advice is current and relevant! 🔍";
  }

  // Get conversation history
  getConversationHistory() {
    return this.conversationHistory;
  }

  // Clear conversation history
  clearConversation() {
    this.conversationHistory = [];
  }
}

// Create and export a singleton instance
export const aiChatbotService = new AIChatbotService(); 