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
    
    const vibeType = analyzeInput(input);
    const response = farmingVibes[vibeType];
    
    // Add a small delay to simulate processing (like in original)
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    res.json(response);
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 