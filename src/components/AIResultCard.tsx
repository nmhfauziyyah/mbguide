import React from 'react';
import GlassCard from './GlassCard';
import { Sparkles, HeartPulse, ShieldAlert, Award, QrCode } from 'lucide-react';
import StatusBadge from './StatusBadge';

interface AIResultCardProps {
  foodName: string;
  imageSrc: string;
  confidence: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  qualityScore: 'A' | 'B' | 'C';
  recommendation: string;
  onGenerateQR?: () => void;
}

export const AIResultCard: React.FC<AIResultCardProps> = ({
  foodName,
  imageSrc,
  confidence,
  calories,
  protein,
  carbs,
  fat,
  qualityScore,
  recommendation,
  onGenerateQR,
}) => {
  const getQualityText = (score: string) => {
    switch (score) {
      case 'A': return 'SANGAT LAYAK (Grade A)';
      case 'B': return 'CUKUP LAYAK (Grade B)';
      default: return 'DALAM PENGECEKAN (Grade C)';
    }
  };

  return (
    <GlassCard className="p-4 space-y-4">
      {/* Photo Frame */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200/60 shadow-md h-36 bg-slate-900">
        <img 
          src={imageSrc} 
          className="w-full h-full object-cover opacity-90" 
          alt={foodName} 
        />
        
        {/* Bounding Box Visual Overlay */}
        <div className="absolute inset-3 border-2 border-dashed border-mbg-secondary/80 rounded-xl flex items-start justify-end p-2 pointer-events-none">
          <span className="bg-mbg-primary/80 backdrop-blur-md text-mbg-secondary text-[8px] font-extrabold px-1.5 py-0.5 rounded-full border border-mbg-secondary/30 tracking-wider">
            AI DETECTED
          </span>
        </div>

        {/* Floating Confidence Tag */}
        <div className="absolute bottom-2 left-2 right-2 bg-mbg-primary/80 backdrop-blur-md px-2 py-1.5 rounded-xl flex items-center justify-between text-white border border-white/10">
          <div className="flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-mbg-secondary fill-mbg-secondary" />
            <span className="font-bold text-[9px] tracking-tight">AI Confidence Score</span>
          </div>
          <span className="text-[10px] font-extrabold text-mbg-secondary">{confidence}%</span>
        </div>
      </div>

      {/* Main Status Badge */}
      <div className={`p-3 rounded-2xl text-white shadow-md flex items-center justify-between bg-gradient-to-r ${
        qualityScore === 'A' 
          ? 'from-emerald-500 to-green-600' 
          : 'from-amber-500 to-yellow-600'
      }`}>
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[8px] uppercase font-bold tracking-widest opacity-85">Status Higienitas & Kelayakan</p>
            <h4 className="font-extrabold text-[11px] uppercase">{getQualityText(qualityScore)}</h4>
          </div>
        </div>
        <StatusBadge status="safe" label="LOLOS" className="bg-white/10 border-white/20 text-white font-extrabold" />
      </div>

      {/* Nutrition Grid */}
      <div className="bg-white/50 border border-slate-100 rounded-2xl p-3">
        <div className="flex justify-between items-center mb-2">
          <h5 className="font-bold text-[10px] text-mbg-primary flex items-center gap-1">
            <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
            Kandungan Nutrisi Est.
          </h5>
          <span className="text-[9px] text-slate-500 font-extrabold bg-slate-200/50 px-2 py-0.5 rounded-full">{calories} kcal</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
          <div className="bg-white/80 p-2 rounded-xl border border-slate-100/80">
            <span className="block text-[8px] text-slate-400 font-bold uppercase">Protein</span>
            <span className="font-extrabold text-xs text-mbg-primary">{protein}g</span>
            <span className="block text-[8px] text-emerald-600 font-extrabold mt-0.5">Cukup</span>
          </div>
          <div className="bg-white/80 p-2 rounded-xl border border-slate-100/80">
            <span className="block text-[8px] text-slate-400 font-bold uppercase">Karbohidrat</span>
            <span className="font-extrabold text-xs text-mbg-primary">{carbs}g</span>
            <span className="block text-[8px] text-emerald-600 font-extrabold mt-0.5">Ideal</span>
          </div>
          <div className="bg-white/80 p-2 rounded-xl border border-slate-100/80">
            <span className="block text-[8px] text-slate-400 font-bold uppercase">Lemak</span>
            <span className="font-extrabold text-xs text-mbg-primary">{fat}g</span>
            <span className="block text-[8px] text-amber-600 font-extrabold mt-0.5">Sedang</span>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-mbg-accent/15 border border-mbg-accent/25 rounded-2xl p-3 flex gap-2">
        <ShieldAlert className="w-4 h-4 text-mbg-primary shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <h6 className="font-bold text-[9px] text-mbg-primary">Rekomendasi Ahli Gizi AI:</h6>
          <p className="text-[9px] text-slate-600 font-medium leading-relaxed">{recommendation}</p>
        </div>
      </div>

      {/* Submit Button */}
      {onGenerateQR && (
        <button
          onClick={onGenerateQR}
          className="w-full py-2.5 px-4 rounded-2xl bg-mbg-secondary text-mbg-primary font-extrabold text-xs shadow-md shadow-mbg-secondary/15 hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <QrCode className="w-4 h-4" />
          <span>Terbitkan QR Passport Gizi</span>
        </button>
      )}
    </GlassCard>
  );
};

export default AIResultCard;
