import React from 'react';
import GlassCard from './GlassCard';

interface StatisticCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ComponentType<any>;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  progress?: number; // 0 to 100
  className?: string;
  dark?: boolean;
}

export const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  unit = '',
  icon: Icon,
  trend,
  progress,
  className = '',
  dark = false,
}) => {
  return (
    <GlassCard dark={dark} className={`p-3 flex flex-col gap-1.5 ${className}`}>
      {/* Row 1: Icon + Title inline */}
      <div className="flex items-center gap-1.5">
        <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${dark ? 'bg-white/10 text-white' : 'bg-mbg-accent/30 text-mbg-primary'}`}>
          <Icon className="w-3.5 h-3.5" />
        </div>
        <span className={`text-[8.5px] font-extrabold uppercase tracking-wider leading-tight ${dark ? 'text-white/60' : 'text-slate-500'}`}>
          {title}
        </span>
      </div>

      {/* Row 2: Value + Unit */}
      <div className="flex items-baseline gap-1 mt-0.5">
        <span className={`text-lg font-extrabold tracking-tight leading-none ${dark ? 'text-white' : 'text-mbg-primary'}`}>
          {value}
        </span>
        {unit && (
          <span className={`text-[10px] font-semibold ${dark ? 'text-white/60' : 'text-slate-500'}`}>
            {unit}
          </span>
        )}
      </div>

      {/* Optional progress bar */}
      {progress !== undefined && (
        <div className="mt-0.5">
          <div className={`w-full h-1 rounded-full ${dark ? 'bg-white/10' : 'bg-slate-200/50'} overflow-hidden`}>
            <div
              className="bg-mbg-secondary h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[7.5px] font-extrabold mt-0.5">
            <span className={dark ? 'text-white/40' : 'text-slate-400'}>Target</span>
            <span className="text-mbg-secondary">{progress}%</span>
          </div>
        </div>
      )}

      {/* Optional trend */}
      {trend && (
        <div className="flex items-center gap-1 text-[8.5px] font-bold">
          <span className={
            trend.isNeutral
              ? (dark ? 'text-white/60' : 'text-slate-500')
              : trend.isPositive
                ? 'text-emerald-500'
                : 'text-rose-500'
          }>
            {trend.value}
          </span>
          <span className={dark ? 'text-white/40' : 'text-slate-400'}>vs kemarin</span>
        </div>
      )}
    </GlassCard>
  );
};

export default StatisticCard;
