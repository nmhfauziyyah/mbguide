import React, { useState } from 'react';
import GlassCard from './GlassCard';
import { Thermometer, ShieldCheck, Droplets, AlertCircle } from 'lucide-react';
import StatusBadge from './StatusBadge';

interface SensorCardProps {
  kitchenName: string;
  initialTemp?: number;
  initialHygiene?: number;
  initialHumidity?: number;
  interactive?: boolean;
}

export const SensorCard: React.FC<SensorCardProps> = ({
  kitchenName,
  initialTemp = 23.5,
  initialHygiene = 98.4,
  initialHumidity = 52,
  interactive = true,
}) => {
  const [temp, setTemp] = useState(initialTemp);
  const [hygiene, setHygiene] = useState(initialHygiene);
  const [isAlert, setIsAlert] = useState(false);

  const toggleSimulation = () => {
    if (!interactive) return;
    if (isAlert) {
      setTemp(23.5);
      setHygiene(98.4);
      setIsAlert(false);
    } else {
      setTemp(28.2); // Heat leak
      setHygiene(82.1); // Hygiene warning
      setIsAlert(true);
    }
  };

  return (
    <GlassCard className="p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className={`absolute -right-10 -bottom-10 w-24 h-24 rounded-full blur-2xl transition-colors duration-500 pointer-events-none ${
        isAlert ? 'bg-rose-500/10' : 'bg-mbg-secondary/15'
      }`} />

      <div className="flex justify-between items-center mb-3">
        <div>
          <h4 className="font-extrabold text-xs text-mbg-primary leading-tight">{kitchenName}</h4>
          <p className="text-[9px] text-slate-500">Live IoT Sensors Telemetry</p>
        </div>
        <StatusBadge
          status={isAlert ? 'warning' : 'safe'}
          label={isAlert ? 'IoT Warning' : 'Steril'}
          pulse={isAlert}
        />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className={`p-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
          isAlert ? 'bg-rose-500/5 border border-rose-500/10' : 'bg-white/80 border border-slate-100'
        }`}>
          <Thermometer className={`w-4 h-4 mb-1 ${isAlert ? 'text-rose-500' : 'text-mbg-primary'}`} />
          <span className="text-[8px] text-slate-400 font-bold uppercase">Suhu</span>
          <span className={`text-xs font-extrabold ${isAlert ? 'text-rose-600' : 'text-slate-800'}`}>{temp}°C</span>
        </div>

        <div className={`p-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
          isAlert ? 'bg-rose-500/5 border border-rose-500/10' : 'bg-white/80 border border-slate-100'
        }`}>
          <ShieldCheck className={`w-4 h-4 mb-1 ${isAlert ? 'text-amber-500' : 'text-mbg-secondary'}`} />
          <span className="text-[8px] text-slate-400 font-bold uppercase">Higienitas</span>
          <span className={`text-xs font-extrabold ${isAlert ? 'text-amber-600' : 'text-slate-800'}`}>{hygiene}%</span>
        </div>

        <div className="p-2 rounded-2xl bg-white/80 border border-slate-100 flex flex-col items-center justify-center">
          <Droplets className="w-4 h-4 mb-1 text-mbg-accent" />
          <span className="text-[8px] text-slate-400 font-bold uppercase">Kelembaban</span>
          <span className="text-xs font-extrabold text-slate-800">{initialHumidity}%</span>
        </div>
      </div>

      {interactive && (
        <button
          onClick={toggleSimulation}
          className={`w-full mt-3 py-1.5 px-3 rounded-xl font-bold text-[9px] transition-all flex items-center justify-center gap-1.5 ${
            isAlert
              ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/20'
              : 'bg-mbg-primary/5 text-mbg-primary hover:bg-mbg-primary/10'
          }`}
        >
          {isAlert ? (
            <>
              <AlertCircle className="w-3 h-3" />
              <span>Selesaikan IoT Anomali (Reset)</span>
            </>
          ) : (
            <span>Simulasikan IoT Anomali</span>
          )}
        </button>
      )}
    </GlassCard>
  );
};

export default SensorCard;
