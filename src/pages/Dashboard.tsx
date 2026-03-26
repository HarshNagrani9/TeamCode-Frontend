import React, { useState, useEffect, useCallback } from 'react';
// @ts-ignore
const _React = React;
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Target, 
  Microscope, 
  FileText, 
  Users, 
  Zap, 
  Lock, 
  ChevronRight, 
  Trophy,
  Activity,
  Award,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  GripVertical,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';

const Dashboard = ({ onModuleClick, onResumeClick, onWhiteboardClick, onCommunityClick, onArenaClick, isDarkMode, setIsDarkMode }: { 
  onModuleClick: (id: number) => void,
  onResumeClick: () => void,
  onWhiteboardClick: () => void,
  onCommunityClick: () => void,
  onArenaClick: () => void,
  isDarkMode: boolean,
  setIsDarkMode: (val: boolean) => void
}) => {
  const [tier] = useState('max');
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Dynamic widths
  const [leftWidth, setLeftWidth] = useState(256);
  const [rightWidth, setRightWidth] = useState(320);
  const [isResizingLeft, setIsResizingLeft] = useState(false);
  const [isResizingRight, setIsResizingRight] = useState(false);

  const startResizingLeft = useCallback(() => setIsResizingLeft(true), []);
  const startResizingRight = useCallback(() => setIsResizingRight(true), []);
  const stopResizing = useCallback(() => {
    setIsResizingLeft(false);
    setIsResizingRight(false);
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (isResizingLeft) {
      const newWidth = e.clientX;
      if (newWidth > 200 && newWidth < 450) {
        setLeftWidth(newWidth);
        if (leftCollapsed) setLeftCollapsed(false);
      }
    }
    if (isResizingRight) {
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth > 250 && newWidth < 500) {
        setRightWidth(newWidth);
        if (rightCollapsed) setRightCollapsed(false);
      }
    }
  }, [isResizingLeft, isResizingRight, leftCollapsed, rightCollapsed]);

  useEffect(() => {
    if (isResizingLeft || isResizingRight) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResizing);
    }
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizingLeft, isResizingRight, resize, stopResizing]);

  const modules = [
    { id: 1, title: "Python for AI", progress: 100, status: "completed" },
    { id: 2, title: "Data Preprocessing", progress: 85, status: "active" },
    { id: 3, title: "Geometric Math", progress: 40, status: "active" },
    { id: 4, title: "Classical ML", progress: 0, status: "unlocked" },
    { id: 5, title: "Deep Learning", progress: 0, status: "unlocked" },
    { id: 6, title: "RAG Systems", progress: 0, status: tier === 'max' ? "unlocked" : "locked" },
    { id: 7, title: "Shipping AI", progress: 0, status: tier === 'max' ? "unlocked" : "locked" },
  ];

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Neural Paths", active: true },
    { icon: Target, label: "The Arena", active: false },
    { icon: Microscope, label: "ML Whiteboard", active: false, premium: tier !== 'max' },
    { icon: FileText, label: "Resume Gen", active: false, premium: tier !== 'max' },
    { icon: Users, label: "Community", active: false },
  ];

  const RadarChart = () => {
    const [isHovered, setIsHovered] = useState(false);
    const chartData = [
      { label: 'PYTHON', value: 85 },
      { label: 'MATH', value: 72 },
      { label: 'ML', value: 94 },
      { label: 'DL', value: 78 },
      { label: 'RAG', value: 64 },
    ];

    const getPoint = (value: number, index: number, total: number) => {
      const radius = (value / 100) * 45;
      const angle = (index * (360 / total) - 90) * (Math.PI / 180);
      return {
        x: 50 + radius * Math.cos(angle),
        y: 50 + radius * Math.sin(angle)
      };
    };

    const points = chartData.map((d, i) => getPoint(d.value, i, chartData.length));
    const pointsString = points.map(p => `${p.x},${p.y}`).join(' ');

    return (
      <div 
        className="relative w-full h-48 flex items-center justify-center group/chart"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full flex overflow-visible">
          {[20, 40, 60, 80, 100].map((r) => (
            <circle key={r} cx="50" cy="50" r={r/2 * 0.9} fill="none" stroke={isDarkMode ? "#262626" : "#E2E8F0"} strokeWidth="0.5" />
          ))}
          {chartData.map((_, i) => {
            const p = getPoint(100, i, chartData.length);
            return <line key={i} x1="50" y1="50" x2={p.x} y2={p.y} stroke={isDarkMode ? "#262626" : "#E2E8F0"} strokeWidth="0.5" />;
          })}
          <polygon 
            points={pointsString} 
            fill={isHovered ? "rgba(255, 107, 0, 0.4)" : "rgba(255, 107, 0, 0.2)"} 
            stroke="#FF6B00" 
            strokeWidth="1.5"
            className="transition-all duration-700"
          />
          {points.map((p, i) => (
            <g key={i}>
              <circle 
                cx={p.x} 
                cy={p.y} 
                r={isHovered ? "3.5" : "2.5"} 
                fill="#FF6B00" 
                className="transition-all duration-500 shadow-[0_0_10px_#FF6B00]"
              />
            </g>
          ))}
        </svg>
        {(!rightCollapsed || window.innerWidth < 1280) && chartData.map((d, i) => {
          const positions = [
            'top-[-12px] left-1/2 -translate-x-1/2',
            'top-1/4 right-2',
            'bottom-2 right-4',
            'bottom-2 left-4',
            'top-1/4 left-2'
          ];
          return (
            <div 
              key={i} 
              className={`absolute text-[10px] font-mono transition-all duration-300 ${positions[i]} ${isHovered ? 'text-[#FF6B00] scale-110 font-bold' : (isDarkMode ? 'text-gray-500' : 'text-slate-400')}`}
            >
              {d.label}
              {isHovered && <span className="ml-1 opacity-70">[{d.value}]</span>}
            </div>
          );
        })}
      </div>
    );
  };

  const IntelligenceMatrix = ({ isMobile = false }) => (
    <div className={`p-6 rounded-3xl mb-8 border ${isDarkMode ? 'bg-[#0D0D0D]/40 border-zinc-900' : 'bg-white border-slate-200 shadow-sm'} ${isMobile ? 'xl:hidden' : 'hidden xl:block'}`}>
      <h3 className={`text-xs font-mono uppercase tracking-widest mb-8 whitespace-nowrap ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>Intelligence Matrix</h3>
      <div className="mb-12"><RadarChart /></div>

      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-xs font-mono uppercase tracking-widest whitespace-nowrap ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>Neural Consistency</h3>
          <span className="text-[10px] text-[#FF6B00] font-bold tracking-tighter uppercase whitespace-nowrap">42 Day Streak</span>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 42 }).map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-[2px] transition-all hover:scale-125 ${i % 3 === 0 ? 'bg-[#FF6B00]' : i % 5 === 0 ? (isDarkMode ? 'bg-zinc-700' : 'bg-slate-300') : (isDarkMode ? 'bg-zinc-900' : 'bg-slate-100')}`} />
          ))}
        </div>
      </div>

      <div>
        <h3 className={`text-xs font-mono uppercase tracking-widest mb-6 whitespace-nowrap ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>Leaderboard Top 3</h3>
        <div className="space-y-4">
          {[
            { rank: 1, name: "S. Chen", level: 99, color: "bg-[#FF6B00]" },
            { rank: 2, name: "V. Miller", level: 84, color: isDarkMode ? "bg-zinc-800" : "bg-slate-200" },
            { rank: 3, name: "K. Tanaka", level: 82, color: isDarkMode ? "bg-zinc-800" : "bg-slate-200" }
          ].map((user) => (
            <div key={user.rank} className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group ${isDarkMode ? 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300 shadow-sm'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 shrink-0 ${user.color} rounded flex items-center justify-center text-[10px] font-bold ${isDarkMode ? 'text-black' : 'text-slate-700'} shadow-inner`}>#{user.rank}</div>
                <span className={`text-xs font-medium transition-colors whitespace-nowrap overflow-hidden ${isDarkMode ? 'group-hover:text-white' : 'group-hover:text-black text-slate-700'}`}>{user.name}</span>
              </div>
              <span className={`text-[10px] font-mono italic shrink-0 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>LVL {user.level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SidebarContent = ({ className = "" }) => (
    <div className={`flex flex-col h-full ${className}`}>
      <div className={`p-8 flex items-center gap-3 transition-opacity duration-200 ${(leftCollapsed && window.innerWidth >= 1280) ? 'justify-center px-0' : ''}`}>
        <div className="w-8 h-8 bg-[#FF6B00] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.4)] shrink-0">
          <BrainCircuit size={20} className="text-black" strokeWidth={2.5} />
        </div>
        {(!leftCollapsed || window.innerWidth < 1280) && <span className={`text-xl font-bold tracking-tighter whitespace-nowrap overflow-hidden ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>NEUROCODE</span>}
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {sidebarItems.map((item, idx) => (
          <div 
            key={idx}
            className={`flex items-center p-3 rounded-xl cursor-pointer transition-all group overflow-hidden ${
              item.active 
              ? (isDarkMode ? 'bg-zinc-800/50 text-[#FF6B00]' : 'bg-orange-50 text-[#FF6B00]') 
              : (isDarkMode ? 'text-zinc-500 hover:bg-zinc-800/30 hover:text-zinc-300' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-900')
            } ${(leftCollapsed && window.innerWidth >= 1280) ? 'justify-center' : 'justify-between'}`}
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (item.label === "ML Whiteboard") onWhiteboardClick();
              if (item.label === "The Arena") onArenaClick();
              if (item.label === "Resume Gen") onResumeClick();
              if (item.label === "Community") onCommunityClick();
            }}
          >
            <div className="flex items-center gap-3 shrink-0">
              <item.icon size={18} strokeWidth={item.active ? 2.5 : 2} />
              {(!leftCollapsed || window.innerWidth < 1280) && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
            </div>
            {(!leftCollapsed || window.innerWidth < 1280) && item.premium && <Lock size={12} className={isDarkMode ? 'text-zinc-700' : 'text-slate-300'} />}
          </div>
        ))}
      </nav>

      <div className={`p-4 mt-auto border-t overflow-hidden ${isDarkMode ? 'border-zinc-900' : 'border-slate-200'} ${(leftCollapsed && window.innerWidth >= 1280) ? 'px-2' : ''}`}>
        <div className={`rounded-2xl p-4 border transition-all cursor-pointer ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800 group hover:border-[#FF6B00]/30' : 'bg-white border-slate-200 group hover:border-[#FF6B00]/30 shadow-sm'} ${(leftCollapsed && window.innerWidth >= 1280) ? 'p-2 flex justify-center' : ''}`}>
          <div className={`flex items-center gap-3 ${(leftCollapsed && window.innerWidth >= 1280) ? '' : 'mb-3'}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF6B00] to-orange-400 p-[2px] shrink-0">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
              </div>
            </div>
            {(!leftCollapsed || window.innerWidth < 1280) && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">MAX TIER</p>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>S. Chen</p>
              </div>
            )}
          </div>
          {(!leftCollapsed || window.innerWidth < 1280) && (
            <>
              <div className={`w-full h-1 rounded-full overflow-hidden ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`}>
                <div className="w-3/4 h-full bg-[#FF6B00]" />
              </div>
              <p className={`text-[10px] mt-2 font-mono uppercase tracking-tighter ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>LVL 99 ENGINEER</p>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`flex h-screen font-sans overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-[#0A0A0A] text-zinc-100' : 'bg-gray-50 text-slate-900'} ${isResizingLeft || isResizingRight ? 'cursor-col-resize select-none' : ''}`}>
      
      {/* MOBILE HEADER */}
      <div className={`xl:hidden fixed top-0 left-0 right-0 h-16 backdrop-blur-lg border-b z-50 flex items-center justify-between px-6 transition-colors ${isDarkMode ? 'bg-[#0D0D0D]/80 border-zinc-900' : 'bg-white/80 border-slate-200'}`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#FF6B00] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.4)]">
            <BrainCircuit size={20} className="text-black" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tighter">NEUROCODE</span>
        </div>
        <div className="flex items-center gap-2">
           <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-colors ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}
           >
             {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
           </button>
           <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`w-10 h-10 rounded-lg border flex items-center justify-center ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-[#FF6B00]' : 'bg-white border-slate-200 text-[#FF6B00] shadow-sm'}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-[60] pt-16">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className={`absolute left-0 top-16 bottom-0 w-64 border-r animate-in slide-in-from-left duration-300 ${isDarkMode ? 'bg-[#0D0D0D] border-zinc-900' : 'bg-white border-slate-200'}`}>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* SIDEBAR (LEFT) - DESKTOP */}
      <aside 
        style={{ width: leftCollapsed ? 80 : leftWidth }}
        className={`border-r hidden xl:flex flex-col transition-[width,background-color] duration-300 ease-in-out relative group/sidebar ${isDarkMode ? 'bg-[#0D0D0D] border-zinc-900' : 'bg-slate-100 border-slate-200'}`}
      >
        <SidebarContent />
        <div 
          onMouseDown={startResizingLeft}
          className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#FF6B00]/50 transition-colors z-30 ${isResizingLeft ? 'bg-[#FF6B00]' : ''}`}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/sidebar:opacity-100 transition-opacity">
            <GripVertical size={12} className={isDarkMode ? 'text-zinc-600' : 'text-slate-400'} />
          </div>
        </div>
        <button 
          onClick={() => setLeftCollapsed(!leftCollapsed)}
          className={`absolute -right-3 top-20 w-6 h-6 border rounded-full flex items-center justify-center transition-all z-40 ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-[#FF6B00]' : 'bg-white border-slate-200 text-slate-400 hover:text-[#FF6B00] shadow-sm'}`}
        >
          {leftCollapsed ? <PanelLeftOpen size={12} /> : <PanelLeftClose size={12} />}
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto custom-scrollbar pt-16 xl:pt-0">
        <div className={`h-14 border-b hidden xl:flex items-center justify-between px-8 backdrop-blur-md sticky top-0 z-10 transition-all ${isDarkMode ? 'bg-[#0D0D0D]/50 border-zinc-900' : 'bg-white/50 border-slate-200'}`}>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
              <div className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
              Daily Intel: Added LLAMA 3.1 snippet to Module 7...
            </div>
          </div>
          <div className="flex items-center gap-6">
             <div className={`text-[10px] font-mono ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>SERVER STATUS: <span className="text-emerald-500">ONLINE</span></div>
             <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-[#FF6B00]' : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-[#FF6B00]'}`}
                >
                  {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
                </button>
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center hover:bg-zinc-800 cursor-pointer transition-colors ${isDarkMode ? 'border-zinc-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <Zap size={14} className="text-[#FF6B00]" />
                </div>
             </div>
          </div>
        </div>

        <div className="p-6 md:p-8 max-w-6xl mx-auto">
          <IntelligenceMatrix isMobile={true} />

          <header className="mb-10 animate-fade-in-up">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Neural Paths <span className={isDarkMode ? 'text-zinc-700' : 'text-slate-300'}>/</span> Dashboard</h1>
            <p className={isDarkMode ? 'text-zinc-500 text-sm' : 'text-slate-500 text-sm'}>Welcome back, Engineer. Your AI mastery is increasing at a rate of 14% WoW.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { label: "Global Rank", value: "#342", color: "text-[#FF6B00]", icon: Trophy, bg: "bg-[#FF6B00]/10", hover: isDarkMode ? "hover:border-[#FF6B00]/20" : "hover:border-[#FF6B00]/40" },
              { label: "Active Streak", value: "42 DAYS", color: "text-blue-500", icon: Activity, bg: "bg-blue-500/10", hover: isDarkMode ? "hover:border-blue-500/20" : "hover:border-blue-500/40" },
              { label: "Resume Score", value: "84%", color: "text-emerald-500", icon: Award, bg: "bg-emerald-500/10", hover: isDarkMode ? "hover:border-emerald-500/20" : "hover:border-emerald-500/40" }
            ].map((stat, i) => (
              <div key={i} className={`border rounded-2xl p-6 flex items-center gap-5 transition-all group ${isDarkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'} ${stat.hover}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className={`text-xs font-mono uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>{stat.label}</p>
                  <p className="text-xl md:text-2xl font-bold italic">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 tracking-tight">
            <div className="w-1 h-5 bg-[#FF6B00] rounded-full" /> 
            CORE CURRICULUM
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {modules.map((mod) => (
              <div key={mod.id} className={`group p-5 rounded-2xl border transition-all relative overflow-hidden ${
                mod.status === 'locked' 
                ? (isDarkMode ? 'bg-zinc-950 border-zinc-900 grayscale opacity-60' : 'bg-slate-50 border-slate-100 grayscale opacity-40') 
                : (isDarkMode ? 'bg-zinc-900/40 border-zinc-800 hover:border-[#FF6B00]/50 hover:bg-zinc-900/60 cursor-pointer' : 'bg-white border-slate-200 hover:border-[#FF6B00]/50 hover:shadow-md cursor-pointer')
              }`}
              onClick={() => {
                if (mod.status !== 'locked') onModuleClick(mod.id);
              }}
              >
                {mod.status === 'locked' && <Lock size={16} className={`absolute top-4 right-4 ${isDarkMode ? 'text-zinc-700' : 'text-slate-300'}`} />}
                <p className={`text-[10px] font-mono mb-1 ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>MODULE 0{mod.id}</p>
                <h3 className="font-bold text-sm mb-4 leading-tight">{mod.title}</h3>
                <div className="flex items-end justify-between">
                  <div className="w-24">
                    <div className={`flex justify-between text-[9px] font-mono mb-1 uppercase tracking-tighter ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                      <span>Progress</span>
                      <span>{mod.progress}%</span>
                    </div>
                    <div className={`w-full h-1 rounded-full overflow-hidden ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`}>
                      <div className="h-full bg-[#FF6B00] shadow-[0_0_8px_#FF6B00]" style={{ width: `${mod.progress}%` }} />
                    </div>
                  </div>
                  <ChevronRight size={16} 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (mod.status !== 'locked') onModuleClick(mod.id);
                    }}
                    className={`transition-colors ${isDarkMode ? 'text-zinc-700 group-hover:text-[#FF6B00]' : 'text-slate-300 group-hover:text-[#FF6B00]'}`} 
                  />
                </div>
              </div>
            ))}
            <div className={`p-5 rounded-2xl border border-dashed flex flex-col items-center justify-center text-center opacity-40 hover:opacity-60 transition-opacity ${isDarkMode ? 'border-zinc-800' : 'border-slate-300'}`}>
                <Zap size={20} className={isDarkMode ? 'mb-2 text-zinc-600' : 'mb-2 text-slate-400'} />
                <p className={`text-xs font-bold ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>V2.0 EXTENSIONS</p>
                <p className={`text-[10px] mt-1 uppercase ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>COMING SOON</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={`rounded-3xl p-8 relative overflow-hidden group border transition-all ${isDarkMode ? 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'}`}>
              <div className={`absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                 <FileText size={120} />
              </div>
              <h2 className="text-xl font-bold mb-2">Smart Resume Gen</h2>
              <p className={`text-sm mb-6 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>3 new project bullet points ready to be synthesized into your profile.</p>
              <div className="space-y-4">
                {[
                  "Implementation: Recursive Character Splitting (Module 6)",
                  "Architecture: Multi-Agent RAG Orchestration (Module 6)"
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 text-xs ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    {item}
                  </div>
                ))}
                <div className={`flex items-center gap-3 text-xs ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>
                  <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'}`} />
                  Pending: Model Deployment with FastAPI (Module 7)
                </div>
              </div>
              <button 
                onClick={onResumeClick}
                className={`mt-8 px-6 py-2 text-xs font-bold rounded-lg transition-all transform active:scale-95 ${isDarkMode ? 'bg-zinc-100 text-black hover:bg-[#FF6B00] hover:text-white' : 'bg-slate-900 text-white hover:bg-[#FF6B00]'}`}
              >
                SYNTHESIZE RESUME
              </button>
            </div>

            <div className={`rounded-3xl p-8 border hover:bg-[#FF6B00]/10 transition-all ${isDarkMode ? 'bg-[#FF6B00]/5 border-[#FF6B00]/20' : 'bg-orange-50/50 border-orange-100 shadow-sm'}`}>
               <h2 className="text-xl font-bold mb-2 text-[#FF6B00]">The Arena Challenge</h2>
               <p className={`text-sm mb-6 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>Weekly coding problem: Optimized Cosine Similarity for sparse vectors.</p>
               <div className={`p-4 rounded-xl border font-mono text-[11px] mb-6 ${isDarkMode ? 'bg-black/40 border-zinc-800 text-zinc-400' : 'bg-white border-slate-200 text-slate-600'}`}>
                 {`def cosine_similarity(A, B):`} <br/>
                 {`    # Solve for O(n) complexity`} <br/>
                 {`    # Return float 0.0 - 1.0`}
               </div>
               <div className="flex items-center justify-between">
                 <div className="flex -space-x-2">
                   {[1,2,3,4].map(idx => (
                     <div key={idx} className={`w-6 h-6 rounded-full border text-[8px] flex items-center justify-center ${isDarkMode ? 'border-black bg-zinc-800' : 'border-white bg-slate-200 shadow-sm text-slate-600'}`}>
                        U{idx}
                     </div>
                   ))}
                   <div className={`pl-4 text-[10px] text-center flex items-center ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}> +1.2k solved</div>
                 </div>
                 <button 
                  onClick={onArenaClick}
                  className="px-6 py-2 border border-[#FF6B00] text-[#FF6B00] text-xs font-bold rounded-lg hover:bg-[#FF6B00] hover:text-white transition-all transform active:scale-95"
                 >
                    ENTER ARENA
                 </button>
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR (STATS) - DESKTOP */}
      <aside 
        style={{ width: rightCollapsed ? 64 : rightWidth }}
        className={`border-l hidden xl:flex flex-col transition-[width,background-color] duration-300 ease-in-out relative group/right-sidebar ${isDarkMode ? 'bg-[#0A0A0A] border-zinc-900' : 'bg-slate-50 border-slate-200'}`}
      >
        <div 
          onMouseDown={startResizingRight}
          className={`absolute top-0 left-0 w-1 h-full cursor-col-resize hover:bg-[#FF6B00]/50 transition-colors z-30 ${isResizingRight ? 'bg-[#FF6B00]' : ''}`}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/right-sidebar:opacity-100 transition-opacity">
            <GripVertical size={12} className={isDarkMode ? 'text-zinc-600' : 'text-slate-400'} />
          </div>
        </div>
        <button 
          onClick={() => setRightCollapsed(!rightCollapsed)}
          className={`absolute -left-3 top-20 w-6 h-6 border rounded-full flex items-center justify-center transition-all z-40 ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-[#FF6B00]' : 'bg-white border-slate-200 text-slate-400 hover:text-[#FF6B00] shadow-sm'}`}
        >
          {rightCollapsed ? <PanelRightClose size={12} /> : <PanelRightOpen size={12} />}
        </button>

        <div className={`flex-1 overflow-y-auto custom-scrollbar ${rightCollapsed ? 'opacity-0 invisible' : 'opacity-100 visible'} transition-all duration-200`}>
          <IntelligenceMatrix />
          <div className="p-6 pt-0">
            <div className={`p-5 rounded-2xl border transition-all ${isDarkMode ? 'bg-gradient-to-br from-zinc-900 to-black border-[#FF6B00]/20 hover:border-[#FF6B00]/40' : 'bg-gradient-to-br from-white to-slate-50 border-slate-200 hover:border-[#FF6B00]/40 shadow-sm'}`}>
               <div className="flex items-center gap-2 text-[#FF6B00] mb-2">
                  <Zap size={14} />
                  <span className="text-xs font-bold uppercase tracking-widest">Whiteboard Prompt</span>
               </div>
               <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>Design a cache-efficient retrieval loop for O(n) sparse vectors...</p>
               <button 
                 onClick={onWhiteboardClick}
                 className="w-full mt-4 py-2 bg-[#FF6B00] text-black text-[10px] font-bold rounded uppercase tracking-widest hover:shadow-[0_0_15px_#FF6B00] transition-all transform active:scale-95"
               >
                 SOLVE NOW
               </button>
            </div>
          </div>
        </div>

        {rightCollapsed && (
          <div className="flex-1 flex flex-col items-center pt-24 gap-8">
             <Trophy size={20} className={`cursor-pointer transition-colors ${isDarkMode ? 'text-zinc-700 hover:text-[#FF6B00]' : 'text-slate-400 hover:text-[#FF6B00]'}`} />
             <Activity size={20} className={`cursor-pointer transition-colors ${isDarkMode ? 'text-zinc-700 hover:text-blue-500' : 'text-slate-400 hover:text-blue-500'}`} />
             <Award size={20} className={`cursor-pointer transition-colors ${isDarkMode ? 'text-zinc-700 hover:text-emerald-500' : 'text-slate-400 hover:text-emerald-500'}`} />
             <Target size={20} className={`cursor-pointer transition-colors ${isDarkMode ? 'text-zinc-700 hover:text-red-500' : 'text-slate-400 hover:text-red-500'}`} />
          </div>
        )}
      </aside>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

export default Dashboard;
