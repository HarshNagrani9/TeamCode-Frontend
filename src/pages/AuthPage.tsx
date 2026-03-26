import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Github as GithubIcon, 
  Chrome, 
  ChevronLeft,
  BrainCircuit,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface AuthPageProps {
  initialMode: 'login' | 'signup';
  onBack: () => void;
  onSuccess: () => void;
  isDarkMode: boolean;
}

const AuthPage: React.FC<AuthPageProps> = ({ initialMode, onBack, onSuccess, isDarkMode }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth success
    onSuccess();
  };

  return (
    <div className={`min-h-screen selection:bg-orange-500/30 font-sans relative overflow-hidden flex flex-col transition-colors duration-500 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-50 text-slate-900'}`}>
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full animate-pulse decoration-delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      {/* Header / Nav */}
      <nav className="relative z-10 p-6 flex items-center justify-between max-w-7xl mx-auto w-full">
        <button 
          onClick={onBack}
          className={`group flex items-center gap-2 transition-colors py-2 px-4 rounded-full border ${isDarkMode ? 'text-neutral-400 hover:text-white bg-white/5 border-white/10' : 'text-slate-500 hover:text-slate-900 bg-white border-slate-200 shadow-sm'}`}
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Hub</span>
        </button>

        <div className={`flex items-center gap-2 font-bold text-xl tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          <BrainCircuit className="text-orange-500" />
          <span>Neuro<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Code</span></span>
        </div>

        <div className="hidden md:block w-32" /> {/* Spacer */}
      </nav>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[480px]">
          {/* Card Wrapper */}
          <div className="relative group">
            <div className={`absolute -inset-1 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 rounded-[2.5rem] blur transition duration-1000 group-hover:duration-200 ${isDarkMode ? 'opacity-20 group-hover:opacity-30' : 'opacity-10 group-hover:opacity-20'}`}></div>
            
            <div className={`relative backdrop-blur-3xl rounded-[2.5rem] border p-8 md:p-12 shadow-2xl overflow-hidden ${isDarkMode ? 'bg-neutral-950/80 border-white/10' : 'bg-white border-slate-200'}`}>
              
              {/* Header */}
              <div className="text-center mb-10">
                <h1 className={`text-3xl font-black uppercase tracking-tight mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {mode === 'login' ? 'Welcome Back' : 'Join the Elite'}
                </h1>
                <p className={`${isDarkMode ? 'text-neutral-500' : 'text-slate-500'} text-sm font-medium`}>
                  {mode === 'login' 
                    ? 'Synchronize with the neural network.' 
                    : 'Initialize your AI Engineering journey today.'}
                </p>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button className={`flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border transition-all group/btn ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'}`}>
                  <Chrome size={20} className={`${isDarkMode ? 'text-neutral-400' : 'text-slate-400'} group-hover/btn:text-orange-500 transition-colors`} />
                  <span className={`text-xs font-black uppercase tracking-widest transition-colors ${isDarkMode ? 'text-neutral-400 group-hover/btn:text-white' : 'text-slate-500 group-hover/btn:text-slate-900'}`}>Google</span>
                </button>
                <button className={`flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border transition-all group/btn ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'}`}>
                  <GithubIcon size={20} className={`${isDarkMode ? 'text-neutral-400' : 'text-slate-400'} group-hover/btn:text-orange-500 transition-colors`} />
                  <span className={`text-xs font-black uppercase tracking-widest transition-colors ${isDarkMode ? 'text-neutral-400 group-hover/btn:text-white' : 'text-slate-500 group-hover/btn:text-slate-900'}`}>GitHub</span>
                </button>
              </div>

              <div className="relative mb-8 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}></div>
                </div>
                <span className={`relative z-10 px-4 text-[10px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'bg-neutral-950 text-neutral-600' : 'bg-white text-slate-400'}`}>Or use credentials</span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest pl-1">Email Protocol</label>
                  <div className="relative group/input">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within/input:text-orange-500 transition-colors" size={18} />
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. architect@neural.com"
                      className={`w-full border rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:border-orange-500/50 focus:bg-orange-500/5 transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-neutral-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-300'}`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Access Key</label>
                    {mode === 'login' && (
                      <button type="button" className="text-[10px] font-bold text-orange-500 hover:text-orange-400 transition-colors uppercase tracking-widest">Lost Access?</button>
                    )}
                  </div>
                  <div className="relative group/input">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within/input:text-orange-500 transition-colors" size={18} />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full border rounded-2xl py-4 pl-12 pr-12 text-sm font-medium focus:outline-none focus:border-orange-500/50 focus:bg-orange-500/5 transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-neutral-700' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-300'}`}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {mode === 'signup' && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 mb-6">
                    <ShieldCheck className="text-orange-500 shrink-0" size={18} />
                    <p className="text-[10px] leading-relaxed text-neutral-400 font-medium">By initializing, you agree to the Neural Protocols and Data Collection bypass guarantees.</p>
                  </div>
                )}

                <button className="group relative w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 to-orange-500 text-white font-black uppercase tracking-widest text-xs hover:from-red-500 hover:to-orange-400 transition-all shadow-xl shadow-red-600/20 active:scale-[0.98]">
                  <div className="flex items-center justify-center gap-2">
                    <span>{mode === 'login' ? 'Synchronize' : 'Initialize Access'}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </form>

              {/* Mode Toggle */}
              <div className="mt-10 text-center">
                <p className="text-neutral-500 text-xs font-medium">
                  {mode === 'login' ? "New to NeuroCode? " : "Already established? "}
                  <button 
                    onClick={() => navigate(mode === 'login' ? '/signup' : '/login')}
                    className="text-orange-500 font-black uppercase tracking-widest hover:text-orange-400 transition-colors ml-1"
                  >
                    {mode === 'login' ? 'Create Account' : 'Login Here'}
                  </button>
                </p>
              </div>
            </div>

            {/* Visual Decor */}
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-32 bg-orange-500/10 blur-xl pointer-events-none rounded-full" />
            <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-32 bg-red-500/10 blur-xl pointer-events-none rounded-full" />
          </div>

          {/* Bottom Trust Indicators */}
          <div className="mt-12 flex items-center justify-center gap-8 grayscale opacity-40">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">TLS-0-LAG</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-orange-500" />
              <span className="text-[10px] font-black uppercase tracking-widest">AES-NEC-256</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer / Copyright */}
      <footer className="p-6 text-center">
        <p className="text-neutral-700 text-[10px] font-bold uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} NeuroCode. Secure Authentication Protocol V4.2
        </p>
      </footer>
    </div>
  );
};

export default AuthPage;
