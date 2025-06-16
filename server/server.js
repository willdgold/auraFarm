const express = require('express');
const path = require('path');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build')));

// Farming aesthetics database
const farmingVibes = {
  cottage: {
    outfit: "Black Margielas, black jeans, white cropped shirt",
    place: "Park with more locals than tourists",
    items: ["Ambigious blue prints", "latte"],
    notes: "Look pissed for no reason"
  },
  modern: {
    outfit: "utility wear, tech boots, sleek hat",
    place: "solar farm with greenhouse tech, organized beds",
    items: ["smart irrigation", "precision tools", "crop journal"],
    notes: "tech meets earth, efficiency with purpose"
  },
  rustic: {
    outfit: "worn jeans, plaid, leather boots, cowboy hat",
    place: "weathered barn, open fields, traditional tools",
    items: ["cast iron", "pitchfork", "grain sacks", "lanterns"],
    notes: "honor old ways, hard work, land connection"
  },
  homestead: {
    outfit: "aprons, sturdy boots, bonnets, work clothes",
    place: "self-sufficient homestead, vegetable gardens, fruit trees",
    items: ["canning jars", "pressure cooker", "compost bin"],
    notes: "live off land, grow preserve share"
  },
  urban: {
    outfit: "stylish aprons, sneakers, trendy hats",
    place: "rooftop gardens, balcony planters, city plots",
    items: ["vertical planters", "grow lights", "aesthetic pots"],
    notes: "farm meets city, small space big harvest"
  }
};

// Analyze input and match to farming vibe
function analyzeInput(input) {
  const lowerInput = input.toLowerCase();
  
  // Keywords for different farming vibes
  const keywords = {
    cottage: ['cottage', 'cozy', 'traditional', 'chickens', 'herbs', 'simple', 'peaceful', 'rustic charm'],
    modern: ['modern', 'technology', 'sustainable', 'efficient', 'clean', 'minimalist', 'smart', 'innovation'],
    rustic: ['rustic', 'barn', 'country', 'traditional', 'weathered', 'old-fashioned', 'vintage', 'authentic'],
    homestead: ['homestead', 'self-sufficient', 'preserve', 'canning', 'growing', 'harvest', 'independence'],
    urban: ['urban', 'city', 'rooftop', 'balcony', 'apartment', 'small space', 'vertical', 'compact']
  };
  
  let scores = {};
  
  // Calculate scores for each vibe
  Object.keys(keywords).forEach(vibe => {
    scores[vibe] = 0;
    keywords[vibe].forEach(keyword => {
      if (lowerInput.includes(keyword)) {
        scores[vibe]++;
      }
    });
  });
  
  // Find the vibe with the highest score
  let bestVibe = 'cottage'; // default
  let highestScore = 0;
  
  Object.keys(scores).forEach(vibe => {
    if (scores[vibe] > highestScore) {
      highestScore = scores[vibe];
      bestVibe = vibe;
    }
  });
  
  return bestVibe;
}

app.post('/api/generate-farm-vibe', (req, res) => {
  try {
    const { input } = req.body;
    
    if (!input || input.trim() === '') {
      return res.status(400).json({ error: 'Input is required' });
    }
    
    const vibeType = analyzeInput(input);
    const response = farmingVibes[vibeType];
    
    setTimeout(() => {
      res.json(response);
    }, 1200); // Shorter delay for better UX
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Enhanced AI-powered endpoint
app.post('/api/generate-farm-vibe-ai', async (req, res) => {
  try {
    const { input } = req.body;
    
    if (!input || input.trim() === '') {
      return res.status(400).json({ error: 'Input is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    const prompt = `
You are a cracked-out, fashion-forward **aura farming assistant**.

Given a user’s description of their dream aura farm, return a JSON response with the following format:

{
  "outfit": "clothing that signals their essence — must be witty, stylish, possibly unhinged",
  "place": "where this aura would thrive — poetic, ironic, or oddly specific",
  "items": ["2–4 objects that live on their farm — should be funny, pretentious, or conceptually insane"],
  "notes": "one or two lines of dry, meta, or emotionally damaged commentary about their general aura"
}

Tone: edgy, fashion-literate, weirdly wise. Think astrology meme meets fashion Twitter meets niche internet micro-celebrity. Do **not** be boring or generic. Be spiritually iconic.

### Example:

{
  "outfit": "Black Margielas, black jeans, white cropped shirt",
  "place": "Park with more locals than tourists",
  "items": ["Ambiguous blueprints", "latte"],
  "notes": "Looks pissed for no reason"
}

Now generate a new one based on:
"${input}"
`;


    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a farming aesthetic expert who creates detailed, inspiring farming lifestyle recommendations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;
    
    try {
      const parsedResponse = JSON.parse(aiResponse);
      res.json(parsedResponse);
    } catch (parseError) {
      // Fallback to original endpoint if AI response isn't valid JSON
      const vibeType = analyzeInput(input);
      const fallbackResponse = farmingVibes[vibeType];
      res.json(fallbackResponse);
    }
    
  } catch (error) {
    console.error('OpenAI Error:', error);
    
    // Fallback to original logic if OpenAI fails
    const { input } = req.body;
    const vibeType = analyzeInput(input);
    const fallbackResponse = farmingVibes[vibeType];
    res.json(fallbackResponse);
  }
});

// The "catchall" handler: send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 