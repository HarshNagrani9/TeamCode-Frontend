import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { 
  Play, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  Code2, 
  Terminal as TerminalIcon, 
  ArrowLeft,
  Info,
  Loader2,
  Cpu,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
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
  const [editorWidth, setEditorWidth] = useState(window.innerWidth * 0.45);
  const [isResizing, setIsResizing] = useState(false);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<{ type: string; text: string }[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isInterpreterLoading, setIsInterpreterLoading] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  
  const pyodideRef = useRef<any>(null);

  // Load module data from registry
  const [moduleData, setModuleData] = useState<ModuleData | null>(null);

  useEffect(() => {
    const id = Number(moduleId);
    const data = getModuleData(id);
    if (data) {
      // Deep clone to avoid mutating the registry source
      setModuleData(JSON.parse(JSON.stringify(data)));
    }
    setActiveChapter(0);
    setActiveSubModule(0);
  }, [moduleId]);

  // Load Pyodide (WASM Python Runtime)
  useEffect(() => {
    const loadPyodide = async () => {
      try {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js";
        script.onload = async () => {
          // @ts-expect-error - Pyodide is loaded via script tag
          const pyodide = await window.loadPyodide();
          pyodideRef.current = pyodide;
          setIsInterpreterLoading(false);
          setOutput([{ type: 'system', text: "> Neural Kernel v3.10 initialized. Ready for execution." }]);
        };
        document.head.appendChild(script);
      } catch {
        setOutput([{ type: 'error', text: "Failed to load Python Runtime. Check your connection." }]);
      }
    };
    loadPyodide();
  }, []);

  const startResizing = useCallback(() => setIsResizing(true), []);
  const stopResizing = useCallback(() => setIsResizing(false), []);

  const resize = useCallback((e: MouseEvent) => {
    if (isResizing) {
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth > 320 && newWidth < (window.innerWidth - 440)) {
        setEditorWidth(newWidth);
      }
    }
  }, [isResizing]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResizing);
    }
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  const currentSub = moduleData?.chapters[activeChapter]?.subModules[activeSubModule];

  // Update code when switching sub-modules
  useEffect(() => {
    if (currentSub) {
      setCode(currentSub.initialCode);
      setOutput([]);
    }
  }, [activeChapter, activeSubModule, currentSub?.initialCode]);

  // Fallback if no module found
  if (!moduleData) {
    return (
      <div className={`flex h-screen items-center justify-center font-sans ${isDarkMode ? 'bg-[#0A0A0A] text-zinc-100' : 'bg-gray-50 text-slate-900'}`}>
        <div className="text-center space-y-6">
          <Cpu size={64} className="mx-auto text-[#FF6B00] opacity-20" />
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

  const executeCode = async () => {
    if (!pyodideRef.current || isExecuting || !currentSub) return;
    
    setIsExecuting(true);
    const consoleOutput: { type: string; text: string }[] = [];
    
    pyodideRef.current.setStdout({
      batched: (text: string) => {
        consoleOutput.push({ type: 'stdout', text });
      }
    });

    try {
      await pyodideRef.current.runPythonAsync(code);
      await pyodideRef.current.runPythonAsync(currentSub.testScript);
      
      const resultLine = consoleOutput.find(l => l.text.includes("__RESULT__"));
      let passed = false;
      if (resultLine) {
        const jsonStr = resultLine.text.split("__RESULT__")[1];
        passed = JSON.parse(jsonStr).passed;
        const idx = consoleOutput.indexOf(resultLine);
        consoleOutput.splice(idx, 1);
      }

      setOutput([
        { type: 'system', text: `> Executing main.py...` },
        ...consoleOutput,
        passed 
          ? { type: 'success', text: "[SUCCESS] Logic verified. Module requirement met." }
          : { type: 'info', text: "[INFO] Code executed but did not satisfy lesson criteria." }
      ]);

      if (passed) {
        const updated = { ...moduleData };
        updated.chapters[activeChapter].subModules[activeSubModule].completed = true;
        setModuleData({ ...updated });
      }

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setOutput([
        { type: 'system', text: `> Executing main.py...` },
        ...consoleOutput,
        { type: 'error', text: `RUNTIME ERROR: ${errorMessage}` }
      ]);
    } finally {
      setIsExecuting(false);
    }
  };

  const totalSubs = moduleData.chapters.reduce((acc, ch) => acc + ch.subModules.length, 0);
  const completedSubs = moduleData.chapters.reduce((acc, ch) => acc + ch.subModules.filter(s => s.completed).length, 0);
  const progressPercent = Math.round((completedSubs / totalSubs) * 100);

  if (!currentSub) return null;

  return (
    <div className={`flex h-screen font-sans overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#0A0A0A] text-zinc-100' : 'bg-gray-50 text-slate-900'}`}>
      
      {/* COLLAPSIBLE SIDEBAR */}
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

        <div className="flex-1 overflow-y-auto p-4 space-y-6 min-w-[320px]">
          {moduleData.chapters.map((chapter, cIdx) => (
            <div key={cIdx} className="space-y-2">
              <h3 className={`text-[10px] font-mono uppercase tracking-widest px-2 mb-3 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                CH {cIdx + 1}: {chapter.title}
              </h3>
              {chapter.subModules.map((sub, sIdx) => {
                const isActive = activeChapter === cIdx && activeSubModule === sIdx;
                return (
                  <button
                    key={sIdx}
                    onClick={() => { setActiveChapter(cIdx); setActiveSubModule(sIdx); }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group ${
                      isActive ? 'bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-white' : `${isDarkMode ? 'hover:bg-zinc-800/50 text-zinc-500' : 'hover:bg-slate-100 text-slate-500'}`
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {sub.completed ? (
                        <CheckCircle2 size={16} className="text-[#FF6B00]" />
                      ) : (
                        <Circle size={16} className={isActive ? 'text-[#FF6B00]' : (isDarkMode ? 'text-zinc-700' : 'text-slate-300')} />
                      )}
                      <span className={`text-xs font-medium text-left ${isActive ? 'text-[#FF6B00]' : ''}`}>
                        {sub.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
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

      {/* ARTICLE CONTENT */}
      <section className={`flex-1 flex flex-col border-r ${isDarkMode ? 'border-zinc-900' : 'border-slate-200'}`}>
        <header className={`h-16 border-b flex items-center justify-between px-8 backdrop-blur-sm ${isDarkMode ? 'border-zinc-900 bg-[#0D0D0D]/30' : 'border-slate-200 bg-white/30'}`}>
          <div className="flex items-center gap-4">
            {!isSidebarVisible && (
              <button 
                onClick={() => setIsSidebarVisible(true)}
                className="p-2 hover:bg-zinc-800 rounded-lg text-[#FF6B00] transition-colors"
                title="Expand Sidebar"
              >
                <PanelLeftOpen size={20} />
              </button>
            )}
            <div className={`flex items-center gap-2 text-xs font-mono uppercase ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
              <BookOpen size={16} />
              <span>Neural Documentation</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 space-y-8 max-w-3xl mx-auto w-full">
          <div className="space-y-4">
             <h1 className={`text-4xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{currentSub.title}</h1>
             <div className={`flex items-center gap-4 text-xs font-mono ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                <span className="bg-[#FF6B00]/10 px-2 py-1 rounded text-[#FF6B00] border border-[#FF6B00]/20 font-bold tracking-widest">WASM RUNTIME</span>
                <span>STEP {activeChapter + 1}.{activeSubModule + 1}</span>
             </div>
          </div>

          <div className={`prose prose-invert max-w-none leading-relaxed space-y-6 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
            <p className={`text-lg antialiased font-light ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>{currentSub.content}</p>

            <div className="bg-[#FF6B00]/5 border-l-2 border-[#FF6B00] p-6 rounded-r-2xl">
              <h4 className="text-[#FF6B00] text-xs font-bold flex items-center gap-2 mb-2 uppercase tracking-widest">
                <Info size={14} /> 
                The Task
              </h4>
              <p className={`text-sm ${isDarkMode ? 'text-zinc-200' : 'text-slate-800'}`}>
                {currentSub.taskDescription}
              </p>
            </div>

            <h3 className={`text-xl font-bold pt-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Logic Constraints</h3>
            <ul className={`space-y-3 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                Your code executes in a localized WebAssembly kernel.
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                We verify the state of your variables after execution.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* RESIZER HANDLE */}
      <div 
        onMouseDown={startResizing}
        className={`w-1 cursor-col-resize flex-shrink-0 transition-all z-50 hover:bg-[#FF6B00]/40 group relative ${isResizing ? 'bg-[#FF6B00]' : 'bg-transparent'}`}
      >
        <div className={`absolute inset-y-0 -left-1 -right-1 cursor-col-resize`} />
      </div>

      {/* REAL IDE (PYODIDE) */}
      <section 
        style={{ width: `${editorWidth}px` }}
        className={`flex flex-col flex-shrink-0 ${isDarkMode ? 'bg-[#080808]' : 'bg-gray-100'}`}
      >
        <header className={`h-16 border-b flex items-center justify-between px-6 ${isDarkMode ? 'border-zinc-900 bg-[#0D0D0D]' : 'border-slate-200 bg-white'}`}>
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-widest">
            {isInterpreterLoading ? (
              <Loader2 size={12} className="animate-spin text-amber-500" />
            ) : (
              <Cpu size={12} className="text-emerald-500" />
            )}
            <span>{isInterpreterLoading ? 'LOADING KERNEL...' : 'PY_KERNEL_3.10_ACTIVE'}</span>
          </div>
          <button 
            onClick={executeCode}
            disabled={isExecuting || isInterpreterLoading}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-xs transition-all ${
              isExecuting || isInterpreterLoading ? 'bg-zinc-800 text-zinc-600 cursor-wait' : 'bg-[#FF6B00] text-black hover:shadow-[0_0_25px_rgba(255,107,0,0.6)] active:scale-95'
            }`}
          >
            {isExecuting ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
            {isExecuting ? 'COMPILING...' : 'EXECUTE'}
          </button>
        </header>

        <div className="flex-1 flex flex-col p-4 overflow-hidden relative">
          <div className={`flex-1 rounded-xl border flex flex-col overflow-hidden shadow-2xl ${isDarkMode ? 'bg-[#0D0D0D] border-zinc-900' : 'bg-white border-slate-200'}`}>
            <div className={`h-10 border-b flex items-center px-4 justify-between ${isDarkMode ? 'bg-[#121212] border-zinc-900' : 'bg-gray-50 border-slate-200'}`}>
              <div className="flex items-center gap-2">
                <Code2 size={14} className="text-[#FF6B00]" />
                <span className={`text-[10px] font-mono uppercase tracking-tighter ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>workspace/main.py</span>
              </div>
            </div>
            <div className="flex-1 w-full bg-transparent p-4 font-mono text-sm relative">
              <Editor
                height="100%"
                language="python"
                value={code}
                theme={isDarkMode ? "vs-dark" : "light"}
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  padding: { top: 16 },
                  scrollBeyondLastLine: false,
                  smoothScrolling: true,
                  cursorBlinking: "smooth",
                  formatOnPaste: true,
                  wordWrap: "on",
                  lineNumbersMinChars: 3,
                  overviewRulerLanes: 0,
                  hideCursorInOverviewRuler: true,
                  scrollbar: {
                    vertical: 'hidden',
                    horizontal: 'hidden'
                  }
                }}
              />
              {/* Optional Paste Overlay for security theater if desired */}
            </div>
          </div>

          {/* REAL TERMINAL */}
          <div className={`h-60 mt-4 rounded-xl border flex flex-col overflow-hidden shadow-inner ${isDarkMode ? 'bg-black border-zinc-900' : 'bg-gray-900 border-slate-200'}`}>
             <div className={`h-8 border-b flex items-center px-4 gap-2 ${isDarkMode ? 'bg-[#0D0D0D] border-zinc-900' : 'bg-black border-slate-700'}`}>
                <TerminalIcon size={12} className="text-zinc-600" />
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Real-time Console</span>
             </div>
             <div className={`flex-1 p-4 font-mono text-[12px] overflow-y-auto space-y-1 selection:bg-zinc-700 ${isDarkMode ? 'bg-[#050505]' : 'bg-black'}`}>
                {output.length === 0 ? (
                  <span className="text-zinc-800 italic select-none">Kernel idle. Awaiting instruction.</span>
                ) : (
                  output.map((line, i) => (
                    <div key={i} className={`
                      ${line.type === 'success' ? 'text-emerald-400 font-bold' : ''}
                      ${line.type === 'error' ? 'text-rose-500' : ''}
                      ${line.type === 'system' ? 'text-zinc-600 italic' : ''}
                      ${line.type === 'stdout' ? 'text-zinc-100' : ''}
                      ${line.type === 'info' ? 'text-amber-500' : ''}
                    `}>
                      {line.text}
                    </div>
                  ))
                )}
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModuleDetail;
