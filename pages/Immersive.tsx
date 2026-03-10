
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InteractiveObjectData, RoomId } from '../types';
import ImmersiveRoom from '../components/Immersive/ImmersiveRoom';
import { Gamepad2, Headset, Monitor, Palette, UserRound, ArrowLeft, Trophy, ArrowRight, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getRoomElementImage } from '@/public/utils/getImages';

// --- Configuration for All Rooms ---

const ROOMS_DATA: Record<RoomId, InteractiveObjectData[]> = {
  HUB: [],
  GAMES: [
    { id: 'g5', imageUrl: getRoomElementImage("GAMES", "list.png"), label: {it: 'Lista Videogiochi', en: 'Games List'}, x: 74, y: 7, contentType: 'LIST', contentKey: 'gamesPoster', size: "16" },
    { id: 'g1', imageUrl: getRoomElementImage("GAMES", "screen.png"), label: {it: 'Applied game: Umbrella +', en: 'Main project'}, x: 40, y: 26, contentType: 'MISSION', contentKey: 'workstation', size: "29" },
    { id: 'g2', imageUrl: getRoomElementImage("GAMES", "lamp.png"), label: {it: 'Visione', en: 'Vision'}, x: 17, y: 28, contentType: 'TEXT', contentKey: 'lamp', size: "16" },
    //{ id: 'g3', imageUrl: getRoomElementImage("GAMES", "snake.png"), label: {it: 'Snake', en: 'Snake'}, x: 67, y: 33, contentType: 'TEXT', contentKey: 'console', size: "15" },
    { id: 'g4', imageUrl: getRoomElementImage("GAMES", "unity.png"), label: {it: 'Unity', en: 'Unity'}, x: 28, y: 7, contentType: 'TEXT', contentKey: 'unityIcon', size: "9" },
  ],
  IMMERSIVE: [
    { id: 'i1', imageUrl: getRoomElementImage("IMMERSIVE", "museum.png"), label: {it: 'Guida AR per Museo', en: 'Museum Guide in AR'}, x: 32, y: 49, contentType: 'MISSION', contentKey: 'museum', size: "40", tooltipTop: true },
    { id: 'i2', imageUrl: getRoomElementImage("IMMERSIVE", "vr.png"), label: {it: 'Realtà virtuale', en: 'Virtual Reality'}, x: 10, y: 27, contentType: 'TEXT', contentKey: 'vrHeadset', size:"21" },
    { id: 'i3', imageUrl: getRoomElementImage("IMMERSIVE", "door.png"), label: {it: 'Visione', en: 'Vision'}, x: 76, y: 38, contentType: 'TEXT', contentKey: 'portal', size: "15" },
    { id: 'i4', imageUrl: getRoomElementImage("IMMERSIVE", "murales.png"), label: {it: 'Murales e AR', en: 'Murales and AR'}, x: 40, y: 12, contentType: 'TEXT', contentKey: 'mural', size: "30" },
    { id: 'g4', imageUrl: getRoomElementImage("IMMERSIVE", "unity.png"), label: {it: 'Unity', en: 'Unity'}, x: 77, y: 6, contentType: 'TEXT', contentKey: 'unityIcon2', size: "9" },
  ],
  WEB: [
    { id: 'w1', imageUrl: getRoomElementImage("WEB", "computer.png"), label: {it: 'Portfolio', en: 'Portfolio'}, x: 15, y: 38, contentType: 'MISSION', contentKey: 'screen', size: "28" },
    { id: 'w2', imageUrl: getRoomElementImage("WEB", "laptop.png"), label: {it: 'Frontend Developer', en: 'Frontend Developer'}, x: 48, y: 50, contentType: 'TEXT', contentKey: 'laptop', size: "22", tooltipTop: true },
    { id: 'w3', imageUrl: getRoomElementImage("WEB", "shelf.png"), label: {it: 'I miei strumenti', en: 'My knowledge'}, x: 57, y: 14, contentType: 'TEXT', contentKey: 'shelf', size: "30" },
    { id: 'w4', imageUrl: getRoomElementImage("WEB", "lense.png"), label: {it: 'dettagli', en: 'details'}, x: 75, y: 62, contentType: 'TEXT', contentKey: 'magnifyingGlass', size: "12" }
  ],
  EXTRA: [
    { id: 'c1', imageUrl: getRoomElementImage("EXTRA", "flash.png"), label: {it: 'Flash: robot', en: 'Flash: the robot'}, x: 18, y: 52, contentType: 'TEXT', contentKey: 'robot',size: "20" },
    { id: 'c2', imageUrl: getRoomElementImage("EXTRA", "photovideo.png"), label: {it: 'Foto e video', en: 'Photos and videos'}, x: 18, y: 11, contentType: 'TEXT', contentKey: 'camera', size: "17" },
    { id: 'c5', imageUrl: getRoomElementImage("EXTRA", "crochet.png"), label: {it: 'progetto in Python', en: 'Python project'}, x: 8, y: 14, contentType: 'TEXT', contentKey: 'crossStitch', size: "12" },
    // { id: 'c4', imageUrl: getRoomElementImage("EXTRA", "blind.png"), label: {it: "un'app per persone non Vedenti", en: "App for blind people"}, x: 10, y: 47, contentType: 'TEXT', contentKey: 'blind', size: "18" },
    { id: 'c3', imageUrl: getRoomElementImage("EXTRA", "portal.png"), label: {it: 'Applicazione con OpenGl', en: 'OpenGl app'}, x: 47, y: 25, contentType: 'TEXT', contentKey: 'solarSystem', size: "15" },
    { id: 'c6', imageUrl: getRoomElementImage("EXTRA", "tech.png"), label: {it: 'tecnologie', en: 'Technologies'}, x: 72, y: 38, contentType: 'TEXT', contentKey: 'tech', size: "21" },
  ]
};

const ROOM_THEMES: Record<RoomId, string> = {
    HUB: 'bg-cv-bg',
    GAMES: 'bg-slate-900',
    IMMERSIVE: 'bg-teal-950',
    WEB: 'bg-slate-50',
    EXTRA: 'bg-[#fff8e1]'
};

const Immersive: React.FC = () => {
  const [currentView, setCurrentView] = useState<RoomId>('HUB');
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeStep, setWelcomeStep] = useState(1);
  const [visitedRooms, setVisitedRooms] = useState<Set<RoomId>>(new Set());
  const { t } = useLanguage();

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('immersive_welcome_seen');
    if (!hasSeen) {
        const timer = setTimeout(() => setShowWelcome(true), 500);
        return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
      if (currentView !== 'HUB') {
          setVisitedRooms(prev => {
              const newSet = new Set(prev);
              newSet.add(currentView);
              return newSet;
          });
      }
  }, [currentView]);

  const handleNextStep = () => {
      setWelcomeStep(2);
  };

  const handleCloseWelcome = () => {
    sessionStorage.setItem('immersive_welcome_seen', 'true');
    setShowWelcome(false);
  };

  // Helper to get current welcome content
  const welcomeContent = welcomeStep === 1 ? t.immersive.welcome.step1 : t.immersive.welcome.step2;

  // --- Render Hub ---
  if (currentView === 'HUB') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cv-bg relative overflow-hidden font-sans">

        {/* Decorative Background Blobs (Consistent with Home) */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-cv-secondary/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-float pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cv-primary/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl animate-float pointer-events-none" style={{ animationDelay: '1s' }}></div>

        {/* Welcome Modal - Multi-Step (Clean Style) */}
        {showWelcome && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                <div className="bg-white rounded-3xl p-8 max-w-md text-center shadow-2xl border-2 border-cv-secondary relative overflow-hidden">

                    {/* Close Button */}
                    <button
                        onClick={handleCloseWelcome}
                        className="absolute top-4 right-4 z-20 text-slate-400 hover:text-cv-primary hover:rotate-90 transition-all"
                        aria-label="Close"
                    >
                        <X size={24} />
                    </button>

                    {/* Step Indicator */}
                    <div className="flex justify-center gap-2 mb-6 relative z-10">
                        <div className={`h-2 w-8 rounded-full transition-colors duration-300 ${welcomeStep === 1 ? 'bg-cv-primary' : 'bg-slate-200'}`}></div>
                        <div className={`h-2 w-8 rounded-full transition-colors duration-300 ${welcomeStep === 2 ? 'bg-cv-primary' : 'bg-slate-200'}`}></div>
                    </div>

                    <div key={welcomeStep} className="animate-slide-up">
                        <h2 className="text-2xl font-extrabold text-cv-dark mb-4 uppercase tracking-wider relative z-10">
                            {welcomeContent.title}
                        </h2>
                        <p className="text-slate-600 text-lg mb-8 leading-relaxed relative z-10">
                            {welcomeContent.text}
                        </p>
                    </div>

                    <button
                        onClick={welcomeStep === 1 ? handleNextStep : handleCloseWelcome}
                        className="relative z-10 bg-cv-primary text-white font-bold px-8 py-3 rounded-full text-lg hover:bg-cyan-700 hover:scale-105 hover:shadow-lg transition-all flex items-center gap-2 mx-auto group"
                    >
                        {welcomeContent.button}
                        {welcomeStep === 1 && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                </div>
            </div>
        )}

        {/* Nav */}
        <Link to="/" className="absolute top-6 left-6 z-50 text-cv-dark font-bold flex items-center gap-2 bg-white/80 border border-cv-secondary px-4 py-2 rounded-full shadow-sm hover:bg-white hover:shadow-md hover:scale-105 transition-all">
            <ArrowLeft size={20} /> {t.immersive.backToHub}
        </Link>

        {/* Visited Rooms Counter */}
        <div className="absolute top-6 flex justify-center w-full z-49">
            <div className="flex items-center gap-3 bg-white/80 border border-cv-secondary px-5 py-2 rounded-full shadow-sm animate-slide-up">
                <Trophy size={20} className="text-yellow-500" />
                <span className="text-cv-dark font-bold tracking-wider">
                    {t.immersive.visitedCounter.replace('{count}', visitedRooms.size.toString()).replace('{total}', '4')}
                </span>
            </div>
        </div>

        <h1 className="text-4xl font-extrabold text-cv-dark mb-4 mt-[85px] animate-pop-in uppercase tracking-[0.1em] relative z-10 text-center">
           {t.immersive.hubTitle}
        </h1>

        {/* Central Hub Area */}
        <div className="relative w-[780px] h-[600px] flex items-center justify-center scale-75 md:scale-100">

            {/* Connecting Lines (Subtle style) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600">
                <line x1="300" y1="300" x2="100" y2="100" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="5 4" />
                <line x1="300" y1="300" x2="500" y2="100" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="5 4" />
                <line x1="300" y1="300" x2="100" y2="500" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="5 4" />
                <line x1="300" y1="300" x2="500" y2="500" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="5 4" />
            </svg>

            {/* Avatar */}
            <button onClick={() => {!showWelcome && setShowWelcome(true)}} className="z-10 w-32 h-32 rounded-full bg-white border-4 border-cv-secondary shadow-xl flex items-center justify-center overflow-hidden animate-float relative">
                 <div className="absolute inset-0 bg-cv-primary/5"></div>
                <UserRound size={60} className="text-cv-primary" />
            </button>

            {/* Buttons - Clean Card Style (Consistent with Projects) */}

            {/* Top Left: Games - Purple Theme */}
            <button
                onClick={() => setCurrentView('GAMES')}
                className={`absolute top-10 left-20 w-36 h-36 md:w-48 md:h-48 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all animate-pop-in group border-2 border-b-[8px] active:border-b-[2px] active:translate-y-[6px] bg-white
                ${visitedRooms.has('GAMES') ? 'border-purple-400 text-purple-700 bg-purple-50' : 'border-purple-200 text-purple-600 hover:border-purple-400 hover:shadow-xl hover:-rotate-2'}`}
                style={{ animationDelay: '100ms' }}
            >
                <Gamepad2 size={48} className="group-hover:animate-wiggle text-purple-500" />
                <span className="font-bold text-sm tracking-widest uppercase">{t.immersive.rooms.GAMES}</span>
            </button>

            {/* Top Right: AR/VR - Pink Theme */}
            <button
                onClick={() => setCurrentView('IMMERSIVE')}
                className={`absolute top-10 right-20 w-36 h-36 md:w-48 md:h-48 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all animate-pop-in group border-2 border-b-[8px] active:border-b-[2px] active:translate-y-[6px] bg-white
                ${visitedRooms.has('IMMERSIVE') ? 'border-pink-400 text-pink-700 bg-pink-50' : 'border-pink-200 text-pink-600 hover:border-pink-400 hover:shadow-xl hover:rotate-2'}`}
                style={{ animationDelay: '200ms' }}
            >
                <Headset size={48} className="group-hover:animate-float text-pink-500" />
                <span className="font-bold text-sm tracking-widest uppercase">{t.immersive.rooms.IMMERSIVE}</span>
            </button>

            {/* Bottom Left: Web - Cyan Theme */}
            <button
                onClick={() => setCurrentView('WEB')}
                className={`absolute bottom-10 left-20 w-36 h-36 md:w-48 md:h-48 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all animate-pop-in group border-2 border-b-[8px] active:border-b-[2px] active:translate-y-[6px] bg-white
                ${visitedRooms.has('WEB') ? 'border-cyan-400 text-cyan-700 bg-cyan-50' : 'border-cyan-200 text-cyan-600 hover:border-cyan-400 hover:shadow-xl hover:rotate-2'}`}
                style={{ animationDelay: '300ms' }}
            >
                <Monitor size={48} className="group-hover:scale-110 transition-transform text-cyan-500" />
                <span className="font-bold text-sm tracking-widest uppercase">{t.immersive.rooms.WEB}</span>
            </button>

            {/* Bottom Right: Creative - Amber Theme */}
            <button
                onClick={() => setCurrentView('EXTRA')}
                className={`absolute bottom-10 right-20 w-36 h-36 md:w-48 md:h-48 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all animate-pop-in group border-2 border-b-[8px] active:border-b-[2px] active:translate-y-[6px] bg-white
                ${visitedRooms.has('EXTRA') ? 'border-amber-400 text-amber-700 bg-amber-50' : 'border-amber-200 text-amber-600 hover:border-amber-400 hover:shadow-xl hover:-rotate-2'}`}
                style={{ animationDelay: '400ms' }}
            >
                <Palette size={48} className="group-hover:rotate-12 transition-transform text-amber-500" />
                <span className="font-bold text-sm tracking-widest uppercase">{t.immersive.rooms.EXTRA}</span>
            </button>
        </div>
      </div>
    );
  }

  // --- Render Specific Room ---
  return (
    <ImmersiveRoom
        id={currentView}
        objects={ROOMS_DATA[currentView]}
        onBack={() => setCurrentView('HUB')}
        onSwitchRoom={(id) => setCurrentView(id)}
        colorTheme={ROOM_THEMES[currentView]}
        visitedCount={visitedRooms.size}
        totalRooms={4}
    />
  );
};

export default Immersive;
