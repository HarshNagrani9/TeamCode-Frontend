import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Terminal, 
  BookOpen, 
  Activity, 
  Cpu, 
  Zap, 
  ExternalLink, 
  CheckCircle2, 
  ShieldAlert, 
  Play, 
  Send, 
  BarChart3
} from 'lucide-react';

interface BattlePageProps {
  isDarkMode: boolean;
}

const BattlePage: React.FC<BattlePageProps> = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const { battleId } = useParams();
  const [activeTab, setActiveTab] = useState('briefing');

  // Hardcoded data for current battle (4.2 - Recursive Semantic Chunking)
  const battleData = {
    title: "Recursive Semantic Chunking",
    id: "4.2",
    task: "Build a dynamic parser that maintains semantic integrity across unstructured technical docs. Evaluated on Recall@K and Inference Latency.",
    constraints: [
      "Max chunk size: 512 tokens",
      "Overlapping allowed: 10%",
      "Inference must be < 50ms per document",
      "Support for LaTeX and Code blocks"
    ],
    resources: [
      { title: "Semantic Chunking in RAG", type: "Arxiv Paper", url: "#", description: "Deep dive into window-based semantic splitting." },
      { title: "Recursive Character Partitioning", type: "Docs", url: "#", description: "How to handle nested hierarchies in documents." },
      { title: "Vector Database Indexing", type: "Blog", url: "#", description: "Optimizing retrieval for variable-sized chunks." }
    ],
    stats: [
      { label: "Avg. ELO of Solvers", value: "2,410", color: "text-[#FF6B00]", icon: Activity },
      { label: "Success Rate", value: "14.2%", color: "text-blue-500", icon: CheckCircle2 },
      { label: "Avg. Latency", value: "42.8ms", color: "text-emerald-500", icon: Zap }
    ]
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 selection:bg-[#FF6B00] selection:text-black ${isDarkMode ? 'bg-[#0A0A0A] text-zinc-100' : 'bg-gray-50 text-slate-900'}`}>
      
      {/* HEADER / NAV */}
      <nav className={`h-16 border-b px-8 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md ${isDarkMode ? 'bg-[#0D0D0D]/80 border-zinc-900' : 'bg-white/80 border-slate-200'}`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/arena')}
            className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-zinc-800 text-zinc-500' : 'hover:bg-slate-100 text-slate-400'}`}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FF6B00] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.4)]">
              <Terminal size={18} className="text-black" />
            </div>
            <div>
               <span className="text-xs font-mono text-[#FF6B00] block tracking-tighter uppercase font-bold">Battle Drop {battleId || battleData.id}</span>
               <span className="text-sm font-bold tracking-tighter uppercase leading-none">Neural Deployment Phase</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           {/* Mobile view could have a timer here */}
           <div className={`hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full border ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-100 border-slate-200 shadow-sm'}`}>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold font-mono tracking-widest text-[#FF6B00]">SECURE_LINK // ACTIVE</span>
           </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: PRIMARY CONTENT */}
        <main className="lg:col-span-8 space-y-8">
           
           {/* HERO MODULE */}
           <div className={`p-8 lg:p-12 rounded-[2.5rem] border relative overflow-hidden shadow-2xl ${isDarkMode ? 'bg-[#0D0D0D] border-zinc-900' : 'bg-white border-slate-200'}`}>
              <div className="absolute top-0 right-0 p-8">
                 <Cpu size={40} className="text-[#FF6B00] opacity-10 animate-pulse" />
              </div>
              <p className="text-[10px] font-mono text-[#FF6B00] uppercase tracking-[0.4em] font-bold mb-4">Monday Drop // Task 4.2</p>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 uppercase leading-tight">
                {battleData.title}
              </h1>
              <p className={`text-lg leading-relaxed mb-10 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                {battleData.task}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {battleData.constraints.map((c, i) => (
                   <div key={i} className={`p-4 rounded-2xl border flex flex-col gap-2 ${isDarkMode ? 'bg-black/40 border-zinc-800' : 'bg-slate-50 border-slate-100'}`}>
                      <ShieldAlert size={14} className="text-[#FF6B00]" />
                      <span className={`text-[10px] font-bold leading-tight ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>{c}</span>
                   </div>
                 ))}
              </div>
           </div>

           {/* CONTENT TABS */}
           <div className="space-y-6">
              <div className="flex border-b border-zinc-800">
                 {['briefing', 'resources', 'discussion'].map(tab => (
                   <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-8 py-4 text-[10px] font-bold uppercase tracking-widest transition-all relative ${
                      activeTab === tab ? 'text-[#FF6B00]' : 'text-zinc-600 hover:text-zinc-400'
                    }`}
                   >
                     {tab}
                     {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF6B00] shadow-[0_0_10px_#FF6B00]" />}
                   </button>
                 ))}
              </div>

              {activeTab === 'briefing' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                   <div className={`p-8 rounded-3xl border ${isDarkMode ? 'bg-zinc-900/30 border-zinc-900' : 'bg-white border-slate-100 shadow-sm'}`}>
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                        <BookOpen size={20} className="text-[#FF6B00]" />
                        Neural Briefing
                      </h3>
                      <div className={`space-y-6 text-sm leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                         <p>The core objective is to dismantle standard character-count segmentation and transition towards a <strong>semantic recursive strategy</strong>. Your model should identify natural pauses in logic, formatting changes (like code or tables), and cross-referencing markers before deciding on a chunk split point.</p>
                         <p>Evaluation will favor solutions that maintain the lowest context loss when chunks are re-assembled at inference time. Peak efficiency is defined by a 98% Recall@5 score with &lt;100ms document processing time on standard A100 benchmarks.</p>
                         <div className={`p-6 rounded-2xl border font-mono text-[11px] ${isDarkMode ? 'bg-black border-zinc-800 text-zinc-500' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                            # EVALUATION_METRIC_V1 <br/>
                            SCORE = (W1 * RECALL) + (W2 * (1 / LATENCY)) - CONTEXT_LOSS_PENALTY
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                   {battleData.resources.map((res, i) => (
                     <div key={i} className={`p-6 rounded-3xl border group cursor-pointer transition-all hover:border-[#FF6B00]/50 ${isDarkMode ? 'bg-zinc-900/30 border-zinc-900' : 'bg-white border-slate-100 shadow-sm'}`}>
                        <div className="flex items-center justify-between mb-4">
                           <div className={`px-2 py-1 rounded text-[9px] font-bold font-mono tracking-tighter ${isDarkMode ? 'bg-zinc-800 text-[#FF6B00]' : 'bg-orange-50 text-[#FF6B00]'}`}>
                              {res.type}
                           </div>
                           <ExternalLink size={14} className="text-zinc-600 group-hover:text-[#FF6B00] transition-colors" />
                        </div>
                        <h4 className="font-bold text-sm mb-2 group-hover:text-[#FF6B00] transition-colors">{res.title}</h4>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>{res.description}</p>
                     </div>
                   ))}
                </div>
              )}

              {activeTab === 'discussion' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                   <div className={`p-12 text-center rounded-3xl border border-dashed ${isDarkMode ? 'border-zinc-900 bg-zinc-950/20' : 'border-slate-200 bg-slate-50/20'}`}>
                      <Zap size={40} className="text-[#FF6B00] opacity-20 mx-auto mb-6" />
                      <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest">Discussion Thread is locked for Recruit Tiers</p>
                      <button className="mt-4 text-[10px] font-bold text-[#FF6B00] uppercase hover:underline">Upgrade to Gladiotor Tier</button>
                   </div>
                </div>
              )}
           </div>
        </main>

        {/* RIGHT COLUMN: STATS & ACTION */}
        <aside className="lg:col-span-4 space-y-8">
           
           {/* STATS MODULE */}
           <div className={`p-8 rounded-[2rem] border ${isDarkMode ? 'bg-[#0D0D0D] border-zinc-900' : 'bg-white border-slate-200 shadow-xl'}`}>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-8 flex items-center gap-3">
                 <BarChart3 size={18} className="text-[#FF6B00]" />
                 Battle Analytics
              </h3>
              <div className="space-y-6">
                 {battleData.stats.map((stat, i) => (
                   <div key={i} className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-slate-50 border-slate-100 shadow-inner'}`}>
                         <stat.icon size={18} className={stat.color} />
                      </div>
                      <div>
                         <p className={`text-[10px] font-mono uppercase tracking-widest ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>{stat.label}</p>
                         <p className="text-lg font-bold italic">{stat.value}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* ACTION HUB */}
           <div className={`p-8 rounded-[2rem] border relative overflow-hidden ${isDarkMode ? 'bg-zinc-900/20 border-zinc-900' : 'bg-slate-50/50 border-slate-100'}`}>
              <div className="relative z-10 space-y-6">
                 <div className="text-center">
                    <p className={`text-[9px] font-mono mb-2 uppercase tracking-widest ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>Submit Your Neural Architecture</p>
                    <button className="w-full py-4 bg-[#FF6B00] text-black font-black rounded-2xl text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(255,107,0,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                       INITIATE DEPLOY <Send size={16} />
                    </button>
                 </div>
                 <div className="text-center">
                    <button className={`w-full py-3 border rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all ${isDarkMode ? 'border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:text-white' : 'border-slate-200 text-slate-500 hover:bg-white hover:shadow-md'}`}>
                       RUN SIMULATION <Play size={14} className="inline ml-1" />
                    </button>
                    <p className={`text-[8px] mt-4 font-mono uppercase tracking-[0.2em] font-medium transition-colors ${isDarkMode ? 'text-zinc-800' : 'text-slate-300'}`}>
                      Warning: 3 Simulations remaining today
                    </p>
                 </div>
              </div>
              {/* Abstract decorative element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B00] opacity-5 blur-[80px] -mr-16 -mt-16" />
           </div>

           {/* SPONSOR MODULE (ADS / CONTEXT) */}
           <div className={`p-8 rounded-[2rem] border border-dashed ${isDarkMode ? 'border-zinc-900 bg-zinc-950/20' : 'border-slate-200 bg-slate-50/20'}`}>
              <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-4">Official Sponsor // Season 04</p>
              <div className="flex items-center gap-4 py-4 px-6 bg-black rounded-2xl border border-zinc-800">
                 <div className="w-10 h-10 bg-[#FF6B00] rounded flex items-center justify-center font-black text-black">DM</div>
                 <div>
                    <h5 className="text-xs font-bold text-white uppercase tracking-tighter leading-none">DeepMind Lab</h5>
                    <p className="text-[9px] text-zinc-600 font-mono italic">Advanced RAG R&D</p>
                 </div>
              </div>
           </div>

        </aside>
      </div>

    </div>
  );
};

export default BattlePage;
