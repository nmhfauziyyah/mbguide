import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, Truck } from 'lucide-react';

export interface TimelineStep {
  id: string;
  label: string;
  time: string;
  status: 'completed' | 'current' | 'upcoming' | 'error';
  description?: string;
}

interface TimelineProps {
  steps: TimelineStep[];
  className?: string;
  compact?: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({ steps, className = '', compact = false }) => {
  const nodeSize  = compact ? 'w-7 h-7' : 'w-9 h-9';
  const iconSize  = compact ? 'w-3.5 h-3.5' : 'w-[18px] h-[18px]';
  const gap       = compact ? 'gap-2.5' : 'gap-3.5';
  const spacing   = compact ? 'space-y-2' : 'space-y-4';
  const titleSize = compact ? 'text-[9.5px]' : 'text-xs';
  const descSize  = compact ? 'text-[8px]' : 'text-[9.5px]';
  const lineLeft  = compact ? 'left-[14px]' : 'left-[18px]';

  return (
    <div className={`${spacing} ${className}`}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        let iconColor = 'text-slate-300 bg-slate-100';
        let lineClass = 'border-slate-200';
        let titleClass = 'text-slate-400';
        let IconComponent = Clock;

        if (step.status === 'completed') {
          iconColor = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
          lineClass = 'border-emerald-500';
          titleClass = 'text-mbg-primary font-bold';
          IconComponent = CheckCircle2;
        } else if (step.status === 'current') {
          iconColor = 'text-mbg-primary bg-mbg-accent/40 border-mbg-accent/60 animate-pulse';
          lineClass = 'border-dashed border-mbg-accent';
          titleClass = 'text-mbg-primary font-extrabold';
          IconComponent = Truck;
        } else if (step.status === 'error') {
          iconColor = 'text-rose-500 bg-rose-500/10 border-rose-500/20';
          lineClass = 'border-rose-300';
          titleClass = 'text-rose-600 font-extrabold';
          IconComponent = AlertTriangle;
        }

        return (
          <div key={step.id} className={`flex ${gap} relative`}>
            {/* Connecting line */}
            {!isLast && (
              <div
                className={`absolute ${lineLeft} top-8 bottom-0 w-0.5 border-l-2 ${lineClass} transition-colors duration-300`}
                style={{ height: 'calc(100% - 10px)' }}
              />
            )}

            {/* Icon Node */}
            <div className={`${nodeSize} rounded-full flex items-center justify-center border shrink-0 z-10 shadow-sm ${iconColor} transition-colors duration-300`}>
              <IconComponent className={iconSize} />
            </div>

            {/* Content Node */}
            <div className="flex-1 pb-0.5">
              <div className="flex justify-between items-baseline">
                <h4 className={`${titleSize} ${titleClass}`}>{step.label}</h4>
                <span className="text-[7.5px] font-bold text-slate-400">{step.time}</span>
              </div>
              {step.description && (
                <p className={`${descSize} text-slate-500 mt-0.5 leading-tight`}>{step.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
