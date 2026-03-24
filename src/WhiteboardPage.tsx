import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  ShieldAlert, 
  Lightbulb,
  Zap,
  Cpu,
  RefreshCw,
  Search,
  ArrowLeft
} from 'lucide-react';

interface WhiteboardPageProps {
  isDarkMode: boolean;
}

interface Challenge {
  id: number;
  title: string;
  difficulty: string;
  company: string;
  topic: string;
  description: string;
  constraints: string[];
  starterCode: string;
}

const WhiteboardPage: React.FC<WhiteboardPageProps> = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<{
    passed: number;
    failed: number;
    runtime: string;
    memory: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const challenges: Challenge[] = [
    // --- EASY ---
    {
      id: 1,
      title: "ReLU Activation Function",
      difficulty: "Easy",
      company: "Google",
      topic: "Neural Networks",
      description: "Implement the Rectified Linear Unit (ReLU) activation function for a NumPy array. ReLU is defined as f(x) = max(0, x).",
      constraints: ["No loops allowed", "Support multi-dimensional arrays"],
      starterCode: "def relu(x):\n    # x: NumPy array of any shape\n    pass"
    },
    {
      id: 2,
      title: "Mean Squared Error (MSE)",
      difficulty: "Easy",
      company: "Microsoft",
      topic: "Loss Functions",
      description: "Calculate the Mean Squared Error between predictions and ground truth labels using vectorized operations.",
      constraints: ["O(N) Time Complexity", "Vectorized NumPy only"],
      starterCode: "def calculate_mse(y_true, y_pred):\n    # y_true: (N,) array\n    # y_pred: (N,) array\n    pass"
    },
    {
      id: 3,
      title: "Logistic Regression Gradient",
      difficulty: "Easy",
      company: "Meta",
      topic: "Optimization",
      description: "Compute the gradient of the binary cross-entropy loss with respect to the weights for a single step of gradient descent.",
      constraints: ["Vectorized implementation", "Handle Sigmoid stability"],
      starterCode: "def get_gradient(X, y, weights):\n    # X: (N, D) feature matrix\n    # y: (N,) labels\n    pass"
    },

    // --- MEDIUM ---
    {
      id: 4,
      title: "Implement Batch Normalization",
      difficulty: "Medium",
      company: "Meta",
      topic: "Deep Learning Ops",
      description: "Implement the forward pass of a Batch Normalization layer. Your solution must handle the training/inference toggle and track running mean/variance.",
      constraints: ["O(N) Time Complexity", "Vectorized NumPy only", "Handle epsilon for stability"],
      starterCode: "def batch_norm_forward(x, gamma, beta, bn_param):\n    # x: Input data (N, D)\n    # gamma, beta: Scale/Shift params\n    pass"
    },
    {
      id: 5,
      title: "Dropout Forward Pass",
      difficulty: "Medium",
      company: "Tesla",
      topic: "Regularization",
      description: "Implement an inverted dropout layer. Ensure the output is scaled correctly so that the expected value of the neurons remains consistent.",
      constraints: ["Inverted Dropout logic", "Support training/test mode"],
      starterCode: "def dropout_forward(x, p_dropout, train_mode):\n    # p_dropout: Probability of dropping (0 to 1)\n    pass"
    },
    {
      id: 6,
      title: "K-Means Convergence Logic",
      difficulty: "Medium",
      company: "Amazon",
      topic: "Clustering",
      description: "Write the logic to update centroids and check for convergence in a standard K-Means algorithm.",
      constraints: ["Euclidean Distance Optimization", "Convergence threshold: 1e-4"],
      starterCode: "def update_centroids(data, assignments, k):\n    # data: (N, D) array\n    pass"
    },
    {
      id: 7,
      title: "Adam Optimizer Step",
      difficulty: "Medium",
      company: "NVIDIA",
      topic: "Optimization",
      description: "Implement a single update step for the Adam Optimizer, including bias correction for first and second moments.",
      constraints: ["Momentum + RMSProp logic", "Bias correction formulas"],
      starterCode: "def adam_step(w, dw, m, v, t, lr, beta1, beta2):\n    # w: weight, dw: gradient\n    pass"
    },

    // --- HARD ---
    {
      id: 8,
      title: "Flash Attention Approximation",
      difficulty: "Hard",
      company: "OpenAI",
      topic: "LLM Optimization",
      description: "Simulate the tiling mechanism of FlashAttention to compute scaled dot-product attention without materializing the full N x N matrix.",
      constraints: ["Memory Complexity: O(N)", "Online Softmax implementation"],
      starterCode: "def flash_attn_forward(Q, K, V, block_size):\n    # Tile-based attention logic\n    pass"
    },
    {
      id: 9,
      title: "Multi-Head Self-Attention",
      difficulty: "Hard",
      company: "Anthropic",
      topic: "Transformers",
      description: "Implement a multi-head self-attention layer from scratch, handling the splitting of heads and the final linear projection.",
      constraints: ["Tensor Reshaping precision", "Scaled dot-product logic"],
      starterCode: "def multi_head_attention(x, W_q, W_k, W_v, num_heads):\n    # x: (Batch, Seq, Dim)\n    pass"
    },
    {
      id: 10,
      title: "Distributed SGD (All-Reduce)",
      difficulty: "Hard",
      company: "Databricks",
      topic: "System Design",
      description: "Simulate an All-Reduce operation for synchronous data-parallel training across 4 virtual nodes.",
      constraints: ["Network bottleneck simulation", "Gradient averaging logic"],
      starterCode: "def all_reduce_gradients(node_gradients):\n    # list of 4 gradient tensors\n    pass"
    }
  ];

  const runTests = () => {
    setIsRunning(true);
    setTestResults(null);
    
    setTimeout(() => {
      setIsRunning(false);
      setTestResults({
        passed: 2,
        failed: 1,
        runtime: "142ms",
        memory: "12.4MB"
      });
    }, 1800);
  };

  const filteredChallenges = challenges.filter(c => {
    const matchesDifficulty = selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.topic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  return (
    <div className={`h-screen transition-colors duration-500 overflow-hidden flex flex-col ${isDarkMode ? 'bg-[#0A0A0A] text-zinc-100' : 'bg-gray-50 text-slate-900'}`}>
      
      {/* HEADER SECTION */}
      <nav className={`border-b px-8 py-4 flex flex-col lg:flex-row items-center justify-between gap-6 ${isDarkMode ? 'bg-[#0D0D0D] border-zinc-900' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-5">
          <button 
            onClick={() => navigate('/dashboard')}
            className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-zinc-800 text-zinc-500' : 'hover:bg-slate-100 text-slate-400'}`}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${isDarkMode ? 'bg-[#FF6B00]/10 border-[#FF6B00]/20' : 'bg-orange-50 border-orange-100'}`}>
              <Terminal className="text-[#FF6B00]" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tighter flex items-center gap-2">
                ML WHITEBOARD <span className={isDarkMode ? 'text-zinc-800' : 'text-slate-200'}>/</span> <span className="text-[#FF6B00] text-sm font-bold">BETA</span>
              </h1>
              <p className={`text-[10px] font-mono uppercase tracking-[0.2em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Validated Interview Scenarios</p>
            </div>
          </div>
        </div>

        {/* DIFFICULTY SWITCHER */}
        <div className={`flex items-center border p-1 rounded-xl ${isDarkMode ? 'bg-black border-zinc-800' : 'bg-gray-100 border-slate-200'}`}>
          {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-6 py-2 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all ${
                selectedDifficulty === diff 
                ? 'bg-[#FF6B00] text-black shadow-[0_0_20px_rgba(255,107,0,0.3)]' 
                : `${isDarkMode ? 'text-zinc-500 hover:text-zinc-200' : 'text-slate-500 hover:text-slate-900'}`
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </nav>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* LEFT SIDEBAR: CHALLENGE LIST */}
        <aside className={`lg:col-span-3 border-r flex flex-col ${isDarkMode ? 'bg-[#0D0D0D]/50 border-zinc-900' : 'bg-white border-slate-200'}`}>
          <div className={`p-4 border-b relative ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
             <Search className={`absolute left-7 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`} size={14} />
             <input 
              type="text" 
              placeholder="Filter scenarios..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full border rounded-lg py-2 pl-10 pr-4 text-xs focus:outline-none focus:border-[#FF6B00]/50 transition-all ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-gray-50 border-slate-200 text-slate-900'}`}
             />
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
            {filteredChallenges.map((challenge) => (
              <div 
                key={challenge.id}
                onClick={() => setActiveChallenge(challenge)}
                className={`p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden ${
                  activeChallenge?.id === challenge.id 
                  ? 'bg-[#FF6B00]/10 border-[#FF6B00]/30 shadow-[inset_0_0_15px_rgba(255,107,0,0.05)]' 
                  : `${isDarkMode ? 'bg-zinc-950 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/30' : 'bg-gray-50 border-slate-100 hover:border-slate-300 hover:bg-white'}`
                }`}
              >
                <div className="flex justify-between items-start mb-1.5 text-black">
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded tracking-tighter uppercase ${
                    challenge.difficulty === 'Easy' ? 'bg-emerald-500 text-white shadow-sm' :
                    challenge.difficulty === 'Medium' ? 'bg-amber-500 text-white shadow-sm' :
                    'bg-rose-500 text-white shadow-sm'
                  }`}>
                    {challenge.difficulty}
                  </span>
                  <span className={`text-[9px] font-mono font-bold ${isDarkMode ? 'text-zinc-700' : 'text-slate-400'}`}>{challenge.company}</span>
                </div>
                <h3 className={`font-bold text-xs truncate ${activeChallenge?.id === challenge.id ? 'text-[#FF6B00]' : `${isDarkMode ? 'text-zinc-300' : 'text-slate-800'}`}`}>
                  {challenge.title}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'}`} />
                  <span className={`text-[9px] uppercase font-bold tracking-tighter ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>{challenge.topic}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* CENTER: THE WORKSPACE */}
        <main className={`lg:col-span-6 flex flex-col relative ${isDarkMode ? 'bg-[#0A0A0A]' : 'bg-gray-100'}`}>
          {activeChallenge ? (
            <>
              <div className={`p-8 border-b ${isDarkMode ? 'bg-zinc-950/20 border-zinc-900' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold tracking-tight">{activeChallenge.title}</h2>
                  <button className={`p-2 transition-colors ${isDarkMode ? 'text-zinc-600 hover:text-zinc-300' : 'text-slate-400 hover:text-slate-900'}`}>
                    <RefreshCw size={16} />
                  </button>
                </div>
                <p className={`text-sm leading-relaxed max-w-2xl ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>{activeChallenge.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-6">
                  {activeChallenge.constraints.map((c, i) => (
                    <div key={i} className={`flex items-center gap-2 px-3 py-1 border rounded-lg text-[9px] font-bold uppercase tracking-widest ${isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-gray-50 border-slate-200 text-slate-500'}`}>
                      <ShieldAlert size={10} className="text-[#FF6B00]" />
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              <div className={`flex-1 flex flex-col overflow-hidden relative ${isDarkMode ? 'bg-black' : 'bg-white shadow-inner'}`}>
                {/* Editor Line Numbers Simulation */}
                <div className={`absolute left-0 top-0 bottom-0 w-12 border-r flex flex-col items-center py-6 gap-2 select-none ${isDarkMode ? 'bg-[#0D0D0D] border-zinc-900 text-zinc-700' : 'bg-gray-50 border-slate-100 text-slate-300'}`}>
                  {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => <span key={n} className="text-[10px] font-mono">{n}</span>)}
                </div>
                
                <div className="pl-16 py-6 font-mono text-sm h-full">
                  <p className={isDarkMode ? 'text-zinc-600 mb-2' : 'text-slate-400 mb-2'}>import numpy as np</p>
                  <p className={isDarkMode ? 'text-zinc-300 mb-4' : 'text-slate-700 mb-4'}>{activeChallenge.starterCode.split('\n')[0]}</p>
                  <div className="flex gap-2">
                    <span className="text-[#FF6B00] animate-pulse">|</span>
                    <span className={isDarkMode ? 'text-zinc-700 italic' : 'text-slate-300 italic'}># Write optimized logic here...</span>
                  </div>
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-6 right-8 flex items-center gap-4">
                  <button className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isDarkMode ? 'text-zinc-500 hover:text-zinc-200' : 'text-slate-400 hover:text-slate-900'}`}>Reset Buffer</button>
                  <button 
                    onClick={runTests}
                    disabled={isRunning}
                    className={`flex items-center gap-3 px-8 py-3 rounded-xl font-bold text-xs transition-all ${
                      isRunning 
                      ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' 
                      : 'bg-[#FF6B00] text-black hover:shadow-[0_0_30px_rgba(255,107,0,0.5)] active:scale-95'
                    }`}
                  >
                    {isRunning ? <Zap size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
                    {isRunning ? "VALIDATING..." : "SUBMIT KERNEL"}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <Cpu size={80} className={`mb-4 ${isDarkMode ? 'opacity-5 text-white' : 'opacity-10 text-slate-900'}`} strokeWidth={1} />
              <p className={`text-xs font-mono uppercase tracking-[0.3em] ${isDarkMode ? 'opacity-40' : 'opacity-60'}`}>Select intelligence scenario to begin</p>
            </div>
          )}
        </main>

        {/* RIGHT SIDEBAR: FEEDBACK */}
        <aside className={`lg:col-span-3 border-l flex flex-col ${isDarkMode ? 'bg-[#0D0D0D]/50 border-zinc-900' : 'bg-white border-slate-200'}`}>
          <div className={`p-6 border-b ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
            <h3 className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
              <Zap size={14} className="text-[#FF6B00]" />
              Inference Result
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col">
            {testResults ? (
              <div className="space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold italic">{testResults.passed}/3</p>
                    <p className={`text-[9px] uppercase font-bold tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Tests Passed</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-mono ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>{testResults.runtime}</p>
                    <p className={`text-[9px] uppercase font-bold tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Execution</p>
                  </div>
                </div>

                <div className="space-y-2">
                   <div className={`flex items-center justify-between p-3 border rounded-xl ${isDarkMode ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-emerald-50 border-emerald-100'}`}>
                      <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-bold uppercase">
                         <CheckCircle2 size={12} /> Unit_01: Shape
                      </div>
                      <span className={`text-[10px] font-mono ${isDarkMode ? 'text-zinc-700' : 'text-slate-400'}`}>0.02ms</span>
                   </div>
                   <div className={`flex items-center justify-between p-3 border rounded-xl ${isDarkMode ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-emerald-50 border-emerald-100'}`}>
                      <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-bold uppercase">
                         <CheckCircle2 size={12} /> Unit_02: Gradient
                      </div>
                      <span className={`text-[10px] font-mono ${isDarkMode ? 'text-zinc-700' : 'text-slate-400'}`}>0.44ms</span>
                   </div>
                   <div className={`flex items-center justify-between p-3 border rounded-xl ${isDarkMode ? 'bg-rose-500/5 border-rose-500/10' : 'bg-rose-50 border-rose-100'}`}>
                      <div className="flex items-center gap-2 text-rose-500 text-[10px] font-bold uppercase">
                         <XCircle size={12} /> Unit_03: Numerical
                      </div>
                      <span className={`text-[10px] font-mono ${isDarkMode ? 'text-zinc-800' : 'text-slate-400'}`}>FAIL</span>
                   </div>
                </div>

                <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-zinc-950 border-zinc-900' : 'bg-gray-50 border-slate-100'}`}>
                  <div className="flex items-center gap-2 mb-3 text-[#FF6B00]">
                    <Lightbulb size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Interviewer Critique</span>
                  </div>
                  <p className={`text-[11px] leading-relaxed italic ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                    "Solid vectorized implementation. However, you missed the epsilon stability check in the denominator. 
                    Adding a small &epsilon;=1e-5 would have passed the numerical stability test case."
                  </p>
                </div>
              </div>
            ) : isRunning ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-6">
                 <div className="w-16 h-16 rounded-full border-2 border-t-[#FF6B00] animate-spin border-zinc-800" />
                 <p className="text-[10px] font-mono animate-pulse tracking-widest uppercase text-[#FF6B00]">Validating Logic...</p>
              </div>
            ) : (
              <div className={`flex-1 flex flex-col items-center justify-center text-center space-y-4 ${isDarkMode ? 'opacity-10 text-white' : 'opacity-20 text-slate-900'}`}>
                 <Trophy size={64} />
                 <p className="text-[10px] uppercase font-bold tracking-[0.4em]">Ready for Submission</p>
              </div>
            )}

            <div className={`mt-auto pt-6 border-t ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
              <div className="flex justify-between items-center mb-3">
                 <span className={`text-[9px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>Mastery Gain</span>
                 <span className="text-[9px] font-bold text-[#FF6B00]">+450 XP</span>
              </div>
              <div className={`w-full h-1 rounded-full overflow-hidden ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-100'}`}>
                <div className="w-2/3 h-full bg-[#FF6B00] shadow-[0_0_10px_#FF6B00]" />
              </div>
            </div>
          </div>
        </aside>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default WhiteboardPage;
