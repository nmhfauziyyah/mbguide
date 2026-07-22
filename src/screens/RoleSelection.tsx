import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import { ChefHat, Truck, Landmark, Heart, Sparkles } from 'lucide-react';

interface RoleSelectionProps {
  onSelectRole: (role: 'kitchen' | 'distributor' | 'admin' | 'beneficiary') => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  const roles = [
    {
      id: 'kitchen' as const,
      title: 'Pengelola Dapur MBG',
      subtitle: 'Dapur Sehat Menteng',
      desc: 'Kelola produksi makanan, scan nutrisi bahan dengan AI, dan terbitkan digital passport QR.',
      icon: ChefHat,
      color: '#92D05D', // Green
      bgClass: 'bg-gradient-to-tr from-emerald-500/10 to-green-500/5',
      badge: 'Dapur & AI QC'
    },
    {
      id: 'distributor' as const,
      title: 'Distributor Logistik',
      subtitle: 'Armada Pengiriman #03',
      desc: 'Lacak rute pengiriman, periksa batas geofencing GPS, dan konfirmasi penyerahan segel boks.',
      icon: Truck,
      color: '#B5E0EA', // Accent Blue
      bgClass: 'bg-gradient-to-tr from-sky-500/10 to-blue-500/5',
      badge: 'Rute & Geofence'
    },
    {
      id: 'admin' as const,
      title: 'Admin Pemerintah',
      subtitle: 'Badan Gizi Nasional',
      desc: 'Pantau kelayakan dapur, respon notifikasi sensor IoT, dan tinjau aduan penerima manfaat.',
      icon: Landmark,
      color: '#D1B06C', // Supporting Gold
      bgClass: 'bg-gradient-to-tr from-amber-500/10 to-yellow-500/5',
      badge: 'Pusat Kontrol'
    },
    {
      id: 'beneficiary' as const,
      title: 'Penerima Manfaat',
      subtitle: 'Siswa / Orang Tua',
      desc: 'Scan barcode gizi, periksa transparansi hygiene dapur, dan ajukan aduan mutu makanan.',
      icon: Heart,
      color: '#F43F5E', // Red/Rose
      bgClass: 'bg-gradient-to-tr from-rose-500/10 to-pink-500/5',
      badge: 'Passport Gizi'
    }
  ];

  return (
    <div className="w-full h-full bg-[#F4F7FB] flex flex-col justify-between p-4.5 relative overflow-hidden select-none">
      {/* Mesh background effect */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-mbg-accent/20 to-transparent pointer-events-none" />

      {/* Top Header */}
      <div className="pt-2 pb-1.5 text-center z-10 shrink-0 select-none">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-mbg-primary/5 text-mbg-primary text-[8.5px] font-extrabold border border-mbg-primary/10 mb-1.5">
          <Sparkles className="w-3 h-3 text-mbg-supporting fill-mbg-supporting" />
          <span>MBGUIDE SECURE IDENTITY</span>
        </div>
        <h2 className="text-lg font-extrabold text-mbg-primary tracking-tight">Pilih Role</h2>
        <p className="text-[10px] text-slate-500 font-medium max-w-xs mx-auto mt-0.5">
          Pilih salah satu profil otorisasi di bawah ini untuk memulai simulasi.
        </p>
      </div>

      {/* Cards List Container */}
      <div className="flex-1 my-2.5 space-y-2 z-10">
        {roles.map((role, idx) => {
          const Icon = role.icon;
          return (
            <motion.div
              key={role.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.08, duration: 0.4, ease: 'easeOut' }}
            >
              <GlassCard
                onClick={() => onSelectRole(role.id)}
                className={`p-3 flex items-start gap-3 relative overflow-hidden group hover:scale-[1.01] hover:border-mbg-primary/20 ${role.bgClass}`}
              >
                {/* Role Icon Container */}
                <div 
                  className="p-2.5 rounded-2xl shrink-0 shadow-md text-white transition-all group-hover:scale-105"
                  style={{ backgroundColor: '#071E49' }}
                >
                  <Icon className="w-4.5 h-4.5 stroke-[2]" style={{ color: role.color }} />
                </div>

                {/* Text Content */}
                <div className="flex-1 space-y-0.5 text-left">
                  <div className="flex justify-between items-center">
                    <h3 className="font-extrabold text-[11px] text-mbg-primary leading-tight">
                      {role.title}
                    </h3>
                    <span className="text-[7px] font-extrabold bg-white/70 border border-slate-100 px-1.5 py-0.5 rounded-full text-slate-500 uppercase tracking-wide">
                      {role.badge}
                    </span>
                  </div>
                  <p className="text-[8.5px] text-slate-400 font-bold leading-none">{role.subtitle}</p>
                  <p className="text-[9px] text-slate-600 font-medium leading-tight pt-1">
                    {role.desc}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Legal Section */}
      <div className="text-center pt-2 select-none shrink-0">
        <p className="text-[8.5px] text-slate-400 font-semibold tracking-wide">
          MBGuide Prototype © 2026
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;
