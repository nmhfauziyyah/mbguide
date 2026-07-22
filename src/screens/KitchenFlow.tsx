import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Utensils, Camera, QrCode, 
  RefreshCw, Layers, UserCircle, MapPin, ShieldCheck, Navigation 
} from 'lucide-react';
import MapCard from '../components/MapCard';
import TopAppBar from '../components/TopAppBar';
import BottomNavigation from '../components/BottomNavigation';
import GlassCard from '../components/GlassCard';
import StatisticCard from '../components/StatisticCard';
import SensorCard from '../components/SensorCard';
import AIResultCard from '../components/AIResultCard';

interface KitchenFlowProps {
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
  setMenuData: React.Dispatch<React.SetStateAction<{
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
  }>>;
}

export const KitchenFlow: React.FC<KitchenFlowProps> = ({ onBackToRoles, triggerToast, menuData, setMenuData }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'scan' | 'qr-batch' | 'menu' | 'lokasi'>('dashboard');
  const [geoValidated, setGeoValidated] = useState<null | boolean>(null);
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'done'>('idle');
  
  // Menu manual input editing states
  const [editName, setEditName] = useState(menuData.name);
  const [editNasi, setEditNasi] = useState(menuData.nasiGram);
  const [editProteinGram, setEditProteinGram] = useState(menuData.proteinGram);
  const [editProteinType, setEditProteinType] = useState(menuData.proteinType);
  const [editSayurGram, setEditSayurGram] = useState(menuData.sayurGram);
  const [editSayurType, setEditSayurType] = useState(menuData.sayurType);
  
  // Dummy generated QR passes
  const [qrPasses, setQrPasses] = useState([
    { id: 'PAS-0012-MT', menu: 'Nasi Salmon & Brokoli', qty: 450, time: '08:24 WIB', school: 'SDN 01 Menteng', status: 'Ready' },
    { id: 'PAS-0011-MT', menu: 'Nasi Ayam Fillet Saus Madu', qty: 800, time: 'Kemarin', school: 'SMPN 05 Jakarta', status: 'Delivered' }
  ]);

  // Handle generating QR
  const handleGenerateQR = () => {
    const newPass = {
      id: `PAS-0013-MT`,
      menu: menuData.name,
      qty: 450,
      time: '08:35 WIB',
      school: 'SDN 01 Menteng',
      status: 'Ready'
    };
    setQrPasses([newPass, ...qrPasses]);
    triggerToast('QR Digital Passport Berhasil Diterbitkan!', 'success');
    setActiveTab('qr-batch');
    setScanState('idle');
  };

  // Handle saving and reporting menu data to BGN
  const handleSaveMenu = () => {
    // Simple nutrition estimation based on grams
    const calories = Math.round(editNasi * 1.3 + editProteinGram * 2.1 + editSayurGram * 0.3);
    const protein = Math.round(editProteinGram * 0.25 + editSayurGram * 0.03 + editNasi * 0.03);
    const karbo  = Math.round(editNasi * 0.5 + editSayurGram * 0.06);
    const lemak  = Math.round(editProteinGram * 0.08 + editNasi * 0.02);

    setMenuData({
      name: editName,
      nasiGram: editNasi,
      proteinGram: editProteinGram,
      proteinType: editProteinType,
      sayurGram: editSayurGram,
      sayurType: editSayurType,
      calories,
      protein,
      karbo,
      lemak,
    });
    setActiveTab('dashboard');
    triggerToast('Data menu berhasil dilaporkan ke BGN Pusat! 📊', 'success');
  };

  return (
    <div className="w-full h-full bg-[#F4F7FB] flex flex-col justify-between overflow-hidden relative">
      {/* Dynamic top bar depending on active sub-screen */}
      <TopAppBar 
        title={
          activeTab === 'dashboard' 
            ? 'Dapur Sehat Menteng' 
            : activeTab === 'scan' 
              ? 'AI Gizi Scanner' 
              : activeTab === 'qr-batch'
                ? 'Batch Passport QR'
                : 'Verifikasi Lokasi'
        }
        subtitle={
          activeTab === 'dashboard'
            ? 'ID: #MBG-JKT-004'
            : activeTab === 'scan'
              ? 'Verifikasi Kelayakan Makanan'
              : activeTab === 'qr-batch'
                ? 'Daftar Barcode Aktif'
                : 'Geofencing & Validasi Distribusi'
        }
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
          
          {/* TAB 1: KITCHEN DASHBOARD */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col justify-between space-y-3 overflow-hidden"
            >
              {/* Top Row: 1. Production Progress & 2. Deliveries Queue side-by-side */}
              <div className="grid grid-cols-2 gap-2.5 shrink-0">
                <StatisticCard
                  title="Produksi Makan"
                  value="1,250"
                  unit="Porsi"
                  icon={Utensils}
                  progress={83}
                />

                <GlassCard className="p-3 flex flex-col justify-between">
                  <h4 className="text-[9px] font-extrabold text-mbg-primary uppercase tracking-wider mb-1">Antrian Kirim</h4>
                  
                  <div className="space-y-1.5 text-[8.5px] flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-center p-1 bg-white/70 rounded-lg border border-slate-100/50">
                      <span className="font-extrabold text-slate-700">SDN 01 Menteng</span>
                      <span className="px-1.5 py-0.5 rounded bg-green-50 text-green-700 font-extrabold">450 porsi</span>
                    </div>

                    <div className="flex justify-between items-center p-1 bg-white/70 rounded-lg border border-slate-100/50">
                      <span className="font-extrabold text-slate-700">SMPN 05 Jkt</span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 font-extrabold">800 porsi</span>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Middle Row: 3. IoT Sensor Overview (Full width) */}
              <div className="shrink-0">
                <SensorCard kitchenName="Kondisi Sterilitas Ruang Dapur" interactive={false} />
              </div>

              {/* Bottom Row: 4. Today's Menu Spec */}
              <GlassCard className="p-3 flex flex-col relative overflow-hidden shrink-0 space-y-2">
                <div className="flex justify-between items-center border-b border-slate-100 pb-1.5 shrink-0">
                  <span className="text-[8.5px] font-extrabold text-mbg-primary uppercase tracking-wider">Menu Makan Hari Ini</span>
                  <span className="text-[8px] font-extrabold text-emerald-700 bg-emerald-100 border border-emerald-200 px-1.5 py-0.5 rounded-full">Nutrisi Seimbang</span>
                </div>
                <div className="flex gap-3 items-center">
                  <img 
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=120&q=80" 
                    className="w-10 h-10 rounded-xl object-cover shrink-0 border border-slate-100 shadow-sm" 
                    alt="Salmon Menu"
                  />
                  <div className="space-y-0.5 text-left leading-tight flex-1">
                    <h4 className="font-extrabold text-[9.5px] text-mbg-primary">{menuData.name}</h4>
                    {/* Komposisi input rows */}
                    <div className="flex gap-2 text-[8px] text-slate-600 mt-0.5">
                      <span className="bg-white border border-slate-100 px-1.5 py-0.5 rounded font-bold">Nasi {menuData.nasiGram}g</span>
                      <span className="bg-white border border-slate-100 px-1.5 py-0.5 rounded font-bold">{menuData.proteinType} {menuData.proteinGram}g</span>
                      <span className="bg-white border border-slate-100 px-1.5 py-0.5 rounded font-bold">{menuData.sayurType} {menuData.sayurGram}g</span>
                    </div>
                    <div className="flex gap-2 text-[8px] text-slate-500 mt-0.5">
                      <span>{menuData.calories} kkal</span><span>•</span>
                      <span>{menuData.protein}g Protein</span><span>•</span>
                      <span>{menuData.karbo}g Karbo</span>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Two Action Buttons */}
              <div className="grid grid-cols-2 gap-2 shrink-0">
                <button
                  onClick={() => setActiveTab('scan')}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-mbg-primary to-mbg-primary/95 text-white font-extrabold text-[9.5px] shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-mbg-secondary stroke-[2.5]" />
                  Scan AI Kelayakan
                </button>
                <button
                  onClick={() => { handleGenerateQR(); }}
                  className="py-2.5 px-3 rounded-xl bg-mbg-secondary/20 text-mbg-primary font-extrabold text-[9.5px] border border-mbg-secondary/40 flex items-center justify-center gap-1.5"
                >
                  <QrCode className="w-3.5 h-3.5 text-mbg-primary" />
                  Generate QR Batch
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 2: AI SCANNER VIEW */}
          {activeTab === 'scan' && (
            <motion.div
              key="scan"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {scanState === 'idle' && (
                <GlassCard className="p-5 flex flex-col items-center justify-center text-center space-y-5">
                  <div className="w-24 h-24 rounded-full bg-mbg-accent/20 flex items-center justify-center text-mbg-primary relative">
                    <Camera className="w-12 h-12 stroke-[1.5]" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-mbg-secondary text-mbg-primary flex items-center justify-center font-bold text-xs">
                      AI
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-extrabold text-xs text-mbg-primary">Arahkan Kamera Ke Menu Makanan</h3>
                    <p className="text-[10px] text-slate-500 font-medium max-w-xs leading-relaxed">
                      Sistem AI akan secara otomatis menganalisis komposisi gizi, volume porsi, kesegaran protein, dan kelayakan saji bahan masakan.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setScanState('scanning');
                      setTimeout(() => {
                        setScanState('done');
                      }, 2500);
                    }}
                    className="w-full py-2.5 px-4 rounded-2xl bg-mbg-primary text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 hover:bg-mbg-primary/95 transition-all"
                  >
                    <Camera className="w-4 h-4 text-mbg-secondary" />
                    <span>Mulai Pindai Makanan</span>
                  </button>
                </GlassCard>
              )}

              {scanState === 'scanning' && (
                <GlassCard className="p-4 space-y-4">
                  {/* Camera simulated viewfinder */}
                  <div className="relative rounded-3xl overflow-hidden h-60 bg-slate-950 flex items-center justify-center border-2 border-mbg-accent shadow-inner">
                    <img 
                      src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80" 
                      className="w-full h-full object-cover opacity-60 filter blur-[1px]" 
                      alt="Camera meal scan feed"
                    />
                    
                    {/* Bounding box guide corners */}
                    <div className="absolute inset-8 border-2 border-white/20 rounded-2xl flex items-center justify-center pointer-events-none">
                      {/* Laser scanning lines */}
                      <motion.div
                        animate={{ y: [-70, 70, -70] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                        className="w-full h-0.5 bg-gradient-to-r from-transparent via-mbg-secondary to-transparent shadow-[0_0_12px_#92D05D] absolute top-1/2"
                      />
                    </div>

                    {/* Scanner Loader Overlay */}
                    <div className="absolute bg-slate-950/80 backdrop-blur-sm p-4 rounded-2xl flex flex-col items-center space-y-2 border border-white/10 select-none">
                      <RefreshCw className="w-6 h-6 text-mbg-secondary animate-spin" />
                      <span className="text-[10px] font-extrabold tracking-wider text-white uppercase">AI Mengkalkulasi Gizi...</span>
                      <span className="text-[8px] text-white/50 block">Menganalisis kalori & protein</span>
                    </div>
                  </div>
                </GlassCard>
              )}

              {scanState === 'done' && (
                <AIResultCard
                  foodName="Nasi Salmon & Brokoli"
                  imageSrc="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
                  confidence={98.6}
                  calories={620}
                  protein={28}
                  carbs={75}
                  fat={18}
                  qualityScore="A"
                  recommendation="Mengandung asam lemak omega-3 tinggi dari salmon dan serat optimal dari brokoli. Porsi sesuai dengan panduan kecukupan gizi anak sekolah dasar."
                  onGenerateQR={handleGenerateQR}
                />
              )}
            </motion.div>
          )}

          {/* TAB 3: QR BATCH + MANAJEMEN DISTRIBUSI */}
          {activeTab === 'qr-batch' && (
            <motion.div
              key="qr-batch"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col space-y-2.5 overflow-hidden"
            >
              {/* QR Digital Passport — compact list */}
              <GlassCard className="p-3 shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-extrabold text-[9px] text-mbg-primary uppercase tracking-wider flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5" /> QR Digital Passport Terbitan
                  </h3>
                  <span className="text-[7.5px] font-extrabold text-mbg-secondary bg-mbg-primary px-2 py-0.5 rounded-full">{qrPasses.length} Batch</span>
                </div>
                <div className="space-y-1.5">
                  {qrPasses.map((pass) => (
                    <div key={pass.id} className="flex items-center justify-between p-2 bg-white/70 border border-slate-100 rounded-xl border-l-2 border-l-mbg-primary">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded-lg bg-mbg-primary/5 border border-mbg-primary/10">
                          <QrCode className="w-5 h-5 text-mbg-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="font-extrabold text-[8.5px] text-mbg-primary">{pass.id}</span>
                            <span className={`text-[7px] px-1 py-0.5 rounded-full font-bold ${pass.status === 'Ready' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                              {pass.status === 'Ready' ? 'Siap Kirim' : 'Terkirim'}
                            </span>
                          </div>
                          <span className="text-[7.5px] text-slate-500 block">{pass.menu} • {pass.qty} porsi → {pass.school}</span>
                        </div>
                      </div>
                      <span className="text-[7px] text-slate-400 font-bold shrink-0">{pass.time}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Manajemen Distribusi — data penerima manfaat real-time */}
              <GlassCard className="p-3 flex-1 flex flex-col min-h-0">
                <h3 className="font-extrabold text-[9px] text-mbg-primary uppercase tracking-wider flex items-center gap-1 mb-2 shrink-0">
                  <Layers className="w-3.5 h-3.5" /> Manajemen Distribusi — Penerima Manfaat
                </h3>

                {/* Input jadwal distribusi */}
                <div className="grid grid-cols-3 gap-1.5 mb-2 shrink-0">
                  <div className="bg-white/70 border border-slate-100 rounded-xl p-1.5 text-center">
                    <span className="text-[7px] font-extrabold text-slate-400 uppercase block">Tgl Distribusi</span>
                    <span className="text-[9px] font-extrabold text-mbg-primary">23 Jul 2026</span>
                  </div>
                  <div className="bg-white/70 border border-slate-100 rounded-xl p-1.5 text-center">
                    <span className="text-[7px] font-extrabold text-slate-400 uppercase block">Jam Kirim</span>
                    <span className="text-[9px] font-extrabold text-mbg-primary">07:00 WIB</span>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-1.5 text-center">
                    <span className="text-[7px] font-extrabold text-emerald-600 uppercase block">Total Porsi</span>
                    <span className="text-[9px] font-extrabold text-emerald-700">1,250</span>
                  </div>
                </div>

                {/* Penerima Manfaat real-time table */}
                <div className="flex-1 space-y-1.5 overflow-hidden flex flex-col justify-start">
                  {[
                    { school: 'SDN 01 Menteng', qty: 450, students: 450, status: 'Menunggu Kirim', color: 'text-amber-700 bg-amber-50 border-amber-100' },
                    { school: 'SMPN 05 Jakarta', qty: 800, students: 800, status: 'Menunggu Kirim', color: 'text-amber-700 bg-amber-50 border-amber-100' },
                    { school: 'SDN 03 Tebet', qty: 380, students: 380, status: 'Sudah Diterima', color: 'text-emerald-700 bg-emerald-50 border-emerald-100' },
                  ].map(item => (
                    <div key={item.school} className="flex items-center justify-between p-2 bg-white/70 border border-slate-100 rounded-xl">
                      <div>
                        <span className="font-extrabold text-[9px] text-slate-700 block leading-tight">{item.school}</span>
                        <span className="text-[7.5px] text-slate-400">{item.students} siswa penerima • {item.qty} porsi</span>
                      </div>
                      <span className={`text-[7px] px-1.5 py-0.5 rounded-full font-extrabold border ${item.color}`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* TAB 4: MANUAL MENU INPUT */}
          {activeTab === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col space-y-2.5 overflow-hidden text-left"
            >
              <GlassCard className="p-3 flex flex-col flex-1 min-h-0 justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-1.5 shrink-0">
                    <span className="text-[8.5px] font-extrabold text-mbg-primary uppercase tracking-wider flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" /> Pencatatan Gizi Manual
                    </span>
                    <span className="text-[7.5px] font-extrabold text-emerald-700 bg-emerald-100 border border-emerald-200 px-1.5 py-0.5 rounded-full">Dapur Menteng</span>
                  </div>

                  <p className="text-[7.5px] text-slate-500 leading-normal shrink-0">
                    Input komposisi hidangan hari ini. Kandungan gizi makro & energi otomatis terkalkulasi dan disinkronkan ke pusat serta penerima manfaat.
                  </p>

                  <div className="space-y-2 flex-1 overflow-y-auto pr-0.5">
                    {/* Nama Menu */}
                    <div className="space-y-0.5">
                      <label className="text-[7px] font-extrabold text-slate-400 uppercase tracking-wider">Nama Menu</label>
                      <input
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        className="w-full px-2 py-1 text-[8.5px] rounded-lg border border-slate-200 bg-white/80 focus:outline-none focus:ring-1 focus:ring-mbg-secondary font-semibold"
                        placeholder="cth: Nasi Salmon & Tumis Sayur Sehat"
                      />
                    </div>

                    {/* Grams Grid */}
                    <div className="grid grid-cols-3 gap-1.5">
                      <div className="space-y-0.5">
                        <label className="text-[7px] font-extrabold text-slate-400 uppercase tracking-wider">Nasi (Gram)</label>
                        <input
                          type="number"
                          value={editNasi}
                          onChange={e => setEditNasi(Number(e.target.value))}
                          min={0}
                          className="w-full px-2 py-1 text-[8.5px] rounded-lg border border-slate-200 bg-white/80 focus:outline-none focus:ring-1 focus:ring-mbg-secondary font-bold"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <label className="text-[7px] font-extrabold text-slate-400 uppercase tracking-wider">Protein (Gram)</label>
                        <input
                          type="number"
                          value={editProteinGram}
                          onChange={e => setEditProteinGram(Number(e.target.value))}
                          min={0}
                          className="w-full px-2 py-1 text-[8.5px] rounded-lg border border-slate-200 bg-white/80 focus:outline-none focus:ring-1 focus:ring-mbg-secondary font-bold"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <label className="text-[7px] font-extrabold text-slate-400 uppercase tracking-wider">Sayur (Gram)</label>
                        <input
                          type="number"
                          value={editSayurGram}
                          onChange={e => setEditSayurGram(Number(e.target.value))}
                          min={0}
                          className="w-full px-2 py-1 text-[8.5px] rounded-lg border border-slate-200 bg-white/80 focus:outline-none focus:ring-1 focus:ring-mbg-secondary font-bold"
                        />
                      </div>
                    </div>

                    {/* Types Grid */}
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="space-y-0.5">
                        <label className="text-[7px] font-extrabold text-slate-400 uppercase tracking-wider">Jenis Protein</label>
                        <input
                          value={editProteinType}
                          onChange={e => setEditProteinType(e.target.value)}
                          className="w-full px-2 py-1 text-[8.5px] rounded-lg border border-slate-200 bg-white/80 focus:outline-none focus:ring-1 focus:ring-mbg-secondary font-semibold"
                          placeholder="cth: Salmon, Ayam"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <label className="text-[7px] font-extrabold text-slate-400 uppercase tracking-wider">Jenis Sayur</label>
                        <input
                          value={editSayurType}
                          onChange={e => setEditSayurType(e.target.value)}
                          className="w-full px-2 py-1 text-[8.5px] rounded-lg border border-slate-200 bg-white/80 focus:outline-none focus:ring-1 focus:ring-mbg-secondary font-semibold"
                          placeholder="cth: Brokoli, Bayam"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  onClick={handleSaveMenu}
                  className="w-full py-2 rounded-xl bg-mbg-primary text-white font-extrabold text-[9px] flex items-center justify-center gap-1.5 shadow-sm transition active:scale-[0.98] shrink-0 mt-2"
                >
                  <UserCircle className="w-3.5 h-3.5 text-mbg-secondary" />
                  Simpan & Laporkan ke BGN Pusat
                </button>
              </GlassCard>
            </motion.div>
          )}

          {/* TAB 5: VERIFIKASI LOKASI */}
          {activeTab === 'lokasi' && (
            <motion.div
              key="lokasi"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col space-y-2.5 overflow-hidden"
            >
              {/* Peta Lokasi Dapur — compact height */}
              <div className="shrink-0">
                <MapCard mode="monitoring" interactive={false} compact={true} />
              </div>

              {/* Status Geofencing + Validasi — satu card */}
              <GlassCard className="p-2.5 flex-1 flex flex-col min-h-0">
                {/* Geofencing status header */}
                <h4 className="text-[8px] font-extrabold text-mbg-primary uppercase tracking-wider mb-1.5 flex items-center gap-1 shrink-0">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" /> Status Geofencing Dapur
                </h4>

                {/* 4 baris compact — label kiri, nilai kanan, tidak wrap */}
                <div className="space-y-1 shrink-0 mb-2">
                  {[
                    { label: 'Koordinat GPS', value: '-6.1944°S  106.8229°E' },
                    { label: 'Radius Zona Resmi', value: '500 m — Terpenuhi' },
                    { label: 'Posisi GPS Saat Ini', value: 'Dalam radius resmi' },
                    { label: 'Whitelist Distributor', value: 'PT. Berkah Pangan' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between px-2 py-1 bg-white/70 border border-slate-100 rounded-lg">
                      <span className="text-[7.5px] text-slate-500 font-semibold shrink-0">{item.label}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-[7.5px] font-extrabold text-slate-700">{item.value}</span>
                        <span className="text-emerald-500 text-[9px] font-bold">✓</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100 mb-2 shrink-0" />

                {/* Validasi Lokasi */}
                <h4 className="text-[8px] font-extrabold text-mbg-primary uppercase tracking-wider mb-1 flex items-center gap-1 shrink-0">
                  <Navigation className="w-3 h-3 text-mbg-primary" /> Validasi Lokasi Sebelum Distribusi
                </h4>
                <p className="text-[7.5px] text-slate-500 leading-relaxed mb-2 shrink-0">
                  Sistem verifikasi koordinat GPS dapur sebelum akses distribusi dibuka. Dapur di luar radius resmi diblokir otomatis.
                </p>
                <div className="flex-1 flex flex-col justify-end">
                  <AnimatePresence mode="wait">
                    {geoValidated === null && (
                      <motion.button key="btn-validate"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        onClick={() => { setTimeout(() => setGeoValidated(true), 1200); triggerToast('Memverifikasi koordinat GPS dapur...', 'info'); }}
                        className="w-full py-2 px-3 rounded-xl bg-mbg-primary text-white font-extrabold text-[9.5px] flex items-center justify-center gap-1.5 shadow-sm">
                        <MapPin className="w-3.5 h-3.5 text-mbg-secondary" /> Validasi Lokasi Dapur Sekarang
                      </motion.button>
                    )}
                    {geoValidated === true && (
                      <motion.div key="validated"
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        className="p-2 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                        <div className="flex-1">
                          <span className="font-extrabold text-[9px] text-emerald-800 block">Lokasi Terverifikasi ✓</span>
                          <span className="text-[7.5px] text-emerald-600">Dalam radius resmi — Akses distribusi dibuka.</span>
                        </div>
                        <button onClick={() => setGeoValidated(null)} className="text-[7.5px] text-emerald-600 font-bold underline shrink-0">Reset</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
          if (tab !== 'scan') setScanState('idle'); // reset scan states
        }}
        role="kitchen"
      />
    </div>
  );
};

export default KitchenFlow;
