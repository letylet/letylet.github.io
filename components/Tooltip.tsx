
import React from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
  delay?: number;
  forceHidden?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top', forceHidden = false }) => {
  
  const visibilityClasses = forceHidden 
    ? 'opacity-0' 
    : `opacity-0 group-hover:opacity-100 group-hover:translate-y-0 ${position === 'top' ? 'translate-y-2' : '-translate-y-2'}`;

  return (
    <div className="group relative flex items-center justify-center">
      {children}
      <div className={`
        absolute ${position === 'top' ? 'bottom-full mb-3' : 'top-full mt-3'} 
        left-1/2 -translate-x-1/2 
        px-3 py-1.5 
        bg-cv-dark text-white text-xs font-bold tracking-wide rounded-lg shadow-xl border border-cv-secondary/30
        transition-all duration-200 transform 
        whitespace-nowrap pointer-events-none z-50
        ${visibilityClasses}
      `}>
        {content}
        {/* Arrow */}
        <div className={`
          absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-cv-dark rotate-45
          ${position === 'top' ? '-bottom-1 border-r border-b border-cv-secondary/30' : '-top-1 border-l border-t border-cv-secondary/30'}
        `}></div>
      </div>
    </div>
  );
};

export default Tooltip;
