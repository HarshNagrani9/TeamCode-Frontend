import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  Swords, 
  Timer, 
  Flame, 
  Target, 
  Users,
  Cpu,
  Star,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface ArenaPageProps {
  isDarkMode: boolean;
}

const ArenaPage: React.FC<ArenaPageProps> = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, minutes: 22, seconds: 54 });

  // Robust Countdown Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              } else {
                clearInterval(timer);
                return prev;
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const ranks = [
    { name: 'RECRUIT', height: 'h-16', color: isDarkMode ? 'bg-zinc-800' : 'bg-slate-200', border: isDarkMode ? 'border-zinc-700' : 'border-slate-300' },
    { name: 'CHALLENGER', height: 'h-24', color: isDarkMode ? 'bg-zinc-700' : 'bg-slate-300', border: isDarkMode ? 'border-zinc-600' : 'border-slate-400' },
    { name: 'GLADIATOR', height: 'h-36', color: 'bg-orange-900/40', border: 'border-orange-800/50' },
    { name: 'CHAMPION', height: 'h-48', color: 'bg-[#FF6B00]/20', border: 'border-[#FF6B00]/40' },
    { name: 'LEGENDARY', height: 'h-64', color: 'bg-[#FF6B00]', border: 'border-[#FF6B00]', text: 'text-black' },
  ];

  const leaderboard = [
    { rank: 1, user: "S. Chen", elo: 2840, winRate: "94%", streak: 12 },
    { rank: 2, user: "V. Miller", elo: 2715, winRate: "89%", streak: 8 },
    { rank: 3, user: "K. Tanaka", elo: 2680, winRate: "87%", streak: 5 },
    { rank: 4, user: "M. Rossi", elo: 2550, winRate: "82%", streak: 3 },
    { rank: 5, user: "J. Doe", elo: 2420, winRate: "78%", streak: 2 },
    { rank: 6, user: "Hidden User", elo: "????", winRate: "??%", streak: 0, blurred: true },
    { rank: 7, user: "Hidden User", elo: "????", winRate: "??%", streak: 0, blurred: true },
  ];


  return (
    <div className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-500 selection:bg-[#FF6B00] selection:text-black ${isDarkMode ? 'bg-[#0A0A0A] text-zinc-100' : 'bg-gray-50 text-slate-900'}`}>
      
      {/* HEADER / NAV */}
      <nav className={`h-16 border-b px-8 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md ${isDarkMode ? 'bg-[#0D0D0D]/80 border-zinc-900' : 'bg-white/80 border-slate-200'}`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')}
            className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-zinc-800 text-zinc-500' : 'hover:bg-slate-100 text-slate-400'}`}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FF6B00] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.4)]">
              <Swords size={18} className="text-black" />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase">The Arena</span>
          </div>
        </div>
      </nav>

      {/* BACKGROUND NEURAL PARTICLES SIMULATION */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,107,0,0.1),transparent_70%)]" />
        <svg className="w-full h-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <circle 
              key={i} 
              cx={`${Math.random() * 100}%`} 
              cy={`${Math.random() * 100}%`} 
              r="1" 
              fill="#FF6B00" 
              className="animate-pulse"
              style={{ animationDelay: `${Math.random() * 5}s` }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
        
        {/* HERO SECTION */}
        <header className="text-center mb-24">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-full text-[#FF6B00] text-xs font-bold tracking-[0.3em] uppercase mb-8 animate-bounce">
            <Swords size={14} />
            Season 04 Now Active
          </div>
          <h1 className={`text-7xl md:text-9xl font-black tracking-tighter mb-6 bg-clip-text text-transparent uppercase ${isDarkMode ? 'bg-gradient-to-b from-white to-zinc-500' : 'bg-gradient-to-b from-slate-900 to-slate-400'}`}>
            The Arena
          </h1>
          <p className={`${isDarkMode ? 'text-zinc-500' : 'text-slate-500'} text-lg md:text-xl max-w-2xl mx-auto leading-relaxed`}>
            Architect, optimize, and deploy models to fight head-to-head in the weekly ELO-ranked battleground.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
          
          {/* ACTIVE CHALLENGE CARD */}
          <div className="lg:col-span-7">
            <div className={`border rounded-[2.5rem] p-8 lg:p-12 relative overflow-hidden group shadow-2xl ${isDarkMode ? 'bg-[#0D0D0D] border-zinc-900' : 'bg-white border-slate-200'}`}>
               <div className="absolute top-0 right-0 p-8">
                  <div className="flex items-center gap-2 text-emerald-500 font-mono text-[10px] font-bold uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Live Drop
                  </div>
               </div>

               <div className="mb-12">
                  <p className="text-[10px] font-mono text-[#FF6B00] uppercase tracking-[0.3em] font-bold mb-4">Monday Drop // Task 4.2</p>
                  <h2 className={`text-4xl font-bold mb-6 group-hover:text-[#FF6B00] transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Recursive Semantic Chunking</h2>
                  <p className={`${isDarkMode ? 'text-zinc-400' : 'text-slate-600'} leading-relaxed max-w-lg mb-8`}>
                    Build a dynamic parser that maintains semantic integrity across unstructured technical docs. Evaluated on <strong>Recall@K</strong> and <strong>Inference Latency</strong>.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                     <div className={`px-4 py-2 border rounded-xl flex items-center gap-3 ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                        <Cpu size={16} className={`${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`} />
                        <span className={`text-xs font-bold uppercase ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>RAG Engine</span>
                     </div>
                     <div className={`px-4 py-2 border rounded-xl flex items-center gap-3 ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                        <Target size={16} className={`${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`} />
                        <span className={`text-xs font-bold uppercase ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>Accuracy Focus</span>
                     </div>
                  </div>
               </div>

               <div className={`border rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 ${isDarkMode ? 'bg-black/50 border-zinc-900' : 'bg-slate-50/50 border-slate-100'}`}>
                  <div>
                    <p className={`text-[10px] font-mono uppercase tracking-widest mb-3 ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>Submission Window Closes In:</p>
                    <div className="flex gap-4">
                       {[
                         { val: timeLeft.days, label: 'D' },
                         { val: timeLeft.hours, label: 'H' },
                         { val: timeLeft.minutes, label: 'M' },
                         { val: timeLeft.seconds, label: 'S' }
                       ].map((t, i) => (
                         <div key={i} className="text-center">
                            <p className="text-3xl font-black tracking-tighter">{t.val.toString().padStart(2, '0')}</p>
                            <p className="text-[9px] font-bold text-[#FF6B00] uppercase tracking-tighter">{t.label}</p>
                         </div>
                       ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/battle/4.2')}
                    className="w-full md:w-auto px-10 py-4 bg-[#FF6B00] text-black font-bold rounded-2xl hover:shadow-[0_0_40px_rgba(255,107,0,0.5)] active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                    ENTER BATTLE <ArrowRight size={18} />
                  </button>
               </div>
            </div>
          </div>

          {/* LEADERBOARD (FOMO HOOK) */}
          <div className="lg:col-span-5">
            <div className={`border rounded-[2.5rem] p-8 shadow-xl ${isDarkMode ? 'bg-[#0D0D0D] border-zinc-900' : 'bg-white border-slate-200'}`}>
               <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                 <Trophy size={20} className="text-[#FF6B00]" />
                 Global Standings
               </h3>

               <div className="space-y-4">
                 {leaderboard.map((user, idx) => (
                   <div 
                    key={idx} 
                    className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${user.blurred ? 'blur-[4px] opacity-20 border-transparent select-none' : (isDarkMode ? 'bg-zinc-950 border-zinc-900 hover:border-zinc-700' : 'bg-slate-50 border-slate-100 hover:border-slate-200')}`}
                   >
                     <div className="flex items-center gap-4">
                        <span className={`text-xs font-mono font-bold w-4 ${idx < 3 ? 'text-[#FF6B00]' : (isDarkMode ? 'text-zinc-600' : 'text-slate-400')}`}>{user.rank}</span>
                        <div className={`w-8 h-8 rounded-full border overflow-hidden shrink-0 ${isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-slate-100 border-slate-200'}`}>
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.user}`} alt="avatar" />
                        </div>
                        <div>
                           <p className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{user.user}</p>
                           <p className={`text-[9px] font-mono ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>Win Rate: {user.winRate}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className={`text-xs font-bold ${isDarkMode ? 'text-zinc-100' : 'text-slate-800'}`}>{user.elo} ELO</p>
                        {user.streak > 0 && (
                          <p className="text-[9px] text-[#FF6B00] font-bold flex items-center justify-end gap-1">
                            <Flame size={10} /> {user.streak} STREAK
                          </p>
                        )}
                     </div>
                   </div>
                 ))}
               </div>

               <div className={`mt-8 pt-8 border-t ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
                  <p className={`text-[10px] text-center font-mono uppercase tracking-[0.2em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Register to unlock full ranking</p>
               </div>
            </div>
          </div>
        </div>

        {/* RANK PILLARS SECTION */}
        <section className="mb-32">
           <div className="text-center mb-16">
              <h3 className="text-3xl font-bold mb-4">Neural Echelon</h3>
              <p className={`${isDarkMode ? 'text-zinc-500' : 'text-slate-500'} font-mono text-xs uppercase tracking-widest`}>Ascend the tiers. Earn the spotlight.</p>
           </div>
           
           <div className="flex flex-col md:flex-row items-end justify-between gap-4 h-80 px-4">
              {ranks.map((rank, i) => (
                <div key={i} className="flex-1 flex flex-col items-center group cursor-default h-full justify-end">
                  <div className="mb-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center">
                    <Star size={16} className="text-[#FF6B00] mb-1" fill={i === 4 ? "currentColor" : "none"} />
                    <span className="text-[9px] font-bold text-zinc-500">Tier 0{i+1}</span>
                  </div>
                  <div className={`w-full ${rank.height} ${rank.color} ${rank.border} border-t-4 rounded-t-2xl transition-all duration-500 group-hover:brightness-125 flex items-center justify-center`}>
                    <span className={`text-[10px] font-black rotate-[-90deg] md:rotate-0 tracking-widest ${rank.text || (isDarkMode ? 'text-zinc-500' : 'text-slate-500')}`}>
                      {rank.name}
                    </span>
                  </div>
                </div>
              ))}
           </div>
        </section>

        {/* REWARDS STRIP */}
        <footer className={`mt-32 border-t pt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left ${isDarkMode ? 'border-zinc-900' : 'border-slate-200'}`}>
           <div>
              <h4 className="text-[#FF6B00] font-black tracking-widest text-xs uppercase mb-6 flex items-center justify-center md:justify-start gap-2">
                <Users size={14} /> Season Partnerships
              </h4>
              <p className={`${isDarkMode ? 'text-zinc-500' : 'text-slate-500'} text-sm leading-relaxed`}>
                Top 3 performers in Season 04 receive direct fast-track interview passes to our sponsor ecosystem including DeepMind and Anthropic.
              </p>
           </div>
           <div>
              <h4 className="text-[#FF6B00] font-black tracking-widest text-xs uppercase mb-6 flex items-center justify-center md:justify-start gap-2">
                <Star size={14} /> Exclusive Loot
              </h4>
              <p className={`${isDarkMode ? 'text-zinc-500' : 'text-slate-500'} text-sm leading-relaxed`}>
                Unlock the "Hyper-Optimizer" badge and custom code-terminal themes once you cross the 2200 ELO threshold.
              </p>
           </div>
           <div>
              <h4 className="text-[#FF6B00] font-black tracking-widest text-xs uppercase mb-6 flex items-center justify-center md:justify-start gap-2">
                <Timer size={14} /> XP Multipliers
              </h4>
              <p className={`${isDarkMode ? 'text-zinc-500' : 'text-slate-500'} text-sm leading-relaxed`}>
                Win streaks above 5 consecutive battles trigger a 2x XP multiplier, accelerating your path to the Champion tier.
              </p>
           </div>
        </footer>

      </div>
    </div>
  );
};

export default ArenaPage;
