import React, { useState, useEffect } from "react";
import axios from "axios";

function PythonSyntaxChecker() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [correctedCode, setCorrectedCode] = useState("");
  const [syntaxCorrect, setSyntaxCorrect] = useState(null);
  const [autoCheck, setAutoCheck] = useState(false);

  // Function to check Python syntax
  const checkSyntax = async (inputCode) => {
    if (!inputCode.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.post("https://syntax-checker.onrender.com/check_python", { code: inputCode });

      setErrors(response.data.errors || []);
      setCorrectedCode(response.data.corrected_code || "");
      setSyntaxCorrect(response.data.errors.length === 0);
    } catch (error) {
      console.error("Error:", error);
      setErrors([{ line: 1, message: "Failed to check syntax." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-Check Debounce
  useEffect(() => {
    let timeoutId;
    if (autoCheck && code.trim()) {
      timeoutId = setTimeout(() => checkSyntax(code), 500);
    }
    return () => clearTimeout(timeoutId);
  }, [code, autoCheck]);

  // Function to apply suggested fix
  const applyCorrection = () => {
    setCode(correctedCode);
    setErrors([]);
    setSyntaxCorrect(true);
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-lg p-6 shadow-xl border border-gray-800 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Python Syntax Checker</h2>

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

      {/* Code Input */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your Python code here..."
        className="w-full h-32 p-2 bg-gray-800/50 rounded-lg border border-gray-700 text-white font-mono"
        style={{ textDecorationLine: errors.length > 0 ? 'underline' : 'none', textDecorationColor: 'red' }}
      />

      {/* Check Button */}
      <button
        onClick={() => checkSyntax(code)}
        disabled={isLoading}
        className="mt-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg disabled:bg-gray-500"
      >
        {isLoading ? "Checking..." : "Check Syntax"}
      </button>

      {/* ✅ Syntax Correct Message */}
      {syntaxCorrect && (
        <div className="mt-4 p-2 bg-green-700/50 rounded-lg text-white font-semibold">
          ✅ Syntax is correct!
        </div>
      )}

      {/* ❌ Syntax Errors */}
      {!syntaxCorrect && errors.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Syntax Errors:</h3>
          {errors.map((error, index) => (
            <div key={index} className="p-2 mt-2 bg-red-800/50 rounded-lg">
              Line {error.line}: {error.message}
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Suggested Corrected Code */}
      {!syntaxCorrect && correctedCode && correctedCode !== code && (
        <div className="mt-4 p-2 bg-blue-800/50 rounded-lg text-white">
          <h3 className="text-lg font-semibold">Suggested Fix:</h3>
          <pre className="mt-2 p-2 bg-gray-700 rounded">{correctedCode}</pre>
          <button
            onClick={applyCorrection}
            className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg"
          >
            Apply Fix
          </button>
        </div>
      )}
    </div>
  );
}

export default PythonSyntaxChecker;
