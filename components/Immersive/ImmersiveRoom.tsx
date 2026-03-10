
import React, { useState } from 'react';
import { InteractiveObjectData, RoomId } from '../../types';
import * as Icons from 'lucide-react';
import InfoModal from './InfoModal';
import { useLanguage } from '../../context/LanguageContext';
import { getImage } from '@/public/utils/getImages';
import clsx from 'clsx';

interface ImmersiveRoomProps {
  id: RoomId;
  objects: InteractiveObjectData[];
  onBack: () => void;
  onSwitchRoom: (id: RoomId) => void;
  colorTheme: string;
  visitedCount: number;
  totalRooms: number;
}

const ROOM_IMAGES: Record<RoomId, string> = {
    HUB: '',
    // Dark Gaming Setup
    GAMES: 'gameRoom.png',
    // Futuristic Neon / Cyberpunk
    IMMERSIVE: 'immersiveRoom.png',
    // Clean Modern Office
    WEB: 'webRoom.png',
    // Artist Workshop / Messy Desk
    EXTRA: 'creativeRoom.png'
};

// --- Decor Components for each Room ---

const RoomDecor: React.FC<{ id: RoomId, children: React.ReactNode}> = ({ id, children }) => {
    const bgImage = getImage(ROOM_IMAGES[id]);
    
    if (!bgImage) return null;

    return (
        <div className="relative inset-0 z-0">
            {/* Background Image */}
            <img 
                src={bgImage} 
                alt={`${id} Room Background`} 
                className="w-full h-full object-cover transition-opacity duration-700"
            />
            {children}
            {/* Overlay to ensure icons pop and text is readable */}
            {/* TODO: <div className={`absolute inset-0 ${id === 'WEB' || id === 'EXTRA' ? 'bg-white/10' : 'bg-black/40'}`}></div>*/}
            
            {/* Scanline effect for Tech rooms */}
            {/* {(id === 'GAMES' || id === 'IMMERSIVE') && (
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>
            )} */}
        </div>
    );
}

const ImmersiveRoom: React.FC<ImmersiveRoomProps> = ({ id, objects, onBack, onSwitchRoom, colorTheme, visitedCount, totalRooms }) => {
  const [activeObject, setActiveObject] = useState<InteractiveObjectData | null>(null);
  const { language, t } = useLanguage();

  // Helper to dynamically render Lucide icons
  const renderIcon = (iconName: string, size: number = 64) => {
    const IconComponent = (Icons as any)[iconName];
    if (!IconComponent) return <Icons.HelpCircle size={size} />;
    return <IconComponent size={size} strokeWidth={1.5} />;
  };

  // Determine Object Styling based on Room ID (Lighting)
  const getObjectStyles = (roomId: RoomId) => {
      switch(roomId) {
          case 'GAMES': return 'text-cyan-300 border-cyan-500/50';
          case 'IMMERSIVE': return 'text-pink-300 border-pink-500/50';
          case 'WEB': return 'text-blue-600 border-blue-200/50 hover:text-blue-700';
          case 'EXTRA': return 'text-amber-700 border-amber-900/20 hover:text-amber-900';
          default: return 'text-white';
      }
  }

  const themeStyles = getObjectStyles(id);

  return (
    <div className={`relative w-full max-h-screen overflow-hidden bg-black`}>
      
      {/* Room Background */}
      <RoomDecor id={id} > 
        {objects.map((obj, idx) => (
          <button
            key={obj.id}
            onClick={() => setActiveObject(obj)}
            className={`absolute group flex flex-col items-center justify-center transition-all duration-100 animate-pop-in hover:z-50 pointer-events-auto cursor-pointer ${themeStyles}`}
            style={{ 
              top: `${obj.y}%`, 
              left: `${obj.x}%`,
              animationDelay: `${idx * 100}ms`
            }}
          >
            {/* Image or Icon */}
            <div className="relative">
                {obj.imageUrl ? (
                    <img src={obj.imageUrl} alt="obj" className="object-contain max-w-fit drop-shadow-md hover:scale-105" style={{ width: `${obj.size}vw`, height: "auto" }} loading="lazy"/>
                ) : (
                    renderIcon(obj.icon, 48) 
                )}
                
                {/* Pulsing Indicator for interactivity */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping opacity-75"></div>
            </div>

            {/* Label (appears on hover) */}
            <span className={clsx("absolute left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg backdrop-blur-sm", obj.tooltipTop ? "-top-10" : "-bottom-10")}>
              {obj.label[language]}
            </span>
          </button>
        ))}
      </RoomDecor> 

      {/* Back Button */}
      <button 
        onClick={onBack}
        className="absolute top-6 left-4 z-50 bg-white/90 text-cv-dark px-4 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2 backdrop-blur"
      >
        <Icons.ArrowLeft size={20} /> {t.immersive.backButton}
      </button>

      {/* Visited Rooms Counter (Centered) - Neon Style */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-black/40 border-2 border-[#ffd740] px-5 py-2 rounded-full shadow-[0_0_15px_rgba(255,215,64,0.3)]">
        <Icons.Trophy size={24} className="text-[#ffd740]" />
        <span className="text-white font-bold tracking-wider">
             {t.immersive.visitedCounter.replace('{count}', visitedCount.toString()).replace('{total}', totalRooms.toString())}
        </span>
      </div>

      {/* Room Title */}
      {/*<div className="absolute top-4 right-4 z-40 bg-white/90 backdrop-blur px-6 py-2 rounded-xl font-extrabold text-2xl text-cv-dark shadow-sm uppercase tracking-widest border-2 border-cv-secondary hidden md:block">
        {id} Room
      </div>*/}

      {/* Interactive Objects Area */}
      <div className="absolute inset-0 w-full h-full z-30 pointer-events-none">
        
      </div>

      {/* Quick Navigation Dock */}
      <div className="absolute bottom-6 w-full z-50 flex justify-center">
        <div className="flex gap-4 bg-black/60 backdrop-blur-xl p-3 rounded-full border border-white/20 shadow-2xl animate-slide-up">
          <NavButton roomId="GAMES" currentId={id} onClick={onSwitchRoom} icon={<Icons.Gamepad2 size={24} />} />
          <NavButton roomId="IMMERSIVE" currentId={id} onClick={onSwitchRoom} icon={<Icons.Headset size={24} />} />
          <NavButton roomId="WEB" currentId={id} onClick={onSwitchRoom} icon={<Icons.Monitor size={24} />} />
          <NavButton roomId="EXTRA" currentId={id} onClick={onSwitchRoom} icon={<Icons.Palette size={24} />} />
        </div>
      </div>

      {/* Modal */}
      {activeObject && (
        <InfoModal 
          objectData={activeObject} 
          onClose={() => setActiveObject(null)} 
        />
      )}
    </div>
  );
};

const NavButton: React.FC<{ roomId: RoomId; currentId: RoomId; onClick: (id: RoomId) => void; icon: React.ReactNode }> = ({ roomId, currentId, onClick, icon }) => {
    const isActive = roomId === currentId;
    return (
        <button 
            onClick={() => onClick(roomId)}
            disabled={isActive}
            className={`
                p-3 rounded-full transition-all duration-300
                ${isActive 
                    ? 'bg-cv-primary text-white scale-110 shadow-[0_0_10px_rgba(0,229,255,0.5)] cursor-default' 
                    : 'bg-white/10 text-white/70 hover:bg-white/30 hover:text-white hover:scale-110'
                }
            `}
            title={roomId}
        >
            {icon}
        </button>
    );
}

export default ImmersiveRoom;
