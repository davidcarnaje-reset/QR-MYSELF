import React from 'react';
import { Link, Wifi, FileText, Mail, MessageSquare } from 'lucide-react';

const Sidebar = ({ activeType, setActiveType }) => {
  const menuItems = [
    { id: 'url', label: 'Website / URL', icon: Link },
    { id: 'wifi', label: 'WiFi Network', icon: Wifi },
    { id: 'text', label: 'Plain Text', icon: FileText },
    { id: 'email', label: 'Email Message', icon: Mail },
    { id: 'sms', label: 'SMS Message', icon: MessageSquare },
  ];

  return (
    <div className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col shrink-0 select-none p-4 lg:p-6 overflow-hidden">
      <div className="flex flex-row lg:flex-col items-center lg:items-stretch justify-between lg:justify-start gap-4 w-full">
        
        {/* LOGO - Hidden on mobile view, shown on desktop */}
        <div className="hidden lg:flex items-center gap-3 mb-8 px-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-100">
            QR
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-800">OfflineQR</span>
        </div>

        {/* Responsive Navigation: Horizontal icons-only on mobile, full vertical buttons on desktop */}
        <nav className="flex flex-row lg:flex-col justify-around lg:justify-start w-full gap-2 lg:space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeType === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveType(item.id)}
                className={`flex items-center justify-center lg:justify-start gap-2.5 p-3 lg:px-4 lg:py-3.5 rounded-xl text-xs lg:text-sm font-semibold transition-all duration-250 min-w-[44px] lg:min-w-0 lg:w-full ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-50/50'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
                title={item.label}
              >
                <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span className="hidden lg:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Info Badge - Hidden on mobile, shown on desktop */}
      <div className="hidden lg:block pt-4 border-t border-slate-100 mt-auto">
        <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100 select-none">
          <span className="text-xs font-bold text-slate-800 block mb-0.5">OfflineQR</span>
          <span className="text-[10px] text-slate-400 block font-mono mb-2.5">v1.0.0 (Windows Offline)</span>
          <div className="text-[10px] text-slate-500 border-t border-slate-200/60 pt-2 font-medium">
            Created by <span className="font-semibold text-indigo-600">David Josh Carnaje</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
