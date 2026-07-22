import React from 'react';

interface StatusBadgeProps {
  status: 'safe' | 'warning' | 'danger' | 'info' | 'success' | 'investigation' | string;
  label: string;
  className?: string;
  pulse?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  className = '',
  pulse = false,
}) => {
  let bgClass = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotClass = 'bg-slate-400';

  switch (status) {
    case 'safe':
    case 'success':
      bgClass = 'bg-emerald-500/15 text-emerald-700 border-emerald-500/25';
      dotClass = 'bg-emerald-500';
      break;
    case 'warning':
      bgClass = 'bg-amber-500/15 text-amber-700 border-amber-500/25';
      dotClass = 'bg-amber-500';
      break;
    case 'danger':
    case 'investigation':
      bgClass = 'bg-rose-500/15 text-rose-700 border-rose-500/25';
      dotClass = 'bg-rose-500';
      break;
    case 'info':
      bgClass = 'bg-mbg-accent/30 text-mbg-primary border-mbg-accent/40';
      dotClass = 'bg-mbg-primary';
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${bgClass} ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {pulse && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotClass}`}></span>
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dotClass}`}></span>
      </span>
      <span>{label}</span>
    </span>
  );
};
export default StatusBadge;
