import React, { useRef, useEffect } from 'react';
import { Palette, Grid, Image as ImageIcon, Layout, X, Upload } from 'lucide-react';

const FloatingConfigurator = ({
  activeTab,
  setActiveTab,
  pattern,
  setPattern,
  colorType,
  setColorType,
  solidColor,
  setSolidColor,
  gradientType,
  setGradientType,
  gradientStart,
  setGradientStart,
  gradientEnd,
  setGradientEnd,
  logo,
  setLogo,
  frameStyle,
  setFrameStyle
}) => {
  const panelRef = useRef(null);

  const tabs = [
    { id: 'color', label: 'Color', icon: Palette, title: '🎨 COLOR' },
    { id: 'pattern', label: 'Pattern', icon: Grid, title: '🎯 PATTERN' },
    { id: 'logo', label: 'Logo', icon: ImageIcon, title: '🖼️ LOGO' },
    { id: 'frames', label: 'Frames', icon: Layout, title: '🏷️ FRAMES' }
  ];

  // Click-Outside hook configuration
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Verify click falls outside our configuration card/sheet container
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        // Exception: Skip closing if click was triggered inside file inputs or label upload targets
        if (
          (event.target.tagName === 'INPUT' && event.target.type === 'file') ||
          event.target.closest('label[class*="cursor-pointer"]')
        ) {
          return;
        }

        // Exception: Skip closing if click is on the floating navigation bar itself to prevent conflicting triggers
        if (event.target.closest('.floating-pill-bar')) {
          return;
        }

        setActiveTab(null);
      }
    };

    if (activeTab) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeTab, setActiveTab]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const patternOptions = [
    { id: 'square', label: 'Square' },
    { id: 'dots', label: 'Dots' },
    { id: 'rounded', label: 'Rounded' },
    { id: 'extra-rounded', label: 'Extra Rounded' },
    { id: 'classy', label: 'Classy' },
    { id: 'classy-inversed', label: 'Classy Inv' }
  ];

  const frameOptions = [
    { id: 'none', label: 'No Frame', icon: '🚫' },
    { id: 'standard', label: 'Classic Card', icon: '🏷️' },
    { id: 'speech', label: 'Speech Bubble', icon: '💬' },
    { id: 'arrow', label: 'Arrow Card', icon: '↗️' },
    { id: 'coffee', label: 'Coffee Mug', icon: '☕' },
    { id: 'shopping', label: 'Shopping Bag', icon: '🛍️' },
    { id: 'gift', label: 'Gift Box', icon: '🎁' },
    { id: 'scooter', label: 'Scooter Delivery', icon: '🛵' },
    { id: 'chef', label: 'Chef Menu', icon: '👨‍🍳' },
    { id: 'pill', label: 'Pill Badge', icon: '💊' }
  ];

  const handleTabClick = (tabId) => {
    if (activeTab === tabId) {
      setActiveTab(null);
    } else {
      setActiveTab(tabId);
    }
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'color':
        return (
          <div className="space-y-4">
            <div className="flex gap-2 p-1 bg-slate-950 rounded-xl border border-white/5">
              <button
                onClick={() => setColorType('solid')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  colorType === 'solid' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Solid Fill
              </button>
              <button
                onClick={() => setColorType('gradient')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  colorType === 'gradient' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Gradient Fill
              </button>
            </div>

            {colorType === 'solid' ? (
              <div className="flex items-center gap-3 bg-slate-950/50 p-3.5 rounded-xl border border-white/5">
                <input
                  type="color"
                  value={solidColor}
                  onChange={(e) => setSolidColor(e.target.value)}
                  className="w-11 h-11 border-0 rounded-xl cursor-pointer bg-transparent shrink-0"
                />
                <div className="flex-1">
                  <span className="text-[9px] text-slate-500 font-bold block mb-0.5">HEX CODE</span>
                  <input
                    type="text"
                    value={solidColor}
                    onChange={(e) => setSolidColor(e.target.value)}
                    className="bg-slate-950 border border-white/5 rounded-lg px-3 py-1 text-xs text-slate-300 w-full focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3 bg-slate-950/50 p-3.5 rounded-xl border border-white/5">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setGradientType('linear')}
                    className={`flex-1 py-1 border text-[10px] rounded-lg font-bold transition-all ${
                      gradientType === 'linear' ? 'border-indigo-500 bg-indigo-950/20 text-indigo-400' : 'border-white/5 text-slate-400'
                    }`}
                  >
                    Linear
                  </button>
                  <button
                    onClick={() => setGradientType('radial')}
                    className={`flex-1 py-1 border text-[10px] rounded-lg font-bold transition-all ${
                      gradientType === 'radial' ? 'border-indigo-500 bg-indigo-950/20 text-indigo-400' : 'border-white/5 text-slate-400'
                    }`}
                  >
                    Radial
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold block mb-1">START STOP</span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={gradientStart}
                        onChange={(e) => setGradientStart(e.target.value)}
                        className="w-7 h-7 rounded-md cursor-pointer bg-transparent shrink-0"
                      />
                      <input
                        type="text"
                        value={gradientStart}
                        onChange={(e) => setGradientStart(e.target.value)}
                        className="bg-slate-950 border border-white/5 rounded-lg px-2 py-1 text-[10px] text-slate-300 w-full focus:outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold block mb-1">END STOP</span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={gradientEnd}
                        onChange={(e) => setGradientEnd(e.target.value)}
                        className="w-7 h-7 rounded-md cursor-pointer bg-transparent shrink-0"
                      />
                      <input
                        type="text"
                        value={gradientEnd}
                        onChange={(e) => setGradientEnd(e.target.value)}
                        className="bg-slate-950 border border-white/5 rounded-lg px-2 py-1 text-[10px] text-slate-300 w-full focus:outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'pattern':
        return (
          <div className="grid grid-cols-3 gap-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
            {patternOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPattern(opt.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-[9px] md:text-[10px] font-bold transition-all duration-200 ${
                  pattern === opt.id
                    ? 'border-indigo-500 bg-indigo-950/60 text-indigo-300 shadow-sm'
                    : 'border-white/5 bg-slate-950/40 text-slate-400 hover:text-slate-200 hover:border-slate-800'
                }`}
              >
                <div className="flex flex-wrap w-5 h-5 justify-center items-center gap-0.5 mb-2 opacity-80">
                  {opt.id === 'square' && <div className="w-4 h-4 bg-current rounded-none" />}
                  {opt.id === 'dots' && <div className="w-4 h-4 flex flex-wrap gap-0.5"><div className="w-1.5 h-1.5 rounded-full bg-current" /><div className="w-1.5 h-1.5 rounded-full bg-current" /><div className="w-1.5 h-1.5 rounded-full bg-current" /><div className="w-1.5 h-1.5 rounded-full bg-current" /></div>}
                  {opt.id === 'rounded' && <div className="w-4 h-4 flex flex-wrap gap-0.5"><div className="w-1.5 h-1.5 rounded-sm bg-current" /><div className="w-1.5 h-1.5 rounded-sm bg-current" /><div className="w-1.5 h-1.5 rounded-sm bg-current" /><div className="w-1.5 h-1.5 rounded-sm bg-current" /></div>}
                  {opt.id === 'extra-rounded' && <div className="w-4 h-4 bg-current rounded-md" />}
                  {opt.id === 'classy' && <div className="w-4 h-4 bg-current rounded-tl-full rounded-br-full" />}
                  {opt.id === 'classy-inversed' && <div className="w-4 h-4 bg-current rounded-tr-full rounded-bl-full" />}
                </div>
                {opt.label}
              </button>
            ))}
          </div>
        );

      case 'logo':
        return (
          <div className="space-y-3">
            {logo ? (
              <div className="flex items-center justify-between p-3.5 bg-slate-950/50 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <img src={logo} alt="Logo thumbnail" className="w-12 h-12 object-contain rounded-xl bg-white p-1 shrink-0" />
                  <div>
                    <span className="text-[11px] text-slate-200 font-bold block mb-0.5">Brand Custom Logo</span>
                    <span className="text-[9px] text-slate-500 font-mono">base64 encoded</span>
                  </div>
                </div>
                <button
                  onClick={() => setLogo(null)}
                  className="p-2 hover:bg-slate-800 text-slate-400 hover:text-rose-450 rounded-xl transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 hover:border-indigo-500/40 rounded-2xl p-6 cursor-pointer bg-slate-950/20 hover:bg-slate-950/40 transition-all">
                <Upload className="w-7 h-7 text-slate-400 mb-2" />
                <span className="text-[11px] text-slate-200 font-bold mb-0.5">Upload Brand Logo</span>
                <span className="text-[9px] text-slate-500">Supports PNG, JPG (max 2MB)</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        );

      case 'frames':
        return (
          <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
            {frameOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setFrameStyle(opt.id)}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-[11px] font-bold transition-all duration-200 ${
                  frameStyle === opt.id
                    ? 'border-indigo-500 bg-indigo-950/60 text-indigo-300 shadow-sm'
                    : 'border-white/5 bg-slate-950/40 text-slate-400 hover:text-slate-200 hover:border-slate-800'
                }`}
              >
                <span className="text-xl shrink-0">{opt.icon}</span>
                <span className="truncate">{opt.label}</span>
              </button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const getActiveTabTitle = () => {
    const matched = tabs.find((t) => t.id === activeTab);
    return matched ? matched.title : '';
  };

  return (
    <>
      {/* 1. FLOATING PILL BAR (Inline Navigation Menu) */}
      <div className="floating-pill-bar flex items-center justify-between gap-2.5 bg-white/10 border border-white/20 backdrop-blur-md px-5 py-2.5 rounded-full shadow-xl select-none shrink-0 z-20">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-black tracking-wider transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. EXPANDED DESIGN CONFIGURATION PANELS */}
      {activeTab && (
        <div ref={panelRef}>
          {/* DESKTOP FLOATING GLASS CARD */}
          <div className="hidden lg:flex absolute bottom-28 left-1/2 transform -translate-x-1/2 w-[480px] bg-slate-900/60 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl transition-all duration-300 z-20 flex-col gap-4 animate-scale-up">
            {/* Close circular floating trigger */}
            <button
              onClick={() => setActiveTab(null)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-200 z-10 text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Dynamic tab elements rendering */}
            <div className="flex-1 overflow-hidden pr-0.5">
              {renderActiveTabContent()}
            </div>

            {/* Pinned Tab Indicator */}
            <div className="text-[9px] font-black tracking-widest text-indigo-400 uppercase select-none">
              {getActiveTabTitle()}
            </div>
          </div>

          {/* MOBILE BOTTOM SHEET PANEL */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-[70vh] bg-slate-950/90 border-t border-white/20 backdrop-blur-2xl rounded-t-3xl p-6 shadow-2xl flex flex-col gap-4 animate-slide-up select-none">
            {/* Grab Drag handle indicator bar */}
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-1 shrink-0" />

            <div className="flex items-center justify-between shrink-0">
              <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase">
                {getActiveTabTitle()}
              </span>
              <button
                onClick={() => setActiveTab(null)}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-200 text-slate-300 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-0.5 mb-2">
              {renderActiveTabContent()}
            </div>
          </div>

          {/* Mobile Overlay backdrop to lock interactions */}
          <div 
            onClick={() => setActiveTab(null)}
            className="lg:hidden fixed inset-0 bg-black/45 backdrop-blur-xs z-40 transition-opacity" 
          />
        </div>
      )}
    </>
  );
};

export default FloatingConfigurator;
