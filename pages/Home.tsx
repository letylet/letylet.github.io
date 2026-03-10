
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Linkedin, Mail, Gamepad2, Sparkles, Rocket } from 'lucide-react';
import Button from '../components/Button';
import Tooltip from '../components/Tooltip';
import { SOCIAL_LINKS } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { getImage } from '@/public/utils/getImages';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const isMobile = window.matchMedia(`(max-width: 768px)`).matches;

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* Decorative background elements from CV style */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-cv-secondary/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cv-primary/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-20 right-10 text-cv-secondary/20 animate-wiggle">
         <Gamepad2 size={120} />
      </div>

      <div className="max-w-6xl w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white p-8 md:p-16 relative z-10 animate-slide-up">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Photo & Socials */}
          <div className="md:col-span-4 flex flex-col items-center text-center relative">
            {/* Dotted line decorative element */}
            <div className="hidden md:block absolute top-0 bottom-0 right-[-24px] w-0.5 border-r-2 border-dashed border-cv-accent/50 h-full"></div>
            
            <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8 group cursor-pointer">
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-cv-primary animate-[spin_10s_linear_infinite] opacity-50 group-hover:animate-spin"></div>
              <div className="absolute inset-2 rounded-full bg-cv-dark overflow-hidden border-4 border-white shadow-xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-6">
                {/* Placeholder illustration */}
                <img 
                  src={getImage("letizia.png")}
                  alt="Letizia Penné" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Tooltip content={t.home.tooltips.github}>
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="p-3 bg-slate-800 text-white rounded-full hover:bg-black transition-all hover:scale-150 shadow-lg animate-pop-in block" style={{ animationDelay: '200ms' }}>
                  <Github size={24} />
                </a>
              </Tooltip>
              
              <Tooltip content={t.home.tooltips.linkedin}>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-all hover:scale-150 shadow-lg animate-pop-in block" style={{ animationDelay: '300ms' }}>
                  <Linkedin size={24} />
                </a>
              </Tooltip>

              <Tooltip content={t.home.tooltips.email}>
                <a href={SOCIAL_LINKS.email} className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all hover:scale-110 hover:rotate-12 shadow-lg animate-pop-in block" style={{ animationDelay: '400ms' }}>
                  <Mail size={24} />
                </a>
              </Tooltip>
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="md:col-span-8 space-y-6 text-center md:text-left">
            <div>
                <h1 className="text-5xl md:text-7xl font-extrabold text-cv-dark mb-2 tracking-tight animate-slide-up">
                Letizia Penné
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold text-cv-primary flex items-center justify-center md:justify-start gap-3 animate-slide-up" style={{ animationDelay: '100ms' }}>
                {t.home.role}
                </h2>
            </div>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl animate-slide-up" style={{ animationDelay: '200ms' }}>
                {t.home.description}
            </p>

            <div className="pt-6 flex flex-col md:flex-row gap-4 justify-center md:justify-start animate-slide-up" style={{ animationDelay: '300ms' }}>
                <Tooltip content={ isMobile ? t.home.tooltips.immersiveMobile : t.home.tooltips.immersive} position="bottom">
                    <Button 
                        variant="secondary" 
                        className="text-lg px-8 py-4 hover:scale-105 disabled:bg-gray"
                        onClick={() => navigate('/immersive')}
                        disabled={isMobile}
                    >
                        <Sparkles size={20} /> {t.home.immersiveBtn}
                    </Button>
                </Tooltip>

                <Tooltip content={t.home.tooltips.projects} position="bottom">
                    <Button 
                        variant="primary" 
                        className="text-lg px-8 py-4 hover:animate-wiggle"
                        onClick={() => navigate('/projects')}
                    >
                        {t.home.cta} <Rocket size={20} />
                    </Button>
                </Tooltip>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
