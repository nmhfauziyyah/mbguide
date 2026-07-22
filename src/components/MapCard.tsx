import React, { useState } from 'react';
import GlassCard from './GlassCard';
import { Navigation } from 'lucide-react';
import StatusBadge from './StatusBadge';

interface KitchenPin {
  id: string;
  name: string;
  coords: { x: number; y: number };
  status: 'safe' | 'warning' | 'danger';
  statusText: string;
  production: number;
  temp: number;
  hygiene: number;
}

interface MapCardProps {
  mode: 'geofence' | 'monitoring';
  interactive?: boolean;
  compact?: boolean;
}

export const MapCard: React.FC<MapCardProps> = ({ mode, interactive = true, compact = false }) => {
  // Geofence states
  const [isInsideGeofence, setIsInsideGeofence] = useState(true);

  // Monitoring states
  const kitchens: KitchenPin[] = [
    { 
      id: 'k1', 
      name: 'Dapur Sehat Menteng', 
      coords: { x: 80, y: 70 }, 
      status: 'safe', 
      statusText: 'Aman - Operasional Normal', 
      production: 1250, 
      temp: 23.4, 
      hygiene: 98
    },
    { 
      id: 'k2', 
      name: 'Dapur Sehat Setiabudi', 
      coords: { x: 230, y: 80 }, 
      status: 'warning', 
      statusText: 'Suhu IoT Tinggi (28.2°C)', 
      production: 980, 
      temp: 28.2, 
      hygiene: 91
    },
    { 
      id: 'k3', 
      name: 'Dapur Sehat Sudirman', 
      coords: { x: 140, y: 160 }, 
      status: 'danger', 
      statusText: 'Grade AI Rendah (72%)', 
      production: 1500, 
      temp: 24.1, 
      hygiene: 84
    }
  ];

  const [selectedKitchen, setSelectedKitchen] = useState<KitchenPin | null>(kitchens[0]);

  // SVG Coordinates
  // Kitchen (70, 60)
  // School Destination (210, 130)
  // Geofence Circle radius = 45 around School (210, 130)
  // Truck Position: Inside (190, 120), Outside (120, 85)
  const truckCoords = isInsideGeofence ? { x: 190, y: 120 } : { x: 120, y: 85 };

  return (
    <GlassCard className="p-3 space-y-3 overflow-hidden relative">
      {/* Header bar */}
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-mbg-primary flex items-center gap-1">
          <Navigation className="w-3.5 h-3.5 rotate-45 text-mbg-primary" />
          {mode === 'geofence' ? 'Sistem Geofencing GPS' : 'Peta Pemantauan Wilayah'}
        </span>
        
        {mode === 'geofence' && (
          <StatusBadge
            status={isInsideGeofence ? 'safe' : 'danger'}
            label={isInsideGeofence ? 'Dalam Geofence' : 'Luar Geofence'}
            pulse={!isInsideGeofence}
          />
        )}
      </div>

      {/* Map Graphic Area */}
      <div className={`${compact ? 'h-28' : 'h-44'} w-full bg-[#E5E9F0] rounded-2xl relative shadow-inner overflow-hidden border border-slate-200`}>
        <svg className="w-full h-full" viewBox="0 0 300 200" fill="none">
          {/* Simulated Roads & Land Grids */}
          <rect width="300" height="200" fill="#E8EDF5" />
          
          {/* Green zones */}
          <path d="M 0,0 C 40,20 60,10 90,0 L 90,60 C 50,70 20,50 0,60 Z" fill="#D3EAD3" opacity="0.6" />
          <path d="M 220,150 C 250,160 280,140 300,160 L 300,200 L 200,200 Z" fill="#D3EAD3" opacity="0.6" />
          
          {/* River */}
          <path d="M -10,130 Q 80,120 120,210" stroke="#CAD6EB" strokeWidth="16" strokeLinecap="round" />

          {/* Road Network Lines */}
          <path d="M 10,0 L 290,200" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
          <path d="M 10,0 L 290,200" stroke="#DEE5F0" strokeWidth="6" strokeLinecap="round" />

          <path d="M 0,90 Q 150,50 300,120" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
          <path d="M 0,90 Q 150,50 300,120" stroke="#DEE5F0" strokeWidth="6" strokeLinecap="round" />

          <path d="M 120,0 L 120,200" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
          <path d="M 120,0 L 120,200" stroke="#DEE5F0" strokeWidth="4" strokeLinecap="round" />

          <path d="M 230,0 L 230,200" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
          <path d="M 230,0 L 230,200" stroke="#DEE5F0" strokeWidth="4" strokeLinecap="round" />

          {/* MODE: GEOFENCE MAP */}
          {mode === 'geofence' && (
            <>
              {/* Route Path (Dotted line between kitchen and destination) */}
              <path 
                d="M 70,60 Q 120,85 190,120" 
                stroke="#071E49" 
                strokeWidth="4" 
                strokeDasharray="4 3" 
                opacity="0.3"
              />
              <path 
                d="M 190,120 Q 200,125 210,130" 
                stroke="#92D05D" 
                strokeWidth="4" 
                strokeDasharray="4 3" 
                opacity="0.75"
              />

              {/* Geofence Circle Overlay */}
              <circle 
                cx="210" 
                cy="130" 
                r="42" 
                fill={isInsideGeofence ? 'rgba(146, 208, 93, 0.12)' : 'rgba(244, 63, 94, 0.08)'} 
                stroke={isInsideGeofence ? '#92D05D' : '#F43F5E'} 
                strokeWidth="2" 
                strokeDasharray="4 2"
                className="transition-colors duration-500"
              />
              
              {/* Kitchen Pin */}
              <g transform="translate(70, 60)">
                <circle cx="0" cy="0" r="10" fill="#071E49" />
                <circle cx="0" cy="0" r="4" fill="#B5E0EA" />
                <text x="12" y="4" fill="#071E49" fontSize="7" fontWeight="bold" fontFamily="sans-serif">Dapur Menteng</text>
              </g>

              {/* School Destination Pin */}
              <g transform="translate(210, 130)">
                <circle cx="0" cy="0" r="8" fill="#92D05D" />
                <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
                <text x="-35" y="-12" fill="#071E49" fontSize="7" fontWeight="bold" fontFamily="sans-serif">SDN 01 Menteng</text>
              </g>

              {/* Delivery Vehicle Truck Icon (Animated position) */}
              <g transform={`translate(${truckCoords.x}, ${truckCoords.y})`} className="transition-all duration-700 ease-in-out">
                {/* Pulse Ring */}
                <circle cx="0" cy="0" r="12" fill={isInsideGeofence ? 'rgba(146, 208, 93, 0.35)' : 'rgba(244, 63, 94, 0.35)'} className="animate-ping" />
                <circle cx="0" cy="0" r="8" fill={isInsideGeofence ? '#92D05D' : '#F43F5E'} className="transition-colors duration-500" />
                {/* Mini Truck details inside pin */}
                <rect x="-4" y="-3" width="8" height="5" rx="1" fill="#FFFFFF" />
                <rect x="-1" y="-2" width="2" height="3" fill={isInsideGeofence ? '#92D05D' : '#F43F5E'} />
              </g>
            </>
          )}

          {/* MODE: MONITORING MAP */}
          {mode === 'monitoring' && kitchens.map((k) => {
            const isSelected = selectedKitchen?.id === k.id;
            let pinColor = '#92D05D'; // Safe
            if (k.status === 'warning') pinColor = '#D1B06C'; // Warning
            if (k.status === 'danger') pinColor = '#F43F5E'; // Danger

            return (
              <g 
                key={k.id} 
                transform={`translate(${k.coords.x}, ${k.coords.y})`} 
                onClick={() => setSelectedKitchen(k)}
                className="cursor-pointer"
              >
                {/* Pulse for selected */}
                {isSelected && (
                  <circle cx="0" cy="0" r="12" fill={pinColor} opacity="0.3" className="animate-ping" />
                )}
                <circle cx="0" cy="0" r="9" fill={isSelected ? '#071E49' : '#FFFFFF'} stroke={pinColor} strokeWidth="2" />
                <circle cx="0" cy="0" r="4.5" fill={pinColor} />
                <text x="12" y="3" fill="#071E49" fontSize="6.5" fontWeight={isSelected ? 'bold' : 'normal'} fontFamily="sans-serif">{k.name.replace('Dapur Sehat ', '')}</text>
              </g>
            );
          })}
        </svg>

        {/* Small floating hint on map */}
        <div className="absolute bottom-2 left-2 bg-slate-900/70 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[8px] text-white/90">
          DKI Jakarta
        </div>
      </div>

      {/* MODE GEOFENCE CONTROL */}
      {mode === 'geofence' && interactive && (
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-2.5 flex items-center justify-between text-[10px]">
          <div className="space-y-0.5">
            <span className="text-slate-400 font-bold block">SIMULASI KENDARAAN</span>
            <span className="text-slate-800 font-semibold">
              Status: {isInsideGeofence ? '🟢 Aman (Dalam Rute)' : '🔴 Peringatan Penyimpangan!'}
            </span>
          </div>

          <button
            onClick={() => setIsInsideGeofence(!isInsideGeofence)}
            className={`py-1.5 px-3 rounded-xl font-bold text-[9px] shadow-sm active:scale-95 transition-all ${
              isInsideGeofence 
                ? 'bg-rose-500 text-white shadow-rose-500/20' 
                : 'bg-emerald-500 text-white shadow-emerald-500/20'
            }`}
          >
            {isInsideGeofence ? 'Bawa Keluar Rute' : 'Bawa Kembali Rute'}
          </button>
        </div>
      )}

      {/* MODE MONITORING DETAILS */}
      {mode === 'monitoring' && selectedKitchen && (
        <div className="bg-white/90 border border-slate-100/60 rounded-2xl p-3 space-y-2.5 transition-all duration-300">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-extrabold text-[11px] text-mbg-primary leading-none">{selectedKitchen.name}</h4>
              <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block mt-1">{selectedKitchen.statusText}</span>
            </div>
            <span className={`text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide border ${
              selectedKitchen.status === 'safe' 
                ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20' 
                : selectedKitchen.status === 'warning' 
                  ? 'bg-amber-500/10 text-amber-700 border-amber-500/20' 
                  : 'bg-rose-500/10 text-rose-700 border-rose-500/20'
            }`}>
              {selectedKitchen.status === 'safe' ? 'Aman' : selectedKitchen.status === 'warning' ? 'Waspada' : 'Investigasi'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-center text-[9px]">
            <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-100">
              <span className="block text-slate-400">Produksi</span>
              <span className="font-extrabold text-mbg-primary">{selectedKitchen.production} porsi</span>
            </div>
            <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-100">
              <span className="block text-slate-400">Suhu IoT</span>
              <span className={`font-extrabold ${selectedKitchen.temp > 26 ? 'text-amber-600' : 'text-slate-800'}`}>{selectedKitchen.temp}°C</span>
            </div>
            <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-100">
              <span className="block text-slate-400">Higienitas</span>
              <span className={`font-extrabold ${selectedKitchen.hygiene < 90 ? 'text-rose-600' : 'text-slate-800'}`}>{selectedKitchen.hygiene}%</span>
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  );
};

export default MapCard;
