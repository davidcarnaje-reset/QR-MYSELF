import React, { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import Sidebar from './components/Sidebar';
import InputForm from './components/InputForm';
import QRPreview from './components/QRPreview';
import FloatingConfigurator from './components/FloatingConfigurator';

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

  // Customization pill bar state
  const [activeConfigTab, setActiveConfigTab] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const qrCodeInstanceRef = useRef(null);
  const frameRef = useRef(null); // Reference to the custom wrapper frame in QRPreview

  // Unified high-quality exporting engine
  const handleExport = async () => {
    if (!frameRef.current || isExporting) return;
    setIsExporting(true);

    const element = frameRef.current;
    const defaultName = `qr-code-${activeType}-${frameStyle}.${exportFormat.toLowerCase()}`;

    try {
      let dataUrl;
      const options = {
        quality: 0.98,
        backgroundColor: '#ffffff',
        pixelRatio: 3 // High-res scaling
      };

      if (exportFormat === 'PNG') {
        dataUrl = await htmlToImage.toPng(element, options);
      } else if (exportFormat === 'JPG') {
        dataUrl = await htmlToImage.toJpeg(element, options);
      } else if (exportFormat === 'SVG') {
        dataUrl = await htmlToImage.toSvg(element, { backgroundColor: '#ffffff' });
      }

      // Check for Electron Save Dialog Bridge
      const isElectron = typeof window !== 'undefined' && window.electronAPI && typeof window.electronAPI.saveFile === 'function';

      if (isElectron) {
        const result = await window.electronAPI.saveFile(dataUrl, exportFormat, defaultName);
        if (result.success) {
          console.log(`Saved successfully to: ${result.path}`);
          setShowSuccessModal(true); // Trigger Success Modal
        } else if (result.status !== 'cancelled') {
          alert(`File save failed: ${result.error}`);
        }
      } else {
        // Fallback standard browser file download (appended to body for browser/mobile compatibility)
        const link = document.createElement('a');
        link.download = defaultName;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setShowSuccessModal(true); // Trigger Success Modal
      }
    } catch (err) {
      console.error("Export capture error:", err);
      alert("Failed to build output image: " + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-screen w-screen overflow-y-auto lg:overflow-hidden bg-slate-950 text-white font-sans">
      
      {/* 1. LEFT/MAIN AREA (The Canvas & Liquid Bar) */}
      <div className="order-1 flex-1 bg-slate-950 flex flex-col justify-center items-center p-8 min-h-[480px] lg:min-h-0 lg:h-full relative overflow-y-auto lg:overflow-hidden select-none">
        
        {/* Dominant Centered Canvas */}
        <div className="flex-1 flex items-center justify-center w-full">
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

        {/* Floating Customization pill bar & configuration overlay card */}
        <div className="mt-6 shrink-0 z-10 w-full flex flex-col items-center">
          <FloatingConfigurator
            activeTab={activeConfigTab}
            setActiveTab={setActiveConfigTab}
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
          />
        </div>

      </div>

      {/* 2. RIGHT COLUMN (Inputs & Actions) */}
      <div className="order-2 w-full lg:w-[420px] bg-slate-900/60 border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col h-auto lg:h-full shrink-0 p-6 overflow-y-auto">
        
        {/* Category selector menu at the top */}
        <div className="bg-slate-950 rounded-2xl p-4 border border-white/5">
          <Sidebar activeType={activeType} setActiveType={setActiveType} />
        </div>

        {/* Dynamic input text/wifi forms in the middle */}
        <div className="flex-1 py-6">
          <div className="bg-slate-950/40 rounded-2xl p-5 border border-white/5">
            <InputForm
              activeType={activeType}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        </div>

        {/* Export Drawer & Primary Download Trigger */}
        <div className="pt-6 border-t border-white/5 sticky bottom-0 z-10 space-y-4 bg-slate-900 lg:bg-transparent">
          <div>
            <span className="text-[10px] text-slate-500 font-black tracking-widest block mb-2">EXPORT FORMAT</span>
            <div className="flex gap-2 bg-slate-950 rounded-xl p-1 border border-white/5">
              {['PNG', 'JPG', 'SVG'].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setExportFormat(fmt)}
                  className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${
                    exportFormat === fmt
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-black py-4 px-6 rounded-2xl text-sm tracking-wider transition-all duration-200 shadow-lg shadow-indigo-900/10 ${
              isExporting ? 'opacity-50 cursor-wait' : ''
            }`}
          >
            {isExporting ? 'EXPORTING...' : 'DOWNLOAD QR CODE IMAGE'}
          </button>

          {/* Subtle Desktop Credits Footer */}
          <div className="hidden lg:block pt-3 text-center select-none">
            <div className="text-[10px] text-slate-500 font-mono">
              OfflineQR v1.0.0 (Windows Offline)
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              Created by <span className="font-semibold text-slate-400">David Josh Carnaje</span>
            </div>
          </div>
        </div>

      </div>

      {/* MOBILE FOOTER: Credits & Version */}
      <footer className="order-3 w-full bg-slate-950 text-slate-600 text-center py-6 px-4 text-[11px] border-t border-white/5 lg:hidden flex flex-col gap-1 select-none shrink-0">
        <div>
          OfflineQR <span className="font-mono text-[10px]">v1.0.0 (Windows Offline)</span>
        </div>
        <div className="text-slate-500">
          Created by <span className="font-semibold text-slate-400">David Josh Carnaje</span>
        </div>
      </footer>

      {/* SUCCESS POPUP MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md animate-fade-in p-4">
          <div className="bg-slate-900/40 border border-white/10 backdrop-blur-xl rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl animate-scale-up text-white flex flex-col items-center select-none">
            {/* Checked Indicator Icon inside circle */}
            <div className="w-14 h-14 bg-indigo-950 border border-indigo-500/30 text-indigo-400 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/10">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h4 className="text-xl font-bold mb-2">QR Code Saved!</h4>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Your custom QR code image has been successfully downloaded.
            </p>
            
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all duration-200 shadow-md shadow-indigo-900/40"
            >
              Awesome
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
