import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import portfolioDataDefault from '../data/portfolio.json';

const AdminPanel = ({ onDataUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [portfolioData, setPortfolioData] = useState(null);
  const [editedData, setEditedData] = useState('');
  const [activeTab, setActiveTab] = useState('hero');
  const [saveStatus, setSaveStatus] = useState('');

  // Simple password (you can change this)
  const ADMIN_PASSWORD = '1422002';

  useEffect(() => {
    // Load portfolio data from localStorage or default
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setPortfolioData(data);
        setEditedData(JSON.stringify(data[activeTab], null, 2));
      } catch (err) {
        console.error('Error loading saved data:', err);
        setPortfolioData(portfolioDataDefault);
        setEditedData(JSON.stringify(portfolioDataDefault[activeTab], null, 2));
      }
    } else {
      setPortfolioData(portfolioDataDefault);
      setEditedData(JSON.stringify(portfolioDataDefault[activeTab], null, 2));
    }
  }, [activeTab]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password!');
    }
  };

  const handleSave = () => {
    try {
      const parsedSectionData = JSON.parse(editedData);
      
      // Update the specific section in portfolioData
      const updatedData = {
        ...portfolioData,
        [activeTab]: parsedSectionData
      };
      
      setPortfolioData(updatedData);
      
      // Save to localStorage
      localStorage.setItem('portfolioData', JSON.stringify(updatedData));
      
      // Notify parent component
      if (onDataUpdate) {
        onDataUpdate(updatedData);
      }
      
      setSaveStatus('✓ Saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
      
      // Reload the page to reflect changes
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      setSaveStatus('✗ Invalid JSON format!');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to original data?')) {
      localStorage.removeItem('portfolioData');
      window.location.reload();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-charcoal text-white rounded-full shadow-2xl hover:bg-gold transition-all z-50 flex items-center justify-center group"
        title="Admin Panel"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => setIsOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-charcoal text-white p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Portfolio Admin Panel</h2>
              <p className="text-cream/70 text-sm">Edit your portfolio content</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            {!isAuthenticated ? (
              <form onSubmit={handleLogin} className="max-w-md mx-auto">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🔐</div>
                  <h3 className="text-2xl font-bold text-charcoal mb-2">Authentication Required</h3>
                  <p className="text-charcoal/60">Enter password to access admin panel</p>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-6 py-4 border-2 border-beige rounded-xl focus:border-gold outline-none text-lg mb-4"
                  autoFocus
                />
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-charcoal text-white rounded-xl font-semibold hover:bg-gold transition-all"
                >
                  Login
                </button>
                {/* <p className="text-sm text-charcoal/50 text-center mt-4">
                  Default password: 
                </p> */}
              </form>
            ) : (
              <>
                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  {['hero', 'about', 'experience', 'skills', 'education', 'contact'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`px-6 py-3 rounded-xl font-semibold capitalize transition-all whitespace-nowrap ${
                        activeTab === tab
                          ? 'bg-charcoal text-white'
                          : 'bg-beige/30 text-charcoal hover:bg-beige/50'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Editor */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-charcoal mb-2 uppercase tracking-wider">
                    Edit {activeTab} Section
                  </label>
                  <textarea
                    value={editedData}
                    onChange={(e) => setEditedData(e.target.value)}
                    className="w-full h-96 px-4 py-3 border-2 border-beige rounded-xl focus:border-gold outline-none font-mono text-sm"
                    spellCheck={false}
                  />
                </div>

                {/* Status Message */}
                {saveStatus && (
                  <div className={`mb-4 p-4 rounded-xl text-center font-semibold ${
                    saveStatus.includes('✓') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {saveStatus}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    onClick={handleSave}
                    className="flex-1 px-6 py-4 bg-charcoal text-white rounded-xl font-semibold hover:bg-gold transition-all"
                  >
                    💾 Save Changes
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-6 py-4 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all"
                  >
                    🔄 Reset to Default
                  </button>
                </div>

                <div className="mt-4 p-4 bg-beige/30 rounded-xl">
                  <p className="text-sm text-charcoal/70">
                    <strong>Note:</strong> Changes are saved to browser localStorage and will persist until you reset or clear browser data.
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminPanel;
