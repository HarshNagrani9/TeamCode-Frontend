import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';

interface CollapsibleCodeBlockProps {
  code: string;
  language: string;
  isDarkMode: boolean;
}

const CollapsibleCodeBlock: React.FC<CollapsibleCodeBlockProps> = ({ code, language, isDarkMode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`my-6 rounded-xl border overflow-hidden transition-all duration-300 ${
      isDarkMode ? 'border-zinc-800 bg-[#0D0D0D]' : 'border-slate-200 bg-white'
    }`}>
      {/* HEADER */}
      <div 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`px-4 py-2 border-b flex items-center justify-between cursor-pointer group ${
          isDarkMode ? 'border-zinc-800 bg-[#121212] hover:bg-[#1a1a1a]' : 'border-slate-200 bg-gray-50 hover:bg-gray-100'
        } transition-colors`}
      >
        <div className="flex items-center gap-3">
          <button 
            className={`p-1 rounded transition-colors ${isDarkMode ? 'text-zinc-500 group-hover:text-zinc-300' : 'text-slate-400 group-hover:text-slate-600'}`}
            // Accessible button just for show, the parent div handles the click
            tabIndex={-1}
          >
            {isCollapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{language || 'code'}</span>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation(); // prevent toggling collapse when copying
            handleCopy();
          }}
          className={`flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-tighter px-2 py-1 rounded transition-all ${
            copied 
              ? 'text-emerald-500 bg-emerald-500/10' 
              : `${isDarkMode ? 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200'}`
          }`}
        >
          {copied ? <Check size={10} /> : <Copy size={10} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* CODE AREA */}
      {!isCollapsed && (
        <div className="relative group">
          <SyntaxHighlighter
            language={language}
            style={isDarkMode ? vscDarkPlus : vs}
            codeTagProps={{
              style: {
                fontStyle: 'normal',
                fontFamily: 'JetBrains Mono, Fira Code, monospace',
              }
            }}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              fontSize: '0.9rem',
              lineHeight: '1.7',
              background: 'transparent',
            }}
          >
            {code.trim()}
          </SyntaxHighlighter>
        </div>
      )}
    </div>
  );
};

export default CollapsibleCodeBlock;
