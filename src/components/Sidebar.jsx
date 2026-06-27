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
    <div className="w-full bg-transparent select-none pb-2 flex flex-col gap-3">
      {/* Brand Header */}
      <div className="flex items-center gap-2.5 px-1 pt-1">
        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-indigo-900/20">
          QR
        </div>
        <span className="font-black text-sm tracking-tight text-slate-200">OfflineQR Designer</span>
      </div>

      {/* Categories Horizontal Selector */}
      <nav className="flex flex-row gap-1.5 w-full overflow-x-auto pb-2 custom-scrollbar pr-1 whitespace-nowrap">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeType === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveType(item.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 shrink-0 ${
                isActive
                  ? 'bg-indigo-950/60 text-indigo-400 border border-indigo-500/20 shadow-sm'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'
              }`}
              title={item.label}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
