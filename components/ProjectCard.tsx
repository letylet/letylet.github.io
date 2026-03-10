
import React, { useState } from 'react';
import { Project, ProjectType, ProjectCategory } from '../types';
import Button from './Button';
import { ChevronDown, ChevronUp, Calendar, ExternalLink, Gamepad2, Headset, Monitor, Palette } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Lightbox from './Lightbox';
import { getProjectImages } from '@/public/utils/getImages';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const { language, t } = useLanguage();

  const isExpandable = project.type === ProjectType.EXPANDABLE;
  const hasLink = !!project.link;

  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  // --- Helper Components ---

  const Tags = ({ tags }: { tags: string[] }) => (
    <div className="flex flex-wrap gap-2 mt-3">
      {tags.map(tag => (
        <span 
          key={tag} 
          className="text-xs px-3 py-1 rounded-full bg-white border border-cv-primary text-cv-dark font-semibold shadow-sm cursor-default"
        >
          {tag}
        </span>
      ))}
    </div>
  );

  // Helper to get Category Styles and Icon
  const getCategoryConfig = (category: ProjectCategory) => {
    switch (category) {
      case ProjectCategory.GAME:
        return {
          icon: <Gamepad2 size={14} className="mr-1.5" />,
          label: t.immersive.rooms.GAMES,
          // Purple theme matching Immersive section (#a855f7)
          className: "bg-purple-100 text-purple-700 border-purple-200"
        };
      case ProjectCategory.IMMERSIVE:
        return {
          icon: <Headset size={14} className="mr-1.5" />,
          label: t.immersive.rooms.IMMERSIVE,
          // Pink theme matching Immersive section (#f06292)
          className: "bg-pink-100 text-pink-600 border-pink-200"
        };
      case ProjectCategory.WEB:
        return {
          icon: <Monitor size={14} className="mr-1.5" />,
          label: t.immersive.rooms.WEB,
          // Cyan theme matching Immersive section (#00e5ff) - adjusted for contrast
          className: "bg-cyan-50 text-cyan-700 border-cyan-200"
        };
      case ProjectCategory.OTHER:
        return {
          icon: <Palette size={14} className="mr-1.5" />,
          label: t.immersive.rooms.EXTRA,
          // Amber/Yellow theme matching Immersive section (#ffd740)
          className: "bg-amber-100 text-amber-700 border-amber-200"
        };
      default:
        return { icon: null, label: '', className: '' };
    }
  };

  const categoryConfig = getCategoryConfig(project.category);

  return (
    <>
      <div className="group w-full bg-white border-2 border-cv-secondary rounded-2xl overflow-hidden shadow-lg transition-all duration-300 md:hover:shadow-2xl md:hover:border-cv-primary">
        {/* Header / Main Content */}
        <div className="p-6 md:p-8 relative">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            
            {/* Text Content */}
            <div className="flex-1">
              {/* Category Badge */}
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border mb-3 ${categoryConfig.className}`}>
                  {categoryConfig.icon}
                  {categoryConfig.label}
              </div>

              {project.subtitle && (
                <h4 className="text-cv-green font-bold text-sm uppercase tracking-wider mb-1">
                  {project.subtitle[language]}
                </h4>
              )}
              <h3 className="text-2xl md:text-3xl font-extrabold text-cv-dark mb-4 md:group-hover:text-cv-primary transition-colors">
                {project.title[language]}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-4">
                {project.shortDescription[language]}
              </p>
              <Tags tags={project.tags} />
            </div>
            
            {/* Image Content: Visible on mobile (order-first) and desktop (order-none/last) */}
            {project.images && project.images.length > 0 && !isExpanded && (
              <div 
                className="order-first md:order-none w-full md:w-48 h-48 md:h-32 shrink-0 rounded-xl overflow-hidden shadow-md bg-slate-100 transform md:group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => openLightbox(0)}
              >
                <img 
                  src={getProjectImages(project.images[0])} 
                  alt={project.title[language]} 
                  className="w-full h-full object-cover" 
                />
              </div>
            )}
          </div>

          {/* Expanded Content (Only for Expandable types) */}
          {isExpandable && (
            <div className={`mt-6 overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="border-t-2 border-dashed border-cv-secondary pt-6">
                  <h4 className="text-lg font-bold text-cv-dark mb-2">{t.projects.detailsHeader}</h4>
                  <p className="text-slate-700 mb-6 leading-relaxed whitespace-pre-line">
                      {project.fullDescription ? project.fullDescription[language] : project.shortDescription[language]}
                  </p>
                  
                  {/* Image Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {project.images && project.images.map((img, idx) => (
                          <div 
                            key={idx} 
                            className="rounded-xl overflow-hidden shadow-md h-48 md:h-64 group/img cursor-zoom-in"
                            onClick={() => openLightbox(idx)}
                          >
                              <img src={ getProjectImages(img)} alt={`${project.title[language]} screenshot ${idx}`} className="w-full h-full object-cover md:hover:scale-110 transition-transform duration-500" />
                          </div>
                      ))}
                  </div>
                  {/* Link Button */}
                  {hasLink && (
                    <a href={project.link} target="_blank" rel="noreferrer">
                      <Button variant="secondary">
                          {t.projects.visitWebsite} <ExternalLink size={18} />
                      </Button>
                    </a>
                  )}
              </div>
            </div>
          )}

          {/* Action Area: Buttons */}
          {(isExpandable || hasLink) && (
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              {isExpandable && (
                <Button 
                  onClick={() => setIsExpanded(!isExpanded)} 
                  variant="primary"
                >
                  {isExpanded ? (
                    <>{t.projects.seeLess} <ChevronUp size={20} /></>
                  ) : (
                    <>{t.projects.seeDetails} <ChevronDown size={20} /></>
                  )}
                </Button>
              )}
              
              {hasLink && !isExpandable && (
                <a href={project.link} target="_blank" rel="noreferrer">
                  <Button variant="secondary">
                      {t.projects.visitWebsite} <ExternalLink size={18} />
                  </Button>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Footer: Date */}
        {project.date && (
          <div className="bg-cv-secondary/30 py-3 px-6 flex items-center justify-start md:justify-center text-cv-dark font-bold border-t border-cv-secondary md:group-hover:bg-cv-secondary/50 transition-colors">
            <Calendar size={18} className="mr-2 md:group-hover:animate-wiggle" />
            {project.date[language]}
          </div>
        )}
      </div>

      <Lightbox 
        isOpen={lightboxOpen}
        images={project.images}
        initialIndex={photoIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
};

export default ProjectCard;
