import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  Code2, 
  Link as LinkIcon, 
  FileText, 
  Plus, 
  Search, 
  TrendingUp, 
  MoreHorizontal, 
  Bookmark, 
  Terminal, 
  Zap, 
  Send, 
  User, 
  XCircle, 
  ArrowLeft, 
  Globe, 
  Copy, 
  Check,
  ChevronRight
} from 'lucide-react';

interface Comment {
  id: number;
  user: string;
  text: string;
  timestamp: string;
}

interface Post {
  id: number;
  user: string;
  avatar: string;
  tier: string;
  timestamp: string;
  type: string;
  tags: string[];
  content: string;
  code?: string | null;
  link?: {
    url: string;
    title: string;
    description: string;
    domain: string;
  } | null;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
}

interface CommunityPageProps {
  isDarkMode: boolean;
}

// --- LOGIC: Code Highlighter ---
const SyntaxHighlighter = ({ code, isDarkMode }: { code: string, isDarkMode: boolean }) => {
  const keywords = ['def', 'return', 'import', 'from', 'as', 'np', 'torch', 'class', 'self', 'in', 'if', 'else', 'print'];
  const parts = code.split(/(\s+|[().,\[\]{}])/);
  
  return (
    <code>
      {parts.map((part, i) => {
        const trimmed = part.trim();
        if (keywords.includes(trimmed)) {
          return <span key={i} className="text-[#FF6B00] font-bold">{part}</span>;
        }
        if (trimmed.startsWith('#') || (parts[i-1] && parts[i-1].includes('#'))) {
           return <span key={i} className="text-zinc-600 italic">{part}</span>;
        }
        if (/^['"].*['"]$/.test(trimmed)) {
          return <span key={i} className="text-emerald-500">{part}</span>;
        }
        if (!isNaN(Number(trimmed)) && trimmed !== '') {
          return <span key={i} className="text-blue-400">{part}</span>;
        }
        if (['(', ')', '[', ']', '{', '}', '.', ','].includes(trimmed)) {
          return <span key={i} className="text-zinc-500">{part}</span>;
        }
        return <span key={i} className={`${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>{part}</span>;
      })}
    </code>
  );
};

const PostCard = ({ 
  post, 
  isDetail = false, 
  isDarkMode, 
  onExpand, 
  onLike, 
  onCopy, 
  copiedId, 
  commentValue, 
  onCommentChange, 
  onCommentSubmit 
}: { 
  post: Post, 
  isDetail?: boolean, 
  isDarkMode: boolean,
  onExpand: (id: number) => void,
  onLike: (e: React.MouseEvent, id: number) => void,
  onCopy: (code: string, id: number) => void,
  copiedId: number | null,
  commentValue: string,
  onCommentChange: (val: string) => void,
  onCommentSubmit: (id: number) => void
}) => {
  const truncate = (str: string, n: number) => {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <div 
      onClick={() => !isDetail && onExpand(post.id)}
      className={`${isDarkMode ? 'bg-[#0D0D0D] border-zinc-900 shadow-lg' : 'bg-white border-slate-200 shadow-md'} border rounded-2xl overflow-hidden transition-all mb-6 ${!isDetail ? 'hover:border-[#FF6B00]/40 cursor-pointer' : ''}`}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full border overflow-hidden ${isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-slate-100 border-slate-200'}`}>
              <img src={post.avatar} alt="avatar" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${isDarkMode ? 'text-zinc-100' : 'text-slate-900'}`}>{post.user}</span>
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded tracking-tighter ${
                  post.tier === 'MAX' ? 'bg-[#FF6B00]/10 text-[#FF6B00]' : (isDarkMode ? 'bg-zinc-800 text-zinc-500' : 'bg-slate-100 text-slate-500')
                }`}>
                  {post.tier}
                </span>
              </div>
              <p className={`text-[10px] font-mono uppercase ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>{post.timestamp}</p>
            </div>
          </div>
          <button className={`${isDarkMode ? 'text-zinc-700 hover:text-zinc-400' : 'text-slate-300 hover:text-slate-600'}`}><MoreHorizontal size={18} /></button>
        </div>

        {/* Content */}
        <p className={`text-sm mb-4 leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'} ${!isDetail ? 'line-clamp-3' : ''}`}>
          {isDetail ? post.content : truncate(post.content, 150)}
        </p>

        {/* Specialized Media - Code Block */}
        {post.code && (
          <div className={`rounded-xl border overflow-hidden mb-4 shadow-inner ${isDarkMode ? 'bg-black border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className={`h-8 border-b flex items-center px-4 justify-between ${isDarkMode ? 'bg-[#141414] border-zinc-900' : 'bg-slate-100 border-slate-200'}`}>
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-[#FF6B00]" />
                <span className={`text-[9px] font-mono uppercase tracking-tighter ${isDarkMode ? 'text-zinc-600' : 'text-slate-500'}`}>python_kernel.py</span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); onCopy(post.code!, post.id); }}
                className={`flex items-center gap-1.5 text-[9px] font-bold uppercase transition-colors p-1 px-2 rounded-md ${copiedId === post.id ? 'text-emerald-500 bg-emerald-500/10' : (isDarkMode ? 'text-zinc-500 hover:text-[#FF6B00] hover:bg-zinc-800' : 'text-slate-400 hover:text-[#FF6B00] hover:bg-slate-200')}`}
              >
                {copiedId === post.id ? <><Check size={10} /> COPIED</> : <><Copy size={10} /> COPY</>}
              </button>
            </div>
            <pre className={`p-5 font-mono text-xs overflow-x-auto selection:bg-[#FF6B00]/20 ${isDarkMode ? 'text-zinc-400' : 'text-slate-700'}`}>
              <SyntaxHighlighter code={post.code} isDarkMode={isDarkMode} />
            </pre>
          </div>
        )}

        {/* Specialized Media - Link Block */}
        {post.link && (
          <div className={`rounded-xl border overflow-hidden mb-4 flex group cursor-pointer transition-all ${isDarkMode ? 'bg-black border-zinc-800 hover:border-[#FF6B00]/30' : 'bg-slate-50 border-slate-200 hover:border-[#FF6B00]/30'}`}>
            <div className={`w-24 flex items-center justify-center border-r shrink-0 ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-100 border-slate-200'}`}>
               <LinkIcon size={24} className={`transition-colors ${isDarkMode ? 'text-zinc-700 group-hover:text-[#FF6B00]' : 'text-slate-400 group-hover:text-[#FF6B00]'}`} />
            </div>
            <div className="flex-1 p-4 overflow-hidden">
               <p className={`text-[9px] font-mono mb-1 uppercase tracking-widest truncate ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>{post.link.domain}</p>
               <h4 className={`text-sm font-bold mb-1 transition-colors line-clamp-1 ${isDarkMode ? 'text-zinc-100 group-hover:text-[#FF6B00]' : 'text-slate-900 group-hover:text-[#FF6B00]'}`}>{post.link.title}</h4>
               <p className={`text-xs line-clamp-2 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>{post.link.description}</p>
            </div>
          </div>
        )}

        {/* Interaction Footer */}
        <div className={`flex items-center gap-6 pt-4 border-t ${isDarkMode ? 'border-zinc-900/50' : 'border-slate-100'}`}>
          <button 
            onClick={(e) => onLike(e, post.id)}
            className={`flex items-center gap-2 text-xs font-bold transition-all transform active:scale-125 ${post.isLiked ? 'text-[#FF6B00]' : (isDarkMode ? 'text-zinc-600 hover:text-zinc-300' : 'text-slate-400 hover:text-slate-600')}`}
          >
            <Heart size={16} fill={post.isLiked ? "currentColor" : "none"} />
            {post.likes}
          </button>
          <button className={`flex items-center gap-2 text-xs font-bold transition-colors ${isDarkMode ? 'text-zinc-600 hover:text-zinc-300' : 'text-slate-400 hover:text-slate-600'}`}>
            <MessageSquare size={16} />
            {post.comments.length}
          </button>
          <button className={`flex items-center gap-2 text-xs font-bold transition-colors ml-auto ${isDarkMode ? 'text-zinc-600 hover:text-zinc-300' : 'text-slate-400 hover:text-slate-600'}`}>
            <Bookmark size={16} />
          </button>
          <button className={`flex items-center gap-2 text-xs font-bold transition-colors ${isDarkMode ? 'text-zinc-600 hover:text-zinc-300' : 'text-slate-400 hover:text-slate-600'}`}>
            <Share2 size={16} />
          </button>
        </div>

        {/* Detailed Comments */}
        {isDetail && (
          <div className={`mt-8 pt-8 border-t ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
             <h3 className={`text-xs font-bold uppercase tracking-widest mb-6 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Neural Discussion ({post.comments.length})</h3>
             <div className="space-y-6 mb-8">
               {post.comments.map(comment => (
                 <div key={comment.id} className="flex gap-4">
                    <div className={`w-8 h-8 rounded-full border overflow-hidden shrink-0 ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user}`} alt="av" />
                    </div>
                    <div className={`p-4 rounded-2xl flex-1 border ${isDarkMode ? 'bg-zinc-900/30 border-zinc-900' : 'bg-slate-50 border-slate-100'}`}>
                       <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-bold ${isDarkMode ? 'text-zinc-200' : 'text-slate-700'}`}>{comment.user}</span>
                          <span className={`text-[10px] font-mono ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}> • {comment.timestamp}</span>
                       </div>
                       <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>{comment.text}</p>
                    </div>
                 </div>
               ))}
             </div>

             <div className="flex gap-4 items-center">
                <div className={`w-8 h-8 rounded-full border overflow-hidden shrink-0 ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="av" />
                </div>
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    value={commentValue}
                    onChange={(e) => onCommentChange(e.target.value)}
                    placeholder="Sync your thoughts..."
                    className={`w-full border rounded-xl px-4 py-3 text-xs focus:outline-none transition-all ${isDarkMode ? 'bg-black border-zinc-800 text-zinc-300 focus:border-[#FF6B00]/50' : 'bg-white border-slate-200 text-slate-900 focus:border-[#FF6B00]/50'}`}
                    onKeyDown={(e) => e.key === 'Enter' && onCommentSubmit(post.id)}
                  />
                  <button 
                    onClick={() => onCommentSubmit(post.id)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#FF6B00] hover:bg-[#FF6B00]/10 rounded-lg transition-colors"
                  >
                    <Send size={16} />
                  </button>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CommunityPage: React.FC<CommunityPageProps> = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
  const [copiedCodeId, setCopiedCodeId] = useState<number | null>(null);
  
  // New Post State
  const [newPostText, setNewPostText] = useState('');
  const [newPostCode, setNewPostCode] = useState('');
  const [newPostLink, setNewPostLink] = useState('');
  
  // Toggles for attachments
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  
  // Comment Input State
  const [commentInput, setCommentInput] = useState('');

  // Constants
  const tabs = ['All', 'Code', 'Links', 'Docs', 'General'];
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: "V. Miller",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Victoria",
      tier: "MAX",
      timestamp: "2h ago",
      type: "code",
      tags: ["PyTorch", "Optimization"],
      content: "Just optimized the backprop loop for the custom LSTM module in Module 5. Reduced training time by 15% using vectorized operations instead of standard loops. It basically handles the gradient calculation across the entire hidden state matrix in one go. Check out the implementation below!",
      code: "def optimized_backprop(dh, cache):\n    # Vectorized gradient calculation\n    # dh: (N, H), cache: stored hidden states\n    dW = np.dot(cache.T, dh)\n    db = np.sum(dh, axis=0)\n    return dW, db",
      likes: 124,
      isLiked: true,
      comments: [
        { id: 101, user: "S. Chen", text: "Impressive! Are you seeing any numerical stability issues with large batches?", timestamp: "1h ago" }
      ]
    },
    {
      id: 2,
      user: "K. Tanaka",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin",
      tier: "PRO",
      timestamp: "5h ago",
      type: "link",
      tags: ["RAG", "Research"],
      content: "Deep Dive into the latest 'Attention is All You Need' variation. This paper discusses a new sparse attention mechanism that looks promising for our RAG implementations. It's essentially a way to scale up to millions of tokens without the quadratic cost of standard attention.",
      link: {
        url: "https://arxiv.org/abs/sparse-attn-v2",
        title: "Sparse Attention v2: Scaling Transformers",
        description: "A novel approach to attention mechanisms that reduces memory complexity from O(N^2) to O(N log N).",
        domain: "arxiv.org"
      },
      likes: 89,
      isLiked: false,
      comments: []
    }
  ]);

  // --- LOGIC: Interaction Handlers ---

  const handleCopyCode = (code: string, id: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleLike = (e: React.MouseEvent, postId: number) => {
    e.stopPropagation();
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleAddPost = () => {
    if (!newPostText.trim()) return;
    
    let postType = "general";
    if (newPostCode.trim() && newPostLink.trim()) postType = "hybrid";
    else if (newPostCode.trim()) postType = "code";
    else if (newPostLink.trim()) postType = "link";

    const newPost: Post = {
      id: Date.now(),
      user: "S. Chen", 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      tier: "MAX",
      timestamp: "Just now",
      type: postType,
      tags: ["General"],
      content: newPostText,
      likes: 0,
      isLiked: false,
      comments: [],
      code: showCodeInput && newPostCode.trim() ? newPostCode : null,
      link: showLinkInput && newPostLink.trim() ? {
        url: newPostLink,
        title: "Linked Resource",
        description: "User shared external link from the neural sync.",
        domain: new URL(newPostLink.startsWith('http') ? newPostLink : `https://${newPostLink}`).hostname || "external-link"
      } : null
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
    setNewPostCode('');
    setNewPostLink('');
    setShowCodeInput(false);
    setShowLinkInput(false);
    setIsPostModalOpen(false);
  };

  const handleAddComment = (postId: number) => {
    if (!commentInput.trim()) return;
    const newComment: Comment = {
      id: Date.now(),
      user: "S. Chen",
      text: commentInput,
      timestamp: "Just now"
    };
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    }));
    setCommentInput('');
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#0A0A0A] text-zinc-100' : 'bg-gray-50 text-slate-900'}`}>
      
      {/* HEADER */}
      <nav className={`h-16 border-b px-8 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md ${isDarkMode ? 'bg-[#0D0D0D]/80 border-zinc-900' : 'bg-white/80 border-slate-200'}`}>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                if (expandedPostId) setExpandedPostId(null);
                else navigate('/dashboard');
              }}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-zinc-800 text-zinc-500' : 'hover:bg-slate-100 text-slate-400'}`}
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FF6B00] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,107,0,0.4)]">
                <Zap size={18} className="text-black" />
              </div>
              <span className="text-xl font-bold tracking-tighter uppercase">Community Portal</span>
            </div>
          </div>

          <div className="relative hidden md:block">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`} size={14} />
            <input 
              type="text" 
              placeholder="Search neural discussions..." 
              className={`border rounded-full py-2 pl-10 pr-6 text-xs w-64 focus:outline-none transition-all ${isDarkMode ? 'bg-black border-zinc-800 focus:border-[#FF6B00]/50 text-white' : 'bg-slate-50 border-slate-200 focus:border-[#FF6B00]/50 text-slate-900'}`}
            />
          </div>
        </div>

        <button 
          onClick={() => setIsPostModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2 bg-[#FF6B00] text-black font-bold rounded-full text-xs hover:shadow-[0_0_20px_rgba(255,107,0,0.5)] active:scale-95 transition-all"
        >
          <Plus size={16} /> NEW POST
        </button>
      </nav>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 max-w-7xl mx-auto w-full overflow-hidden">
        
        {/* LEFT SIDEBAR */}
        <aside className={`lg:col-span-3 border-r p-6 hidden lg:flex flex-col gap-8 overflow-y-auto ${isDarkMode ? 'border-zinc-900' : 'border-slate-200'}`}>
          <div className="space-y-1">
             <h3 className={`text-[10px] font-mono uppercase tracking-widest px-3 mb-4 ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>Neural Categories</h3>
             {tabs.map(tab => (
               <button 
                key={tab}
                onClick={() => { setActiveTab(tab); setExpandedPostId(null); }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-xs font-bold ${
                  activeTab === tab ? 'bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/20' : `${isDarkMode ? 'text-zinc-500 hover:text-zinc-200' : 'text-slate-500 hover:text-slate-900'}`
                }`}
               >
                 {tab === 'All' && <TrendingUp size={16} />}
                 {tab === 'Code' && <Code2 size={16} />}
                 {tab === 'Links' && <LinkIcon size={16} />}
                 {tab === 'Docs' && <FileText size={16} />}
                 {tab === 'General' && <MessageSquare size={16} />}
                 {tab}
               </button>
             ))}
          </div>
        </aside>

        {/* CENTER FEED */}
        <main className={`lg:col-span-6 flex flex-col h-full overflow-y-auto custom-scrollbar p-6 ${isDarkMode ? 'bg-[#0A0A0A]' : 'bg-gray-100'}`}>
          <div className="max-w-2xl mx-auto w-full">
            {expandedPostId ? (
              <div className="animate-in slide-in-from-bottom-4 duration-300">
                <button onClick={() => setExpandedPostId(null)} className={`flex items-center gap-2 mb-6 transition-colors font-bold text-xs ${isDarkMode ? 'text-zinc-500 hover:text-[#FF6B00]' : 'text-slate-400 hover:text-[#FF6B00]'}`}>
                  <ArrowLeft size={16} /> BACK TO FEED
                </button>
                <PostCard 
                  post={posts.find(p => p.id === expandedPostId)!} 
                  isDetail={true} 
                  isDarkMode={isDarkMode}
                  onExpand={setExpandedPostId}
                  onLike={handleLike}
                  onCopy={handleCopyCode}
                  copiedId={copiedCodeId}
                  commentValue={commentInput}
                  onCommentChange={setCommentInput}
                  onCommentSubmit={handleAddComment}
                />
              </div>
            ) : (
              <>
                <div 
                  className={`border rounded-2xl p-4 mb-8 flex items-center gap-4 group cursor-pointer transition-all shadow-xl ${isDarkMode ? 'bg-[#0D0D0D] border-zinc-900 hover:border-[#FF6B00]/30' : 'bg-white border-slate-200 hover:border-[#FF6B00]/30'}`}
                  onClick={() => setIsPostModalOpen(true)}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-600' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                    <User size={20} />
                  </div>
                  <div className={`flex-1 border rounded-full px-6 py-2.5 text-xs font-medium ${isDarkMode ? 'bg-black border-zinc-800 text-zinc-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                    Initialize a neural sync...
                  </div>
                </div>
                {posts
                  .filter(p => {
                    if (activeTab === 'All') return true;
                    if (activeTab === 'Code') return p.code !== null;
                    if (activeTab === 'Links') return p.link !== null;
                    return p.type.toLowerCase().includes(activeTab.toLowerCase().slice(0, 3));
                  })
                  .map(post => (
                    <PostCard 
                      key={post.id} 
                      post={post} 
                      isDarkMode={isDarkMode}
                      onExpand={setExpandedPostId}
                      onLike={handleLike}
                      onCopy={handleCopyCode}
                      copiedId={copiedCodeId}
                      commentValue={commentInput}
                      onCommentChange={setCommentInput}
                      onCommentSubmit={handleAddComment}
                    />
                  ))}
              </>
            )}
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className={`lg:col-span-3 p-6 hidden xl:flex flex-col gap-8 overflow-y-auto border-l ${isDarkMode ? 'border-zinc-900' : 'border-slate-200'}`}>
           <div className={`border rounded-3xl p-6 ${isDarkMode ? 'bg-zinc-900/20 border-zinc-900' : 'bg-white border-slate-200 shadow-sm'}`}>
              <h3 className={`text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                <TrendingUp size={14} className="text-[#FF6B00]" />
                Top Contributors
              </h3>
              <div className="space-y-5">
                {[{ name: "S. Chen", points: "4.2k", tier: "MAX" }, { name: "M. Rossi", points: "3.8k", tier: "MAX" }, { name: "J. Doe", points: "2.1k", tier: "PRO" }]
                .map((user, idx) => (
                  <div key={idx} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full border overflow-hidden ${isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-slate-100 border-slate-200'}`}>
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="av" />
                      </div>
                      <div>
                        <p className={`text-xs font-bold transition-colors ${isDarkMode ? 'text-zinc-200 group-hover:text-[#FF6B00]' : 'text-slate-800 group-hover:text-[#FF6B00]'}`}>{user.name}</p>
                        <p className={`text-[10px] uppercase font-mono ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>{user.tier}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#FF6B00]">{user.points} XP</span>
                  </div>
                ))}
              </div>
           </div>
        </aside>
      </div>

      {/* NEW POST MODAL */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-6">
           <div className={`w-full max-w-xl border rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 ${isDarkMode ? 'bg-[#0D0D0D] border-zinc-800' : 'bg-white border-slate-200'}`}>
              <div className={`p-6 border-b flex items-center justify-between ${isDarkMode ? 'bg-[#111] border-zinc-900' : 'bg-slate-50 border-slate-100'}`}>
                <h2 className={`text-lg font-bold flex items-center gap-3 tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  <Plus size={20} className="text-[#FF6B00]" />
                  Neural Initialization
                </h2>
                <button onClick={() => { setIsPostModalOpen(false); setShowCodeInput(false); setShowLinkInput(false); }} className={`transition-colors ${isDarkMode ? 'text-zinc-600 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
                  <XCircle size={24} />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <textarea 
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="What are you architecting today?" 
                  className={`w-full bg-transparent text-lg resize-none h-24 focus:outline-none ${isDarkMode ? 'text-zinc-100 placeholder:text-zinc-800' : 'text-slate-900 placeholder:text-slate-300'}`}
                />

                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowCodeInput(!showCodeInput)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
                      showCodeInput 
                      ? 'bg-[#FF6B00]/20 border-[#FF6B00] text-[#FF6B00]' 
                      : `${isDarkMode ? 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:border-zinc-700' : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-400'}`
                    }`}
                  >
                    <Code2 size={14} /> {showCodeInput ? 'Detach Code' : 'Attach Code'}
                  </button>
                  <button 
                    onClick={() => setShowLinkInput(!showLinkInput)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
                      showLinkInput 
                      ? 'bg-[#FF6B00]/20 border-[#FF6B00] text-[#FF6B00]' 
                      : `${isDarkMode ? 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:border-zinc-700' : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-400'}`
                    }`}
                  >
                    <LinkIcon size={14} /> {showLinkInput ? 'Detach Link' : 'Attach Link'}
                  </button>
                </div>

                <div className="space-y-4">
                  {showCodeInput && (
                    <div className="animate-in slide-in-from-top-2 duration-300">
                      <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-black border-zinc-800' : 'bg-slate-100 border-slate-200 shadow-inner'}`}>
                        <div className={`px-4 py-2 border-b flex items-center gap-2 ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
                          <Terminal size={12} className="text-[#FF6B00]" />
                          <span className={`text-[10px] font-mono uppercase tracking-tighter ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Python Block</span>
                        </div>
                        <textarea 
                          value={newPostCode}
                          onChange={(e) => setNewPostCode(e.target.value)}
                          placeholder="def initialize_brain():\n    print('Mastery unlocked')\n    ..."
                          spellCheck={false}
                          className={`w-full bg-transparent p-4 font-mono text-xs h-40 resize-none focus:outline-none ${isDarkMode ? 'text-emerald-500' : 'text-emerald-600'}`}
                        />
                      </div>
                    </div>
                  )}

                  {showLinkInput && (
                    <div className="animate-in slide-in-from-top-2 duration-300">
                      <div className={`border rounded-xl p-4 flex items-center gap-3 group focus-within:border-[#FF6B00]/50 transition-all ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-50 border-slate-200 shadow-inner focus-within:bg-white'}`}>
                        <Globe size={18} className={`transition-colors ${isDarkMode ? 'text-zinc-600 group-focus-within:text-[#FF6B00]' : 'text-slate-400 group-focus-within:text-[#FF6B00]'}`} />
                        <input 
                          type="url"
                          value={newPostLink}
                          onChange={(e) => setNewPostLink(e.target.value)}
                          placeholder="https://arxiv.org/abs/..."
                          className={`bg-transparent flex-1 text-sm focus:outline-none ${isDarkMode ? 'text-zinc-300' : 'text-slate-900'}`}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className={`flex items-center justify-between pt-6 border-t ${isDarkMode ? 'border-zinc-900' : 'border-slate-100'}`}>
                  <div className="flex gap-4 opacity-50">
                    {showCodeInput && <Zap size={16} className="text-[#FF6B00] animate-pulse" />}
                    {showLinkInput && <LinkIcon size={16} className="text-[#FF6B00]" />}
                  </div>

                  <button 
                    onClick={handleAddPost}
                    disabled={!newPostText.trim() || (showCodeInput && !newPostCode.trim()) || (showLinkInput && !newPostLink.trim())}
                    className="flex items-center gap-3 px-10 py-3 bg-[#FF6B00] text-black font-bold rounded-2xl text-sm hover:shadow-[0_0_40px_rgba(255,107,0,0.6)] active:scale-95 transition-all disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed"
                  >
                    SYNC PULSE <Send size={16} />
                  </button>
                </div>
              </div>
           </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default CommunityPage;
