const OpenAI = require('openai');

// Fallback farming aesthetics database
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

// Fallback analyze function
function analyzeInput(input) {
  const lowerInput = input.toLowerCase();
  
  const keywords = {
    cottage: ['cottage', 'cozy', 'traditional', 'chickens', 'herbs', 'simple', 'peaceful', 'rustic charm'],
    modern: ['modern', 'technology', 'sustainable', 'efficient', 'clean', 'minimalist', 'smart', 'innovation'],
    rustic: ['rustic', 'barn', 'country', 'traditional', 'weathered', 'old-fashioned', 'vintage', 'authentic'],
    homestead: ['homestead', 'self-sufficient', 'preserve', 'canning', 'growing', 'harvest', 'independence'],
    urban: ['urban', 'city', 'rooftop', 'balcony', 'apartment', 'small space', 'vertical', 'compact']
  };
  
  let scores = {};
  
  Object.keys(keywords).forEach(vibe => {
    scores[vibe] = 0;
    keywords[vibe].forEach(keyword => {
      if (lowerInput.includes(keyword)) {
        scores[vibe]++;
      }
    });
  });
  
  let bestVibe = 'cottage';
  let highestScore = 0;
  
  Object.keys(scores).forEach(vibe => {
    if (scores[vibe] > highestScore) {
      highestScore = scores[vibe];
      bestVibe = vibe;
    }
  });
  
  return bestVibe;
}

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { input } = req.body;
    
    if (!input || input.trim() === '') {
      return res.status(400).json({ error: 'Input is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
You are a fashion-literate, emotionally deranged aura farming assistant. Your job is to translate someone's dream farm vibe into an aesthetic that could live on Instagram, in a downtown art scene groupchat, or in a well-lit pop-up in Copenhagen.

Return a JSON in this format:

{
  "outfit": "specific, modern pieces — think Uniqlo U, Gorp-core, cropped tees, track pants, Margiela tabis, techwear, vintage sunglasses — items must be realistic but coded and confident",
  "place": "an actual, grounded location that reflects their vibe — think 'quiet courtyard behind a university art building', 'sunny edge of a community garden in Brooklyn', or 'hill overlooking a reservoir with no cell service'. Real places, but phrased in a way that feels intimate and cinematic",
  "items": ["3–4 objects you’d find on their farm — clever, specific, slightly ironic (e.g. 'kombucha drip setup', 'custom Carhartt apron', 'handwritten crop manifest')"],
  "notes": "1–2 lines of emotionally charged or cutting commentary — could be deadpan, dramatic, online-coded, or spiritually cracked. Think: 'looks pissed for no reason', 'nepo energy, but denies it', 'cried at a farmers market once', 'trust fund but still composts', or 'gatekeeps organic garlic'. Be sharp. Be memorable. Don’t be nice."
}

Style notes:
- Avoid costumes or clichés (no cowboy hats, no bonnets).
- Use lowercase selectively.
- Prioritize style over functionality.
- Channel someone who’s chronically online but also mysteriously grounded.

Example:

{
  "outfit": "cropped white tank, nylon track pants, silver Oakley-style sunglasses",
  "place": "patch of grass near the architecture building where no one makes eye contact",
  "items": ["iced americano in a jam jar", "glossy seed catalog", "field recorder"],
  "notes": "gatekeeps organic garlic"
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
    const vibeType = analyzeInput(input);
    const fallbackResponse = farmingVibes[vibeType];
    res.json(fallbackResponse);
  }
} 