import React, { useState } from 'react';
import { 
  ChevronLeft, 
  BrainCircuit, 
  Zap, 
  ShieldCheck, 
  Star,
  Sparkles,
  Lock,
  Globe,
  CreditCard,
  Code2,
  Database,
  Network,
  Layers
} from 'lucide-react';
import PricingCard from './components/PricingCard';

interface EnrollPageProps {
  onBack: () => void;
  onEnrollSuccess: (tier: string) => void;
  isDarkMode: boolean;
}

const EnrollPage: React.FC<EnrollPageProps> = ({ onBack, onEnrollSuccess, isDarkMode }) => {
  const [selectedTier, setSelectedTier] = useState<string>('max');
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  const tiers = [
    {
      id: 'free',
      name: 'Free Learner',
      price: '₹0',
      description: 'Test the base neural paths.',
      features: ['Community Access', 'Weekly ML Questions', 'Discord Server'],
      color: 'from-neutral-800 to-neutral-900',
      accent: 'text-neutral-400',
      glow: 'shadow-neutral-500/5',
      button: 'bg-white/5 border-white/10 hover:bg-white/10'
    },
    {
      id: 'pro',
      name: 'Pro Engineer',
      price: '₹1,000',
      description: 'Master the core AI architecture.',
      features: ['Everything in Free', 'Modules 1-5', 'Personalized Dashboards', 'Weekly tasks & Interview Tips', '2 Years Access'],
      color: 'from-orange-600/20 to-neutral-900',
      accent: 'text-orange-500',
      glow: 'shadow-orange-500/20',
      button: 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/40'
    },
    {
      id: 'max',
      name: 'AI Architect',
      price: '₹1,800',
      description: 'The end-to-end masterclass.',
      features: ['Everything in Pro', 'All 7 Modules', 'Resume Gen + Whiteboard', 'Lifetime Access'],
      color: 'from-red-600/30 to-neutral-900',
      accent: 'text-red-500',
      glow: 'shadow-red-500/20',
      button: 'bg-gradient-to-r from-red-600 to-orange-600 hover:brightness-110 text-white shadow-red-600/40',
      popular: true
    }
  ];

  const roadmap = [
    { 
      phase: "01", 
      title: "Python Mastery", 
      icon: <Code2 size={18} />, 
      color: "text-orange-500", 
      desc: "From Basics to Advanced OOP & Concurrency.",
      details: "Python isn't just 'Hello World.' This is high-performance computing. Master memory-efficient OOP, Dunder methods, and Concurrency for production models.",
      objectives: ["Memory-efficient OOP (Dunder)","Lazy Loading with Generators","AsyncIO & Multiprocessing","Virtual Environments & Pip"],
      project: "Autonomous Web Surveyor"
    },
    { 
      phase: "02", 
      title: "Data Janitoring", 
      icon: <Database size={18} />, 
      color: "text-blue-500", 
      desc: "NumPy, Pandas & Feature Engineering.",
      details: "80% of AI is cleaning data. Master the power of NumPy vectorization, Pandas manipulation, and advanced scaling/encoding techniques.",
      objectives: ["NumPy Vectorization (50x Speed)","Pandas Dataframe logic","Missing Data & Outliers (IQR)","Norm vs. Standard Scaling"],
      project: "The Multi-Modal Brain"
    },
    { 
      phase: "03", 
      title: "Math of Intelligence", 
      icon: <Network size={18} />, 
      color: "text-purple-500", 
      desc: "Linear Algebra, Calculus & Probability.",
      details: "The geometry of intelligence. Linear Algebra as the container, Calculus as the engine, and Probability as the logic of uncertainty.",
      objectives: ["SVD & Matrix Transformations","Chain Rule & Backpropagation","Bayes Theorem & Beliefs","Entropy & Cross-Entropy"],
      project: "Neural Engine 0"
    },
    { 
      phase: "04", 
      title: "ML Kingdoms", 
      icon: <Layers size={18} />, 
      color: "text-emerald-500", 
      desc: "Supervised & Unsupervised Mastery.",
      details: "The bread and butter of industry ML. Move from Linear Regression to XGBoost, K-Means Clustering, and professional evaluation pipelines.",
      objectives: ["XGBoost & Ensemble Methods","K-Means & t-SNE Clustering","Precision-Recall ROC/AUC","GridSearchCV Tuning"],
      project: "Fraud Shield AI"
    },
    { 
      phase: "05", 
      title: "Deep Learning Hub", 
      icon: <BrainCircuit size={18} />, 
      color: "text-red-500", 
      desc: "CNNs, RNNs & Transformers.",
      details: "Move from a single Perceptron built from scratch to vision models (CNNs), sequence models (LSTMs), and modern Transformer architectures.",
      objectives: ["Neural Training Loop (Scratch)","CNN Kernels & Pooling Layers","Sequence Modeling (LSTM)","Modern Attention Mechanisms"],
      project: "Visionary GPT"
    },
    { 
      phase: "06", 
      title: "Advanced RAG", 
      icon: <Sparkles size={18} />, 
      color: "text-yellow-500", 
      desc: "Semantic Search & Vector DBs.",
      details: "The most in-demand AI skill. Build agentic pipelines that allow LLMs to securely talk to your private documentation without hallucinations.",
      objectives: ["Semantic & Recursive Chunking","ChromaDB/Pinecone Internals","Hybrid & Semantic Search","Reranking & Agentic RAG"],
      project: "Corporate Oracle"
    },
    { 
      phase: "07", 
      title: "Agentic Systems", 
      icon: <Zap size={18} />, 
      color: "text-cyan-500", 
      desc: "AI Agents & Autonomous Reasoning.",
      details: "Beyond static RAG. Build autonomous systems that use tools, reason through multi-step loops, and operate via multi-agent orchestration.",
      objectives: ["Agentic RAG & Routing","Tool Use & Function Calling","Multi-Agent (CrewAI/AutoGen)","Reasoning Loops & Safety"],
      project: "The Neural Command Center"
    }
  ];

  return (
    <div className={`min-h-screen selection:bg-orange-500/30 font-sans relative overflow-x-hidden transition-colors duration-500 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-slate-900'}`}>
      {/* Background Cinematic Effects */}
      <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-600/10 blur-[150px] rounded-full" />
        <div className="absolute top-40 right-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#000_100%)] z-10" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 py-8 md:py-12">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-12 md:mb-20 animate-fade-in-up">
           <button 
             onClick={onBack}
             className={`group flex items-center gap-2 transition-colors py-2.5 px-5 rounded-full border ${isDarkMode ? 'text-neutral-400 hover:text-white bg-white/5 border-white/10' : 'text-slate-500 hover:text-slate-900 bg-white border-slate-200 shadow-sm'}`}
           >
             <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exit Portal</span>
           </button>

           <div className={`flex items-center gap-2 font-bold text-2xl tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
             <BrainCircuit className="text-orange-500" />
             <span>Neuro<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Code</span></span>
           </div>

           <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-black text-neutral-500 uppercase tracking-widest leading-none">
                <Globe size={14} className="text-orange-500" />
                <span>Secure SSL Encryption</span>
              </div>
           </div>
        </nav>

        {/* Hero Hook */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 animate-fade-in-up animation-delay-100">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <Sparkles size={14} />
              <span>Checkout Protocol V4.0</span>
           </div>
           <h1 className={`text-5xl md:text-7xl font-black uppercase tracking-tight mb-8 leading-[0.95] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
             Choose Your <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500">Neural Depth</span>
           </h1>
           <p className={`${isDarkMode ? 'text-neutral-400' : 'text-slate-500'} text-lg md:text-xl font-medium leading-relaxed opacity-80`}>
             Unlock the elite pathway from basic logic to advanced multi-agentic orchestration. Your journey begins with a single selection.
           </p>
        </div>

        {/* The 9-Phase Neural Roadmap */}
        <div className="mb-16 md:mb-32">
           <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
              <div className="text-left">
                 <h2 className="text-3xl font-black uppercase tracking-tight mb-2">The Neural Roadmap</h2>
                 <p className="text-neutral-500 text-xs font-black uppercase tracking-[0.2em]">Complete 9-Phase Course Architecture</p>
              </div>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {roadmap.map((item) => (
                <div 
                  key={item.phase} 
                  onClick={() => setExpandedPhase(expandedPhase === item.phase ? null : item.phase)}
                  className={`group p-8 rounded-[2rem] border transition-all duration-500 relative overflow-hidden cursor-pointer ${
                    isDarkMode 
                      ? (expandedPhase === item.phase ? 'border-orange-500 bg-neutral-900/60 ring-4 ring-orange-500/10' : 'bg-neutral-900/30 border-white/5 hover:border-orange-500/30 hover:bg-neutral-900/50')
                      : (expandedPhase === item.phase ? 'border-orange-500 bg-white ring-4 ring-orange-500/10 shadow-lg' : 'bg-white border-slate-200 shadow-sm hover:border-orange-500/30 hover:bg-white hover:shadow-md')
                  }`}
                >
                   <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform ${item.color}`}>
                      {React.cloneElement(item.icon as any, { size: 64 })}
                   </div>
                   <div className="relative z-10 flex flex-col h-full text-left">
                      <div className="flex items-center justify-between mb-6">
                         <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${expandedPhase === item.phase ? 'text-orange-500 opacity-100' : 'opacity-40 group-hover:opacity-100'} transition-all`}>Phase {item.phase}</span>
                         <div className={`p-2 rounded-lg bg-black/40 border border-white/5 ${item.color}`}>
                            {item.icon}
                         </div>
                      </div>
                      <h4 className={`text-lg font-black uppercase tracking-tight mb-3 transition-colors ${expandedPhase === item.phase ? 'text-orange-400' : (isDarkMode ? 'text-white group-hover:text-orange-400' : 'text-slate-900 group-hover:text-orange-500')}`}>{item.title}</h4>
                      <p className={`${isDarkMode ? 'text-neutral-500' : 'text-slate-500'} text-xs leading-relaxed font-medium mb-4`}>{item.desc}</p>
                      
                      {expandedPhase === item.phase && (
                        <div className="animate-fade-in-up mt-4 pt-6 border-t border-white/10 space-y-6">
                           <div>
                              <p className="text-neutral-300 text-xs leading-relaxed italic opacity-80 mb-4 pr-4">"{item.details}"</p>
                              <div className="space-y-2">
                                 {item.objectives.map((obj, i) => (
                                   <div key={i} className="flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{obj}</span>
                                   </div>
                                 ))}
                              </div>
                           </div>
                           <div className="p-4 rounded-2xl bg-black/60 border border-white/5">
                              <div className="text-[8px] font-black text-orange-500/70 uppercase tracking-widest mb-1">Capstone Deployment</div>
                              <div className="text-white text-[11px] font-black uppercase tracking-tight">{item.project}</div>
                           </div>
                        </div>
                      )}

                      {!expandedPhase && (
                        <div className="mt-auto pt-4 flex items-center gap-2 text-[8px] font-black text-neutral-600 uppercase tracking-widest group-hover:text-orange-500/50 transition-colors">
                           <Sparkles size={10} />
                           Explore Module
                        </div>
                      )}
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Cinematic Tier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {tiers.map((tier) => (
            <PricingCard 
              key={tier.id}
              tier={tier}
              isSelected={selectedTier === tier.id}
              onSelect={(id) => setSelectedTier(id)}
              onEnroll={(id) => onEnrollSuccess(id)}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>

        {/* Secure Checkout Trust Footer */}
        <div className="max-w-4xl mx-auto">
           <div className="bg-neutral-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-10 md:p-16 relative overflow-hidden group">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-600/5 blur-[80px] rounded-full group-hover:bg-orange-600/10 transition-colors" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                 <div className="text-left">
                    <h4 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-3">
                       <ShieldCheck className="text-orange-500" />
                       Riskless Synchronization
                    </h4>
                    <p className="text-neutral-500 text-sm font-medium leading-relaxed mb-8">
                       Your data is encrypted using military-grade AES-256 protocols. Each path is backed by our 4-day, 80% satisfaction guarantee protocol.
                    </p>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-6 bg-white/5 rounded border border-white/10 flex items-center justify-center">
                          <CreditCard size={14} className="text-neutral-600" />
                       </div>
                       <div className="w-10 h-6 bg-white/5 rounded border border-white/10 flex items-center justify-center">
                          <Lock size={14} className="text-neutral-600" />
                       </div>
                       <div className="w-10 h-6 bg-white/5 rounded border border-white/10 flex items-center justify-center">
                          <Star size={14} className="text-neutral-600 fill-current" />
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className={`text-center p-6 rounded-3xl border transition-colors ${isDarkMode ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                       <h5 className={`text-2xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>98%</h5>
                       <p className={`${isDarkMode ? 'text-neutral-600' : 'text-slate-500'} text-[9px] font-black uppercase tracking-widest`}>Success Rate</p>
                    </div>
                    <div className={`text-center p-6 rounded-3xl border transition-colors ${isDarkMode ? 'bg-black/40 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                       <h5 className={`text-2xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>12K+</h5>
                       <p className={`${isDarkMode ? 'text-neutral-600' : 'text-slate-500'} text-[9px] font-black uppercase tracking-widest`}>Active Architects</p>
                    </div>
                    <div className="col-span-2 flex items-center gap-4 px-6 py-4 rounded-3xl bg-orange-500/5 border border-orange-500/10">
                       <Zap className="text-orange-500" size={18} />
                       <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Join the exclusive 0.1% of AI Engineers today.</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Final Footer */}
        <footer className="mt-16 md:mt-32 pt-12 border-t border-white/5 flex flex-col items-center gap-4 text-center">
           <p className="text-neutral-700 text-[10px] font-black uppercase tracking-[0.3em]">
             Authorized by Neural Command Unit • NeuroCode Platform V4.2
           </p>
        </footer>
      </div>
    </div>
  );
};

export default EnrollPage;
