import React, { useState, useEffect } from "react";
import axios from "axios";

function GrammarChecker() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [correction, setCorrection] = useState("");
  const [errors, setErrors] = useState([]);
  const [grammarCorrect, setGrammarCorrect] = useState(null);
  const [autoCheck, setAutoCheck] = useState(false);

  // Function to check grammar
  const checkGrammar = async (inputText) => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.post("https://syntax-checker.onrender.com/correct", { text: inputText });

      setCorrection(response.data.correction);
      setErrors(response.data.errors || []);

      // If no errors, set grammarCorrect to true
      setGrammarCorrect(response.data.errors.length === 0);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to check grammar.");
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-Check Debounce
  useEffect(() => {
    let timeoutId;
    if (autoCheck && text.trim()) {
      timeoutId = setTimeout(() => checkGrammar(text), 500);
    }
    return () => clearTimeout(timeoutId);
  }, [text, autoCheck]);

  // ✅ Fix: Preserve spaces while rendering errors
  const renderTextWithErrors = () => {
    if (!errors.length) return <span>{text}</span>;
  
    const words = text.split(/(\s+)/); // Split while keeping spaces
  
    return words.map((word, index) => {
      const error = errors.find((err) => err.word === word.trim());
      return (
        <span
          key={index}
          style={{
            textDecoration: error ? "underline wavy red" : "none",
            color: error ? "red" : "inherit",
          }}
        >
          {word}
        </span>
      );
    });
  };
  
  
  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-lg p-6 shadow-xl border border-gray-800 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Grammar Checker</h2>

      {/* Auto-Check Toggle Switch */}
      <div className="flex items-center mb-4">
        <span className="mr-2 text-white">Auto</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={autoCheck}
            onChange={(e) => setAutoCheck(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-purple-500 peer-focus:ring-purple-400 transition-all duration-300"></div>
          <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-all duration-300"></span>
        </label>
      </div>

      {/* Text Input with Highlighted Errors (Fix: Spaces Preserved) */}
      <div className="w-full h-32 overflow-y-auto bg-gray-800/50 rounded-lg border border-gray-700 text-white p-4 mb-4 whitespace-pre-wrap">
        {renderTextWithErrors()}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
        className="w-full h-32 p-2 bg-gray-800/50 rounded-lg border border-gray-700 text-white"
      />

      {/* Check Button */}
      <button
        onClick={() => checkGrammar(text)}
        disabled={isLoading}
        className="mt-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg disabled:bg-gray-500"
      >
        {isLoading ? "Checking..." : "Check Grammar"}
      </button>

      {/* ✅ Grammar Correct Message */}
      {grammarCorrect && (
        <div className="mt-4 p-2 bg-green-700/50 rounded-lg text-white font-semibold">
          ✅ Grammar is correct!
        </div>
      )}

      {/* Corrected Sentence */}
      {!grammarCorrect && correction && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Corrected Sentence:</h3>
          <p className="p-2 mt-2 bg-green-800/50 rounded-lg">{correction}</p>
        </div>
      )}
    </div>
  );
}

export default GrammarChecker;
