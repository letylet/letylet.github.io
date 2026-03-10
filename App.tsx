
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Immersive from './pages/Immersive';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isSpinning, setIsSpinning] = useState(false);

  const toggleLanguage = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 500); // Spin duration
    setLanguage(language === 'it' ? 'en' : 'it');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-6 right-4 z-[60] bg-white border-2 border-cv-primary text-cv-dark font-bold px-4 py-2 rounded-full shadow-lg hover:bg-cv-primary hover:text-white transition-all duration-300 flex items-center gap-2 group active:scale-90 hover:-translate-y-1"
      aria-label="Switch Language"
    >
      <Globe 
        size={20}
        className={`transition-transform duration-500 ${isSpinning ? 'rotate-[360deg]' : 'group-hover:animate-wiggle'}`}
      />
      <span className="uppercase">{language}</span>
    </button>
  );
};

const AppContent: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="font-sans antialiased text-slate-800 bg-cv-bg min-h-screen selection:bg-cv-secondary selection:text-cv-dark">
          <LanguageSwitcher />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/immersive" element={<Immersive />} />
          </Routes>

          {/* Simple Footer */}
          <footer className="text-center py-8 text-slate-400 text-sm">
            <p className="hover:text-cv-primary transition-colors cursor-default">{t.footer.text.replace('{year}', new Date().getFullYear().toString())}</p>
          </footer>
        </div>
    );
}

const App: React.FC = () => {
  return (
    <LanguageProvider>
        <AppContent />
    </LanguageProvider>
  );
};

export default App;
