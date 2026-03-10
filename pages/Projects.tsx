
import React, { useState, useMemo, useEffect } from 'react';
import { PROJECTS } from '../constants';
import { ProjectCategory } from '../types';
import ProjectCard from '../components/ProjectCard';
import Tooltip from '../components/Tooltip';
import { Lightbulb, ArrowLeft, Filter, X, Sparkles as StarIcon, ArrowDownWideNarrow, ArrowUpNarrowWide, Layers, RotateCcw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Button from '@/components/Button';

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'category' | 'default'>('default');
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => window.scrollTo(0, 0), []);

  // Extract all unique tags from projects
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    PROJECTS.forEach(project => {
      project.tags.forEach(tag => (tag != "Bone Editor" && tag != "Ink") && tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Filter and Sort projects
  const filteredAndSortedProjects = useMemo(() => {
    // First, filter
    let result = selectedTags.length === 0 
        ? [...PROJECTS] 
        : PROJECTS.filter(project => selectedTags.some(tag => project.tags.includes(tag)));
    
    // Then, sort
    result.sort((a, b) => {
        if (sortOrder === 'default') {
            return PROJECTS.indexOf(a) - PROJECTS.indexOf(b);
        }

        if (sortOrder === 'category') {
             const categoryOrder = {
                 [ProjectCategory.GAME]: 0,
                 [ProjectCategory.IMMERSIVE]: 1,
                 [ProjectCategory.WEB]: 2,
                 [ProjectCategory.OTHER]: 3
             };
             return categoryOrder[a.category] - categoryOrder[b.category];
        }

        const dateA = new Date(a.sortDate).getTime();
        const dateB = new Date(b.sortDate).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [selectedTags, sortOrder]);

  const clearFilters = () => setSelectedTags([]);

  const triggerIconEffect = () => {
    if (isInteracting) return;
    setIsInteracting(true);
    setTimeout(() => setIsInteracting(false), 1500);
  };

  return (
    <div className="min-h-screen pb-15">
      
      {/* Link to Home */}
      <Link to="/" className="absolute sticky w-[184px] top-6 left-6 z-50 text-cv-dark font-bold flex items-center gap-2 bg-white/80 border border-cv-secondary px-4 py-2 rounded-full shadow-sm hover:bg-white hover:shadow-md hover:scale-105 transition-all">
        <ArrowLeft size={20} /> {t.immersive.backToHub}
      </Link>

      {/* Main Title Banner */}
      <div className="mt-12 mb-12 container mx-auto px-4 animate-pop-in">
        <div className="bg-white border-2 border-dashed border-cv-green rounded-full py-6 px-8 flex items-center justify-center relative shadow-lg max-w-4xl mx-auto">
            {/* Interactive Icon Container */}
            <div 
                className="absolute left-6 md:left-[10rem] top-1/2 -translate-y-1/2 cursor-pointer select-none z-10"
                onClick={triggerIconEffect}
            >
                <Tooltip content={t.projects.titleTooltip} position="top" forceHidden={isInteracting}>
                    <div className={`transition-all duration-200 ${isInteracting ? 'animate-[pulse_0.2s_ease-in-out_infinite] scale-110' : 'animate-bounce'}`}>
                        <Lightbulb 
                            size={40} 
                            className={`transition-colors duration-300 ${isInteracting ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]' : 'text-cv-dark'}`} 
                        />
                    </div>
                </Tooltip>

                {/* Stars / Sparkles Effect */}
                {isInteracting && (
                    <>
                        <div className="absolute -top-6 -left-4 text-yellow-500 animate-[pop-in_0.5s_ease-out_forwards]">
                            <StarIcon size={24} fill="currentColor" />
                        </div>
                        <div className="absolute -top-2 -right-8 text-yellow-400 animate-[pop-in_0.6s_ease-out_forwards]" style={{ animationDelay: '100ms' }}>
                            <StarIcon size={18} fill="currentColor" />
                        </div>
                        <div className="absolute -bottom-4 -left-6 text-yellow-300 animate-[pop-in_0.7s_ease-out_forwards]" style={{ animationDelay: '200ms' }}>
                            <StarIcon size={20} fill="currentColor" />
                        </div>
                        <div className="absolute bottom-0 -right-6 text-yellow-500 animate-[pop-in_0.4s_ease-out_forwards]" style={{ animationDelay: '50ms' }}>
                            <StarIcon size={16} fill="currentColor" />
                        </div>
                    </>
                )}
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-cv-dark uppercase tracking-widest text-center pl-16 md:pl-0">
                {t.projects.pageTitle}
            </h1>
        </div>
      </div>

      {/* Controls Section: Filters & Sort */}
      <div className="max-w-5xl mx-auto px-4 mb-10 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="bg-white/50 backdrop-blur-sm border border-cv-secondary rounded-2xl p-6 shadow-sm flex flex-col gap-6">
          
          {/* Top Row: Labels and Clear/Sort Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-cv-secondary/30 pb-4">
            <h3 className="flex items-center text-cv-dark font-bold text-lg">
              <Filter size={20} className="mr-2 text-cv-primary" />
              {t.projects.filterBy}
            </h3>
            
            <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-between md:justify-end flex-wrap">
                 {/* Sort Control */}
                 <div className="flex items-center gap-1 md:gap-2 bg-white rounded-full px-1 py-1 border border-slate-200 shadow-sm flex-wrap justify-center">
                    <span className="text-xs font-bold text-slate-400 px-2 uppercase hidden xl:block">{t.projects.sortBy}</span>
                    
                    <button 
                        onClick={() => setSortOrder('default')}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold transition-all ${sortOrder === 'default' ? 'bg-cv-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
                        title={t.projects.sortDefault}
                    >
                        <RotateCcw size={16} />
                        <span className="hidden lg:inline">{t.projects.sortDefault}</span>
                    </button>

                    <button 
                        onClick={() => setSortOrder('newest')}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold transition-all ${sortOrder === 'newest' ? 'bg-cv-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
                        title={t.projects.sortNewest}
                    >
                        <ArrowDownWideNarrow size={16} />
                        <span className="hidden lg:inline">{t.projects.sortNewest}</span>
                    </button>

                    <button 
                        onClick={() => setSortOrder('oldest')}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold transition-all ${sortOrder === 'oldest' ? 'bg-cv-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
                        title={t.projects.sortOldest}
                    >
                        <ArrowUpNarrowWide size={16} />
                        <span className="hidden lg:inline">{t.projects.sortOldest}</span>
                    </button>

                    <button 
                        onClick={() => setSortOrder('category')}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-bold transition-all ${sortOrder === 'category' ? 'bg-cv-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
                        title={t.projects.sortCategory}
                    >
                        <Layers size={16} />
                        <span className="hidden lg:inline">{t.projects.sortCategory}</span>
                    </button>
                 </div>

                {/* Clear Filters */}
                {selectedTags.length > 0 && (
                    <button 
                        onClick={clearFilters}
                        className="text-sm text-red-500 md:hover:text-red-700 font-semibold flex items-center transition-all md:hover:scale-110 active:scale-95 whitespace-nowrap"
                    >
                        <X size={16} className="mr-1" /> {t.projects.clearFilters}
                    </button>
                )}
            </div>
          </div>

          {/* Tags Grid */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag, idx) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{ animationDelay: `${300 + idx * 50}ms` }}
                  className={`
                    px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 border animate-pop-in opacity-0 fill-mode-forwards md:hover:shadow-md
                    ${isSelected 
                      ? 'bg-cv-primary text-white border-cv-primary shadow-md scale-110 -rotate-1' 
                      : 'bg-white text-slate-600 border-slate-200 md:hover:border-cv-primary md:hover:text-cv-primary md:hover:scale-105 md:hover:rotate-1'
                    }
                  `}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* All Projects Listed Vertically */}
      <div className="max-w-5xl mx-auto px-4 flex flex-col gap-8">
        {filteredAndSortedProjects.length > 0 ? (
          filteredAndSortedProjects.map((project, index) => (
            <div key={project.id} className="animate-slide-up opacity-0" style={{ animationDelay: `${index * 100}ms` }}>
              <ProjectCard project={project} />
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-slate-300 animate-pop-in">
             <div className="animate-float">
                <Lightbulb size={48} className="mx-auto text-slate-300 mb-4" />
             </div>
             <p className="text-xl text-slate-500 font-medium">{t.projects.noProjects}</p>
             <button onClick={clearFilters} className="mt-4 text-cv-primary font-bold hover:underline md:hover:scale-110 transition-transform">
               {t.projects.clearFilters}
             </button>
          </div>
        )}
      </div>

        <div className="hidden sm:flex justify-center my-8 text-center">
          <Button className="py-3" onClick={() => {navigate("/immersive")}}>{t.projects.goToImmersive}</Button>
        </div>
    </div>
  );
};

export default Projects;

