import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import  GrammarChecker from "./Grammarchecker";
import DocumentCorrection from "./Documentcorrection";
import PythonSyntaxChecker from "./Codechecker";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0a0a1f] text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#0a0a1f] to-[#0a0a1f] opacity-90" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Automatic Grammar Checker
          </h1>
          <Navbar />
          <Routes>
            <Route path="/" element={<GrammarChecker />} />
            <Route path="/document-correction" element={<DocumentCorrection />} />
            <Route path="/code-checker" element={<PythonSyntaxChecker />} />
            {/* Add routes for other components */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;