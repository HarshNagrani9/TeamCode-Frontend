import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { 
  Play, 
  ArrowLeft, 
  Loader2, 
  Cpu, 
  Terminal as TerminalIcon,
  FolderTree,
  FileCode
} from 'lucide-react';

interface EditorPageProps {
  isDarkMode: boolean;
}

const EditorPage: React.FC<EditorPageProps> = ({ isDarkMode }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<{ type: string; text: string }[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isInterpreterLoading, setIsInterpreterLoading] = useState(true);
  
  const pyodideRef = useRef<any>(null);

  // Decode initial code from URL
  useEffect(() => {
    const encoded = searchParams.get('code');
    if (encoded) {
      try {
        setCode(decodeURIComponent(escape(atob(encoded))));
      } catch {
        setCode('# Error decoding initial code\nprint("Hello World")');
      }
    } else {
      setCode('# Write your Python code here\nprint("Hello, Neural Learner!")');
    }
  }, [searchParams]);

  // Load Pyodide - check if already loaded first
  useEffect(() => {
    let cancelled = false;

    const initPyodide = async () => {
      // Check if Pyodide is already available on window
      if ((window as any).loadPyodide && pyodideRef.current) {
        setIsInterpreterLoading(false);
        setOutput([{ type: 'system', text: '> Python Environment Ready.' }]);
        return;
      }

      // Check if the script tag already exists
      const existingScript = document.querySelector('script[src*="pyodide"]');
      
      const boot = async () => {
        try {
          const pyodide = await (window as any).loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/',
          });
          if (!cancelled) {
            pyodideRef.current = pyodide;
            setIsInterpreterLoading(false);
            setOutput([{ type: 'system', text: '> Python 3.12 Environment Initialized. Ready.' }]);
          }
        } catch (err) {
          if (!cancelled) {
            setOutput([{ type: 'error', text: `Failed to boot Python: ${err}` }]);
            setIsInterpreterLoading(false);
          }
        }
      };

      if (existingScript && (window as any).loadPyodide) {
        // Script exists and loadPyodide is available
        await boot();
      } else if (!existingScript) {
        // Need to load the script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js';
        script.async = true;
        script.onload = boot;
        script.onerror = () => {
          if (!cancelled) {
            setOutput([{ type: 'error', text: 'Failed to load Python runtime. Check your internet connection.' }]);
            setIsInterpreterLoading(false);
          }
        };
        document.head.appendChild(script);
      } else {
        // Script tag exists but loadPyodide not yet available - wait for it
        const interval = setInterval(() => {
          if ((window as any).loadPyodide) {
            clearInterval(interval);
            boot();
          }
        }, 200);
        // Timeout after 30s
        setTimeout(() => {
          clearInterval(interval);
          if (!cancelled && isInterpreterLoading) {
            setOutput([{ type: 'error', text: 'Python runtime timed out. Please refresh.' }]);
            setIsInterpreterLoading(false);
          }
        }, 30000);
      }
    };

    initPyodide();
    return () => { cancelled = true; };
  }, []);

  const executeCode = useCallback(async () => {
    if (!pyodideRef.current || isExecuting) return;
    
    setIsExecuting(true);
    const consoleOutput: { type: string; text: string }[] = [];
    
    pyodideRef.current.setStdout({
      batched: (text: string) => {
        consoleOutput.push({ type: 'stdout', text });
      }
    });
    pyodideRef.current.setStderr({
      batched: (text: string) => {
        consoleOutput.push({ type: 'error', text });
      }
    });

    try {
      await pyodideRef.current.runPythonAsync(code);
      setOutput([
        { type: 'system', text: `> python main.py` },
        ...consoleOutput,
        { type: 'system', text: '\n> Process finished with exit code 0' },
      ]);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setOutput([
        { type: 'system', text: `> python main.py` },
        ...consoleOutput,
        { type: 'error', text: errorMessage },
      ]);
    } finally {
      setIsExecuting(false);
    }
  }, [code, isExecuting]);

  return (
    <div className={`flex flex-col h-screen font-sans ${isDarkMode ? 'bg-[#0D0D0D] text-zinc-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* ─── TOP NAVBAR ─── */}
      <header className={`h-14 border-b flex items-center justify-between px-6 flex-shrink-0 ${isDarkMode ? 'border-zinc-900 bg-[#121212]' : 'border-slate-200 bg-white'}`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
              isDarkMode ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft size={16} /> Back to Lesson
          </button>
          <div className={`w-px h-6 ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'}`} />
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-bold">
            <span className={isDarkMode ? 'text-zinc-500' : 'text-slate-400'}>WORKSPACE:</span>
            <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>Interactive Sandbox</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest font-bold">
            {isInterpreterLoading ? (
              <div className="flex items-center gap-2 text-amber-500">
                <Loader2 size={12} className="animate-spin" />
                <span>Booting Kernel...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-500">
                <Cpu size={12} />
                <span>Kernel Active</span>
              </div>
            )}
          </div>
          
          <button 
            onClick={executeCode}
            disabled={isExecuting || isInterpreterLoading}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-xs transition-all flex-shrink-0 whitespace-nowrap ${
              isExecuting || isInterpreterLoading 
                ? 'bg-zinc-800 text-zinc-600 cursor-wait' 
                : 'bg-[#FF6B00] text-black hover:shadow-[0_0_20px_rgba(255,107,0,0.5)] active:scale-95'
            }`}
          >
            {isExecuting ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
            {isExecuting ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </header>

      {/* ─── MAIN IDE GRID ─── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* FILE EXPLORER */}
        <div className={`w-56 border-r flex flex-col flex-shrink-0 ${isDarkMode ? 'border-zinc-900 bg-[#0A0A0A]' : 'border-slate-200 bg-slate-50'}`}>
          <div className={`h-10 border-b flex items-center px-4 text-[10px] font-mono uppercase tracking-widest font-bold ${isDarkMode ? 'border-zinc-900 text-zinc-500' : 'border-slate-200 text-slate-400'}`}>
            <FolderTree size={14} className="mr-2" />
            Explorer
          </div>
          <div className="flex-1 p-2 space-y-1">
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
              isDarkMode ? 'bg-[#FF6B00]/10 text-white border border-[#FF6B00]/20' : 'bg-orange-100 text-orange-900 border border-orange-200'
            }`}>
              <FileCode size={14} className="text-[#FF6B00]" />
              <span className="text-xs font-mono">main.py</span>
            </div>
          </div>
        </div>

        {/* EDITOR + TERMINAL */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* EDITOR */}
          <div className="flex-1 flex flex-col min-h-0 relative">
            <div className={`h-10 border-b flex items-center px-4 gap-4 flex-shrink-0 ${isDarkMode ? 'border-zinc-900 bg-[#111]' : 'border-slate-200 bg-white'}`}>
               <div className={`flex items-center gap-2 px-4 h-full border-b-2 border-[#FF6B00] bg-gradient-to-t ${isDarkMode ? 'from-[#FF6B00]/10 to-transparent' : 'from-orange-50 to-transparent'}`}>
                  <FileCode size={14} className="text-[#FF6B00]" />
                  <span className={`text-[11px] font-mono ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>main.py</span>
               </div>
            </div>
            <div className="flex-1 min-h-0 min-w-0">
              <Editor
                height="100%"
                language="python"
                value={code}
                theme={isDarkMode ? "vs-dark" : "light"}
                onChange={(value) => setCode(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  fontFamily: 'JetBrains Mono, Fira Code, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                  padding: { top: 16 },
                  scrollBeyondLastLine: false,
                  smoothScrolling: true,
                  cursorBlinking: "smooth",
                  wordWrap: "on",
                }}
              />
            </div>
          </div>

          {/* TERMINAL */}
          <div className={`h-64 border-t flex flex-col flex-shrink-0 ${isDarkMode ? 'border-zinc-900 bg-black' : 'border-slate-300 bg-slate-100'}`}>
            <div className={`h-9 border-b flex items-center px-4 gap-2 flex-shrink-0 ${isDarkMode ? 'border-zinc-900 bg-[#0A0A0A]' : 'border-slate-300 bg-slate-200'}`}>
               <TerminalIcon size={14} className={isDarkMode ? 'text-zinc-600' : 'text-slate-500'} />
               <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${isDarkMode ? 'text-zinc-500' : 'text-slate-600'}`}>Terminal</span>
            </div>
            <div className={`flex-1 min-h-0 min-w-0 p-4 font-mono text-[13px] overflow-y-auto space-y-1 ${isDarkMode ? 'bg-[#050505]' : 'bg-slate-50'}`}>
               {output.length === 0 && (
                 <div className="text-zinc-600 italic">
                   {isInterpreterLoading ? 'Loading Python environment...' : 'Ready. Click "Run Code" to execute.'}
                 </div>
               )}
               {output.map((line, i) => (
                 <div key={i} className={`
                   ${line.type === 'system' ? 'text-zinc-500 font-bold' : ''}
                   ${line.type === 'stdout' ? (isDarkMode ? 'text-zinc-200' : 'text-slate-800') : ''}
                   ${line.type === 'error' ? 'text-rose-500' : ''}
                 `}>
                   {line.text}
                 </div>
               ))}
               {!isExecuting && output.length > 0 && (
                 <div className="text-zinc-600 font-bold pt-2">&gt; _</div>
               )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditorPage;
