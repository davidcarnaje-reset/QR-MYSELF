import React, { useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { Grid, Palette, Image as ImageIcon, Layout, Upload, X } from 'lucide-react';
import CustomAccordion from './CustomAccordion';

const DesignPanel = ({
  activeType,
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
  setFrameStyle,
  exportFormat,
  setExportFormat,
  frameRef // reference to the DOM element in QRPreview
}) => {
  const [openSection, setOpenSection] = useState('pattern');
  const [isExporting, setIsExporting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleToggleSection = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

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

  // Export process that bakes the frame overlay and handles saving
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
          setShowModal(true); // Trigger Success Modal
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
        setShowModal(true); // Trigger Success Modal
      }
    } catch (err) {
      console.error("Export capture error:", err);
      alert("Failed to build output image: " + err.message);
    } finally {
      setIsExporting(false);
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

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white select-none">
      {/* Accordion Styling Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <h3 className="text-lg font-bold tracking-wide text-slate-400 mb-6 flex items-center gap-2">
          🎨 CUSTOM DESIGN
        </h3>

        {/* SECTION: PATTERN */}
        <CustomAccordion
          id="pattern"
          title="PATTERN"
          icon={Grid}
          isOpen={openSection === 'pattern'}
          onToggle={handleToggleSection}
        >
          <div className="grid grid-cols-3 gap-2">
            {patternOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPattern(opt.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-[10px] font-semibold transition-all duration-200 ${
                  pattern === opt.id
                    ? 'border-indigo-500 bg-indigo-950/60 text-indigo-300 shadow-sm'
                    : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-wrap w-6 h-6 justify-center items-center gap-0.5 mb-2 opacity-80">
                  {opt.id === 'square' && <div className="w-5 h-5 bg-current rounded-none" />}
                  {opt.id === 'dots' && <div className="w-5 h-5 flex flex-wrap gap-0.5"><div className="w-1.5 h-1.5 rounded-full bg-current" /><div className="w-1.5 h-1.5 rounded-full bg-current" /><div className="w-1.5 h-1.5 rounded-full bg-current" /><div className="w-1.5 h-1.5 rounded-full bg-current" /></div>}
                  {opt.id === 'rounded' && <div className="w-5 h-5 flex flex-wrap gap-0.5"><div className="w-1.5 h-1.5 rounded-sm bg-current" /><div className="w-1.5 h-1.5 rounded-sm bg-current" /><div className="w-1.5 h-1.5 rounded-sm bg-current" /><div className="w-1.5 h-1.5 rounded-sm bg-current" /></div>}
                  {opt.id === 'extra-rounded' && <div className="w-5 h-5 bg-current rounded-md" />}
                  {opt.id === 'classy' && <div className="w-5 h-5 bg-current rounded-tl-full rounded-br-full" />}
                  {opt.id === 'classy-inversed' && <div className="w-5 h-5 bg-current rounded-tr-full rounded-bl-full" />}
                </div>
                {opt.label}
              </button>
            ))}
          </div>
        </CustomAccordion>

        {/* SECTION: COLOR */}
        <CustomAccordion
          id="color"
          title="COLOR"
          icon={Palette}
          isOpen={openSection === 'color'}
          onToggle={handleToggleSection}
        >
          <div className="space-y-4">
            <div className="flex gap-2 p-1 bg-slate-900 rounded-lg">
              <button
                onClick={() => setColorType('solid')}
                className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
                  colorType === 'solid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Solid
              </button>
              <button
                onClick={() => setColorType('gradient')}
                className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
                  colorType === 'gradient' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Gradient
              </button>
            </div>

            {colorType === 'solid' ? (
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={solidColor}
                  onChange={(e) => setSolidColor(e.target.value)}
                  className="w-12 h-12 border-0 rounded-xl cursor-pointer bg-transparent"
                />
                <div className="flex-1">
                  <span className="text-[10px] text-slate-500 font-semibold block mb-0.5">HEX CODE</span>
                  <input
                    type="text"
                    value={solidColor}
                    onChange={(e) => setSolidColor(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 w-full focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setGradientType('linear')}
                    className={`flex-1 py-1 border text-[10px] rounded-lg font-semibold transition-all ${
                      gradientType === 'linear' ? 'border-indigo-500 bg-indigo-950/20 text-indigo-300' : 'border-slate-800 text-slate-400'
                    }`}
                  >
                    Linear
                  </button>
                  <button
                    onClick={() => setGradientType('radial')}
                    className={`flex-1 py-1 border text-[10px] rounded-lg font-semibold transition-all ${
                      gradientType === 'radial' ? 'border-indigo-500 bg-indigo-950/20 text-indigo-300' : 'border-slate-800 text-slate-400'
                    }`}
                  >
                    Radial
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block mb-1">START COLOR</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={gradientStart}
                        onChange={(e) => setGradientStart(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={gradientStart}
                        onChange={(e) => setGradientStart(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-slate-300 w-full focus:outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block mb-1">END COLOR</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={gradientEnd}
                        onChange={(e) => setGradientEnd(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={gradientEnd}
                        onChange={(e) => setGradientEnd(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-slate-300 w-full focus:outline-none focus:border-indigo-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CustomAccordion>

        {/* SECTION: LOGO */}
        <CustomAccordion
          id="logo"
          title="LOGO"
          icon={ImageIcon}
          isOpen={openSection === 'logo'}
          onToggle={handleToggleSection}
        >
          {logo ? (
            <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-850">
              <div className="flex items-center gap-3">
                <img src={logo} alt="Logo thumbnail" className="w-10 h-10 object-contain rounded bg-white p-0.5" />
                <span className="text-xs text-slate-300 max-w-[150px] truncate font-medium">Custom Logo</span>
              </div>
              <button
                onClick={() => setLogo(null)}
                className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-xl p-6 cursor-pointer bg-slate-900/20 hover:bg-slate-900/40 transition-all">
              <Upload className="w-6 h-6 text-slate-400 mb-2" />
              <span className="text-xs text-slate-300 font-bold mb-0.5">Upload Custom Logo</span>
              <span className="text-[10px] text-slate-500">Supports PNG, JPG (max 2MB)</span>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
          )}
        </CustomAccordion>

        {/* SECTION: FRAMES */}
        <CustomAccordion
          id="frames"
          title="FRAMES"
          icon={Layout}
          isOpen={openSection === 'frames'}
          onToggle={handleToggleSection}
        >
          <div className="grid grid-cols-2 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
            {frameOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setFrameStyle(opt.id)}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold transition-all duration-200 ${
                  frameStyle === opt.id
                    ? 'border-indigo-500 bg-indigo-950/60 text-indigo-300 shadow-sm'
                    : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span className="text-lg">{opt.icon}</span>
                <span className="truncate">{opt.label}</span>
              </button>
            ))}
          </div>
        </CustomAccordion>
      </div>

      {/* Panel Footer Export Action Buttons */}
      <div className="p-6 border-t border-slate-900 bg-slate-950 sticky bottom-0 z-10">
        <span className="text-[10px] text-slate-500 font-bold tracking-wide block mb-2">EXPORT FORMAT</span>
        <div className="flex gap-2 mb-4 bg-slate-900 rounded-xl p-1">
          {['PNG', 'JPG', 'SVG'].map((fmt) => (
            <button
              key={fmt}
              onClick={() => setExportFormat(fmt)}
              className={`flex-1 py-2 rounded-lg text-xs font-black transition-all ${
                exportFormat === fmt ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>

        <button
          onClick={handleExport}
          disabled={isExporting}
          className={`w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-black py-4 px-6 rounded-2xl text-sm tracking-wider transition-all duration-200 shadow-lg shadow-indigo-900/20 ${isExporting ? 'opacity-50 cursor-wait' : ''}`}
        >
          {isExporting ? 'EXPORTING...' : 'DOWNLOAD QR CODE IMAGE'}
        </button>
      </div>

      {/* Success Modal Popup Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm animate-fade-in p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl animate-scale-up text-white flex flex-col items-center select-none">
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
              onClick={() => setShowModal(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all duration-200 shadow-md shadow-indigo-900/40"
            >
              Awesome
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignPanel;
