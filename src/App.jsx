import React, { useState, useRef } from 'react';
import Sidebar from './components/Sidebar';
import InputForm from './components/InputForm';
import QRPreview from './components/QRPreview';
import DesignPanel from './components/DesignPanel';

function App() {
  const [activeType, setActiveType] = useState('url');
  
  const [formData, setFormData] = useState({
    url: { url: '' },
    wifi: { ssid: '', password: '', encryption: 'WPA' },
    text: { text: '' },
    email: { email: '', subject: '', body: '' },
    sms: { phone: '', message: '' }
  });

  const [pattern, setPattern] = useState('rounded');
  const [colorType, setColorType] = useState('solid');
  const [solidColor, setSolidColor] = useState('#0f172a');
  const [gradientType, setGradientType] = useState('linear');
  const [gradientStart, setGradientStart] = useState('#3b82f6');
  const [gradientEnd, setGradientEnd] = useState('#8b5cf6');
  const [logo, setLogo] = useState(null);
  const [frameStyle, setFrameStyle] = useState('none');
  const [exportFormat, setExportFormat] = useState('PNG');

  const qrCodeInstanceRef = useRef(null);
  const frameRef = useRef(null); // Shared reference to DOM element for baking overlays

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[256px_1fr_420px] lg:grid-rows-[auto_1fr] h-auto lg:h-screen w-screen overflow-y-auto lg:overflow-hidden bg-slate-50 text-slate-800 font-sans">
      
      {/* 1. TOP (MOBILE) / RIGHT COLUMN ROW 1 (DESKTOP): Live QR Preview */}
      <div className="order-1 w-full bg-slate-950 text-white p-6 border-b border-slate-900 lg:order-none lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2 lg:border-l lg:border-slate-900 lg:bg-slate-950 flex flex-col justify-center select-none shrink-0">
        <span className="text-[10px] text-slate-500 font-bold tracking-widest block mb-3 text-center lg:text-left">
          LIVE PREVIEW
        </span>
        <QRPreview
          activeType={activeType}
          formData={formData}
          pattern={pattern}
          colorType={colorType}
          solidColor={solidColor}
          gradientType={gradientType}
          gradientStart={gradientStart}
          gradientEnd={gradientEnd}
          logo={logo}
          frameStyle={frameStyle}
          qrCodeInstanceRef={qrCodeInstanceRef}
          frameRef={frameRef}
        />
      </div>

      {/* 2. SECOND (MOBILE) / LEFT COLUMN (DESKTOP): Category Selector */}
      <div className="order-2 w-full lg:order-none lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3 lg:h-full lg:flex lg:flex-col shrink-0">
        <Sidebar activeType={activeType} setActiveType={setActiveType} />
      </div>

      {/* 3. THIRD (MOBILE) / CENTER COLUMN (DESKTOP): Form Inputs */}
      <main className="order-3 w-full flex flex-col bg-white border-b lg:border-b-0 lg:border-r border-slate-100 overflow-y-auto min-h-[380px] lg:min-h-0 lg:order-none lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-3 py-6 lg:py-0">
        <InputForm
          activeType={activeType}
          formData={formData}
          setFormData={setFormData}
        />
      </main>

      {/* 4. FOURTH & BOTTOM (MOBILE) / RIGHT COLUMN ROW 2 (DESKTOP): Custom Design Accordions & Export Actions */}
      <div className="order-4 w-full bg-slate-950 text-white lg:order-none lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3 lg:border-l lg:border-slate-900 lg:bg-slate-950 lg:overflow-y-auto flex flex-col shrink-0 lg:shrink">
        <DesignPanel
          activeType={activeType}
          pattern={pattern}
          setPattern={setPattern}
          colorType={colorType}
          setColorType={setColorType}
          solidColor={solidColor}
          setSolidColor={setSolidColor}
          gradientType={gradientType}
          setGradientType={setGradientType}
          gradientStart={gradientStart}
          setGradientStart={setGradientStart}
          gradientEnd={gradientEnd}
          setGradientEnd={setGradientEnd}
          logo={logo}
          setLogo={setLogo}
          frameStyle={frameStyle}
          setFrameStyle={setFrameStyle}
          exportFormat={exportFormat}
          setExportFormat={setExportFormat}
          frameRef={frameRef}
        />
      </div>

      {/* 5. MOBILE FOOTER: Credits & Version */}
      <footer className="order-5 w-full bg-slate-950 text-slate-500 text-center py-6 px-4 text-xs border-t border-slate-900 lg:hidden flex flex-col gap-1 select-none">
        <div>
          OfflineQR <span className="font-mono text-[10px]">v1.0.0 (Windows Offline)</span>
        </div>
        <div className="text-slate-400">
          Created by <span className="font-semibold text-slate-300">David Josh Carnaje</span>
        </div>
      </footer>

    </div>
  );
}

export default App;
