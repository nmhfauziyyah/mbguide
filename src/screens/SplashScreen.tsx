import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Scan, Cpu, MapPin, QrCode } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); // Small pause at 100%
          return 100;
        }
        return prev + 5;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [onComplete]);

  const pillars = [
    { label: 'AI Quality', icon: Scan, color: 'text-mbg-secondary' },
    { label: 'IoT Sensors', icon: Cpu, color: 'text-mbg-accent' },
    { label: 'Geofencing', icon: MapPin, color: 'text-mbg-supporting' },
    { label: 'Barcode Pass', icon: QrCode, color: 'text-mbg-secondary' },
  ];

  return (
    <div 
      className="w-full h-full bg-gradient-to-b from-[#071E49] via-[#0A285F] to-[#071E49] text-white flex flex-col justify-between p-6 relative overflow-hidden select-none"
      onClick={onComplete} // Allow skipping on click
    >
      {/* Ambient Mesh Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-mbg-secondary/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-44 h-44 bg-mbg-accent/15 rounded-full blur-[60px] pointer-events-none" />

      {/* Top spacing */}
      <div className="h-6" />

      {/* Central Brand Identity */}
      <div className="flex-1 flex flex-col items-center justify-center text-center z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mb-8"
        >
          {/* Glass Outer Card */}
          <div className="w-28 h-28 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center shadow-2xl relative">
            {/* Inner Brand Image */}
            <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-[0_0_20px_rgba(146,208,93,0.3)] overflow-hidden">
              <img src="./mbguide.png" className="w-16 h-16 object-contain" alt="MBGuide Logo" />
            </div>
            
            {/* Animated Sparkle */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="absolute -top-2.5 -right-2.5 w-8 h-8 rounded-full bg-white text-mbg-primary flex items-center justify-center shadow-lg border border-mbg-accent"
            >
              <Sparkles className="w-4 h-4 text-mbg-supporting fill-mbg-supporting" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-none">MBGuide</h1>
          <p className="text-[10px] text-mbg-accent font-bold tracking-widest uppercase mt-2">
            Monitoring & Barcode Guide
          </p>
          <div className="mt-3 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] text-white/80 inline-block font-semibold">
            Program Makan Bergizi Gratis (MBG)
          </div>
        </motion.div>

        {/* Four Technical Pillars Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-2 gap-2 mt-8 w-full max-w-[240px]"
        >
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div 
                key={i} 
                className="p-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center space-x-2 text-left"
              >
                <Icon className={`w-4 h-4 shrink-0 ${p.color}`} />
                <span className="text-[9px] font-extrabold text-white/95">{p.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Footer & Loading Tracker */}
      <div className="z-10 text-center pb-4 select-none">
        <div className="w-14 h-1 bg-white/20 rounded-full mx-auto overflow-hidden mb-3">
          <div 
            className="h-full bg-mbg-secondary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[9px] text-white/50 font-bold uppercase tracking-wider">
          MBGuide • v1
        </p>
        <span className="text-[8px] text-white/40 block mt-1">Ketuk untuk Lewati</span>
      </div>
    </div>
  );
};

export default SplashScreen;
