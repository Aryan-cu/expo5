import React, { useState, useEffect } from 'react';

const CharacterCounter = () => {
  const [text, setText] = useState('');
  const maxLimit = 200;

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const charCount = text.length;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const remaining = maxLimit - charCount;
  const isExceeded = charCount > maxLimit;
  const progress = (charCount / maxLimit) * 100;

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('draft');
    if (saved) setText(saved);
  }, []);

  // Save to localStorage on text change
  useEffect(() => {
    localStorage.setItem('draft', text);
  }, [text]);

  return (
    <div className="container">
      <h1>Live Character Counter</h1>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Start typing..."
        className={isExceeded ? 'exceeded' : ''}
      />
      <div className="stats">
        <p>Characters: {charCount}</p>
        <p>Words: {wordCount}</p>
        <p>Remaining: {remaining}</p>
      </div>
      <div className="progress-container">
        <div
          className={`progress-bar ${isExceeded ? 'exceeded' : ''}`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
      {isExceeded && <p className="error">Character limit exceeded!</p>}
      <button onClick={() => setText('')}>Clear</button>
    </div>
  );
};

export default CharacterCounter;