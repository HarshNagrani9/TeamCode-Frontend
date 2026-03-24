import React from 'react';
import { Check, Zap, ArrowRight } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  color: string;
  accent: string;
  glow: string;
  button: string;
  popular?: boolean;
}

interface PricingCardProps {
  tier: PricingTier;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onEnroll?: (id: string) => void;
  ctaText?: string;
  isLanding?: boolean;
  isDarkMode?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  tier, 
  isSelected, 
  onSelect, 
  onEnroll, 
  ctaText = "Secure This Path",
  isLanding = false,
  isDarkMode = true
}) => {
  const handleClick = () => {
    if (onSelect) onSelect(tier.id);
  };

  const handleEnroll = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEnroll) onEnroll(tier.id);
  };

  // Base card styles including conditional selection ring/glow
  const cardContainerClass = isLanding 
    ? `group relative rounded-[2rem] p-[1px] transition-all duration-500 overflow-hidden flex flex-col ${tier.popular ? 'bg-gradient-to-b from-red-600 to-orange-500 scale-110 z-20 shadow-[0_0_80px_rgba(239,68,68,0.2)]' : (isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-slate-200 hover:bg-slate-300')}`
    : `group relative cursor-pointer pt-12 rounded-[2.5rem] p-[1px] transition-all duration-700 ${isSelected ? `bg-gradient-to-b ${tier.color} scale-105 z-20 ${tier.glow} shadow-2xl` : (isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200')} scale-100 hover:scale-[1.02]`;

  const innerContainerClass = `${isDarkMode ? 'bg-neutral-950/90' : 'bg-white'} backdrop-blur-3xl p-8 lg:p-10 flex flex-col h-full rounded-[2rem] relative border ${isDarkMode ? 'border-white/5' : 'border-slate-200'} ${isLanding && !tier.popular ? (isDarkMode ? 'bg-neutral-900/90' : 'bg-slate-50') : ''}`;

  return (
    <div className={cardContainerClass} onClick={handleClick}>
      {/* Ambient glow for Pro on Landing */}
      {isLanding && tier.id === 'pro' && (
        <div className="absolute inset-0 bg-orange-600/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
      )}

      {tier.popular && (
        <div className={`absolute ${isLanding ? 'top-6 right-8' : '-top-4 left-1/2 -translate-x-1/2'} z-30`}>
          <div className={`px-4 py-1.5 bg-gradient-to-r from-red-600 to-orange-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-2xl animate-pulse ${!isLanding ? 'ring-4 ring-black' : ''}`}>
            Most Popular
          </div>
        </div>
      )}

      <div className={innerContainerClass}>
        <div className="mb-8 text-left">
          <h3 className={`text-xl font-black uppercase tracking-tighter mb-2 ${isLanding && tier.popular ? 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500' : (tier.accent || (isDarkMode ? 'text-white' : 'text-slate-900'))}`}>
            {tier.name}
          </h3>
          <p className={`${isDarkMode ? 'text-neutral-500' : 'text-slate-500'} text-sm font-medium`}>{tier.description}</p>
        </div>

        <div className="flex items-baseline gap-1 mb-8 text-left">
          <span className={`text-5xl font-black uppercase ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{tier.price}</span>
          <span className="text-neutral-600 text-xs font-bold uppercase tracking-widest pl-2">
            {tier.id === 'free' ? 'Free access' : (isLanding && tier.id === 'max' ? 'Full access' : 'One-time')}
          </span>
        </div>

        <div className="space-y-4 mb-10 text-left flex-1">
          {tier.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              {tier.id === 'max' || (isLanding && tier.id === 'max') ? (
                <Zap size={14} className="text-red-500 shrink-0" />
              ) : (
                <Check size={14} className={`${tier.accent || 'text-neutral-600'} shrink-0`} />
              )}
              <span className={`text-sm ${tier.id === 'max' || (isLanding && tier.id === 'max') ? (isDarkMode ? 'text-neutral-200 font-bold' : 'text-slate-900 font-bold') : (isDarkMode ? 'text-neutral-300 font-semibold' : 'text-slate-700 font-semibold')}`}>
                {feature}
              </span>
            </div>
          ))}
        </div>

        <button 
          onClick={handleEnroll}
          className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-[0.98] border border-transparent ${tier.button} flex items-center justify-center gap-2`}
        >
          <span>{ctaText}</span>
          {isLanding ? null : <ArrowRight size={16} />}
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
