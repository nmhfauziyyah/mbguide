import React, { useState } from 'react';
import { User, Lock, Smartphone, RefreshCw, KeyRound } from 'lucide-react';
import GlassCard from '../components/GlassCard';

interface LoginScreenProps {
  role: 'kitchen' | 'distributor' | 'admin' | 'beneficiary';
  onLoginSuccess: () => void;
  onBack: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ role, onLoginSuccess, onBack }) => {
  const [username, setUsername] = useState(() => {
    if (role === 'kitchen') return 'dapur.menteng@mbguide.id';
    if (role === 'distributor') return 'driver.armada03@mbguide.id';
    if (role === 'admin') return 'pengawas.bgn@mbguide.id';
    return '';
  });

  const [password, setPassword] = useState('********');
  const [nik, setNik] = useState('3171029384750002');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getRoleTitle = () => {
    switch (role) {
      case 'kitchen': return 'Login Pengelola Dapur';
      case 'distributor': return 'Login Kurir Logistik';
      case 'admin': return 'Login Pengawas BGN';
      case 'beneficiary': return 'Login Penerima Manfaat';
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1000);
  };

  const handleSendOtp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOtpSent(true);
      setOtp('5821'); // Pre-fill valid OTP for demo ease
    }, 800);
  };

  return (
    <div className="w-full h-full bg-[#F4F7FB] flex flex-col justify-between p-5 relative overflow-hidden select-none">
      {/* Mesh background effect */}
      <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-mbg-accent/20 to-transparent pointer-events-none" />

      {/* Top Header */}
      <div className="pt-3 pb-1 text-center z-10 shrink-0">
        <h2 className="text-base font-extrabold text-mbg-primary tracking-tight">{getRoleTitle()}</h2>
        <p className="text-[10px] text-slate-500 font-bold">Otorisasi Sistem Keamanan MBG</p>
      </div>

      {/* Central Login Box */}
      <div className="flex-1 flex flex-col justify-center my-4 z-10">
        <GlassCard className="p-4 space-y-4 bg-white/70">

          {/* Brand Logo in Login */}
          <div className="flex flex-col items-center space-y-1.5 select-none">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center overflow-hidden border border-slate-100">
              <img src="./mbguide.png" className="w-11 h-11 object-contain" alt="MBGuide Logo" />
            </div>
            <span className="text-[8px] font-extrabold text-mbg-primary tracking-widest uppercase">MBGuide Secure Login</span>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">

            {/* Standard Login (Kitchen, Driver, Admin) */}
            {role !== 'beneficiary' ? (
              <>
                <div className="space-y-1 text-left">
                  <label className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider block">ID Pengguna / Email</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white/80 text-[10px] focus:outline-none focus:ring-1 focus:ring-mbg-primary"
                      placeholder="nama@mbguide.id"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <label className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider block">Kata Sandi</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white/80 text-[10px] focus:outline-none focus:ring-1 focus:ring-mbg-primary"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              /* Beneficiary Login (NIK + OTP) */
              <>
                {!isOtpSent ? (
                  <div className="space-y-1 text-left">
                    <label className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider block">Nomor Induk Kependudukan (NIK)</label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={nik}
                        onChange={(e) => setNik(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white/80 text-[10px] focus:outline-none focus:ring-1 focus:ring-mbg-primary"
                        placeholder="16 Digit NIK Orang Tua"
                        maxLength={16}
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 text-left">
                    <label className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider block">Masukkan Kode OTP (SMS/WhatsApp)</label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white/80 text-[10px] text-center tracking-widest font-extrabold focus:outline-none focus:ring-1 focus:ring-mbg-primary"
                        placeholder="----"
                        maxLength={4}
                        required
                      />
                    </div>
                    <span className="text-[7.5px] text-slate-400 block text-right mt-0.5">Kode terkirim ke gawai Anda</span>
                  </div>
                )}
              </>
            )}

            {/* Submit Button */}
            {role === 'beneficiary' && !isOtpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full py-2 px-3 rounded-xl bg-mbg-primary text-white font-extrabold text-[10px] shadow-sm flex items-center justify-center gap-1.5 transition active:scale-98"
              >
                {isLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <span>Kirim Kode OTP</span>}
              </button>
            ) : (
              <button
                type="submit"
                className="w-full py-2 px-3 rounded-xl bg-mbg-primary text-white font-extrabold text-[10px] shadow-sm flex items-center justify-center gap-1.5 transition active:scale-98"
              >
                {isLoading ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <span>{role === 'beneficiary' ? 'Verifikasi & Masuk' : 'Login'}</span>
                )}
              </button>
            )}
          </form>
        </GlassCard>
      </div>

      {/* Back Button */}
      <div className="text-center pt-2 select-none shrink-0">
        <button
          onClick={onBack}
          className="text-[9.5px] text-slate-500 font-bold hover:text-mbg-primary active:scale-95 transition"
        >
          Kembali ke Pilihan Peran
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
