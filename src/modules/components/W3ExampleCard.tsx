import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MarkdownContent from './MarkdownContent';
import { Code2, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import type { NotebookCellData, CodeCell } from '../utils/parseContentToCells';

interface W3ExampleCardProps {
  cell: NotebookCellData;
  isDarkMode: boolean;
  isPractice?: boolean;
  problem?: string;
}

const W3ExampleCard: React.FC<W3ExampleCardProps> = ({ cell, isDarkMode, isPractice, problem }) => {
  const navigate = useNavigate();
  const [isSolutionOpen, setIsSolutionOpen] = useState(!isPractice);

  if (cell.type === 'markdown') {
    return (
      <div className="px-8 py-5">
        <MarkdownContent content={cell.content} isDarkMode={isDarkMode} />
      </div>
    );
  }

  // Code Cell - Styled to match the orange/dark NeuroCode theme
  const codeCell = cell as CodeCell;
  const handleTryItYourself = () => {
    const initialCodeContent = isPractice ? "# Write your solution here\n" : codeCell.initialCode;
    const encoded = btoa(unescape(encodeURIComponent(initialCodeContent)));
    let url = `/editor?code=${encoded}`;
    if (problem) {
      const cleanProblem = problem.split('---')[0].trim();
      url += `&problem=${btoa(unescape(encodeURIComponent(cleanProblem)))}`;
    }
    if (isPractice) {
      url += `&solution=${btoa(unescape(encodeURIComponent(codeCell.initialCode)))}`;
    }
    navigate(url);
  };

  return (
    <div className={`mx-8 my-6 rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,107,0,0.08)] ${
      isDarkMode 
        ? 'border-[#FF6B00]/15 bg-gradient-to-b from-[#1a1208] to-[#111]' 
        : 'border-orange-200 bg-gradient-to-b from-orange-50 to-white'
    }`}>
      {/* Header */}
      <div 
        className={`px-5 py-3 flex items-center justify-between ${isPractice ? 'cursor-pointer hover:bg-[#FF6B00]/10' : ''} ${
          isDarkMode 
            ? 'bg-[#FF6B00]/8 border-b border-[#FF6B00]/10' 
            : 'bg-orange-100/60 border-b border-orange-200'
        }`}
        onClick={() => isPractice && setIsSolutionOpen(!isSolutionOpen)}
      >
        <div className="flex items-center gap-2">
          <Code2 size={14} className="text-[#FF6B00]" />
          <span className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-[#FF6B00]/80' : 'text-orange-600'}`}>
            {isPractice ? 'Solution Code' : 'Code Example'}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {isPractice && (
            <div className="mr-2 text-[#FF6B00]/70 flex items-center text-xs font-bold uppercase tracking-widest">
              <span className="mr-1">{isSolutionOpen ? 'Hide' : 'Show'}</span>
              {isSolutionOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </div>
          )}
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]/10" />
        </div>
      </div>
      
      {/* Code Block */}
      {(!isPractice || isSolutionOpen) && (
        <div className={`px-6 py-5 font-mono text-sm overflow-x-auto ${
          isDarkMode ? 'bg-[#0d0d0d]' : 'bg-white'
        }`}>
          <pre className={`leading-relaxed whitespace-pre ${isDarkMode ? 'text-zinc-300' : 'text-slate-800'}`}>
            {codeCell.initialCode}
          </pre>
        </div>
      )}

      {/* Footer with Try Button */}
      <div className={`px-5 py-4 flex items-center ${
        isDarkMode 
          ? 'bg-[#FF6B00]/5 border-t border-[#FF6B00]/10' 
          : 'bg-orange-50/80 border-t border-orange-100'
      }`}>
        <button
          onClick={handleTryItYourself}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 bg-[#FF6B00] text-white hover:bg-[#ff7b1a] shadow-[0_4px_15px_rgba(255,107,0,0.3)] hover:shadow-[0_6px_25px_rgba(255,107,0,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
        >
          <ExternalLink size={14} className="group-hover:rotate-12 transition-transform" />
          Try it Yourself
        </button>
      </div>
    </div>
  );
};

export default W3ExampleCard;
