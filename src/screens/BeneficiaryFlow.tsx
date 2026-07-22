import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  QrCode, Star, ShieldCheck,
  Check, Upload, Trash2, HeartPulse, UserCircle,
  CalendarClock, MapPin, Clock, AlertTriangle
} from 'lucide-react';
import TopAppBar from '../components/TopAppBar';
import BottomNavigation from '../components/BottomNavigation';
import GlassCard from '../components/GlassCard';
import Timeline from '../components/Timeline';
import StatusBadge from '../components/StatusBadge';

interface BeneficiaryFlowProps {
  onBackToRoles: () => void;
  triggerToast: (msg: string, type: 'success' | 'info' | 'warning') => void;
}

export const BeneficiaryFlow: React.FC<BeneficiaryFlowProps> = ({ onBackToRoles, triggerToast }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'history' | 'complaint'>('dashboard');
  const [currentView, setCurrentView] = useState<'default' | 'scanner' | 'passport'>('default');
  const [rating, setRating] = useState<number>(0);
  const [ratingComment, setRatingComment] = useState('');
  const [complaintCategory, setComplaintCategory] = useState('Kemasan Rusak');
  const [complaintDesc, setComplaintDesc] = useState('');
  const [complaintPhoto, setComplaintPhoto] = useState<string | null>(null);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const passportTimeline = [
    { id: 'p1', label: 'Diproduksi - Dapur Sehat Menteng', time: '08:15', status: 'completed' as const, description: 'Lolos audit IoT sterilitas & AI bahan baku' },
    { id: 'p2', label: 'Verifikasi Gizi AI (Grade A)', time: '08:22', status: 'completed' as const, description: 'Protein 28g • Karbo 75g • Lemak 18g • 620 kcal' },
    { id: 'p3', label: 'Logistik & Segel QR Boks', time: '08:45', status: 'completed' as const, description: 'Suhu stabil 18.5°C, segel digital terkunci' },
    { id: 'p4', label: 'Tiba & Diterima SDN 01', time: '09:18', status: 'completed' as const, description: 'Segel dibuka, serah terima terverifikasi' }
  ];

  const categories = ['Kemasan Rusak', 'Rasa Kurang', 'Porsi Kurang', 'Keterlambatan'];

  const handleSimulatePhoto = () => {
    setComplaintPhoto('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=250&q=80');
    triggerToast('Foto masakan dilampirkan.', 'info');
  };

  const handleClearPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setComplaintPhoto(null);
  };

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintDesc.trim()) { triggerToast('Deskripsi aduan wajib diisi.', 'warning'); return; }
    setIsSubmitSuccess(true);
    setTimeout(() => {
      setIsSubmitSuccess(false);
      setComplaintDesc('');
      setComplaintPhoto(null);
      setActiveTab('dashboard');
      triggerToast('Aduan berhasil dikirim ke BGN RI!', 'success');
    }, 2500);
  };

  const tabTitle = activeTab === 'dashboard' ? 'Passport Gizi Anak' : activeTab === 'history' ? 'Riwayat & Jadwal' : 'Pusat Aduan Gizi';
  const tabSubtitle = activeTab === 'dashboard' ? 'Siswa: SDN 01 Menteng' : activeTab === 'history' ? 'Konsumsi & Distribusi MBG' : 'Formulir Laporan Layanan';

  return (
    <div className="w-full h-full bg-[#F4F7FB] flex flex-col justify-between overflow-hidden relative">
      <TopAppBar
        title={tabTitle}
        subtitle={tabSubtitle}
        onBack={onBackToRoles}
        rightContent={
          <div className="w-8 h-8 rounded-full bg-mbg-primary/10 text-mbg-primary flex items-center justify-center shadow-sm border border-mbg-primary/20">
            <UserCircle className="w-5 h-5" />
          </div>
        }
      />

      {/* Screen Body */}
      <div className="flex-1 overflow-hidden p-3 flex flex-col">
        <AnimatePresence mode="wait">

          {/* ── SCANNER VIEW ── */}
          {currentView === 'scanner' && (
            <motion.div key="scanner" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col space-y-3 overflow-hidden">
              <GlassCard className="p-3 flex-1 flex flex-col space-y-3">
                <div className="text-center">
                  <h3 className="font-extrabold text-[11px] text-mbg-primary">Pindai Barcode Makan Gizi</h3>
                  <p className="text-[9px] text-slate-500 mt-0.5">Scan QR pada boks makan untuk melihat audit gizi, higienitas dapur, dan digital passport.</p>
                </div>

                {/* Viewfinder */}
                <div className="relative flex-1 min-h-0 bg-slate-900 rounded-2xl border-2 border-mbg-secondary/80 flex items-center justify-center overflow-hidden shadow-inner">
                  <div className="absolute top-2.5 left-2.5 w-5 h-5 border-t-2 border-l-2 border-mbg-secondary rounded-tl" />
                  <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t-2 border-r-2 border-mbg-secondary rounded-tr" />
                  <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b-2 border-l-2 border-mbg-secondary rounded-bl" />
                  <div className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b-2 border-r-2 border-mbg-secondary rounded-br" />
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=MBG-QR-BATCH-SDN01-MENTENG-2025&bgcolor=0D1B2A&color=92D05D&qzone=2"
                    alt="QR Barcode Makan MBG"
                    className="w-32 h-32 object-contain rounded-xl opacity-90"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <motion.div animate={{ y: [-60, 60, -60] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="w-full h-0.5 bg-mbg-secondary absolute shadow-[0_0_10px_#92D05D] top-1/2 opacity-80" />
                </div>

                <div className="flex gap-2 shrink-0">
                  <button onClick={() => { setCurrentView('passport'); triggerToast('Barcode Berhasil Discan!', 'success'); }}
                    className="flex-1 py-2 px-3 rounded-xl bg-mbg-secondary text-mbg-primary font-extrabold text-[10px] shadow-sm flex items-center justify-center gap-1.5">
                    <QrCode className="w-3.5 h-3.5" /> Simulasi Scan Barcode
                  </button>
                  <button onClick={() => setCurrentView('default')}
                    className="py-2 px-4 rounded-xl bg-slate-200/60 text-slate-600 font-semibold text-[10px]">Batal</button>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* ── PASSPORT VIEW ── */}
          {currentView === 'passport' && (
            <motion.div key="passport" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col space-y-2.5 overflow-hidden">
              {/* Header card */}
              <GlassCard className="p-3 space-y-2 relative overflow-hidden border-2 border-mbg-secondary shrink-0">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[7.5px] font-extrabold bg-mbg-secondary/20 text-mbg-primary border border-mbg-secondary/40 px-2 py-0.5 rounded-full uppercase tracking-wider">AI & IoT Verified</span>
                    <h3 className="font-extrabold text-[11px] text-mbg-primary mt-1 leading-tight">Nasi Salmon & Brokoli</h3>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Batch ID: #PAS-0012-MT</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="text-right">
                      <span className="text-[7px] text-slate-400 font-bold uppercase block">Skor Mutu</span>
                      <span className="text-lg font-extrabold text-mbg-primary">98</span><span className="text-[9px] text-slate-400">/100</span>
                    </div>
                    <StatusBadge status="safe" label="Grade A" />
                  </div>
                </div>

                {/* Gizi grid */}
                <div className="grid grid-cols-4 gap-1 text-center text-[8px]">
                  {[['Protein','28g'],['Karbo','75g'],['Lemak','18g'],['Energi','620k']].map(([k,v]) => (
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
                <div className="bg-mbg-primary/5 border border-mbg-primary/10 px-2 py-1 rounded-lg">
                  <span className="text-[6.5px] font-extrabold text-slate-400 uppercase">Asal Distributor</span>
                  <span className="text-[8px] font-extrabold text-mbg-primary block">PT. Berkah Pangan Nusantara</span>
                </div>

                {/* IoT Higienitas + Geofencing status */}
                <div className="grid grid-cols-2 gap-1">
                  <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-lg">
                    <span className="text-emerald-600 text-[10px]">🌡️</span>
                    <div>
                      <span className="text-[6px] font-extrabold text-emerald-600 uppercase block">IoT Higienitas</span>
                      <span className="text-[8px] font-extrabold text-emerald-800">Layak · 22.1°C</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-blue-50 border border-blue-100 px-2 py-1 rounded-lg">
                    <span className="text-blue-600 text-[10px]">📍</span>
                    <div>
                      <span className="text-[6px] font-extrabold text-blue-600 uppercase block">Geofencing GPS</span>
                      <span className="text-[8px] font-extrabold text-blue-800">✓ Lokasi Terverifikasi</span>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Audit Trail */}
              <GlassCard className="p-3 flex-1 flex flex-col min-h-0">
                <h4 className="text-[8.5px] font-extrabold text-mbg-primary uppercase tracking-wider flex items-center gap-1 mb-2 shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Audit Trail & Rantai Pasok Gizi
                </h4>
                <div className="flex-1 overflow-hidden">
                  <Timeline steps={passportTimeline} compact={true} />
                </div>
                <button onClick={() => setCurrentView('default')}
                  className="w-full mt-2 py-2 rounded-xl bg-mbg-primary text-white font-extrabold text-[10px] text-center shrink-0">
                  Tutup Passport Gizi
                </button>
              </GlassCard>
            </motion.div>
          )}

          {/* ── DASHBOARD DEFAULT ── */}
          {activeTab === 'dashboard' && currentView === 'default' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col space-y-2.5 overflow-hidden text-left">

              {/* Today's Meal Card — compact */}
              <GlassCard className="p-3 space-y-2 relative overflow-hidden shrink-0">
                <div className="flex justify-between items-center">
                  <span className="text-[8px] font-extrabold text-mbg-primary uppercase tracking-wider">PAKET MAKAN HARI INI</span>
                  <span className="text-[7.5px] font-extrabold text-emerald-700 bg-emerald-100 border border-emerald-200 px-1.5 py-0.5 rounded-full">✓ Sudah Diterima</span>
                </div>
                <div className="flex gap-2.5 items-center">
                  <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80"
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-100 shadow-sm" alt="Salmon meal" />
                  <div className="space-y-0.5 flex-1">
                    <h4 className="font-extrabold text-[10px] text-mbg-primary leading-tight">Nasi Salmon & Tumis Sayur Sehat</h4>
                    <p className="text-[8.5px] text-slate-500 leading-tight">Salmon panggang, brokoli kukus, susu UHT 125ml, jeruk segar.</p>
                    {/* Inline rating + komentar */}
                    <div className="pt-0.5 space-y-1">
                      <div className="flex items-center gap-1">
                        <span className="text-[7.5px] text-slate-400 font-bold">Nilai:</span>
                        {[1,2,3,4,5].map(star => (
                          <button key={star} onClick={() => { setRating(star); }} className="p-0 focus:outline-none">
                            <Star className={`w-3 h-3 transition ${star <= rating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`} />
                          </button>
                        ))}
                        {rating > 0 && <span className="text-[7px] text-amber-600 font-bold ml-0.5">{rating}/5</span>}
                      </div>
                      {rating > 0 && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
                          <textarea
                            value={ratingComment}
                            onChange={e => setRatingComment(e.target.value)}
                            placeholder="Komentar makanan hari ini... (opsional)"
                            rows={1}
                            className="w-full px-2 py-1 text-[8px] rounded-lg border border-slate-200 bg-white/80 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-mbg-secondary resize-none leading-relaxed"
                          />
                          {ratingComment.trim() && (
                            <button
                              onClick={() => { triggerToast(`Ulasan ${rating}⭐ dikirim. Terima kasih!`, 'success'); setRatingComment(''); }}
                              className="mt-0.5 w-full py-0.5 rounded-lg bg-mbg-secondary/30 text-mbg-primary font-extrabold text-[7.5px] border border-mbg-secondary/40">
                              Kirim Ulasan
                            </button>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
                <button onClick={() => setCurrentView('scanner')}
                  className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-mbg-primary to-mbg-primary/95 text-white font-extrabold text-[10px] shadow-sm flex items-center justify-center gap-1.5">
                  <QrCode className="w-3.5 h-3.5 text-mbg-secondary" /> Buka Passport Gizi (Scan QR)
                </button>
              </GlassCard>

              {/* Jadwal Distribusi MBG */}
              <GlassCard className="p-3 space-y-2 shrink-0">
                <h4 className="text-[8.5px] font-extrabold text-mbg-primary uppercase tracking-wider flex items-center gap-1">
                  <CalendarClock className="w-3.5 h-3.5 text-mbg-primary" /> Jadwal Distribusi MBG
                </h4>
                <div className="grid grid-cols-2 gap-1.5 text-[8.5px]">
                  <div className="flex items-center gap-1.5 p-1.5 bg-white/70 border border-slate-100 rounded-xl">
                    <Clock className="w-3 h-3 text-mbg-primary shrink-0" />
                    <div>
                      <span className="text-slate-400 text-[7px] uppercase block">Besok - Kamis</span>
                      <span className="font-extrabold text-mbg-primary">Nasi Ayam Fillet</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 bg-white/70 border border-slate-100 rounded-xl">
                    <MapPin className="w-3 h-3 text-mbg-primary shrink-0" />
                    <div>
                      <span className="text-slate-400 text-[7px] uppercase block">Lokasi Dapur</span>
                      <span className="font-extrabold text-mbg-primary">Dapur Sehat Menteng</span>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Nutrition Summary */}
              <GlassCard className="p-3 flex-1 flex flex-col min-h-0">
                <h4 className="text-[8.5px] font-extrabold text-mbg-primary uppercase tracking-wider flex items-center gap-1 mb-2 shrink-0">
                  <HeartPulse className="w-3.5 h-3.5 text-rose-500" /> Ringkasan Nutrisi (Minggu Ini)
                </h4>
                <div className="flex-1 grid grid-cols-2 gap-2 content-start">
                  {[
                    { label: 'Kecukupan Protein', val: '145g', max: '180g', pct: 80, color: 'bg-mbg-secondary' },
                    { label: 'Asupan Kalori', val: '3.1K', max: '3.5K', pct: 88, color: 'bg-mbg-accent' },
                    { label: 'Asupan Lemak', val: '42g', max: '55g', pct: 76, color: 'bg-blue-400' },
                    { label: 'Serat Harian', val: '18g', max: '25g', pct: 72, color: 'bg-purple-400' },
                  ].map(item => (
                    <div key={item.label} className="p-2 bg-slate-50 border border-slate-100 rounded-xl">
                      <span className="text-slate-400 block font-bold text-[7px] uppercase">{item.label}</span>
                      <span className="text-[11px] font-extrabold text-mbg-primary">{item.val} <span className="text-[7.5px] font-medium text-slate-400">/ {item.max}</span></span>
                      <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden mt-1">
                        <div className={`${item.color} h-full`} style={{ width: `${item.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* ── RIWAYAT & JADWAL TAB ── */}
          {activeTab === 'history' && (
            <motion.div key="history" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col space-y-2.5 overflow-hidden text-left">

              {/* Jadwal minggu ini */}
              <GlassCard className="p-3 shrink-0">
                <h4 className="text-[8.5px] font-extrabold text-mbg-primary uppercase tracking-wider mb-2 flex items-center gap-1">
                  <CalendarClock className="w-3.5 h-3.5" /> Jadwal Distribusi Minggu Ini
                </h4>
                <div className="space-y-1">
                  {[
                    { day: 'Rabu, 22 Jul', menu: 'Nasi Salmon & Sayur', time: '07:30', status: 'Selesai' },
                    { day: 'Kamis, 23 Jul', menu: 'Nasi Ayam Fillet Madu', time: '07:30', status: 'Besok' },
                    { day: 'Jumat, 24 Jul', menu: 'Nasi Telur Perkedel', time: '07:30', status: 'Terjadwal' },
                  ].map(item => (
                    <div key={item.day} className="flex items-center justify-between p-1.5 bg-white/70 border border-slate-100 rounded-xl text-[8.5px]">
                      <div>
                        <span className="font-extrabold text-slate-700 block leading-tight">{item.day}</span>
                        <span className="text-slate-500">{item.menu} • {item.time} WIB</span>
                      </div>
                      <span className={`px-1.5 py-0.5 rounded-full font-extrabold text-[7px] uppercase ${item.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700' : item.status === 'Besok' ? 'bg-amber-100 text-amber-700 animate-pulse' : 'bg-slate-100 text-slate-500'}`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Riwayat Penerimaan */}
              <GlassCard className="p-3 flex-1 flex flex-col min-h-0">
                <h4 className="text-[8.5px] font-extrabold text-mbg-primary uppercase tracking-wider mb-2 shrink-0">Riwayat Penerimaan MBG</h4>
                <div className="space-y-1.5 flex-1 flex flex-col justify-start">
                  {[
                    { date: 'Rabu, 22 Jul', menu: 'Nasi Salmon & Brokoli', kal: 620, grade: 'A', badge: 'bg-emerald-100 text-emerald-700' },
                    { date: 'Selasa, 21 Jul', menu: 'Nasi Ayam Fillet Saus Madu', kal: 580, grade: 'A', badge: 'bg-emerald-100 text-emerald-700' },
                    { date: 'Senin, 20 Jul', menu: 'Nasi Telur Semur & Bayam', kal: 545, grade: 'B', badge: 'bg-amber-100 text-amber-700' },
                    { date: 'Jumat, 18 Jul', menu: 'Nasi Ikan Patin Bumbu', kal: 610, grade: 'A', badge: 'bg-emerald-100 text-emerald-700' },
                  ].map(item => (
                    <div key={item.date} className="flex items-center justify-between p-2 bg-white/70 border border-slate-100 rounded-xl text-[8.5px]">
                      <div>
                        <span className="font-extrabold text-slate-700 block leading-tight">{item.menu}</span>
                        <span className="text-slate-400 text-[7.5px]">{item.date} • {item.kal} kcal</span>
                      </div>
                      <span className={`px-1.5 py-0.5 rounded-full font-extrabold text-[7.5px] uppercase ${item.badge}`}>Grade {item.grade}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* ── ADUAN TAB ── */}
          {activeTab === 'complaint' && (
            <motion.div key="complaint" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col overflow-hidden text-left">
              <AnimatePresence mode="wait">
                {isSubmitSuccess ? (
                  <motion.div key="success" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center text-center space-y-3 p-6 bg-white/90 border border-slate-100 rounded-3xl">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <Check className="w-7 h-7 text-emerald-600 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-mbg-primary">Aduan Terkirim!</h4>
                      <p className="text-[9.5px] text-slate-500 max-w-[200px] leading-relaxed mt-1">Laporan telah tercatat di basis data BGN RI untuk pemeriksaan dapur terkait.</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmitComplaint} className="flex-1 flex flex-col space-y-2.5">
                    <GlassCard className="p-3 flex-1 flex flex-col space-y-2.5">
                      <div>
                        <h3 className="font-extrabold text-[10px] text-mbg-primary">Form Aduan Gizi MBG</h3>
                        <p className="text-[8.5px] text-slate-500">Bantu kami menjaga kualitas makanan Program MBG.</p>
                      </div>

                      {/* Category */}
                      <div>
                        <label className="text-[7.5px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">Kategori Aduan</label>
                        <div className="flex flex-wrap gap-1">
                          {categories.map(cat => (
                            <button key={cat} type="button" onClick={() => setComplaintCategory(cat)}
                              className={`px-2.5 py-1 rounded-lg text-[8.5px] font-extrabold border transition-all ${complaintCategory === cat ? 'bg-mbg-primary text-white border-mbg-primary' : 'bg-white/70 text-slate-600 border-slate-200'}`}>
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Photo upload */}
                      <div>
                        <label className="text-[7.5px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">Bukti Foto (Opsional)</label>
                        {complaintPhoto ? (
                          <div className="relative w-full h-20 rounded-xl overflow-hidden border border-slate-200">
                            <img src={complaintPhoto} className="w-full h-full object-cover" alt="preview" />
                            <button type="button" onClick={handleClearPhoto} className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-900/80 text-white">
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <button type="button" onClick={handleSimulatePhoto}
                            className="w-full h-16 border border-dashed border-slate-300 rounded-xl bg-white/70 flex items-center justify-center gap-1.5 text-slate-400">
                            <Upload className="w-4 h-4" />
                            <span className="text-[8.5px] font-extrabold uppercase tracking-wider">Simulasikan Upload Foto</span>
                          </button>
                        )}
                      </div>

                      {/* Description */}
                      <div className="flex-1 flex flex-col">
                        <label className="text-[7.5px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1">Deskripsi Aduan</label>
                        <textarea value={complaintDesc} onChange={e => setComplaintDesc(e.target.value)}
                          placeholder="Contoh: Sayur terlalu asin / Susu bocor dalam pengemasan..."
                          rows={3}
                          className="flex-1 w-full p-2.5 rounded-xl border border-slate-200 bg-white/70 text-[9px] leading-relaxed placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-mbg-primary resize-none" />
                      </div>

                      <button type="submit"
                        className="w-full py-2 px-3 rounded-xl bg-rose-500 text-white font-extrabold text-[10px] shadow-sm flex items-center justify-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" /> Kirim Aduan ke BGN RI
                      </button>
                    </GlassCard>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <BottomNavigation activeTab={activeTab} onChangeTab={tab => { setActiveTab(tab as any); setCurrentView('default'); }} role="beneficiary" />
    </div>
  );
};

export default BeneficiaryFlow;
