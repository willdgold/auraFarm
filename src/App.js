import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResponseBox from './components/ResponseBox';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

function App() {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (userInput) => {
    setIsLoading(true);
    setError('');
    setResponse(null);

    try {
      const res = await fetch('/api/generate-farm-vibe-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: userInput }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResponse(null);
    setError('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Aura Farming Manual</h1>
      </header>

      <main className="App-main">
        <div className="container">
          <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
          <ResponseBox 
            response={response}
            isLoading={isLoading}
            error={error}
            onReset={handleReset}
          />
        </div>
      </main>

      {/* ✅ Add Vercel Analytics here */}
      <Analytics />
    </div>
  );
}

export default App;
