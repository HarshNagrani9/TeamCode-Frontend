import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import {
  Terminal,
  BrainCircuit,
  Code2,
  Database,
  Network,
  ArrowRight,
  Zap,
  Layers,
  Play,
  RotateCcw,
  ChevronDown,
  Sparkles,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import AuthPage from '../pages/AuthPage';
import EnrollPage from '../pages/EnrollPage';
import Dashboard from '../pages/Dashboard';
import ModuleDetail from '../modules/ModuleDetail';
import ResumePage from '../pages/ResumePage';
import WhiteboardPage from '../pages/WhiteboardPage';
import CommunityPage from '../pages/CommunityPage';
import ArenaPage from '../pages/ArenaPage';
import BattlePage from '../pages/BattlePage';
import EditorPage from '../pages/EditorPage';

// --- Custom Hooks for Scroll Effects ---

// 1. Parallax Hook for the Hero Section
const useParallax = (speed = 0.5) => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return offsetY * speed;
};

// 2. Intersection Observer Hook for Simple Scroll Reveal
const useScrollReveal = (threshold = 0.2) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  return [domRef, isVisible] as const;
};

// --- Components ---

const CodeIDE = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  
  const handleRun = () => {
    setIsRunning(true);
    setShowResult(false);
    setTimeout(() => {
      setIsRunning(false);
      setShowResult(true);
    }, 1500);
  };

  return (
    <div className="w-full max-w-2xl bg-neutral-900/60 backdrop-blur-3xl rounded-2xl border border-white/10 overflow-hidden shadow-[0_22px_70px_8px_rgba(0,0,0,0.56)] transition-all duration-500 hover:border-orange-500/30 group">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/40 group-hover:bg-red-500/60 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/40 group-hover:bg-yellow-500/60 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-green-500/40 group-hover:bg-green-500/60 transition-colors" />
          </div>
          <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">neural_orchestrator.py</div>
          <div className="w-12" /> {/* Spacer */}
        </div>
        
        {/* Editor Area */}
        <div className="p-8 font-mono text-sm leading-relaxed overflow-x-auto min-h-[220px]">
          <pre className="text-neutral-400">
            <span className="text-orange-400">import</span> neurocode <span className="text-orange-400">as</span> nc<br /><br />
            <span className="text-neutral-600 italic"># Initialize autonomous agent</span><br />
            agent = nc.<span className="text-yellow-400">Agent</span>(role=<span className="text-green-400">"AI_Architect"</span>)<br /><br />
            <span className="text-neutral-600 italic"># Execute RAG-enhanced task</span><br />
            response = agent.<span className="text-yellow-400">execute</span>(<br />
            &nbsp;&nbsp;<span className="text-green-400">"Optimize RAG throughput"</span><br />
            )<br /><br />
            <span className="text-yellow-400">print</span>(<span className="text-green-400">f"State: </span>{`{response.status}`} <span className="text-green-400">"</span>)
          </pre>
        </div>

        {/* Footer / Console */}
        <div className="p-5 bg-black/40 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-500 uppercase tracking-tighter">
               <Terminal size={12} className="text-orange-500/60" />
               <span className="opacity-70">Python 3.11.4</span>
             </div>
             <button 
               onClick={handleRun}
               disabled={isRunning}
               className={`flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-xs transition-all duration-300 active:scale-95 ${isRunning ? 'bg-orange-500/20 text-orange-400 cursor-not-allowed' : 'bg-orange-500/10 text-orange-400 border border-orange-500/30 hover:bg-orange-500 hover:text-white hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]'}`}
             >
               {isRunning ? <RotateCcw size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
               {isRunning ? "PROCESSING..." : "EXECUTE NEURAL TASK"}
             </button>
          </div>

          <div className="min-h-[80px] font-mono text-xs p-4 rounded-xl bg-black/60 border border-white/5 text-neutral-400 shadow-inner">
            {isRunning && (
              <div className="space-y-1">
                <div className="animate-pulse text-orange-500/70 opacity-80">&gt; Querying vector database...</div>
                <div className="animate-pulse animation-delay-300 text-neutral-500">&gt; Synthesizing neural paths...</div>
              </div>
            )}
            {showResult && (
              <div className="animate-fade-in-up">
                <div className="text-green-400/80 mb-1 font-bold tracking-tight">&gt; TASK COMPLETED SUCCESSFULLY.</div>
                <div className="text-neutral-300 leading-relaxed px-2 border-l border-green-500/30 ml-1 mt-2">
                  Optimized 14.2k tokens/sec throughput using adaptive RAG orchestration.
                </div>
              </div>
            )}
            {!isRunning && !showResult && (
              <div className="flex flex-col items-center justify-center h-full py-4 text-neutral-600 opacity-60 italic">
                Ready to execute...
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

const Navbar = ({ isDarkMode, setIsDarkMode, hideToggle = false }: { 
  onNavigate?: (view: string) => void,
  isDarkMode: boolean,
  setIsDarkMode: (val: boolean) => void,
  hideToggle?: boolean
}) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Community', id: 'methodology' },
    { name: 'Curriculum', id: 'curriculum' },
  ];

  const handleLinkClick = (id: string) => {
    setIsMenuOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-[60] transition-all duration-500 border-b ${
        scrolled 
          ? (isDarkMode ? 'bg-neutral-950/80 border-white/10' : 'bg-white/80 border-slate-200 shadow-sm') 
          : 'bg-transparent border-transparent'
      } backdrop-blur-xl py-3`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div 
            onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 text-white font-bold text-xl tracking-tighter cursor-pointer group"
          >
            <BrainCircuit className="text-orange-500 group-hover:rotate-12 transition-transform duration-300" />
            <span className="flex items-center">
              Neuro<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Code</span>
              <span className="ml-1.5 px-1.5 py-0.5 rounded text-[8px] bg-orange-500/10 border border-orange-500/20 text-orange-500 font-black uppercase tracking-widest hidden sm:block">Beta</span>
            </span>
          </div>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2 sm:gap-6">
            {navLinks.map((link) => (
              <button 
                key={link.name}
                onClick={() => handleLinkClick(link.id)}
                className={`text-sm font-black uppercase tracking-widest transition-colors px-3 py-2 ${isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => navigate('/login')}
              className={`text-sm font-black uppercase tracking-widest transition-colors px-3 py-2 ${isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Login
            </button>
            <div className="flex items-center gap-4 ml-4">
              {!hideToggle && (
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-[#FF6B00]' : 'bg-white border-slate-200 text-slate-500 hover:text-[#FF6B00] shadow-sm'}`}
                >
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}
              <button 
                onClick={() => navigate('/enroll')}
                className="px-8 py-3 rounded-xl bg-orange-600/10 text-orange-500 text-sm font-black uppercase tracking-widest border border-orange-500/30 hover:bg-orange-500 hover:text-white transition-all duration-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:-translate-y-0.5 active:scale-95"
              >
                Enroll
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[55] bg-neutral-950/95 backdrop-blur-2xl transition-all duration-500 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-full'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 p-6 text-center">
          {navLinks.map((link) => (
            <button 
              key={link.name}
              onClick={() => handleLinkClick(link.id)}
              className="text-2xl font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-orange-500 transition-colors"
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => { setIsMenuOpen(false); navigate('/login'); }}
            className="text-2xl font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-orange-500 transition-colors"
          >
            Login
          </button>
          <button 
            onClick={() => { setIsMenuOpen(false); navigate('/enroll'); }}
            className="w-full max-w-xs px-8 py-4 rounded-2xl bg-orange-500 text-white text-lg font-black uppercase tracking-widest shadow-[0_10px_40px_rgba(249,115,22,0.3)] active:scale-95 transition-all"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </>
  );
};

const Hero = ({ onNavigate, isDarkMode }: { 
  onNavigate: (view: 'landing' | 'login' | 'signup' | 'enroll' | 'dashboard' | 'moduleDetail') => void,
  isDarkMode: boolean
}) => {
  const parallaxY = useParallax(0.2); // Slower parallax for smoother feel
  const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
  
  // Dynamic opacity and scaling based on scroll
  const opacity = Math.max(1 - window.scrollY / 800, 0);
  const scale = Math.max(1 - window.scrollY / 2000, 0.95);
  const blur = Math.min(window.scrollY / 50, 10);

  return (
    <section className={`relative min-h-[110vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-20 transition-colors duration-500 ${isDarkMode ? 'bg-neutral-950' : 'bg-white'}`}>
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Dynamic Glows */}
        <div 
          className="absolute top-[-15%] left-[-5%] w-[60vw] h-[60vw] bg-red-600/20 rounded-full blur-[160px] mix-blend-screen opacity-60" 
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-orange-600/15 rounded-full blur-[180px] mix-blend-screen opacity-50"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
        
        {/* Animated Radial Center Light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.08),transparent_60%)]" />

        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_40%,#000_60%,transparent_100%)] opacity-80" />
      </div>

      {/* Main Hero Content - Split Layout */}
      <div 
        className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        style={{ 
          opacity: opacity,
          transform: `translateY(${parallaxY}px) scale(${scale})`,
          filter: `blur(${blur}px)`
        }}
      >
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-orange-500/20 text-orange-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-10 backdrop-blur-md shadow-[0_0_30px_rgba(249,115,22,0.15)]">
            <Sparkles size={14} className="animate-pulse" />
            <span>Advanced AI Engineering Track</span>
          </div>

          <h1 className={`animate-fade-in-up animation-delay-100 text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.95] selection:bg-orange-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Design. <br />
            Deploy. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 drop-shadow-[0_0_30px_rgba(249,115,22,0.3)]">
              Orchestrate.
            </span>
          </h1>

          <p className="animate-fade-in-up animation-delay-200 max-w-xl text-lg md:text-xl text-neutral-400 mb-12 leading-relaxed opacity-90">
            More than just code. Learn to build the <span className="text-white font-medium italic">Compound AI Systems</span> of the future. From vector db engineering to agentic tool-use.
          </p>

          <div className="animate-fade-in-up animation-delay-300 flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <button 
              onClick={() => onNavigate('enroll')}
              className="group relative px-10 py-5 rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-black text-lg overflow-hidden transition-all duration-300 shadow-[0_10px_40px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_60px_rgba(249,115,22,0.5)] transform hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                SECURE ACCESS <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-500" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
            
            <a href="#curriculum" className={`px-10 py-5 rounded-xl text-lg border transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-md group ${
              isDarkMode ? 'bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20' : 'bg-slate-100 text-slate-900 border-slate-200 hover:bg-slate-200 hover:border-slate-300'
            }`}>
              <Terminal size={22} className={`transition-colors ${isDarkMode ? 'text-neutral-500 group-hover:text-orange-400' : 'text-slate-400 group-hover:text-orange-500'}`} />
              VIEW PATHWAY
            </a>
          </div>
        </div>

        {/* Right Side: Code IDE */}
        <div className="animate-fade-in-up animation-delay-400 relative perspective-1000 hidden lg:block">
           {/* Decorative elements behind IDE */}
           <div className="absolute -inset-4 bg-orange-500/10 rounded-[3rem] blur-3xl -z-10 animate-pulse" />
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 rounded-full blur-2xl -z-10" />
           
           <div className="transform rotate-1 hover:rotate-0 transition-transform duration-700">
              <CodeIDE />
           </div>
        </div>
      </div>

      {/* Mobile Code IDE (Visible only on small screens) */}
      <div className="lg:hidden mt-20 px-6 w-full animate-fade-in-up animation-delay-400">
         <CodeIDE />
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 text-neutral-500 transition-opacity duration-300" style={{ opacity: Math.max(1 - window.scrollY / 100, 0) }}>
        <span className="text-[10px] uppercase tracking-[0.4em] font-black opacity-40">Scroll to Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-orange-500 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

const Methodology = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [ref, isVisible] = useScrollReveal(0.2);
  const items = [
    {
      title: "Snippet-First Approach",
      description: "No theory-only slogs. Every lesson starts with a runnable snippet that you break and rebuild in real-time.",
      icon: <Terminal size={32} />
    },
    {
      title: '"Break-the-Code" Challenges',
      description: "Our proprietary debugging engine presents you with syntactically correct but logically flawed model pipelines. Fix them to advance.",
      icon: <Zap size={32} />
    },
    {
      title: "Zero-Install Cloud Environment",
      description: "Access high-VRAM GPU clusters directly in your browser. No local setup conflicts or environment hell, ever.",
      icon: <Sparkles size={32} />
    }
  ];

  return (
    <section id="methodology" className={`py-16 md:py-32 relative border-t transition-colors duration-500 ${isDarkMode ? 'bg-black border-white/5' : 'bg-slate-50 border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Learning Framework
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
            The <span className="text-orange-500">Active Learning</span> Methodology
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl font-medium">
            Traditional tutorials fail because they don't force you to think. Our approach is designed for cognitive friction and rapid retention.
          </p>
        </div>

        <div 
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {items.map((item, idx) => (
            <div key={idx} className="p-10 rounded-3xl bg-neutral-900/30 border border-white/5 hover:border-[#FF6B00] transition-all duration-500 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl -z-10 group-hover:bg-orange-500/10 transition-colors" />
              <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{item.title}</h3>
              <p className="text-neutral-400 leading-relaxed font-medium">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CareerEngine = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const tools = [
    {
      title: "Smart Resume Generator",
      description: "Automatically translate your course projects into high-impact bullet points and architectural diagrams for your CV.",
      icon: <Layers size={24} />
    },
    {
      title: "The ML Whiteboard",
      description: "A live-coding simulator that mimics top-tier AI interview environments with algorithmic reasoning challenges.",
      icon: <Code2 size={24} />
    },
    {
      title: "Industry Drift Guarantee",
      description: "AI moves fast. We provide free monthly updates to all projects and content to ensure you're always on the bleeding edge.",
      icon: <Network size={24} />
    }
  ];

  return (
    <section id="career" className={`py-16 md:py-32 relative overflow-hidden border-t transition-colors duration-500 ${isDarkMode ? 'bg-neutral-950 border-white/5' : 'bg-white border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                Professional Arsenal
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-8">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">Career Engine</span>
              </h2>
              <p className="text-neutral-400 text-xl font-medium leading-relaxed mb-12">
                We don't just teach you how to build models; we give you the tools to land the role and dominate the industry.
              </p>
              
              <div className="space-y-6">
                {tools.map((tool, idx) => (
                  <div key={idx} className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-orange-500/20 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0 group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-black uppercase tracking-tight mb-2">{tool.title}</h4>
                      <p className="text-neutral-400 text-sm leading-relaxed">{tool.description}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           <div className="relative order-1 lg:order-2">
              <div className="absolute -inset-10 bg-orange-500/5 blur-[120px] -z-10" />
              <div className="p-8 rounded-[2.5rem] bg-neutral-900 border border-white/10 shadow-2xl relative overflow-hidden group">
                 {/* Mock UI for Resume Gen */}
                 <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-orange-500" />
                       <div className="text-white font-black text-sm uppercase tracking-widest">Resume_Gen_v1.0</div>
                    </div>
                    <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-neutral-800" />
                       <div className="w-3 h-3 rounded-full bg-neutral-800" />
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="h-4 bg-white/10 rounded-full w-3/4" />
                    <div className="h-4 bg-white/5 rounded-full w-full" />
                    <div className="h-20 bg-orange-500/5 rounded-2xl border border-orange-500/20 p-4">
                       <div className="text-[10px] font-mono text-orange-500/60 mb-2 uppercase">Extracted Project Bullet</div>
                       <div className="text-white font-bold text-xs line-clamp-2">Built a Multi-Modal RAG pipeline with recursive semantic chunking...</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                       <div className="h-24 bg-white/5 rounded-2xl border border-white/10" />
                       <div className="h-24 bg-white/5 rounded-2xl border border-white/10" />
                       <div className="h-24 bg-white/5 rounded-2xl border border-white/10" />
                    </div>
                 </div>
                 
                 <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-60" />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

const CommunityDashboard = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [ref, isVisible] = useScrollReveal(0.2);

  return (
    <section id="community" className={`py-16 md:py-32 relative border-t transition-colors duration-500 ${isDarkMode ? 'bg-black border-white/5' : 'bg-slate-50 border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -inset-10 bg-red-500/5 blur-[120px] -z-10" />
              <div className="p-8 rounded-[2.5rem] bg-neutral-900/50 backdrop-blur-3xl border border-white/10 shadow-2xl overflow-hidden relative">
                 {/* Skills Matrix Mock */}
                 <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 to-orange-500" />
                    <div>
                       <div className="text-white font-black text-sm uppercase">John Doe</div>
                       <div className="text-neutral-500 text-[10px] uppercase tracking-widest">Level 42 AI Architect</div>
                    </div>
                 </div>
                 
                 <div className="space-y-8">
                    <div>
                       <div className="flex justify-between text-[10px] font-black uppercase text-orange-500 mb-2 tracking-widest">
                          <span>Vector Calculus</span>
                          <span>92%</span>
                       </div>
                       <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500 w-[92%] transition-all duration-1000 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between text-[10px] font-black uppercase text-red-500 mb-2 tracking-widest">
                          <span>LLMOps Deployment</span>
                          <span>78%</span>
                       </div>
                       <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-red-600 w-[78%] transition-all duration-1000 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                       </div>
                    </div>
                 </div>

                 <div className="mt-12 pt-8 border-t border-white/5">
                    <div className="text-white font-black text-xs uppercase tracking-widest mb-4">"Arena" Leaderboard</div>
                    <div className="space-y-3">
                       {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 text-[10px]">
                             <div className="flex items-center gap-3">
                                <span className="text-neutral-500">#{i}</span>
                                <span className="text-white font-bold">User_{i}42</span>
                             </div>
                             <span className="text-orange-500 font-black">12,400 pts</span>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>

            <div 
              ref={ref}
              className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                Neural Ecosystem
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-8">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Neuro-Network</span>
              </h2>
              <p className="text-neutral-400 text-xl font-medium leading-relaxed mb-12">
                Don't learn in a vacuum. Track your progress with the Skills Matrix, compete in the Arena, and get 24/7 help in our expert Discord.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-white font-black uppercase text-xs mb-2">Personalized Matrix</div>
                    <p className="text-neutral-500 text-sm">Real-time visualizations of your progress across 24 core AI competencies.</p>
                 </div>
                 <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <div className="text-white font-black uppercase text-xs mb-2">Weekly "Arena"</div>
                    <p className="text-neutral-500 text-sm">Solve live ML problems every Wednesday to climb the leaderboard.</p>
                 </div>
              </div>
              
              <button className="mt-10 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
                 Join the Discord <ArrowRight size={18} />
              </button>
            </div>
        </div>
      </div>
    </section>
  );
};

const LogoBar = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const logos = [
    { name: "PyTorch", color: "text-red-500" },
    { name: "TensorFlow", color: "text-orange-500" },
    { name: "OpenAI", color: "text-neutral-100" },
    { name: "Docker", color: "text-blue-500" },
    { name: "NVIDIA", color: "text-green-500" },
    { name: "Hugging Face", color: "text-yellow-400" },
    { name: "Anthropic", color: "text-neutral-300" }
  ];

  return (
    <div className={`py-20 border-y transition-colors duration-500 ${isDarkMode ? 'bg-black border-white/5' : 'bg-white border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-6 text-center mb-10">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600">Master the Tools of the Modern AI Stack</span>
      </div>
      <div className="flex items-center justify-center gap-12 md:gap-24 opacity-30 px-6 overflow-x-auto no-scrollbar">
        {logos.map((logo, idx) => (
          <div key={idx} className={`text-xl md:text-2xl font-black uppercase tracking-tighter whitespace-nowrap ${logo.color}`}>
            {logo.name}
          </div>
        ))}
      </div>
    </div>
  );
};

// Scroll-based dynamic journey timeline
const ModuleAccordion = ({ module, index, isDarkMode }: { module: any; index: number; isDarkMode: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ref, isVisible] = useScrollReveal(0.1);

  return (
    <div 
      ref={ref}
      onClick={() => setIsExpanded(!isExpanded)}
      className={`relative group border rounded-2xl w-full transition-all duration-500 cursor-pointer overflow-hidden mb-4 ${
        isDarkMode 
          ? `bg-neutral-900/40 border-white/5 ${isExpanded ? 'ring-1 ring-orange-500/30 bg-neutral-900/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : 'hover:border-orange-500/20 hover:bg-neutral-900/60 hover:-translate-y-1'}`
          : `bg-white border-slate-200 ${isExpanded ? 'ring-1 ring-orange-500/30 bg-white shadow-xl' : 'hover:border-orange-500/30 hover:shadow-md hover:-translate-y-1'}`
      } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Interactive Hover Glow */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="p-6 md:p-10 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-all duration-500 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
              {module.icon}
            </div>
            <div>
              <div className="text-[10px] font-black text-orange-500/70 uppercase tracking-[0.3em] mb-2">Module 0{module.id}</div>
              <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-orange-500 transition-colors uppercase tracking-tight">{module.title}</h3>
            </div>
          </div>
          <div className={`p-3 rounded-full bg-white/5 text-orange-500 transition-all duration-500 ${isExpanded ? 'rotate-180 bg-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'rotate-0 group-hover:bg-white/10'}`}>
            <ChevronDown size={28} />
          </div>
        </div>

        {isExpanded && (
          <div className="animate-fade-in-up mt-10 pt-10 border-t border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
               <div className="lg:col-span-3 space-y-8">
                  <p className="text-neutral-300 text-lg md:text-xl leading-relaxed font-medium">
                    {module.description}
                  </p>
                  
                  <div className="space-y-5">
                    <h4 className="text-orange-500 font-black text-[11px] uppercase tracking-[0.3em] flex items-center gap-3">
                      <Zap size={16} className="fill-orange-500/20" /> Core Engineering Path
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {module.objectives.map((obj: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-neutral-400 text-sm leading-snug group/item">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 shadow-[0_0_8px_rgba(249,115,22,0.8)] group-hover/item:scale-150 transition-transform" />
                          <span className="group-hover/item:text-white transition-colors">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
               </div>

               <div className="lg:col-span-2">
                  <div className="p-8 rounded-3xl bg-black/60 border border-white/5 h-full flex flex-col justify-between group/project relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-3xl -z-1" />
                     <div className="relative z-10">
                        <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Layers size={14} />
                          <span>Applied Production Case</span>
                        </div>
                        <div className="text-white font-black text-xl mb-4 group-hover/project:text-orange-400 transition-colors uppercase tracking-tight">{module.project.title}</div>
                        <div className="text-neutral-400 text-sm leading-relaxed italic opacity-80">{module.project.description}</div>
                     </div>
                     <div className="mt-10 flex items-center gap-2 text-xs font-black text-orange-500 uppercase tracking-widest group-hover/project:translate-x-2 transition-transform">
                       Build the Future <ArrowRight size={16} />
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Curriculum = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const courses = [
    {
      id: 1,
      title: "Python Mastery (Basics to Advanced)",
      description: "Python as a tool for high-performance computing. From memory-efficient data structures to Advanced OOP and Concurrency for ML engineering.",
      icon: <Code2 size={24} />,
      objectives: [
        "Memory-efficient OOP & Dunder methods",
        "Lazy Loading with Generators & Decorators",
        "Multiprocessing for CPU-bound data tasks",
        "Safe Dependency Management & Pip"
      ],
      project: {
        title: "Autonomous Web Surveyor",
        description: "An AI scraper that uses visual reasoning and async logic to navigate dynamic sites."
      }
    },
    {
      id: 2,
      title: "Data Preprocessing (The Janitor Work)",
      description: "Turning 'Garbage In' into 'Gold Out' using NumPy and Pandas. Master feature engineering, scaling, and handling missing data like a pro.",
      icon: <Database size={24} />,
      objectives: [
        "High-speed vectorization with NumPy",
        "Pandas 'Data Janitoring' & Scaling",
        "One-Hot Encoding vs. Label Encoding",
        "Outlier handling using IQR & Z-scores"
      ],
      project: {
        title: "The Multi-Modal Brain",
        description: "A system that indexes complex PDFs and audio into clean, structured data sigals."
      }
    },
    {
      id: 3,
      title: "Mathematics of Intelligence",
      description: "Geometric intuition meets LaTeX formulas. Linear Algebra for data containers, Calculus for optimization, and Probability for uncertainty.",
      icon: <Network size={24} />,
      objectives: [
        "SVD & PCA for dimensionality reduction",
        "Gradient Descent & Chain Rule optimization",
        "Bayesian beliefs & Maximum Likelihood",
        "Entropy & Information Theory for LLMs"
      ],
      project: {
        title: "Neural Engine 0",
        description: "Build a mini torch-like engine to train logic circuits without high-level libraries."
      }
    },
    {
      id: 4,
      title: "Machine Learning Kingdoms",
      description: "Supervised, Unsupervised, and ML-Ops pipelines. From XGBoost predictors to K-Means clustering and evaluation metrics.",
      icon: <Layers size={24} />,
      objectives: [
        "XGBoost & Random Forest Ensembles",
        "Logistic Regression & SVM hyperparameters",
        "t-SNE & UMAP visualization techniques",
        "Precision-Recall & ROC/AUC evaluation"
      ],
      project: {
        title: "Fraud Shield AI",
        description: "A real-time financial fraud detection system using ensemble voting classifiers."
      }
    },
    {
      id: 5,
      title: "Deep Learning Foundations",
      description: "Architectures that mimic neurons. Move from Perceptrons to CNNs for vision, LSTMs for sequences, and Transformer blocks.",
      icon: <BrainCircuit size={24} />,
      objectives: [
        "Attention mechanisms from scratch",
        "Forward & Backpropagation logic",
        "Dropout & Batch Normalization",
        "Transformer & GenAI architectures"
      ],
      project: {
        title: "Visionary GPT",
        description: "A vision-language model trained on curated image-text datasets."
      }
    },
    {
      id: 6,
      title: "Advanced RAG Systems",
      description: "The industry's most in-demand skill. Connect LLMs to private documentation using semantic search and agentic retrieval pipelines.",
      icon: <Sparkles size={24} />,
      objectives: [
        "Semantic & Recursive chunking strategies",
        "ChromaDB & Vector Store internals",
        "Hybrid Search & Reranking logic",
        "Query Expansion & Agentic RAG"
      ],
      project: {
        title: "Corporate Oracle",
        description: "An accurate internal search engine for massive corporate documentation silos."
      }
    },
    {
      id: 7,
      title: "AI Agents & Agentic Systems",
      description: "Beyond static RAG. Build autonomous systems that use tools, reason through multi-step loops, and operate via multi-agent orchestration.",
      icon: <Zap size={24} />,
      objectives: [
        "Agentic RAG & Autonomous Routing",
        "Tool Use & Function Calling logic",
        "Multi-Agent Orchestration (CrewAI/AutoGen)",
        "Reasoning Loops & Safety Guardrails"
      ],
      project: {
        title: "The Neural Command Center",
        description: "An autonomous multi-agent swarm that solves complex, multi-step engineering tasks."
      }
    }
  ];

  return (
    <section id="curriculum" className={`py-16 md:py-32 relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-neutral-950' : 'bg-white'}`}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-orange-600/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-red-600/5 blur-[160px] rounded-full" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="max-w-2xl mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Structural Roadmap
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-8">
            The Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Curriculum</span>
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl font-medium leading-relaxed">
            A precise, project-driven sequence designed to transform engineering backgrounds into next-generation AI leadership.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {courses.map((module, index) => (
            <ModuleAccordion key={module.id} module={module} index={index} isDarkMode={isDarkMode} />
          ))}
        </div>
      </div>
    </section>
  );
};

import PricingCard from '../components/PricingCard';

const Pricing = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const tiers = [
    {
      id: 'free',
      name: 'Free Learner',
      price: '₹0',
      description: 'Community access & updates.',
      features: ['Community Access', 'Weekly ML Questions', 'Coming Soon: Practice Labs', 'Discord Server Access'],
      color: 'from-neutral-800 to-neutral-900',
      accent: 'text-neutral-400',
      glow: 'shadow-neutral-500/5',
      button: 'bg-white/5 border-white/10 hover:bg-white/10',
      ctaText: 'Join Discord'
    },
    {
      id: 'max',
      name: 'AI Architect',
      price: '₹1,800',
      description: 'The full end-to-end ecosystem.',
      features: ['Everything in Pro', 'Full Access to all 7 Modules', 'Resume Gen + ML Whiteboard', 'Lifetime Access Promise', 'Monthly Content Updates'],
      color: 'from-red-600/30 to-neutral-900',
      accent: 'text-red-500',
      glow: 'shadow-red-500/20',
      button: 'bg-gradient-to-r from-red-600 to-orange-600 hover:brightness-110 text-white shadow-red-600/40',
      popular: true,
      ctaText: 'Join Max'
    },
    {
      id: 'pro',
      name: 'Pro Engineer',
      price: '₹1,000',
      description: 'Foundational focus up to deep learning.',
      features: ['Everything in Free', 'Access to Modules 1-5', 'Personalized Dashboards', 'Weekly tasks & Interview Tips', '2 Years Access'],
      color: 'from-orange-600/20 to-neutral-900',
      accent: 'text-orange-500',
      glow: 'shadow-orange-500/20',
      button: 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/40',
      ctaText: 'Go Pro'
    }
  ];

  return (
    <section id="pricing" className={`py-16 md:py-32 relative border-t overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-black border-white/5' : 'bg-slate-50 border-slate-200'}`}>
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-600/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-red-600/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Inversion Model Pricing
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-8">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Access Tier</span>
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl font-medium leading-relaxed">
            From community observers to production architects—find the path that fits your engineering goals.
          </p>
        </div>

        <div 
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto transition-all duration-1000 items-stretch ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
        >
          {tiers.map((tier) => (
            <PricingCard 
              key={tier.id}
              tier={tier}
              isLanding={true}
              ctaText={tier.ctaText}
              onEnroll={() => {}} // Handle navigation or logic here if needed
              isDarkMode={isDarkMode}
            />
          ))}
        </div>

        {/* Guarantees Hook */}
        <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-6">
           <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-neutral-900/50 border border-white/5">
              <Sparkles size={18} className="text-orange-500" />
              <span className="text-white text-xs font-black uppercase tracking-widest">4-Day 80% Refund Policy</span>
           </div>
           <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-neutral-900/50 border border-white/5">
              <Zap size={18} className="text-red-500" />
              <span className="text-white text-xs font-black uppercase tracking-widest">Lifetime Access Promise</span>
           </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <footer className={`py-12 border-t text-center relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-neutral-950 border-white/10' : 'bg-white border-slate-200'}`}>
    <div className="relative z-10 flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 text-white font-bold text-2xl tracking-tighter mb-4">
        <BrainCircuit className="text-orange-500" />
        <span>Neuro<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Code</span></span>
      </div>
      <p className="text-neutral-500 text-sm max-w-sm">
        The most comprehensive pathway from basic Python to deploying advanced Agentic AI architectures.
      </p>
      <div className="mt-8 pt-8 border-t border-white/5 w-full max-w-md text-neutral-600 text-xs">
        &copy; {new Date().getFullYear()} NeuroCode. Built for AI Engineers. All rights reserved.
      </div>
    </div>
  </footer>
);

const LandingPage = ({ setIsDarkMode }: { setIsDarkMode: (val: boolean) => void }) => {
  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans selection:bg-orange-500/30 bg-neutral-950 text-neutral-50`}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .animation-delay-100 { animation-delay: 100ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-300 { animation-delay: 300ms; }
        
        html { scroll-behavior: smooth; }
      `}} />
      <Navbar isDarkMode={true} setIsDarkMode={setIsDarkMode} hideToggle={true} />
      <Hero onNavigate={() => {}} isDarkMode={true} />
      <Methodology isDarkMode={true} />
      <Curriculum isDarkMode={true} />
      <CareerEngine isDarkMode={true} />
      <CommunityDashboard isDarkMode={true} />
      <LogoBar isDarkMode={true} />
      <Pricing isDarkMode={true} />
      <Footer isDarkMode={true} />
    </div>
  );
};

const LandingApp = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<LandingPage setIsDarkMode={setIsDarkMode} />} />
      <Route path="/login" element={
        <AuthPage 
          initialMode="login" 
          onBack={() => navigate('/')}
          onSuccess={() => navigate('/dashboard')}
          isDarkMode={isDarkMode}
        />
      } />
      <Route path="/signup" element={
        <AuthPage 
          initialMode="signup" 
          onBack={() => navigate('/')}
          onSuccess={() => navigate('/dashboard')}
          isDarkMode={isDarkMode}
        />
      } />
      <Route path="/enroll" element={
        <EnrollPage 
          onBack={() => navigate('/')}
          onEnrollSuccess={(tier) => {
            console.log(`Enrolling in ${tier}`);
            navigate('/login');
          }}
          isDarkMode={isDarkMode}
        />
      } />
      <Route path="/dashboard" element={
        <Dashboard 
          onModuleClick={(id) => navigate(`/module/${id}`)} 
          onResumeClick={() => navigate('/resume')}
          onWhiteboardClick={() => navigate('/whiteboard')}
          onCommunityClick={() => navigate('/community')}
          onArenaClick={() => navigate('/arena')}
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
        />
      } />
      <Route path="/resume" element={<ResumePage isDarkMode={isDarkMode} />} />
      <Route path="/whiteboard" element={<WhiteboardPage isDarkMode={isDarkMode} />} />
      <Route path="/community" element={<CommunityPage isDarkMode={isDarkMode} />} />
      <Route path="/arena" element={<ArenaPage isDarkMode={isDarkMode} />} />
      <Route path="/battle/:battleId" element={<BattlePage isDarkMode={isDarkMode} />} />
      <Route path="/module/:moduleId" element={
        <ModuleDetail 
          isDarkMode={isDarkMode} 
        />
      } />
      <Route path="/editor" element={<EditorPage isDarkMode={isDarkMode} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default LandingApp;
