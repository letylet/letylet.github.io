
import React from 'react';
import { X, CheckCircle, Target, UserCog, Trophy } from 'lucide-react';
import Button from '../Button';
import { useLanguage } from '../../context/LanguageContext';
import { InteractiveObjectData } from '../../types';
import { useNavigate } from 'react-router-dom';

interface InfoModalProps {
  objectData: InteractiveObjectData;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ objectData, onClose }) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate()

  // Helper to resolve localized string
  const resolveText = (path: string) => {
    const keys = path.split('.');
    let current: any = t.immersive.objects;
    for (const key of keys) {
      if (current[key]) {
        current = current[key];
      } else {
        return "Text not found";
      }
    }
    return current;
  };

  // Get content based on type
  const content = resolveText(objectData.contentKey);

  // Determine if this is a "Main" panel that should be centered
  // MISSION is considered complex/large content
  const isCentered = ['MISSION'].includes(objectData.contentType);

  // Position logic for "Near Icon" popovers
  // We offset the modal away from the edge of the screen based on the icon's position
  const getPopoverStyle = () => {
    const { x, y } = objectData;
    const isRight = x > 50;
    const isBottom = y > 50;

    return {
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(${isRight ? '-100%' : '0'}, ${isBottom ? '-100%' : '0'})`,
        marginTop: isBottom ? '-1.5rem' : '1.5rem',
        marginLeft: isRight ? '-1.5rem' : '1.5rem',
    };
  };

  const renderBody = () => (
    <>
        {objectData.contentType === 'TEXT' && (
            <p className="text-base text-slate-700 leading-relaxed text-center"
            dangerouslySetInnerHTML={{ __html: content.text || content }}>
                {/* {content.text || content} */}
            </p>
        )}

        {objectData.contentType === 'LIST' && (
            <div>
                <h4 className="text-base font-bold text-cv-dark mb-4">{content.title}</h4>
                <ul className="text-left space-y-2 inline-block">
                {content.list.split('\n').map((item: string, idx: number) => (
                    <li key={idx} className="text-base text-slate-700 leading-relaxed" >{item}</li>
                ))}
                </ul>
            </div>
        )}

        {objectData.contentType === 'IMAGE' && (
            <div className="space-y-4">
                {objectData.imageUrl && (
                    <img src={objectData.imageUrl} alt="Content" className="w-full rounded-xl border-2 border-slate-200 shadow-md" />
                )}
                <p className="text-slate-700">{content.text}</p>
            </div>
        )}

        {objectData.contentType === 'MISSION' && (
            <div className="space-y-4">
                {/* <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-400">
                <h4 className="font-bold text-red-600 flex items-center gap-2">
                    <Target size={18} /> {t.immersive.missionLabels.problem}
                </h4>
                <p className="text-sm text-slate-700">{content.mission.problem}</p>
                </div> */}
                
                <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-400">
                <h4 className="font-bold text-green-600 flex items-center gap-2">
                    <CheckCircle size={18} /> {t.immersive.missionLabels.solution}
                </h4>
                <p className="text-sm text-slate-700"><span dangerouslySetInnerHTML={{__html: content.mission.solution}}></span></p>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-400">
                <h4 className="font-bold text-blue-600 flex items-center gap-2">
                    <UserCog size={18} /> {t.immersive.missionLabels.responsibilities}
                </h4>
                <p className="text-sm text-slate-700"><span dangerouslySetInnerHTML={{__html: content.mission.resp}}></span></p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-400">
                <h4 className="font-bold text-yellow-600 flex items-center gap-2">
                    <Trophy size={18} /> {t.immersive.missionLabels.results}
                </h4>
                <p className="text-sm text-slate-700"><span dangerouslySetInnerHTML={{__html: content.mission.results}}></span></p>
                </div>
            </div>
        )}
    </>
  );

  // --- Render Centered Modal (Mission / List) ---
  if (isCentered) {
    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
        >
        <div 
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg border-4 border-cv-primary overflow-hidden relative animate-slide-up"
            style={{ maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className="bg-cv-primary p-4 flex justify-between items-center text-white">
            <h3 className="text-xl font-extrabold uppercase tracking-wider">
                {objectData.label[language]}
            </h3>
            <button onClick={onClose} className="hover:bg-white/20 rounded-full p-1 transition-colors">
                <X size={24} />
            </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
                {renderBody()}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-center">
                <Button onClick={() => { navigate("/projects")}} variant="secondary">vai alla lista progetti</Button>
            </div>
        </div>
        </div>
    );
  }

  // --- Render Popover Modal (Text / Image ) ---
  return (
    <div className="fixed inset-0 z-50 overflow-hidden" onClick={onClose}>
        {/* Invisible backdrop to catch clicks */}
        
        <div 
            className="absolute bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-cv-secondary w-72 md:w-80 animate-pop-in origin-center flex flex-col overflow-hidden"
            style={getPopoverStyle()}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className="bg-cv-dark px-4 py-2 flex justify-between items-center text-white">
                <span className="font-bold text-sm uppercase tracking-wide truncate pr-2">
                    {objectData.label[language]}
                </span>
                <button onClick={onClose} className="hover:text-cv-primary transition-colors">
                    <X size={16} />
                </button>
            </div>

            {/* Content */}
            <div className="p-5">
                {renderBody()}
            </div>
            
        </div>
    </div>
  );
};

export default InfoModal;
