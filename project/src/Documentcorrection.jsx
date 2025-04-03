import React, { useState } from 'react';
import axios from 'axios';

function DocumentCorrection() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [originalText, setOriginalText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [errorHighlights, setErrorHighlights] = useState([]);
  const [isCorrected, setIsCorrected] = useState(false);

  const correctDocument = async () => {
    if (!file) return alert('Please upload a file.');

    setIsLoading(true);
    setIsCorrected(false);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('https://syntax-checker.onrender.com/correct-document', formData);
      
      setOriginalText(response.data.original_text);
      setCorrectedText(response.data.corrected_text);
      setErrorHighlights(response.data.errors);
      setIsCorrected(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to correct document.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCorrectedDocument = async () => {
    try {
      const response = await axios.get('http://localhost:8000/download-corrected', { responseType: 'blob' });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'corrected_document.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to download document.');
    }
  };

  const highlightErrors = (text) => {
    if (!text || !errorHighlights.length) return { __html: text };

    let highlightedText = text;
    
    errorHighlights.forEach(error => {
      const regex = new RegExp(`\\b${error.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi'); 
      highlightedText = highlightedText.replace(regex, `<span class="text-red-500 underline">${error}</span>`);
    });

    return { __html: highlightedText };
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-lg p-6 shadow-xl border border-gray-800 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Document Correction</h2>
      
      <input
        type="file"
        accept=".pdf,.txt"
        onChange={(e) => setFile(e.target.files[0])}
        className="file-input file-input-bordered w-full max-w-xs mb-4"
      />

      <button
        onClick={correctDocument}
        disabled={!file || isLoading}
        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg disabled:bg-gray-500"
      >
        {isLoading ? 'Processing...' : 'Correct Document'}
      </button>

      {originalText && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Original Text (Errors Highlighted)</h3>
          <p className="bg-gray-800 p-4 rounded-md text-white" dangerouslySetInnerHTML={highlightErrors(originalText)}></p>
        </div>
      )}
      
      {correctedText && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Corrected Text</h3>
          <p className="bg-gray-800 p-4 rounded-md text-white">{correctedText}</p>
        </div>
      )}
      
      {isCorrected && (
        <button
          onClick={downloadCorrectedDocument}
          className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg"
        >
          Download Corrected Document
        </button>
      )}
    </div>
  );
}

export default DocumentCorrection;
