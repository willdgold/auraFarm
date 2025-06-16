import React, { useState } from 'react';
import './InputForm.css';

const InputForm = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
    }
  };

  return (
    <div className="input-form-container">
      <form onSubmit={handleSubmit} className="input-form">
        <textarea
          className="form-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="describe your ideal aura farm .."
          rows="4"
          disabled={isLoading}
        />
        
        <button 
          type="submit" 
          className={`submit-btn ${isLoading ? 'loading' : ''}`}
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? 'processing...' : 'generate'}
        </button>
      </form>
    </div>
  );
};

export default InputForm; 