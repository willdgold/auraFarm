# 🌱 Farming Solver

A modern web application that provides expert farming advice powered by AI. Users can ask farming-related questions and receive real-time responses through an intuitive interface.

## Features

- **Real-time Q&A**: Ask farming questions and get instant responses
- **Modern UI**: Clean, responsive design with smooth animations
- **Smart Responses**: Intelligent keyword matching for relevant farming advice
- **Mobile Friendly**: Fully responsive design for all devices
- **Error Handling**: Graceful error handling and loading states

## Tech Stack

### Frontend
- React 19
- CSS3 with modern styling
- Responsive design
- State management with hooks

### Backend
- Node.js with Express
- RESTful API
- CORS enabled
- Mock responses (with OpenAI integration ready)

## Project Structure

```
farming-solver/
├── src/
│   ├── components/
│   │   ├── InputForm.js         # Question input component
│   │   ├── InputForm.css        # Styling for input form
│   │   ├── ResponseBox.js       # Response display component
│   │   └── ResponseBox.css      # Styling for response box
│   ├── App.js                   # Main application component
│   ├── App.css                  # Main application styles
│   └── index.js                 # Application entry point
├── server/
│   ├── server.js                # Express server
│   └── package.json             # Server dependencies
├── public/                      # Static assets
└── package.json                 # Frontend dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (or navigate to the project directory)
   ```bash
   cd farming-solver
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

### Running the Application

#### Method 1: Run Frontend and Backend Separately

1. **Start the backend server** (in one terminal):
   ```bash
   npm run server
   ```
   This will start the API server on http://localhost:5000

2. **Start the frontend** (in another terminal):
   ```bash
   npm start
   ```
   This will start the React app on http://localhost:3000

#### Method 2: Development Mode

1. **Start the backend in development mode**:
   ```bash
   npm run dev
   ```
   This uses nodemon for auto-restart on changes

2. **Start the frontend** (in another terminal):
   ```bash
   npm start
   ```

### Using the Application

1. Open your browser and navigate to `http://localhost:3000`
2. Type your farming question in the text area
3. Click "Ask Question" to get advice
4. The response will appear in the response box below

## Sample Questions to Try

- "How do I improve my soil health?"
- "When should I plant tomatoes?"
- "What's the best way to water my garden?"
- "How do I deal with pests naturally?"
- "What fertilizer should I use?"

## API Endpoints

### POST /api/ask
Submit a farming question and receive advice.

**Request Body:**
```json
{
  "question": "How do I improve soil health?"
}
```

**Response:**
```json
{
  "answer": "To improve soil health, focus on adding organic matter like compost..."
}
```

### GET /api/health
Health check endpoint to verify the API is running.

**Response:**
```json
{
  "status": "OK",
  "message": "Farming Solver API is running"
}
```

## Integration with OpenAI (Optional)

To use real AI responses instead of mock data:

1. Get an OpenAI API key from https://platform.openai.com/
2. Create a `.env` file in the `server` directory:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
3. Uncomment the OpenAI integration code in `server/server.js`
4. Install the OpenAI package (already included in package.json)

## Customization

### Adding New Mock Responses

Edit the `mockFarmingAdvice` object in `server/server.js` to add new keyword-based responses:

```javascript
const mockFarmingAdvice = {
  'keyword': 'Your farming advice here...',
  // Add more keywords and responses
};
```

### Styling

- Modify `src/App.css` for overall app styling
- Edit component-specific CSS files in `src/components/`
- Colors use a green farming theme that can be customized

## Deployment

### Frontend Deployment

1. Build the React app:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your hosting provider

### Backend Deployment

1. Deploy the `server` directory to your hosting provider
2. Set environment variables for production
3. Ensure the frontend proxy setting points to your production API URL

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or issues, please open an issue in the repository or contact the development team.

---

Happy Farming! 🌱
