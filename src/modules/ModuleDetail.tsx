import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CheckCircle2,
  Circle,
  ArrowLeft,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  ChevronUp,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import W3ExampleCard from './components/W3ExampleCard';
import { parseContentToCells } from './utils/parseContentToCells';
import { getModuleData } from './moduleRegistry';
import type { ModuleData } from './types';

interface ModuleDetailProps {
  isDarkMode: boolean;
}

const ModuleDetail: React.FC<ModuleDetailProps> = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const { moduleId } = useParams<{ moduleId: string }>();

  const [activeChapter, setActiveChapter] = useState(0);
  const [activeSubModule, setActiveSubModule] = useState(0);
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set([0]));
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  // Load module data from registry
  const [moduleData, setModuleData] = useState<ModuleData | null>(null);

  useEffect(() => {
    const id = Number(moduleId);
    const data = getModuleData(id);
    if (data) {
      setModuleData(JSON.parse(JSON.stringify(data)));
    }
    setActiveChapter(0);
    setActiveSubModule(0);
  }, [moduleId]);

  const currentSub = moduleData?.chapters[activeChapter]?.subModules[activeSubModule];

  // Parse content into cells
  const cells = currentSub ? parseContentToCells(currentSub.content) : [];

  // Mark complete and advance to next sub-module
  const handleMarkComplete = () => {
    if (!moduleData) return;

    const updated = { ...moduleData, chapters: [...moduleData.chapters] };
    updated.chapters[activeChapter] = {
      ...updated.chapters[activeChapter],
      subModules: [...updated.chapters[activeChapter].subModules],
    };
    updated.chapters[activeChapter].subModules[activeSubModule] = {
      ...updated.chapters[activeChapter].subModules[activeSubModule],
      completed: true,
    };
    setModuleData(updated);

    // Advance to next sub-module or next chapter
    const currentChapter = updated.chapters[activeChapter];
    if (activeSubModule < currentChapter.subModules.length - 1) {
      setActiveSubModule(activeSubModule + 1);
    } else if (activeChapter < updated.chapters.length - 1) {
      setActiveChapter(activeChapter + 1);
      setActiveSubModule(0);
      setExpandedChapters(prev => new Set([...prev, activeChapter + 1]));
    }

    // Scroll to top
    const scrollContainer = document.getElementById('module-scroll-container');
    if (scrollContainer) scrollContainer.scrollTop = 0;
  };

  // Fallback if no module found
  if (!moduleData) {
    return (
      <div className={`flex h-screen items-center justify-center font-sans ${isDarkMode ? 'bg-[#0A0A0A] text-zinc-100' : 'bg-gray-50 text-slate-900'}`}>
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold">Module Not Found</h2>
          <p className={`text-sm ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>The requested module does not exist in the registry.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-[#FF6B00] text-black font-bold rounded-xl text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(255,107,0,0.4)] active:scale-95 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const totalSubs = moduleData.chapters.reduce((acc, ch) => acc + ch.subModules.length, 0);
  const completedSubs = moduleData.chapters.reduce((acc, ch) => acc + ch.subModules.filter(s => s.completed).length, 0);
  const progressPercent = Math.round((completedSubs / totalSubs) * 100);

  if (!currentSub) return null;

  // Determine if this is the very last sub-module
  const isLastSubModule = activeChapter === moduleData.chapters.length - 1 && 
    activeSubModule === moduleData.chapters[moduleData.chapters.length - 1].subModules.length - 1;

  return (
    <div className={`flex h-screen font-sans overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#0A0A0A] text-zinc-100' : 'bg-gray-50 text-slate-900'}`}>

      {/* ─── SIDEBAR ─── */}
      <aside
        className={`border-r flex flex-col transition-all duration-300 ease-in-out relative ${
          isSidebarVisible ? 'w-80' : 'w-0 overflow-hidden opacity-0'
        } ${isDarkMode ? 'border-zinc-900 bg-[#0D0D0D]' : 'border-slate-200 bg-white'}`}
      >
        <div className={`p-6 border-b flex items-center justify-between min-w-[320px] ${isDarkMode ? 'border-zinc-900' : 'border-slate-200'}`}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-zinc-800 text-zinc-500' : 'hover:bg-slate-100 text-slate-400'}`}
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h2 className="text-sm font-bold text-[#FF6B00] uppercase tracking-tighter">Module {String(moduleData.moduleNumber).padStart(2, '0')}</h2>
              <h1 className="text-lg font-bold truncate w-40">{moduleData.title}</h1>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarVisible(false)}
            className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-zinc-800 text-zinc-500 hover:text-white' : 'hover:bg-slate-100 text-slate-400 hover:text-slate-900'}`}
            title="Collapse Sidebar"
          >
            <PanelLeftClose size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-w-[320px]">
          {moduleData.chapters.map((chapter, cIdx) => {
            const isExpanded = expandedChapters.has(cIdx);
            return (
              <div key={cIdx} className="space-y-1">
                <button
                  onClick={() => {
                    const next = new Set(expandedChapters);
                    if (next.has(cIdx)) next.delete(cIdx);
                    else next.add(cIdx);
                    setExpandedChapters(next);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                    isDarkMode ? 'hover:bg-zinc-800/50' : 'hover:bg-slate-100'
                  }`}
                >
                  <h3 className={`text-[10px] font-mono uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                    CH {cIdx + 1}: {chapter.title}
                  </h3>
                  {isExpanded ? <ChevronUp size={12} className="text-zinc-600" /> : <ChevronDown size={12} className="text-zinc-600" />}
                </button>

                {isExpanded && (
                  <div className="space-y-1 mt-1">
                    {chapter.subModules.map((sub, sIdx) => {
                      const isActive = activeChapter === cIdx && activeSubModule === sIdx;
                      return (
                        <button
                          key={sIdx}
                          onClick={() => { setActiveChapter(cIdx); setActiveSubModule(sIdx); }}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group ${
                            isActive ? 'bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-white' : `${isDarkMode ? 'hover:bg-zinc-800/50 text-zinc-300' : 'hover:bg-slate-100 text-slate-700'}`
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {sub.completed ? (
                              <CheckCircle2 size={16} className="text-[#FF6B00]" />
                            ) : (
                              <Circle size={16} className={isActive ? 'text-[#FF6B00]' : (isDarkMode ? 'text-zinc-500' : 'text-slate-400')} />
                            )}
                            <span className={`text-xs font-medium text-left ${isActive ? 'text-[#FF6B00]' : ''}`}>
                              {sub.title}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={`p-4 border-t min-w-[320px] ${isDarkMode ? 'border-zinc-900 bg-[#0A0A0A]' : 'border-slate-200 bg-gray-50'}`}>
          <div className={`flex justify-between text-[10px] font-mono mb-2 uppercase tracking-tighter ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
            <span>Sync Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDarkMode ? 'bg-zinc-900' : 'bg-slate-200'}`}>
            <div className="h-full bg-[#FF6B00] shadow-[0_0_10px_#FF6B00] transition-all duration-700" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </aside>

      {/* ─── CONTENT CANVAS ─── */}
      <main className={`flex-1 flex flex-col min-w-0 ${isDarkMode ? 'bg-[#0A0A0A]' : 'bg-gray-50'}`}>
        {/* Header bar */}
        <header className={`h-14 flex-shrink-0 border-b flex items-center justify-between px-6 ${isDarkMode ? 'border-zinc-900 bg-[#0D0D0D]/80 backdrop-blur-md' : 'border-slate-200 bg-white/80 backdrop-blur-md'}`}>
          <div className="flex items-center gap-4">
            {!isSidebarVisible && (
              <button
                onClick={() => setIsSidebarVisible(true)}
                className="p-2 hover:bg-zinc-800 rounded-lg text-[#FF6B00] transition-colors"
                title="Expand Sidebar"
              >
                <PanelLeftOpen size={18} />
              </button>
            )}
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest">
              <BookOpen size={14} className={isDarkMode ? 'text-zinc-600' : 'text-slate-400'} />
              <span className={isDarkMode ? 'text-zinc-500' : 'text-slate-400'}>{currentSub.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-[#FF6B00] font-bold">
            Reading Mode
          </div>
        </header>

        {/* Cells */}
        <div id="module-scroll-container" className="flex-1 overflow-y-auto">
          <div className={`max-w-4xl mx-auto w-full ${isDarkMode ? 'bg-[#111]' : 'bg-white'} my-6 rounded-xl border shadow-2xl overflow-hidden ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
            {/* Title cell */}
            <div className={`px-8 py-8 border-b ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
              <div className={`text-[10px] font-mono uppercase tracking-widest mb-3 ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>
                Step {activeChapter + 1}.{activeSubModule + 1}
              </div>
              <h1 className={`text-3xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {currentSub.title}
              </h1>
            </div>

            {/* Content cells */}
            {cells.map((cell, idx) => (
              <W3ExampleCard
                key={`${currentSub.id}-${idx}`}
                cell={cell}
                isDarkMode={isDarkMode}
              />
            ))}

            {/* Task description */}
            {currentSub.taskDescription && (
              <div className={`px-8 py-6 border-t ${isDarkMode ? 'border-zinc-800 bg-[#FF6B00]/5' : 'border-slate-200 bg-orange-50/50'}`}>
                <p className="text-xs font-mono uppercase tracking-widest mb-2 text-[#FF6B00] font-bold">
                  📝 Task
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>
                  {currentSub.taskDescription}
                </p>
              </div>
            )}

            {/* ─── MARK AS COMPLETE BUTTON ─── */}
            <div className={`px-8 py-8 border-t ${isDarkMode ? 'border-zinc-800 bg-[#0D0D0D]' : 'border-slate-200 bg-slate-50'}`}>
              {currentSub.completed ? (
                <div className="flex items-center gap-3 text-[#FF6B00]">
                  <CheckCircle2 size={20} />
                  <span className="font-bold text-sm">Section Completed</span>
                </div>
              ) : (
                <button
                  onClick={handleMarkComplete}
                  className="group flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 bg-[#FF6B00] text-white hover:bg-[#ff7b1a] shadow-[0_4px_20px_rgba(255,107,0,0.3)] hover:shadow-[0_8px_30px_rgba(255,107,0,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                >
                  {isLastSubModule ? 'Complete Module' : 'Mark as Complete & Continue'}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ModuleDetail;
