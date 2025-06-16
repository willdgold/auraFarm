import React from 'react';
import './ResponseBox.css';

const ResponseBox = ({ response, isLoading, error, onReset }) => {
  // Placeholder data for testing the design
  const placeholderResponse = {
    outfit: "black margielas, black jeans, white cropped shirt",
    place: "park with more locals than tourists",
    items: ["ambiguous blueprints", "latte"],
    notes: "look pissed for no reason"
  };



  const sections = response ? [
    { type: 'outfit', emoji: '🧥', content: response.outfit },
    { type: 'place', emoji: '📍', content: response.place },
    { type: 'items', emoji: '☕', content: response.items },
    { type: 'notes', emoji: '😠', content: response.notes }
  ] : [
    { type: 'outfit', emoji: '🧥', content: placeholderResponse.outfit },
    { type: 'place', emoji: '📍', content: placeholderResponse.place },
    { type: 'items', emoji: '☕', content: placeholderResponse.items },
    { type: 'notes', emoji: '😠', content: placeholderResponse.notes }
  ];

  if (!response && !isLoading && !error) {
    return (
      <div className="response-container">
        <div className="guide-container">
          <div className="guide-sections">
            {sections.map((section, index) => (
              <div key={index} className="guide-section" style={{ '--delay': `${index * 0.1}s` }}>
                <div className="section-header">
                  <div className="section-emoji">{section.emoji}</div>
                  <h3 className="section-title">{section.type}</h3>
                </div>
                <div className="section-content">
                  {section.type === 'items' ? (
                    <div className="section-items">
                      {section.content.map((item, itemIndex) => (
                        <span key={itemIndex} className="section-item placeholder-item">
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="section-text placeholder-text">{section.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="response-container">
      {isLoading && (
        <div className="loading-state">
          <div className="mystical-loader"></div>
          <p>processing...</p>
        </div>
      )}
      
      {error && (
        <div className="error-state">
          <p>connection failed</p>
          <button onClick={onReset} className="retry-btn">retry</button>
        </div>
      )}
      
      {response && !isLoading && (
        <div className="guide-container">
          <div className="guide-sections">
            {sections.map((section, index) => (
              <div key={index} className="guide-section animate-in" style={{ '--delay': `${index * 0.1}s` }}>
                <div className="section-header">
                  <div className="section-emoji">{section.emoji}</div>
                  <h3 className="section-title">{section.type}</h3>
                </div>
                <div className="section-content">
                  {section.type === 'items' ? (
                    <div className="section-items">
                      {section.content.map((item, itemIndex) => (
                        <span key={itemIndex} className="section-item">
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="section-text">{section.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="reset-container">
            <button onClick={onReset} className="regrow-btn">
              reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponseBox; 