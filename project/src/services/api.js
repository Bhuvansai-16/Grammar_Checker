// src/services/api.js
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Grammar Check
export const grammarCheck = async (text, numSuggestions = 3) => {
  try {
    const response = await fetch(`${BASE_URL}/correct`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, num_suggestions: numSuggestions }),
    });
    
    if (!response.ok) throw new Error('Grammar check failed');
    return await response.json();
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};

// Document Correction (PDF/Text)
export const correctDocument = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${BASE_URL}/correct-document`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) throw new Error('Document correction failed');
    return await response.blob(); // For PDF download
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};

// Code Error Checking
export const checkCode = async (code) => {
  try {
    const response = await fetch(`${BASE_URL}/check-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    
    if (!response.ok) throw new Error('Code check failed');
    return await response.json();
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};

// Plagiarism Detection
export const checkPlagiarism = async (text) => {
  try {
    const response = await fetch(`${BASE_URL}/check-plagiarism`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    
    if (!response.ok) throw new Error('Plagiarism check failed');
    return await response.json();
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};

// Readability Analysis
export const checkReadability = async (text) => {
  try {
    const response = await fetch(`${BASE_URL}/check-readability`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    
    if (!response.ok) throw new Error('Readability check failed');
    return await response.json();
  } catch (error) {
    throw new Error(`API Error: ${error.message}`);
  }
};