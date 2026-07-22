import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  dark?: boolean;
  accent?: boolean;
  secondary?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  onClick,
  dark = false,
  accent = false,
  secondary = false,
}) => {
  let cardClass = 'liquid-glass';
  if (dark) cardClass = 'liquid-glass-dark text-white';
  else if (accent) cardClass = 'liquid-glass-accent';
  else if (secondary) cardClass = 'liquid-glass-secondary';

  return (
    <div
      onClick={onClick}
      className={`${cardClass} rounded-3xl p-5 shadow-[0_8px_32px_0_rgba(7,30,73,0.06)] transition-all duration-300 ${
        onClick ? 'cursor-pointer active:scale-98 hover:translate-y-[-2px] hover:shadow-[0_12px_40px_0_rgba(7,30,73,0.1)]' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
export default GlassCard;
