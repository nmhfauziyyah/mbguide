import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Clock, Navigation, UserCircle,
  CheckSquare, ArrowRight, ShieldCheck, ClipboardList 
} from 'lucide-react';
import TopAppBar from '../components/TopAppBar';
import BottomNavigation from '../components/BottomNavigation';
import GlassCard from '../components/GlassCard';
import MapCard from '../components/MapCard';
import Timeline from '../components/Timeline';
import type { TimelineStep } from '../components/Timeline';

interface DistributorFlowProps {
  onBackToRoles: () => void;
  triggerToast: (msg: string, type: 'success' | 'info' | 'warning') => void;
}

export const DistributorFlow: React.FC<DistributorFlowProps> = ({ onBackToRoles, triggerToast }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tracking'>('dashboard');
  const [isDeliveryCompleted, setIsDeliveryCompleted] = useState(false);

  // Delivery log history
  const deliveryHistory = [
    { id: 'DEL-8812', destination: 'SDN 01 Menteng', qty: 450, status: 'Completed', date: 'Hari Ini' },
    { id: 'DEL-8810', destination: 'SMPN 05 Jakarta', qty: 800, status: 'Completed', date: 'Kemarin' },
  ];

  // Logistics steps
  const initialTimelineSteps: TimelineStep[] = [
    { id: 't1', label: 'Boks Dimuat di Dapur', time: '08:45 WIB', status: 'completed', description: 'Segel digital terkunci dan suhu diaudit' },
    { id: 't2', label: 'Pengiriman Berlangsung', time: '09:00 WIB', status: 'completed', description: 'Rute tercepat melalui jalan protokol' },
    { id: 't3', label: 'Mendekati Geofence Sekolah', time: '09:12 WIB', status: 'current', description: 'Kendaraan dalam radius 500m' },
    { id: 't4', label: 'Tiba di Lokasi & Scan QR', time: 'Pending', status: 'upcoming', description: 'Konfirmasi serah terima fisik makanan' }
  ];

  const [timelineSteps, setTimelineSteps] = useState<TimelineStep[]>(initialTimelineSteps);

  // Confirm arrival
  const handleConfirmArrival = () => {
    setIsDeliveryCompleted(true);
    // Update timeline steps
    setTimelineSteps([
      { id: 't1', label: 'Boks Dimuat di Dapur', time: '08:45 WIB', status: 'completed', description: 'Segel digital terkunci dan suhu diaudit' },
      { id: 't2', label: 'Pengiriman Berlangsung', time: '09:00 WIB', status: 'completed', description: 'Rute tercepat melalui jalan protokol' },
      { id: 't3', label: 'Mendekati Geofence Sekolah', time: '09:12 WIB', status: 'completed', description: 'Kendaraan memasuki radius aman' },
      { id: 't4', label: 'Tiba & QR Segel Terverifikasi', time: '09:18 WIB', status: 'completed', description: 'Serah terima makanan selesai dan higienis' }
    ]);
    triggerToast('Serah terima selesai! Barcode digital dan segel boks dilepas.', 'success');
  };

  return (
    <div className="w-full h-full bg-[#F4F7FB] flex flex-col justify-between overflow-hidden relative">
      <TopAppBar 
        title={activeTab === 'dashboard' ? 'Logistik & Distribusi' : 'Navigasi Pengiriman'}
        subtitle={activeTab === 'dashboard' ? 'Armada Pengiriman #03' : 'Rute: Menteng Cluster'}
        onBack={onBackToRoles}
        rightContent={
          <div className="w-8 h-8 rounded-full bg-mbg-primary/10 text-mbg-primary flex items-center justify-center shadow-sm border border-mbg-primary/20">
            <UserCircle className="w-5 h-5" />
          </div>
        }
      />

      {/* Screen Body */}
      <div className="flex-1 overflow-hidden p-3.5 flex flex-col justify-between">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: LOGISTICS DASHBOARD */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col space-y-2.5 overflow-hidden"
            >
              {/* Active Delivery Schedule — compact */}
              <GlassCard className="p-3 relative overflow-hidden shrink-0">
                <div className="absolute right-0 top-0 w-20 h-20 bg-mbg-accent/15 rounded-full blur-2xl pointer-events-none" />

                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="text-[8px] font-extrabold uppercase tracking-wider text-slate-400 block">JADWAL HARI INI</span>
                    <h3 className="font-extrabold text-[11px] text-mbg-primary leading-tight">Pengiriman #DEL-8812</h3>
                  </div>
                  <span className={`text-[7.5px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${
                    isDeliveryCompleted
                      ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                      : 'bg-amber-100 text-amber-800 border-amber-200 animate-pulse'
                  }`}>
                    {isDeliveryCompleted ? 'Tiba di Lokasi' : 'Dalam Rute'}
                  </span>
                </div>

                {/* Route + ETA in one compact row */}
                <div className="flex gap-3 text-[9px] text-slate-600 mb-2.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-mbg-primary shrink-0" />
                    Menteng → <strong className="text-mbg-primary">SDN 01</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-mbg-primary shrink-0" />
                    <strong className="text-mbg-primary">{isDeliveryCompleted ? '09:18 Tiba' : '~12 mnt (09:18)'}</strong>
                  </span>
                </div>

                <button
                  onClick={() => setActiveTab('tracking')}
                  className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-mbg-primary to-mbg-primary/95 text-white font-extrabold text-[9.5px] flex items-center justify-between shadow-sm"
                >
                  <span className="flex items-center gap-1.5">
                    <Navigation className="w-3 h-3 rotate-45 text-mbg-secondary" />
                    Buka Peta GPS & Geofence
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </GlassCard>

              {/* Vehicle Telemetry stats — 2 col */}
              <div className="grid grid-cols-2 gap-2.5 shrink-0">
                <GlassCard className="p-2.5">
                  <span className="text-[8px] font-extrabold uppercase text-slate-400 tracking-wider block">Suhu Boks</span>
                  <h4 className="text-base font-extrabold text-mbg-primary mt-0.5">18.5°C</h4>
                  <span className="text-[7.5px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100 inline-block mt-1">Suhu Aman ✓</span>
                </GlassCard>

                <GlassCard className="p-2.5">
                  <span className="text-[8px] font-extrabold uppercase text-slate-400 tracking-wider block">Kecepatan</span>
                  <h4 className="text-base font-extrabold text-mbg-primary mt-0.5">42 km/h</h4>
                  <span className="text-[7.5px] font-bold text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded-full border border-slate-100 inline-block mt-1">Lancar</span>
                </GlassCard>
              </div>

              {/* Delivery History Log — flex-1 to fill remaining height */}
              <GlassCard className="p-3 flex-1 flex flex-col min-h-0">
                <h4 className="text-[9px] font-extrabold text-mbg-primary uppercase tracking-wider flex items-center gap-1.5 mb-2 shrink-0">
                  <ClipboardList className="w-3.5 h-3.5 text-mbg-primary" />
                  Riwayat Distribusi
                </h4>

                <div className="space-y-1.5 text-[9.5px] flex-1 flex flex-col justify-center">
                  {deliveryHistory.map((log) => (
                    <div key={log.id} className="flex justify-between items-center p-2 bg-white/70 border border-slate-100/50 rounded-xl">
                      <div>
                        <span className="font-extrabold text-slate-700 block leading-tight">{log.destination}</span>
                        <span className="text-[7.5px] text-slate-400 font-bold uppercase tracking-wider">{log.id} • {log.date}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-600 font-bold block">{log.qty} Box</span>
                        <span className="text-[7.5px] font-bold text-emerald-600 uppercase">✓ Sukses</span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* TAB 2: ACTIVE TRACKING MAP */}
          {activeTab === 'tracking' && (
            <motion.div
              key="tracking"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col space-y-2.5 overflow-hidden"
            >
              {/* Interactive Vector GPS Map Card — compact height */}
              <div className="shrink-0">
                <MapCard mode="geofence" interactive={true} />
              </div>

              {/* Logistics Milestones — flex-1 fills remaining height */}
              <GlassCard className="p-3 flex-1 flex flex-col min-h-0">
                <h4 className="text-[9px] font-extrabold text-mbg-primary uppercase tracking-wider mb-2 shrink-0">Linimasa Logistik</h4>
                
                <div className="flex-1 overflow-hidden">
                  <Timeline steps={timelineSteps} compact={true} />
                </div>

                {/* QR confirmation button */}
                <div className="mt-2 shrink-0">
                  {!isDeliveryCompleted ? (
                    <button
                      onClick={handleConfirmArrival}
                      className="w-full py-2 px-3 rounded-xl bg-mbg-primary text-white font-extrabold text-[9.5px] shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <CheckSquare className="w-3.5 h-3.5 text-mbg-secondary" />
                      <span>Konfirmasi Tiba & Buka Segel QR</span>
                    </button>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center gap-1.5 text-emerald-800 text-[9px] font-extrabold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
                      <span>Pengiriman Diterima & Lolos Audit ✓</span>
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Floating Bottom Nav */}
      <BottomNavigation
        activeTab={activeTab}
        onChangeTab={(tab) => setActiveTab(tab as any)}
        role="distributor"
      />
    </div>
  );
};

export default DistributorFlow;
