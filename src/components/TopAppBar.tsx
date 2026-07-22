import React from 'react';
import { ArrowLeft, Wifi, Battery } from 'lucide-react';

interface TopAppBarProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightContent?: React.ReactNode;
  dark?: boolean;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  title,
  subtitle,
  onBack,
  rightContent,
  dark = false,
}) => {
  return (
    <div className={`pt-2 px-4 pb-3 flex flex-col shrink-0 z-40 border-b ${dark ? 'border-white/10 text-white' : 'border-slate-100 text-slate-800'}`}>
      {/* iOS Status Bar Simulation */}
      <div className="flex justify-between items-center text-[10px] opacity-75 font-bold mb-2.5 px-1">
        <span>09:41</span>
        {/* Dynamic Island style Pill */}
        <div className={`w-16 h-3 rounded-full flex items-center justify-center ${dark ? 'bg-white/10' : 'bg-black/10'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${dark ? 'bg-white/40' : 'bg-black/40'}`} />
        </div>
        <div className="flex items-center gap-1.5">
          <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
          <Battery className="w-4 h-4 stroke-[2]" />
        </div>
      </div>

      {/* Main Bar Content */}
      <div className="flex items-center justify-between min-h-[40px]">
        <div className="flex items-center gap-2.5">
          {onBack && (
            <button
              onClick={onBack}
              className={`p-2 rounded-xl active:scale-95 transition-all ${
                dark ? 'bg-white/10 text-white hover:bg-white/15' : 'bg-mbg-primary/5 text-mbg-primary hover:bg-mbg-primary/10'
              }`}
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}
          <div>
            <h1 className="font-extrabold text-[15px] leading-tight tracking-tight">{title}</h1>
            {subtitle && (
              <p className={`text-[10px] font-bold leading-none mt-0.5 ${dark ? 'text-white/60' : 'text-slate-500'}`}>
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {rightContent && <div className="flex items-center">{rightContent}</div>}
      </div>
    </div>
  );
};

export default TopAppBar;
