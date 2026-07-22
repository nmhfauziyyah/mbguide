import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building, ShieldAlert, BarChart2, Bell, AlertTriangle, 
  ChevronRight, Award, FileText, Users 
} from 'lucide-react';
import TopAppBar from '../components/TopAppBar';
import BottomNavigation from '../components/BottomNavigation';
import GlassCard from '../components/GlassCard';
import MapCard from '../components/MapCard';
import StatisticCard from '../components/StatisticCard';

interface AdminFlowProps {
  onBackToRoles: () => void;
  triggerToast: (msg: string, type: 'success' | 'info' | 'warning') => void;
  menuData: {
    name: string;
    nasiGram: number;
    proteinGram: number;
    proteinType: string;
    sayurGram: number;
    sayurType: string;
    calories: number;
    protein: number;
    karbo: number;
    lemak: number;
  };
}

export const AdminFlow: React.FC<AdminFlowProps> = ({ onBackToRoles, triggerToast, menuData }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'map' | 'menu'>('dashboard');
  const [activeChart, setActiveChart] = useState<0 | 1>(0);
  const [showInspections, setShowInspections] = useState(false);
  const [menuSubTab, setMenuSubTab] = useState<'passport' | 'history'>('passport');
  const [verificationStatus, setVerificationStatus] = useState<null | 'approved' | 'rejected'>(null);

  // Simulated system alerts
  const systemAlerts = [
    { id: 'a1', title: 'IoT Anomali: Dapur Setiabudi', desc: 'Suhu ruang penyimpanan terdeteksi 28.2°C (Maks 26°C)', time: '09:10 WIB', type: 'warning' },
    { id: 'a2', title: 'Aduan Masuk: SDN 02 Menteng', desc: 'Orang tua siswa melaporkan susu UHT terbentur bocor', time: '09:05 WIB', type: 'info' }
  ];

  // Simulated inspection recommendations
  const inspectionRecs = [
    { name: 'Dapur Sehat Sudirman', reason: 'Grade AI di bawah target (72% layak) selama 2 batch berturut-turut.', priority: 'High', color: 'text-rose-500 bg-rose-50' },
    { name: 'Dapur Sehat Setiabudi', reason: 'IoT mendeteksi kenaikan suhu kulkas berulang.', priority: 'Medium', color: 'text-amber-500 bg-amber-50' }
  ];

  return (
    <div className="w-full h-full bg-[#F4F7FB] flex flex-col justify-between overflow-hidden relative">
      <TopAppBar 
        title={activeTab === 'dashboard' ? 'BGN Command Center' : 'Monitoring Wilayah'}
        subtitle={activeTab === 'dashboard' ? 'Badan Gizi Nasional' : 'Pemantauan Peta DKI'}
        onBack={onBackToRoles}
        rightContent={
          <button 
            className="p-2 rounded-xl bg-mbg-primary/5 text-mbg-primary hover:bg-mbg-primary/10 relative"
            onClick={() => triggerToast('Tidak ada notifikasi sistem baru.', 'info')}
          >
            <Bell className="w-4.5 h-4.5 stroke-[2.2]" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
          </button>
        }
      />

      {/* Screen Body */}
      <div className="flex-1 overflow-hidden p-3.5 flex flex-col justify-between">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: ADMIN CONTROL DASHBOARD */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col space-y-2.5 overflow-hidden"
            >
              {/* 2x2 Overview Grid */}
              <div className="grid grid-cols-2 gap-2 shrink-0">
                <StatisticCard
                  title="Dapur Aktif"
                  value="142"
                  unit="/150"
                  icon={Building}
                />
                <StatisticCard
                  title="Distribusi"
                  value="185.4K"
                  unit="Porsi"
                  icon={Award}
                />
                <StatisticCard
                  title="Penerima Manfaat"
                  value="98.2K"
                  unit="Siswa"
                  icon={Users}
                />
                <StatisticCard
                  title="Laporan Masuk"
                  value="14"
                  unit="Aduan"
                  icon={FileText}
                />
              </div>

              {/* Sub-tab selection */}
              <div className="bg-white/80 border border-slate-100 p-1 rounded-2xl flex text-[10.5px] font-extrabold shadow-sm select-none shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setActiveChart(0); // We will repurpose activeChart for sub-tabs to avoid adding more states: 0 = Analitik, 1 = Laporan & Audit
                    setShowInspections(false);
                  }}
                  className={`flex-1 py-1.5 rounded-xl transition-all duration-300 ${
                    activeChart === 0 ? 'bg-mbg-primary text-white shadow-sm' : 'text-slate-500 hover:text-mbg-primary'
                  }`}
                >
                  📊 Dashboard Analitik
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveChart(1); // 1 = Laporan & Audit tab
                    setShowInspections(false);
                  }}
                  className={`flex-1 py-1.5 rounded-xl transition-all duration-300 ${
                    activeChart === 1 ? 'bg-mbg-primary text-white shadow-sm' : 'text-slate-500 hover:text-mbg-primary'
                  }`}
                >
                  ⚠️ Laporan & Audit
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                <AnimatePresence mode="wait">
                  {/* SUB-TAB 1: ANALITIK DASHBOARD */}
                  {activeChart === 0 && (
                    <motion.div
                      key="subtab-analitik"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex-1 flex flex-col space-y-2 overflow-hidden"
                    >
                      {/* Chart Card — shrinks when inspections shown */}
                      {!showInspections && (
                        <GlassCard className="p-3 flex-1 flex flex-col relative overflow-hidden min-h-0">
                          <div className="flex justify-between items-center border-b border-slate-100 pb-1.5 mb-2 shrink-0">
                            <h4 className="text-[9px] font-extrabold text-mbg-primary uppercase tracking-wider flex items-center gap-1">
                              <BarChart2 className="w-3.5 h-3.5 text-mbg-primary" />
                              Tren Logistik Mingguan
                            </h4>
                            <span className="text-[8px] font-extrabold text-mbg-secondary bg-mbg-primary px-2 py-0.5 rounded-full uppercase">Weekly</span>
                          </div>
                          <div className="flex-1 flex items-center justify-center min-h-0">
                            <svg className="w-full h-full" viewBox="0 0 240 90">
                              <defs>
                                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#92D05D" stopOpacity="0.4" />
                                  <stop offset="100%" stopColor="#92D05D" stopOpacity="0" />
                                </linearGradient>
                              </defs>
                              <line x1="10" y1="10" x2="230" y2="10" stroke="#f1f5f9" strokeWidth="1" />
                              <line x1="10" y1="45" x2="230" y2="45" stroke="#f1f5f9" strokeWidth="1" />
                              <line x1="10" y1="80" x2="230" y2="80" stroke="#e2e8f0" strokeWidth="1" />
                              <path d="M 10,80 Q 50,30 90,45 T 170,20 T 230,15 L 230,80 Z" fill="url(#chartGrad)" />
                              <path d="M 10,80 Q 50,30 90,45 T 170,20 T 230,15" fill="none" stroke="#92D05D" strokeWidth="2" strokeLinecap="round" />
                              <text x="10" y="88" fill="#94a3b8" fontSize="6" fontFamily="sans-serif">Sen</text>
                              <text x="70" y="88" fill="#94a3b8" fontSize="6" fontFamily="sans-serif">Rab</text>
                              <text x="130" y="88" fill="#94a3b8" fontSize="6" fontFamily="sans-serif">Jum</text>
                              <text x="190" y="88" fill="#94a3b8" fontSize="6" fontFamily="sans-serif">Min</text>
                              <circle cx="170" cy="20" r="3.5" fill="#071E49" stroke="#92D05D" strokeWidth="1.5" />
                              <text x="178" y="19" fill="#071E49" fontSize="6" fontWeight="bold" fontFamily="sans-serif">185K Porsi</text>
                            </svg>
                          </div>
                        </GlassCard>
                      )}
                      {/* Rekomendasi Audit — toggle button */}
                      <div className="space-y-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setShowInspections(v => !v);
                            if (!showInspections) triggerToast('Rekomendasi Audit diperbarui!', 'success');
                          }}
                          className={`w-full py-2 px-3 rounded-xl font-extrabold text-[9.5px] shadow-sm flex items-center justify-between transition-all ${
                            showInspections
                              ? 'bg-slate-100 text-slate-600 border border-slate-200'
                              : 'bg-mbg-primary text-white'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-mbg-secondary" />
                            {showInspections ? 'Tutup Rekomendasi Audit' : 'Rekomendasi Audit & Inspeksi Dapur'}
                          </span>
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showInspections ? 'rotate-90' : ''}`} />
                        </button>

                        {showInspections && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-1.5 text-left overflow-hidden"
                          >
                            {inspectionRecs.map((rec, i) => (
                              <GlassCard key={i} className="p-2.5 border-l-4 border-l-mbg-supporting">
                                <div className="flex justify-between items-center">
                                  <h5 className="font-extrabold text-[9.5px] text-mbg-primary">{rec.name}</h5>
                                  <span className={`text-[7px] px-1.5 py-0.5 rounded-full font-bold uppercase ${rec.color}`}>Audit {rec.priority}</span>
                                </div>
                                <p className="text-[8px] text-slate-500 font-medium mt-0.5 leading-snug">{rec.reason}</p>
                              </GlassCard>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* SUB-TAB 2: LAPORAN & AUDIT VERIFICATION */}
                  {activeChart === 1 && (
                    <motion.div
                      key="subtab-laporan"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex-1 flex flex-col space-y-2 overflow-hidden"
                    >
                      {/* Verifikasi Laporan AI — shows result after action */}
                      <GlassCard className="p-2.5 border-l-4 border-l-mbg-supporting space-y-1.5 text-left shrink-0">
                        <div className="flex justify-between items-center">
                          <h4 className="text-[8.5px] font-extrabold text-mbg-primary uppercase tracking-wider flex items-center gap-1">
                            <ShieldAlert className="w-3 h-3 text-mbg-supporting" />
                            Verifikasi Laporan AI (Grade C)
                          </h4>
                          {verificationStatus === null && (
                            <span className="text-[7px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded-full animate-pulse">Verify 2</span>
                          )}
                        </div>

                        <AnimatePresence mode="wait">
                          {verificationStatus === null ? (
                            <motion.div key="pending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                              className="p-2 bg-white/70 rounded-xl border border-slate-100/50 text-[8.5px] space-y-1.5">
                              <div className="flex justify-between font-bold">
                                <span className="text-slate-800">Setiabudi - Batch #SET-002</span>
                                <span className="text-slate-400">09:12 WIB</span>
                              </div>
                              <p className="text-[8px] text-slate-500 leading-tight">AI Ragu (74%): Volume lauk fillet ayam kurang dari standar gizi 40g.</p>
                              <div className="flex gap-1.5 pt-0.5">
                                <button type="button"
                                  onClick={() => { setVerificationStatus('approved'); triggerToast('Batch Setiabudi Disetujui! QR Passport diterbitkan.', 'success'); }}
                                  className="flex-1 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-[8px] rounded-lg shadow-sm transition-all">
                                  ✓ SETUJUI (TERIMA)
                                </button>
                                <button type="button"
                                  onClick={() => { setVerificationStatus('rejected'); triggerToast('Batch Setiabudi Ditolak. Catatan dikirim ke kitchen.', 'warning'); }}
                                  className="flex-1 py-1.5 bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-[8px] rounded-lg shadow-sm transition-all">
                                  ✗ TOLAK + CATATAN
                                </button>
                              </div>
                            </motion.div>
                          ) : (
                            <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                              className={`p-2 rounded-xl border text-[8.5px] flex items-center gap-2 ${verificationStatus === 'approved' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
                              <span className="text-lg">{verificationStatus === 'approved' ? '✅' : '❌'}</span>
                              <div>
                                <span className="font-extrabold block">{verificationStatus === 'approved' ? 'Batch Disetujui — QR Diterbitkan' : 'Batch Ditolak — Catatan Dikirim'}</span>
                                <span className="text-[7.5px] opacity-70">Setiabudi #SET-002 • {verificationStatus === 'approved' ? 'QR Passport aktif' : 'Dapur diminta ulang produksi'}</span>
                              </div>
                              <button onClick={() => setVerificationStatus(null)} className="ml-auto text-[7.5px] font-bold underline opacity-60">Reset</button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </GlassCard>

                      {/* Notifikasi Anomali — flex-1 fills remaining height */}
                      <GlassCard className="p-2.5 flex-1 flex flex-col min-h-0 overflow-hidden">
                        <div className="flex items-center justify-between mb-1.5 shrink-0">
                          <h4 className="text-[8.5px] font-extrabold text-mbg-primary uppercase tracking-wider flex items-center gap-1">
                            <Bell className="w-3 h-3 text-mbg-primary" /> Notifikasi Anomali Terkini
                          </h4>
                        </div>

                        {/* Rekap AI Monitoring — compact 3-chip row */}
                        <div className="grid grid-cols-3 gap-1 shrink-0 mb-1.5">
                          <div className="p-1 bg-emerald-50 border border-emerald-100 rounded-lg text-center">
                            <span className="text-[6.5px] font-extrabold text-emerald-700 uppercase block">% Layak</span>
                            <span className="text-[11px] font-extrabold text-emerald-700">94.2%</span>
                          </div>
                          <div className="p-1 bg-amber-50 border border-amber-100 rounded-lg text-center">
                            <span className="text-[6.5px] font-extrabold text-amber-700 uppercase block">Inspeksi</span>
                            <span className="text-[11px] font-extrabold text-amber-700">8</span>
                          </div>
                          <div className="p-1 bg-rose-50 border border-rose-100 rounded-lg text-center">
                            <span className="text-[6.5px] font-extrabold text-rose-700 uppercase block">Ditolak</span>
                            <span className="text-[11px] font-extrabold text-rose-700">3</span>
                          </div>
                        </div>

                        {/* Alert items */}
                        <div className="flex-1 space-y-1.5 flex flex-col justify-start overflow-hidden">
                          {systemAlerts.map((alert) => (
                            <div key={alert.id} className="p-1.5 bg-white/70 border border-slate-100 rounded-xl flex gap-1.5 text-left">
                              <AlertTriangle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${alert.type === 'warning' ? 'text-amber-500' : 'text-mbg-primary'}`} />
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <h5 className="font-extrabold text-[8px] text-slate-800 leading-tight">{alert.title.replace('IoT Anomali: ', '')}</h5>
                                  <span className="text-[7px] text-slate-400 font-bold shrink-0 ml-1">{alert.time}</span>
                                </div>
                                <p className="text-[7.5px] text-slate-500 leading-tight mt-0.5">{alert.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </GlassCard>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* TAB 3: MENU LAPORAN & RIWAYAT (Terintegrasi) */}
          {activeTab === 'menu' && (
            <motion.div
              key="menu-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col space-y-2 overflow-hidden text-left"
            >
              {/* Internal Tab Switcher for Admin Menu Review */}
              <div className="bg-white/80 border border-slate-100 p-0.5 rounded-xl flex text-[9px] font-extrabold shadow-sm select-none shrink-0">
                <button
                  type="button"
                  onClick={() => setMenuSubTab('passport')}
                  className={`flex-1 py-1 rounded-lg transition ${
                    menuSubTab === 'passport' ? 'bg-mbg-primary text-white shadow-sm' : 'text-slate-500 hover:text-mbg-primary'
                  }`}
                >
                  🟢 Paspor Gizi
                </button>
                <button
                  type="button"
                  onClick={() => setMenuSubTab('history')}
                  className={`flex-1 py-1 rounded-lg transition ${
                    menuSubTab === 'history' ? 'bg-mbg-primary text-white shadow-sm' : 'text-slate-500 hover:text-mbg-primary'
                  }`}
                >
                  📅 Riwayat & Jadwal
                </button>
              </div>

              {/* Subtab content container */}
              <div className="flex-1 flex flex-col min-h-0 overflow-y-auto pr-0.5">
                {menuSubTab === 'passport' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2 pb-2">
                    {/* Header Card */}
                    <GlassCard className="p-3 space-y-2 relative overflow-hidden border-2 border-mbg-secondary shrink-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[7.5px] font-extrabold bg-mbg-secondary/20 text-mbg-primary border border-mbg-secondary/40 px-2 py-0.5 rounded-full uppercase tracking-wider">AI & IoT Verified</span>
                          <h3 className="font-extrabold text-[11px] text-mbg-primary mt-1 leading-tight">{menuData.name}</h3>
                          <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">BATCH ID: #PAS-0012-MT</p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <div className="text-right">
                            <span className="text-[7px] text-slate-400 font-bold uppercase block">Skor Mutu</span>
                            <span className="text-lg font-extrabold text-mbg-primary">98</span><span className="text-[9px] text-slate-400">/100</span>
                          </div>
                          <div className="px-2 py-1 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-[9px] text-center">
                            • Grade A
                          </div>
                        </div>
                      </div>

                      {/* Gizi grid */}
                      <div className="grid grid-cols-4 gap-1 text-center text-[8px]">
                        {[
                          ['Protein', `${menuData.protein}g`],
                          ['Karbo', `${menuData.karbo}g`],
                          ['Lemak', `${menuData.lemak}g`],
                          ['Energi', `${menuData.calories}k`]
                        ].map(([k,v]) => (
                          <div key={k} className="bg-white/80 p-1 rounded-lg border border-slate-100">
                            <span className="block text-[6.5px] text-slate-400 uppercase">{k}</span>
                            <span className="font-extrabold text-mbg-primary">{v}</span>
                          </div>
                        ))}
                      </div>

                      {/* Meta row */}
                      <div className="grid grid-cols-3 gap-1 text-[7.5px] text-center">
                        <div className="bg-slate-50 border border-slate-100 p-1 rounded-lg"><span className="text-slate-400 block text-[6.5px] uppercase">Tgl Produksi</span><span className="font-extrabold text-mbg-primary">22 Jul 2026</span></div>
                        <div className="bg-slate-50 border border-slate-100 p-1 rounded-lg"><span className="text-slate-400 block text-[6.5px] uppercase">Distribusi</span><span className="font-extrabold text-mbg-primary">09:00 WIB</span></div>
                        <div className="bg-amber-50 border border-amber-100 p-1 rounded-lg"><span className="text-amber-600 block text-[6.5px] uppercase">Alergen</span><span className="font-extrabold text-amber-800">Ikan, Susu</span></div>
                      </div>

                      {/* Distributor */}
                      <div className="bg-mbg-primary/5 border border-mbg-primary/10 px-2 py-1 rounded-lg text-[8px]">
                        <span className="text-[6.5px] font-extrabold text-slate-400 uppercase block">Asal Distributor</span>
                        <span className="font-extrabold text-mbg-primary">PT. Berkah Pangan Nusantara</span>
                      </div>

                      {/* IoT Higienitas + Geofencing */}
                      <div className="grid grid-cols-2 gap-1 text-[8.5px]">
                        <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-lg text-emerald-800 font-semibold">
                          <span>🌡️</span>
                          <div>
                            <span className="text-[6.5px] text-emerald-600 block uppercase font-bold leading-none">IoT Higienitas</span>
                            <span className="text-[7.5px] font-bold">Layak • 22.1°C</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-2 py-1 rounded-lg text-blue-800 font-semibold">
                          <span>📍</span>
                          <div>
                            <span className="text-[6.5px] text-blue-600 block uppercase font-bold leading-none">Geofencing GPS</span>
                            <span className="text-[7.5px] font-bold">Lokasi Terverifikasi</span>
                          </div>
                        </div>
                      </div>
                    </GlassCard>

                    {/* Audit Trail */}
                    <GlassCard className="p-3 space-y-2">
                      <h4 className="text-[8px] font-extrabold text-mbg-primary uppercase tracking-wider flex items-center gap-1">
                        🛡️ Audit Trail & Rantai Pasok Gizi
                      </h4>
                      <div className="space-y-2 border-l border-slate-200 pl-3.5 ml-1.5 text-[8px] relative">
                        {[
                          { title: 'Diproduksi - Dapur Sehat Menteng', desc: 'Lolos audit IoT sterilitas & AI bahan baku', time: '08:15' },
                          { title: 'Verifikasi Gizi AI (Grade A)', desc: `Protein ${menuData.protein}g • Karbo ${menuData.karbo}g • ${menuData.calories} kcal`, time: '08:22' },
                          { title: 'Logistik & Segel QR Boks', desc: 'Suhu stabil 19.5°C, segel digital terkunci', time: '08:45' }
                        ].map((step, idx) => (
                          <div key={idx} className="relative">
                            <span className="absolute -left-[19.5px] top-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-white" />
                            <div className="flex justify-between font-bold">
                              <span className="text-slate-800">{step.title}</span>
                              <span className="text-slate-400">{step.time}</span>
                            </div>
                            <span className="text-slate-500 block leading-tight">{step.desc}</span>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  </motion.div>
                )}

                {menuSubTab === 'history' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 pb-2 text-[8px]">
                    {/* Jadwal Mingguan */}
                    <GlassCard className="p-3 space-y-2">
                      <h4 className="text-[8.5px] font-extrabold text-mbg-primary uppercase tracking-wider">
                        📅 Jadwal Distribusi Minggu Ini
                      </h4>
                      <div className="space-y-1.5">
                        {[
                          { day: 'Rabu, 22 Jul', desc: 'Nasi Salmon & Sayur • 07:30 WIB', status: 'Selesai', color: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
                          { day: 'Kamis, 23 Jul', desc: 'Nasi Ayam Fillet Madu • 07:30 WIB', status: 'Besok', color: 'text-amber-700 bg-amber-50 border-amber-100' },
                          { day: 'Jumat, 24 Jul', desc: 'Nasi Telur Perkedel • 07:30 WIB', status: 'Terjadwal', color: 'text-slate-500 bg-slate-50 border-slate-100' }
                        ].map((j, i) => (
                          <div key={i} className="flex justify-between items-center p-1.5 bg-white/70 border border-slate-100/50 rounded-xl">
                            <div>
                              <span className="font-extrabold text-slate-800 block">{j.day}</span>
                              <span className="text-slate-500 text-[7.5px]">{j.desc}</span>
                            </div>
                            <span className={`text-[7px] px-1.5 py-0.5 rounded-full font-bold border uppercase shrink-0 ${j.color}`}>{j.status}</span>
                          </div>
                        ))}
                      </div>
                    </GlassCard>

                    {/* Riwayat Penerimaan */}
                    <GlassCard className="p-3 space-y-2">
                      <h4 className="text-[8.5px] font-extrabold text-mbg-primary uppercase tracking-wider">
                        📋 Riwayat Penerimaan MBG
                      </h4>
                      <div className="space-y-1.5">
                        {[
                          { name: menuData.name, info: `Hari ini • ${menuData.calories} kcal`, grade: 'Grade A', color: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
                          { name: 'Nasi Ayam Fillet Saus Madu', info: 'Selasa, 21 Jul • 580 kcal', grade: 'Grade A', color: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
                          { name: 'Nasi Telur Semur & Bayam', info: 'Senin, 20 Jul • 545 kcal', grade: 'Grade B', color: 'text-amber-700 bg-amber-50 border-amber-100' },
                          { name: 'Nasi Ikan Patin Bumbu', info: 'Jumat, 18 Jul • 610 kcal', grade: 'Grade A', color: 'text-emerald-700 bg-emerald-50 border-emerald-100' }
                        ].map((h, i) => (
                          <div key={i} className="flex justify-between items-center p-1.5 bg-white/70 border border-slate-100/50 rounded-xl">
                            <div>
                              <span className="font-extrabold text-slate-800 block">{h.name}</span>
                              <span className="text-slate-500 text-[7.5px]">{h.info}</span>
                            </div>
                            <span className={`text-[7px] px-1.5 py-0.5 rounded-full font-bold border shrink-0 ${h.color}`}>{h.grade}</span>
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
          {activeTab === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col space-y-2.5 overflow-hidden"
            >
              {/* Peta persebaran dapur MBG */}
              <div className="shrink-0">
                <MapCard mode="monitoring" interactive={true} />
              </div>

              {/* Monitoring Geofencing — status seluruh dapur */}
              <GlassCard className="p-3 flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between mb-2 shrink-0">
                  <h4 className="text-[9px] font-extrabold text-mbg-primary uppercase tracking-wider flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-mbg-primary" /> Monitoring Geofencing Dapur
                  </h4>
                  <span className="text-[7.5px] font-extrabold text-rose-700 bg-rose-50 border border-rose-100 px-1.5 py-0.5 rounded-full animate-pulse">1 Anomali</span>
                </div>

                <div className="space-y-1.5 flex-1 flex flex-col justify-start">
                  {[
                    { name: 'Dapur Sehat Menteng', addr: 'Jl. Menteng Raya No.12', status: 'Aktif & Resmi', gps: 'Koordinat Valid', color: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
                    { name: 'Dapur Sejahtera Setiabudi', addr: 'Jl. Setiabudi No.45', status: 'Aktif & Resmi', gps: 'Koordinat Valid', color: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
                    { name: 'Dapur Berkah Tebet', addr: 'Jl. Tebet Raya No.7', status: 'Aktif & Resmi', gps: 'Koordinat Valid', color: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
                    { name: '⚠️ Lokasi Tidak Dikenal', addr: 'Jl. Cipete Utara No.88', status: 'ANOMALI GPS', gps: 'Di luar radius resmi', color: 'text-rose-700 bg-rose-50 border-rose-200' },
                  ].map(item => (
                    <div key={item.name} className={`flex items-center justify-between p-2 border rounded-xl ${item.color}`}>
                      <div>
                        <span className="font-extrabold text-[8.5px] block leading-tight">{item.name}</span>
                        <span className="text-[7.5px] opacity-80">{item.addr} • {item.gps}</span>
                      </div>
                      <span className={`text-[7px] px-1.5 py-0.5 rounded-full font-extrabold border ${item.color} shrink-0`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Floating Bottom Nav */}
      <BottomNavigation
        activeTab={activeTab}
        onChangeTab={(tab) => {
          setActiveTab(tab as any);
          if (tab !== 'dashboard') setShowInspections(false); // reset details
        }}
        role="admin"
      />
    </div>
  );
};

export default AdminFlow;
