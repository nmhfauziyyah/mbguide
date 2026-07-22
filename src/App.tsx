import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Info, RefreshCw, BellRing } from 'lucide-react';

// Screens
import SplashScreen from './screens/SplashScreen';
import RoleSelection from './screens/RoleSelection';
import LoginScreen from './screens/LoginScreen';
import KitchenFlow from './screens/KitchenFlow';
import DistributorFlow from './screens/DistributorFlow';
import AdminFlow from './screens/AdminFlow';
import BeneficiaryFlow from './screens/BeneficiaryFlow';

interface ToastState {
  msg: string;
  type: 'success' | 'info' | 'warning';
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'roles' | 'login' | 'app'>('splash');
  const [activeRole, setActiveRole] = useState<'kitchen' | 'distributor' | 'admin' | 'beneficiary' | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const triggerToast = (msg: string, type: 'success' | 'info' | 'warning') => {
    setToast({ msg, type });
  };

  const navigateToRoles = () => {
    setCurrentScreen('roles');
    setActiveRole(null);
  };

  const handleSelectRole = (role: 'kitchen' | 'distributor' | 'admin' | 'beneficiary') => {
    setActiveRole(role);
    setCurrentScreen('login');
  };

  const handleLoginSuccess = () => {
    if (!activeRole) return;
    setCurrentScreen('app');
    triggerToast(
      `Masuk berhasil sebagai ${
        activeRole === 'kitchen' 
          ? 'Pengelola Dapur' 
          : activeRole === 'distributor' 
            ? 'Distributor' 
            : activeRole === 'admin' 
              ? 'Admin Pemerintah' 
              : 'Penerima Manfaat'
      }`, 
      'success'
    );
  };

  const resetPrototype = () => {
    setCurrentScreen('splash');
    setActiveRole(null);
    triggerToast('Prototipe direset ke Splash Screen', 'success');
  };

  // Simulate an IoT / AI warning notification
  const simulateLiveNotification = () => {
    triggerToast('IoT Alert: Dapur Setiabudi Terdeteksi Suhu > 28°C!', 'warning');
  };

  return (
    <div className="min-h-screen w-screen bg-slate-950 font-sans text-slate-800 flex flex-col md:flex-row items-center justify-center py-6 px-4 md:py-10 md:px-8 ambient-mesh transition-colors duration-500 overflow-x-hidden">
      
      {/* LEFT SIDE PANEL: Scientific Paper (KTI) Showcase Studio */}
      <div className="w-full md:w-[390px] shrink-0 mb-8 md:mb-0 md:mr-8 flex flex-col justify-between text-left p-6 liquid-glass rounded-[28px] border border-white/60 shadow-[0_20px_50px_rgba(7,30,73,0.08)] select-none max-w-md">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-mbg-primary to-mbg-primary/90 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5 text-mbg-secondary fill-mbg-secondary" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-extrabold text-[15px] text-mbg-primary tracking-tight">MBGuide Studio</h1>
                <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-mbg-secondary/30 text-mbg-primary border border-mbg-secondary/50">KTI Prototype</span>
              </div>
              <p className="text-[10px] text-slate-500 font-bold">Monitoring & Barcode Guide — Program MBG</p>
            </div>
          </div>

          <div className="border-t border-slate-200/50 pt-3.5 space-y-2">
            <h2 className="text-xs font-extrabold text-mbg-primary uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-mbg-primary" />
              Abstrak Penelitian KTI
            </h2>
            <p className="text-[10.5px] text-slate-600 font-medium leading-relaxed">
              Inovasi platform digital MBGuide dirancang untuk mengawasi rantai pasok makanan secara transparan. Menggunakan pindaian gizi AI, audit suhu boks IoT, geofencing lokasi kurir, dan paspor transparansi gizi berbasis Digital Barcode Passport (QR) untuk menjamin gizi anak sekolah.
            </p>
          </div>

          {/* Color Specs */}
          <div className="border-t border-slate-200/50 pt-3.5 space-y-2">
            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">Branding Palette</span>
            <div className="grid grid-cols-4 gap-1.5 text-center text-[9px] font-bold text-slate-700">
              <div className="p-1 rounded-xl bg-white border border-slate-100"><span className="w-2.5 h-2.5 rounded-full bg-[#071E49] inline-block mr-1"></span>Navy</div>
              <div className="p-1 rounded-xl bg-white border border-slate-100"><span className="w-2.5 h-2.5 rounded-full bg-[#92D05D] inline-block mr-1"></span>Green</div>
              <div className="p-1 rounded-xl bg-white border border-slate-100"><span className="w-2.5 h-2.5 rounded-full bg-[#B5E0EA] inline-block mr-1"></span>Blue</div>
              <div className="p-1 rounded-xl bg-white border border-slate-100"><span className="w-2.5 h-2.5 rounded-full bg-[#D1B06C] inline-block mr-1"></span>Gold</div>
            </div>
          </div>
        </div>

        {/* Presentation Controls */}
        <div className="border-t border-slate-200/50 pt-4 mt-4 space-y-2.5">
          <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">Panel Kontrol Presentasi</span>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={resetPrototype}
              className="py-2 px-3 rounded-2xl bg-white border border-slate-200/80 hover:bg-slate-50 text-[10px] font-bold text-slate-600 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-mbg-primary" />
              <span>Reset Simulasi</span>
            </button>
            <button
              onClick={simulateLiveNotification}
              className="py-2 px-3 rounded-2xl bg-white border border-slate-200/80 hover:bg-slate-50 text-[10px] font-bold text-slate-600 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <BellRing className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>Kirim IoT Alert</span>
            </button>
          </div>

          <div className="p-3 bg-mbg-primary/5 border border-mbg-primary/10 rounded-2xl text-[9px] text-slate-500 font-bold leading-normal">
            💡 Trik presentasi: Klik <strong>Kirim IoT Alert</strong> untuk mensimulasikan notifikasi malfungsi real-time pada gawai.
          </div>
        </div>
      </div>

      {/* RIGHT: High fidelity iOS Phone frame wrapper */}
      <div className="relative shrink-0 select-none">
        
        {/* Physical phone outline (desktop display only) */}
        <div className="md:phone-frame md:w-[340px] md:h-[720px] md:rounded-[44px] md:bg-slate-900 md:p-[9px] md:shadow-[0_25px_60px_-15px_rgba(7,30,73,0.35),_0_0_0_10px_#ffffff,_0_0_0_12px_rgba(7,30,73,0.08)] overflow-hidden flex flex-col justify-between bg-white w-full h-[100svh] min-h-[100svh] md:min-h-0 relative select-none">
          
          {/* iOS camera notch (Dynamic Island mockup, visible only on desktop) */}
          <div className="hidden md:block absolute top-3.5 left-1/2 -translate-x-1/2 w-24 h-5.5 bg-black rounded-full z-50" />

          {/* Screen Content Window */}
          <div className="w-full h-full bg-slate-50 rounded-[28px] md:rounded-[36px] overflow-hidden flex flex-col justify-between relative border border-slate-200/50">
            
            {/* Live iOS Notification Toast (Notification banners) */}
            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ y: -60, opacity: 0 }}
                  animate={{ y: 8, opacity: 1 }}
                  exit={{ y: -60, opacity: 0 }}
                  className="absolute top-12 left-3 right-3 z-50 cursor-pointer"
                  onClick={() => setToast(null)}
                >
                  <div className="liquid-glass-dark text-white px-3.5 py-2.5 rounded-2xl border border-white/10 shadow-[0_12px_32px_rgba(0,0,0,0.25)] flex gap-2.5 text-left items-start select-none">
                    <div className="w-7 h-7 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                      <Sparkles className={`w-4.5 h-4.5 ${toast.type === 'warning' ? 'text-amber-400' : 'text-mbg-secondary'}`} />
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="flex justify-between items-center text-[8px] font-extrabold text-white/50 tracking-wider">
                        <span>MBGUIDE NOTIFIKASI</span>
                        <span>SEKARANG</span>
                      </div>
                      <p className="text-[10px] font-extrabold leading-normal text-white">{toast.msg}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Render sub-screens based on active screen states */}
            {currentScreen === 'splash' && (
              <SplashScreen onComplete={navigateToRoles} />
            )}

            {currentScreen === 'roles' && (
              <RoleSelection onSelectRole={handleSelectRole} />
            )}

            {currentScreen === 'login' && activeRole && (
              <LoginScreen 
                role={activeRole} 
                onLoginSuccess={handleLoginSuccess} 
                onBack={navigateToRoles} 
              />
            )}

            {currentScreen === 'app' && activeRole === 'kitchen' && (
              <KitchenFlow onBackToRoles={navigateToRoles} triggerToast={triggerToast} />
            )}

            {currentScreen === 'app' && activeRole === 'distributor' && (
              <DistributorFlow onBackToRoles={navigateToRoles} triggerToast={triggerToast} />
            )}

            {currentScreen === 'app' && activeRole === 'admin' && (
              <AdminFlow onBackToRoles={navigateToRoles} triggerToast={triggerToast} />
            )}

            {currentScreen === 'app' && activeRole === 'beneficiary' && (
              <BeneficiaryFlow onBackToRoles={navigateToRoles} triggerToast={triggerToast} />
            )}

          </div>

          {/* Physical iOS home indicator bar at bottom (desktop view only) */}
          <div className="hidden md:block w-28 h-1 bg-white/40 rounded-full mx-auto my-1 shrink-0 z-50" />
        </div>
      </div>
    </div>
  );
}

export default App;
