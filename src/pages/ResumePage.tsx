import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Copy, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  Terminal, 
  Briefcase,
  ChevronRight,
  Cpu,
  Layers,
  Activity,
  Upload,
  Search,
  Target,
  PieChart,
  Loader2,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';

interface ResumePageProps {
  isDarkMode: boolean;
}

const ResumePage: React.FC<ResumePageProps> = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [jdText, setJdText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulated data of completed projects from the course
  const completedProjects = [
    {
      id: "proj_01",
      title: "Neural Path Orchestrator",
      module: "Module 01: Python for AI",
      date: "Oct 2023",
      techStack: ["Python 3.10", "OOP", "Functional Programming"],
      summary: "Architected a modular task-processing engine using advanced Python decorators and generators to manage high-throughput data streams with minimal memory overhead.",
      bullets: [
        "Implemented custom Python decorators to handle recursive logging and error-boundary management for asynchronous tasks.",
        "Optimized data ingestion pipelines by replacing standard list iterations with memory-efficient generator expressions, reducing peak RAM usage by 40%.",
        "Designed a class-based inheritance structure that mirrors PyTorch module patterns for seamless transition to deep learning frameworks."
      ]
    },
    {
      id: "proj_06",
      title: "Agentic RAG Knowledge Brain",
      module: "Module 06: RAG Systems",
      date: "Dec 2023",
      techStack: ["LangChain", "ChromaDB", "FastAPI", "OpenAI"],
      summary: "Developed a Retrieval-Augmented Generation (RAG) system capable of synthesizing answers from unstructured technical documentation with zero hallucinations.",
      bullets: [
        "Engineered a semantic chunking algorithm using Recursive Character Text Splitting to maintain context across 500+ pages of technical docs.",
        "Integrated ChromaDB for high-dimensional vector search, utilizing cosine similarity metrics to retrieve top-k relevant nodes in <200ms.",
        "Built a multi-query expansion layer using LLMs to reformulate user intent, increasing retrieval precision by 35% over baseline keyword search."
      ]
    }
  ];

  const copyToClipboard = (text: string, id: string) => {
    try {
      const textField = document.createElement('textarea');
      textField.innerText = text;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand('copy');
      textField.remove();

      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const calculateMatchScore = () => {
    if (!fileName || !jdText.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate complex neural analysis
    setTimeout(() => {
      const randomScore = Math.floor(Math.random() * (95 - 65 + 1)) + 65;
      setMatchScore(randomScore);
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#0A0A0A] text-zinc-100' : 'bg-gray-50 text-slate-900'} font-sans p-8 lg:p-12 overflow-x-hidden`}>
      <div className="max-w-5xl mx-auto">
        
        {/* BACK NAVIGATION */}
        <button 
          onClick={() => navigate('/dashboard')}
          className={`flex items-center gap-2 mb-8 text-xs font-bold uppercase tracking-widest transition-colors ${isDarkMode ? 'text-zinc-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
        >
          <ArrowLeft size={14} />
          Back to Dashboard
        </button>

        {/* HEADER SECTION */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-[#FF6B00] font-mono text-xs uppercase tracking-[0.3em] font-bold">
              <Sparkles size={16} />
              Career Acceleration Suite
            </div>
            <h1 className="text-5xl font-bold tracking-tighter">Smart Resume <span className={isDarkMode ? 'text-zinc-800' : 'text-slate-200'}>/</span> Gen</h1>
            <p className={`${isDarkMode ? 'text-zinc-500' : 'text-slate-500'} max-w-xl text-lg leading-relaxed`}>
              Your neural milestones are automatically synthesized into professional, technical achievements. Copy-paste these high-impact bullets directly into your Resume or LinkedIn.
            </p>
          </div>
          
          <button className={`flex items-center gap-2 px-6 py-3 font-bold rounded-xl transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)] active:scale-95 group ${isDarkMode ? 'bg-zinc-100 text-black hover:bg-[#FF6B00] hover:text-white' : 'bg-slate-900 text-white hover:bg-[#FF6B00]'}`}>
            <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
            EXPORT FULL PDF
          </button>
        </header>

        {/* STATS STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className={`border p-6 rounded-2xl flex items-center justify-between group h-24 hover:border-[#FF6B00]/30 transition-colors ${isDarkMode ? 'bg-[#0D0D0D] border-zinc-900' : 'bg-white border-slate-200'}`}>
            <div>
              <p className={`text-[10px] font-mono uppercase tracking-widest mb-1 ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>Projects Synced</p>
              <p className="text-2xl font-bold italic">02 / 07</p>
            </div>
            <Briefcase className={`transition-colors ${isDarkMode ? 'text-zinc-800 group-hover:text-[#FF6B00]/40' : 'text-slate-100 group-hover:text-[#FF6B00]/40'}`} size={32} />
          </div>
          <div className={`border p-6 rounded-2xl flex items-center justify-between group h-24 hover:border-emerald-500/30 transition-colors ${isDarkMode ? 'bg-[#0D0D0D] border-zinc-900' : 'bg-white border-slate-200'}`}>
            <div>
              <p className={`text-[10px] font-mono uppercase tracking-widest mb-1 ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>Global Marketability</p>
              <p className="text-2xl font-bold italic">88%</p>
            </div>
            <Activity className={`transition-colors ${isDarkMode ? 'text-zinc-800 group-hover:text-emerald-500/40' : 'text-slate-100 group-hover:text-emerald-500/40'}`} size={32} />
          </div>
          <div className={`border p-6 rounded-2xl flex items-center justify-between group h-24 hover:border-blue-500/30 transition-colors ${isDarkMode ? 'bg-[#0D0D0D] border-zinc-900' : 'bg-white border-slate-200'}`}>
            <div>
              <p className={`text-[10px] font-mono uppercase tracking-widest mb-1 ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>Tech Keywords</p>
              <p className="text-2xl font-bold italic">28 New</p>
            </div>
            <Terminal className={`transition-colors ${isDarkMode ? 'text-zinc-800 group-hover:text-blue-500/40' : 'text-slate-100 group-hover:text-blue-500/40'}`} size={32} />
          </div>
        </div>

        {/* ATS MATCH CHECKER SECTION */}
        <section className={`mb-12 border rounded-3xl overflow-hidden relative ${isDarkMode ? 'bg-[#0D0D0D] border-zinc-900' : 'bg-white border-slate-200 shadow-sm'}`}>
          
          <div className={`p-8 border-b ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
             <h2 className="text-xl font-bold flex items-center gap-3">
               <Target size={20} className="text-[#FF6B00]" />
               ATS Neural Matcher
             </h2>
             <p className={`text-sm mt-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Quantify how your current profile aligns with target industry roles.</p>
          </div>

          <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Resume Upload */}
              <div className="space-y-3">
                <label className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>1. Upload Existing Resume</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`h-32 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-[#FF6B00]/50 hover:bg-[#FF6B00]/5 cursor-pointer transition-all ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx"
                  />
                  {fileName ? (
                    <>
                      <FileText size={24} className="text-[#FF6B00]" />
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-zinc-200' : 'text-slate-800'}`}>{fileName}</p>
                      <p className={`text-[10px] uppercase ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Click to replace</p>
                    </>
                  ) : (
                    <>
                      <Upload size={24} className={isDarkMode ? 'text-zinc-600' : 'text-slate-400'} />
                      <p className={`text-sm font-medium text-center ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>Drag & drop or <span className="text-[#FF6B00]">browse</span></p>
                      <p className={`text-[10px] uppercase ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>PDF, DOCX (Max 5MB)</p>
                    </>
                  )}
                </div>
              </div>

              {/* JD Input */}
              <div className="space-y-3">
                <label className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>2. Target Job Description</label>
                <textarea 
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Paste the target role description here to find keyword gaps..."
                  className={`w-full h-40 border rounded-2xl p-4 text-sm focus:outline-none focus:border-[#FF6B00]/50 transition-all resize-none ${isDarkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-300' : 'bg-gray-50 border-slate-200 text-slate-700'}`}
                />
              </div>

              <button 
                onClick={calculateMatchScore}
                disabled={isAnalyzing || !fileName || !jdText.trim()}
                className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-3 transition-all ${
                  isAnalyzing || !fileName || !jdText.trim() 
                  ? (isDarkMode ? 'bg-zinc-900 text-zinc-600 cursor-not-allowed italic' : 'bg-gray-200 text-slate-400 cursor-not-allowed italic') 
                  : 'bg-[#FF6B00] text-black hover:shadow-[0_0_25px_rgba(255,107,0,0.4)] active:scale-95'
                }`}
              >
                {isAnalyzing ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                {isAnalyzing ? 'RUNNING NEURAL ANALYSIS...' : 'CALCULATE MATCH SCORE'}
              </button>
            </div>

            <div className={`flex flex-col items-center justify-center rounded-2xl p-8 border relative ${isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-gray-50 border-slate-100'}`}>
              {matchScore ? (
                <div className="text-center animate-in fade-in zoom-in duration-500">
                  <div className="relative inline-block mb-6">
                    <svg className="w-40 h-40 transform -rotate-90">
                      <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className={isDarkMode ? 'text-zinc-900' : 'text-slate-200'} />
                      <circle 
                        cx="80" 
                        cy="80" 
                        r="70" 
                        stroke="currentColor" 
                        strokeWidth="8" 
                        fill="transparent" 
                        strokeDasharray={440}
                        strokeDashoffset={440 - (440 * matchScore) / 100}
                        className={matchScore > 80 ? "text-emerald-500" : "text-[#FF6B00]"}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold">{matchScore}%</span>
                      <span className={`text-[10px] font-mono ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>MATCH</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Analysis Complete</h3>
                  <p className={`text-xs leading-relaxed mb-6 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                    {matchScore > 80 
                      ? "High alignment detected. Your profile is ready for top-tier AI roles." 
                      : "Strong baseline, but missing key specialized keywords found in the JD."}
                  </p>
                  
                  <div className="space-y-3 text-left">
                    <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center gap-3">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      <span className="text-[10px] uppercase font-bold text-emerald-400">Matched: PyTorch, RAG, FastAPI</span>
                    </div>
                    <div className="p-3 bg-rose-500/5 border border-rose-500/20 rounded-xl flex items-center gap-3">
                      <AlertCircle size={14} className="text-rose-500" />
                      <span className="text-[10px] uppercase font-bold text-rose-400">Missing: CI/CD, ONNX, Kubernetes</span>
                    </div>
                  </div>
                </div>
              ) : isAnalyzing ? (
                <div className="flex flex-col items-center gap-4 text-zinc-600">
                   <div className={`w-16 h-16 rounded-full border-4 border-t-[#FF6B00] animate-spin ${isDarkMode ? 'border-zinc-900' : 'border-slate-200'}`} />
                   <p className="text-xs font-mono uppercase tracking-widest animate-pulse">Vectorizing Content...</p>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <PieChart size={48} className={`mx-auto ${isDarkMode ? 'text-zinc-800' : 'text-slate-200'}`} />
                  <div>
                    <h3 className={`text-sm font-bold ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>Awaiting Input</h3>
                    <p className={`text-xs max-w-[200px] mt-1 mx-auto ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>Upload your data to trigger the ATS compatibility scoring algorithm.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* PROJECTS LIST */}
        <div className="space-y-8">
          <h2 className={`text-xs font-bold uppercase tracking-widest flex items-center gap-3 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
            <div className={`w-8 h-px ${isDarkMode ? 'bg-zinc-900' : 'bg-slate-200'}`} />
            Synthesis Engine Output
          </h2>
          {completedProjects.map((project) => (
            <section key={project.id} className={`border rounded-3xl overflow-hidden group hover:border-[#FF6B00]/40 transition-all ${isDarkMode ? 'bg-[#0D0D0D] border-zinc-900' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className={`p-8 border-b flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-bold text-[#FF6B00] px-2 py-0.5 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded uppercase tracking-tighter">
                      {project.module}
                    </span>
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>Completed {project.date}</span>
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">{project.title}</h2>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className={`px-3 py-1 text-[10px] font-mono rounded-full border uppercase ${isDarkMode ? 'bg-zinc-950 text-zinc-400 border-zinc-800' : 'bg-gray-100 text-slate-600 border-slate-200'}`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-8 grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* Summary Section */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className={`text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                      <Layers size={14} className="text-[#FF6B00]" />
                      Executive Summary
                    </h3>
                    <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                      {project.summary}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => copyToClipboard(project.summary, `${project.id}_sum`)}
                    className={`w-full py-2.5 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group/btn ${isDarkMode ? 'border-zinc-800 hover:bg-zinc-100 hover:text-black' : 'border-slate-200 hover:bg-slate-900 hover:text-white'}`}
                  >
                    {copiedId === `${project.id}_sum` ? (
                      <><CheckCircle2 size={14} className="text-emerald-500" /> COPIED</>
                    ) : (
                      <><Copy size={14} className="group-hover/btn:scale-110 transition-transform" /> COPY SUMMARY</>
                    )}
                  </button>
                </div>

                {/* Bullets Section */}
                <div className="lg:col-span-3 space-y-6">
                  <h3 className={`text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                    <Sparkles size={14} className="text-[#FF6B00]" />
                    Impact Bullet Points
                  </h3>
                  
                  <div className="space-y-4">
                    {project.bullets.map((bullet, idx) => (
                      <div key={idx} className="relative group/bullet">
                        <div className="absolute top-3 -left-4 w-1.5 h-1.5 rounded-full bg-[#FF6B00] opacity-30 group-hover/bullet:opacity-100 transition-opacity" />
                        <p className={`text-sm leading-relaxed pl-2 mb-2 ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>
                          {bullet}
                        </p>
                        <button 
                          onClick={() => copyToClipboard(bullet, `${project.id}_b${idx}`)}
                          className="text-[9px] font-bold text-[#FF6B00] uppercase tracking-tighter opacity-0 group-hover/bullet:opacity-100 transition-opacity flex items-center gap-1 hover:underline"
                        >
                          {copiedId === `${project.id}_b${idx}` ? 'Copied to clipboard' : 'Copy bullet'}
                          <ChevronRight size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* LOCKED PROJECTS TEASER */}
        <div className={`mt-12 p-12 rounded-3xl border border-dashed flex flex-col items-center justify-center text-center opacity-40 ${isDarkMode ? 'border-zinc-900 bg-zinc-950' : 'border-slate-300 bg-gray-50'}`}>
           <Cpu size={48} className={isDarkMode ? 'text-zinc-800' : 'text-slate-200'} mb-6 />
           <h3 className="text-xl font-bold mb-2">5 Modules Remaining</h3>
           <p className={`text-sm max-w-sm mb-8 ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>
             Complete your deep learning and deployment paths to unlock high-level architectural summaries for your portfolio.
           </p>
           <button className={`px-8 py-3 font-bold rounded-xl cursor-not-allowed ${isDarkMode ? 'bg-zinc-900 text-zinc-500' : 'bg-white text-slate-400 shadow-sm border border-slate-100'}`}>
             LOCKED BY KERNEL
           </button>
        </div>

        {/* FOOTER TIPS */}
        <footer className={`mt-20 border-t py-10 flex flex-col md:flex-row justify-between gap-8 ${isDarkMode ? 'border-zinc-900' : 'border-slate-200'}`}>
          <div className={`flex items-center gap-4 text-xs font-mono uppercase ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
             ATS Optimized Logic
          </div>
          <div className="flex gap-10">
            <div className="space-y-2">
              <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Neuro-Tip #01</p>
              <p className={`text-[10px] max-w-[200px] ${isDarkMode ? 'text-zinc-700' : 'text-slate-400'}`}>Quantifiable metrics like '40% reduction' catch the eye of FAANG recruiters.</p>
            </div>
            <div className="space-y-2">
              <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Neuro-Tip #02</p>
              <p className={`text-[10px] text-zinc-700 max-w-[200px] ${isDarkMode ? 'text-zinc-700' : 'text-slate-400'}`}>Link these bullets to your GitHub repo to provide verifiable evidence.</p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default ResumePage;
