import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-900/50 backdrop-blur-lg rounded-lg p-4 shadow-xl border border-gray-800 mb-8">
      <ul className="flex justify-center space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-purple-500 transition-colors">
            Grammar Checker
          </Link>
        </li>
        <li>
          <Link to="/document-correction" className="text-white hover:text-purple-500 transition-colors">
            Document Correction
          </Link>
        </li>
        <li>
          <Link to="/code-checker" className="text-white hover:text-purple-500 transition-colors">
            Code Checker
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;