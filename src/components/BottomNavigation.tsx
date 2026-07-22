import React from 'react';
import { 
  Home, Camera, QrCode, Truck, 
  Map, ShieldAlert, Utensils, 
  History, AlertTriangle, MapPin
} from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
  role: 'kitchen' | 'distributor' | 'admin' | 'beneficiary';
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onChangeTab,
  role,
}) => {
  const getNavItems = () => {
    switch (role) {
      case 'kitchen':
        return [
          { id: 'dashboard', label: 'Dapur', icon: Home },
          { id: 'scan', label: 'Scan AI', icon: Camera },
          { id: 'qr-batch', label: 'Batch QR', icon: QrCode },
          { id: 'lokasi', label: 'Lokasi', icon: MapPin },
        ];
      case 'distributor':
        return [
          { id: 'dashboard', label: 'Distribusi', icon: Truck },
          { id: 'tracking', label: 'Tracking', icon: Map },
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Command', icon: ShieldAlert },
          { id: 'map', label: 'Peta', icon: Map },
        ];
      case 'beneficiary':
        return [
          { id: 'dashboard', label: 'Beranda', icon: Utensils },
          { id: 'history', label: 'Riwayat', icon: History },
          { id: 'complaint', label: 'Aduan', icon: AlertTriangle },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="px-4 pb-2 pt-1 w-full bg-transparent shrink-0 z-40">
      <div className="liquid-glass rounded-[22px] px-3 py-2 flex justify-around items-center shadow-[0_12px_40px_-6px_rgba(7,30,73,0.15)] border border-white/80">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onChangeTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-4 rounded-2xl transition-all duration-300 relative ${
                isActive
                  ? 'text-mbg-primary font-bold scale-105 bg-mbg-accent/25'
                  : 'text-slate-500 hover:text-mbg-primary'
              }`}
            >
              <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'stroke-[2.5px] scale-105' : 'stroke-[1.8px]'}`} />
              <span className="text-[9px] mt-0.5 tracking-tight font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
