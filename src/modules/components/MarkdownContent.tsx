import React from 'react';
import ReactMarkdown from 'react-markdown';
import CollapsibleCodeBlock from './CollapsibleCodeBlock';

interface MarkdownContentProps {
  content: string;
  isDarkMode: boolean;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content, isDarkMode }) => {
  return (
    <div className={`prose prose-sm max-w-none leading-relaxed transition-colors duration-300 ${
      isDarkMode ? 'prose-invert text-zinc-400' : 'text-slate-600'
    }`}>
      <ReactMarkdown
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            
            if (isInline) {
              return (
                <code className={`px-1.5 py-0.5 rounded font-mono text-xs ${
                  isDarkMode ? 'bg-zinc-800 text-amber-400/90' : 'bg-slate-100 text-amber-600'
                }`} {...props}>
                  {children}
                </code>
              );
            }

            return (
              <CollapsibleCodeBlock
                code={String(children).replace(/\n$/, '')}
                language={match[1]}
                isDarkMode={isDarkMode}
              />
            );
          },
          // Customize other elements for premium look
          h1: ({ children }) => <h1 className="text-3xl font-bold tracking-tight mb-6 mt-10">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-bold tracking-tight mb-4 mt-8 text-[#FF6B00]">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-bold tracking-tight mb-3 mt-6">{children}</h3>,
          p: ({ children }) => <p className="mb-4 leading-relaxed antialiased font-light text-base">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 mb-4 space-y-2">{children}</ol>,
          li: ({ children }) => <li className="pl-1">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#FF6B00] pl-6 py-4 my-8 bg-[#FF6B00]/5 rounded-r-2xl font-normal">
              {children}
            </blockquote>
          ),
          hr: () => <hr className={`my-8 border-t-2 border-dashed ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
