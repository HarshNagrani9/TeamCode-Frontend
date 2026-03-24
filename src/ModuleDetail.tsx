import React, { useState, useEffect, useRef } from 'react';
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

interface ModuleDetailProps {
  onBack: () => void;
  isDarkMode: boolean;
}

const ModuleDetail: React.FC<ModuleDetailProps> = ({ onBack, isDarkMode }) => {
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeSubModule, setActiveSubModule] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<{ type: string; text: string }[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [isInterpreterLoading, setIsInterpreterLoading] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  
  const pyodideRef = useRef<any>(null); // Still need any for pyodide as it's an external library without easy types here

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

  const [moduleData, setModuleData] = useState({
    title: "Python for AI",
    chapters: [
      {
        title: "Foundations of Python for ML",
        subModules: [
          { 
            id: "ds_01",
            title: "Efficient Data Structures", 
            content: "In Machine Learning, we often handle massive datasets. Using standard Python lists can be slow. Here we explore why Tuples are used for tensor shapes (immutability) and how Dictionaries power model configurations.",
            taskDescription: "Create a tuple named 'tensor_shape' with values (3, 224, 224) and print its length.",
            initialCode: "# Task: Create 'tensor_shape' (tuple) with (3, 224, 224)\n# Then print its length.\n",
            testScript: `
import json
try:
    is_tuple = isinstance(tensor_shape, tuple)
    correct_len = len(tensor_shape) == 3
    print("__RESULT__" + json.dumps({"passed": is_tuple and correct_len}))
except NameError:
    print("__RESULT__" + json.dumps({"passed": False}))
            `,
            completed: false
          },
          { 
            id: "lc_02",
            title: "Advanced List Comprehensions", 
            content: "List comprehensions are optimized at the C-level in Python. We use them to transform data labels and normalize small datasets on the fly.",
            taskDescription: "Create a list 'normalized' that squares every number in [1, 2, 3, 4, 5] and print it.",
            initialCode: "# Task: Square numbers 1-5 using a list comprehension.\n# Print the 'normalized' list.\n",
            testScript: `
import json
try:
    is_list = isinstance(normalized, list)
    correct_vals = normalized == [1, 4, 9, 16, 25]
    print("__RESULT__" + json.dumps({"passed": is_list and correct_vals}))
except NameError:
    print("__RESULT__" + json.dumps({"passed": False}))
            `,
            completed: false
          },
          { 
            id: "mm_03",
            title: "Memory Management & Dynamic Typing", 
            content: "Understanding how Python handles object references is key to avoiding memory leaks in long-running training loops.",
            taskDescription: "Create list x = [1]. Create y = x. Append 2 to x and print y to see reference behavior.",
            initialCode: "# Task: Demonstrate object referencing.\n# Create x=[1], y=x, append 2 to x, print y.\n",
            testScript: `
import json
try:
    passed = 'y' in locals() and y == [1, 2] and x is y
    print("__RESULT__" + json.dumps({"passed": passed}))
except NameError:
    print("__RESULT__" + json.dumps({"passed": False}))
            `,
            completed: false
          }
        ]
      },
      {
        title: "Numerical Computing Foundations",
        subModules: [
          { 
            id: "vec_01",
            title: "Vectorization over Loops", 
            content: "The 'For' loop is the enemy of performance. In this chapter, we discuss the mathematical 'Why' behind vectorization.",
            taskDescription: "Print the string 'Vectorization is faster than loops' to initialize the engine.",
            initialCode: "print('Vectorization is faster than loops')",
            testScript: "import json; print('__RESULT__{\"passed\": true}')",
            completed: false
          },
          { 
            id: "brd_02",
            title: "NumPy Array Broadcasting", 
            content: "Broadcasting allows you to perform operations on arrays of different shapes.",
            taskDescription: "Define two lists as a, b and print their element-wise sum using a list comprehension to simulate broadcasting.",
            initialCode: "a = [1, 2]\nb = [10, 10]\n# print element-wise sum\n",
            testScript: "import json; print('__RESULT__{\"passed\": True}')",
            completed: false
          },
          { 
            id: "slc_03",
            title: "High-Performance Slicing", 
            content: "Accessing specific dimensions of a 4D tensor requires precision.",
            taskDescription: "Print a slice of range(10) from index 2 to 5.",
            initialCode: "print(list(range(10))[2:5])",
            testScript: "import json; print('__RESULT__{\"passed\": True}')",
            completed: false
          }
        ]
      }
    ]
  });

  const currentSub = moduleData.chapters[activeChapter].subModules[activeSubModule];

  useEffect(() => {
    setCode(currentSub.initialCode);
    setOutput([]);
  }, [activeChapter, activeSubModule, currentSub.initialCode]);

  const executeCode = async () => {
    if (!pyodideRef.current || isExecuting) return;
    
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
        setModuleData(updated);
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

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    setOutput(prev => [...prev, { type: 'system', text: "!! SECURITY: Neural-Link required. Manual input only (Paste disabled)." }]);
  };

  const totalSubs = moduleData.chapters.reduce((acc, ch) => acc + ch.subModules.length, 0);
  const completedSubs = moduleData.chapters.reduce((acc, ch) => acc + ch.subModules.filter(s => s.completed).length, 0);
  const progressPercent = Math.round((completedSubs / totalSubs) * 100);

  return (
    <div className={`flex h-screen font-sans overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#0A0A0A] text-zinc-100' : 'bg-gray-50 text-slate-900'}`}>
      
      {/* COLLAPSIBLE SIDEBAR */}
      <aside 
        className={`border-r flex flex-col transition-all duration-300 ease-in-out relative ${
          isSidebarVisible ? 'w-80' : 'w-0 overflow-hidden opacity-0'
        } ${isDarkMode ? 'border-zinc-900 bg-[#0D0D0D]' : 'border-slate-200 bg-white'}`}
      >
        <div className="p-6 border-b border-zinc-900 flex items-center justify-between min-w-[320px]">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h2 className="text-sm font-bold text-[#FF6B00] uppercase tracking-tighter">Module 01</h2>
              <h1 className="text-lg font-bold truncate w-40">{moduleData.title}</h1>
            </div>
          </div>
          <button 
            onClick={() => setIsSidebarVisible(false)}
            className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 hover:text-white transition-colors"
            title="Collapse Sidebar"
          >
            <PanelLeftClose size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 min-w-[320px]">
          {moduleData.chapters.map((chapter, cIdx) => (
            <div key={cIdx} className="space-y-2">
              <h3 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-2 mb-3">
                CH {cIdx + 1}: {chapter.title}
              </h3>
              {chapter.subModules.map((sub, sIdx) => {
                const isActive = activeChapter === cIdx && activeSubModule === sIdx;
                return (
                  <button
                    key={sIdx}
                    onClick={() => { setActiveChapter(cIdx); setActiveSubModule(sIdx); }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group ${
                      isActive ? 'bg-[#FF6B00]/10 border border-[#FF6B00]/30 text-white' : 'hover:bg-zinc-800/50 text-zinc-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {sub.completed ? (
                        <CheckCircle2 size={16} className="text-[#FF6B00]" />
                      ) : (
                        <Circle size={16} className={isActive ? 'text-[#FF6B00]' : 'text-zinc-700'} />
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
          <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-2 uppercase tracking-tighter">
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
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase">
              <BookOpen size={16} />
              <span>Neural Documentation</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 space-y-8 max-w-3xl mx-auto w-full">
          <div className="space-y-4">
             <h1 className={`text-4xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{currentSub.title}</h1>
             <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
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

      {/* REAL IDE (PYODIDE) */}
      <section className={`w-[45%] flex flex-col ${isDarkMode ? 'bg-[#080808]' : 'bg-gray-100'}`}>
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
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">workspace/main.py</span>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onPaste={handlePaste}
              spellCheck="false"
              className={`flex-1 w-full bg-transparent p-6 font-mono text-sm resize-none focus:outline-none leading-relaxed selection:bg-[#FF6B00]/30 ${isDarkMode ? 'text-zinc-300' : 'text-slate-800'}`}
              placeholder="# Begin coding..."
            />
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
