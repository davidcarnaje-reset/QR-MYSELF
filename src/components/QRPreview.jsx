import React, { useEffect, useRef, useMemo } from 'react';
import QRCodeStyling from 'qr-code-styling';

const QRPreview = ({
  activeType,
  formData,
  pattern,
  colorType,
  solidColor,
  gradientType,
  gradientStart,
  gradientEnd,
  logo,
  frameStyle,
  qrCodeInstanceRef,
  frameRef
}) => {
  const containerRef = useRef(null);

  // Compile active QR data string based on selected data type safely
  const qrData = useMemo(() => {
    const data = formData[activeType] || {};
    switch (activeType) {
      case 'url':
        return data.url || 'https://example.com';
      case 'wifi':
        const ssid = data.ssid || '';
        const password = data.password || '';
        const encryption = data.encryption || 'WPA';
        return `WIFI:S:${ssid};T:${encryption};P:${password};;`;
      case 'text':
        return data.text || 'Offline QR Code';
      case 'email':
        const email = data.email || '';
        const subject = encodeURIComponent(data.subject || '');
        const body = encodeURIComponent(data.body || '');
        return `MATMSG:TO:${email};SUB:${subject};BODY:${body};;`;
      case 'sms':
        const phone = data.phone || '';
        const message = data.message || '';
        return `SMSTO:${phone}:${message}`;
      default:
        return 'https://example.com';
    }
  }, [activeType, formData]);

  // Instantiate QRCodeStyling once with safe default parameters
  const qrCode = useMemo(() => {
    const instance = new QRCodeStyling({
      width: 200,
      height: 200,
      type: 'svg',
      dotsOptions: {
        color: '#0f172a',
        type: 'rounded'
      },
      backgroundOptions: {
        color: '#ffffff',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 5
      }
    });

    if (qrCodeInstanceRef) {
      qrCodeInstanceRef.current = instance;
    }
    return instance;
  }, [qrCodeInstanceRef]);

  // Update QR Code options when styles or data change
  useEffect(() => {
    if (!qrCode) return;

    try {
      const dotsColor = colorType === 'solid' ? solidColor : undefined;
      const dotsGradient = colorType === 'gradient' ? {
        type: gradientType,
        colorStops: [
          { offset: 0, color: gradientStart },
          { offset: 1, color: gradientEnd }
        ]
      } : undefined;

      qrCode.update({
        data: qrData,
        dotsOptions: {
          type: pattern,
          color: dotsColor,
          gradient: dotsGradient
        },
        image: logo || undefined,
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 6,
          imageSizeFactor: 0.4
        }
      });
    } catch (err) {
      console.error("Error updating QR Code configuration:", err);
    }
  }, [qrCode, qrData, pattern, colorType, solidColor, gradientType, gradientStart, gradientEnd, logo]);

  // Render QR Code canvas to current mounted containerRef safely
  useEffect(() => {
    let animationFrameId;

    const renderQR = () => {
      if (!containerRef.current || !qrCode) return;
      try {
        containerRef.current.innerHTML = '';
        qrCode.append(containerRef.current);
      } catch (err) {
        console.error("Failed to append QR Code rendering:", err);
      }
    };

    animationFrameId = requestAnimationFrame(renderQR);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [qrCode, frameStyle, qrData, pattern, colorType, solidColor, gradientType, gradientStart, gradientEnd, logo]);

  // Rigid QR Canvas wrapper ensuring strict centering
  const qrCanvas = (
    <div className="relative w-[210px] h-[210px] bg-white rounded-2xl flex items-center justify-center shadow-inner overflow-hidden border border-slate-100/80">
      <div 
        ref={containerRef} 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[200px] h-[200px]"
      />
    </div>
  );

  // Helper to render layout wrapper around QR canvas
  const renderFramedQR = () => {
    switch (frameStyle) {
      case 'standard':
        return (
          <div ref={frameRef} className="relative w-[260px] h-[330px] bg-white rounded-3xl shadow-xl border border-slate-200/50 flex flex-col items-center justify-between p-5 transition-all duration-300">
            <div className="flex-1 flex items-center justify-center w-full">
              {qrCanvas}
            </div>
            <div className="w-full bg-slate-900 text-white font-black text-center py-3.5 rounded-xl tracking-widest text-[11px] select-none shadow-sm">
              SCAN ME
            </div>
          </div>
        );
      case 'speech':
        return (
          <div ref={frameRef} className="relative w-[260px] h-[340px] bg-white rounded-3xl shadow-xl border border-slate-200/50 flex flex-col items-center justify-between p-5 pt-8 transition-all duration-300">
            <div className="absolute top-3 bg-slate-900 text-white font-black px-5 py-1.5 rounded-full tracking-widest text-[9px] select-none shadow-md">
              SCAN ME
              <div className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-900" />
            </div>
            <div className="flex-1 flex items-center justify-center w-full mt-4">
              {qrCanvas}
            </div>
          </div>
        );
      case 'arrow':
        return (
          <div ref={frameRef} className="relative w-[260px] h-[330px] bg-white rounded-3xl shadow-xl border border-slate-200/50 flex flex-col items-center justify-center p-5 transition-all duration-300">
            <div className="flex-1 flex items-center justify-center w-full">
              {qrCanvas}
            </div>
            <div className="absolute bottom-2 flex items-center gap-1.5 text-slate-800 font-bold select-none">
              <svg className="w-5 h-5 text-indigo-500 transform rotate-[30deg] animate-bounce" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
              <span className="font-serif italic text-sm">Scan me</span>
            </div>
          </div>
        );
      case 'coffee':
        return (
          <div ref={frameRef} className="relative w-[260px] h-[350px] bg-white rounded-3xl shadow-xl border border-slate-200/50 flex flex-col items-center justify-between p-5 pt-3 transition-all duration-300">
            <div className="flex justify-center gap-1.5 h-6 mt-1">
              <svg className="w-8 h-6 text-indigo-500 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 18c.3-1.5.8-2.5.8-3.5s-.8-1.5-.8-2.5.8-1.5.8-3" />
                <path d="M12 18c.3-1.5.8-2.5.8-3.5s-.8-1.5-.8-2.5.8-1.5.8-3" />
                <path d="M18 18c.3-1.5.8-2.5.8-3.5s-.8-1.5-.8-2.5.8-1.5.8-3" />
              </svg>
            </div>
            <div className="flex-1 flex items-center justify-center w-full relative">
              {qrCanvas}
              <div className="absolute right-[-10px] w-6 h-20 border-4 border-slate-200 border-l-transparent rounded-r-2xl" />
            </div>
            <div className="w-full text-center text-[10px] font-black text-slate-800 pt-3.5 flex items-center justify-center gap-1 select-none border-t border-slate-100 mt-2">
              ☕ SCAN FOR COFFEE
            </div>
          </div>
        );
      case 'shopping':
        return (
          <div ref={frameRef} className="relative w-[260px] h-[340px] bg-white rounded-3xl shadow-xl border border-slate-200/50 flex flex-col items-center justify-between p-5 pt-6 transition-all duration-300">
            <div className="absolute top-[-10px] z-10">
              <svg className="w-14 h-8 text-slate-300" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
                <path d="M20,40 C20,10 80,10 80,40" />
              </svg>
            </div>
            <div className="flex-1 flex items-center justify-center w-full mt-2">
              {qrCanvas}
            </div>
            <div className="w-full bg-slate-900 text-white font-bold text-center py-2.5 rounded-xl text-[10px] tracking-wider select-none mt-2 shadow-sm">
              🛍️ SHOPPING CODE
            </div>
          </div>
        );
      case 'gift':
        return (
          <div ref={frameRef} className="relative w-[260px] h-[340px] bg-white rounded-3xl shadow-xl border border-slate-200/50 flex flex-col items-center justify-between p-5 pt-6 transition-all duration-300">
            <div className="absolute top-[-12px] z-10">
              <svg className="w-16 h-8 text-rose-500" viewBox="0 0 60 30" fill="currentColor">
                <path d="M 30 20 C 15 20, 10 5, 25 5 C 35 5, 30 20, 30 20 Z" />
                <path d="M 30 20 C 45 20, 50 5, 35 5 C 25 5, 30 20, 30 20 Z" />
                <circle cx="30" cy="18" r="4" fill="currentColor" />
              </svg>
            </div>
            <div className="flex-1 flex items-center justify-center w-full mt-2">
              {qrCanvas}
            </div>
            <div className="w-full bg-rose-500 text-white font-bold text-center py-2.5 rounded-xl text-[10px] tracking-wider select-none mt-2 shadow-sm">
              🎁 OPEN GIFT CODE
            </div>
          </div>
        );
      case 'scooter':
        return (
          <div ref={frameRef} className="relative w-[300px] h-[330px] bg-white rounded-3xl shadow-xl border border-slate-200/50 p-5 flex items-center justify-between gap-3 transition-all duration-300">
            <div className="flex-1 flex items-center justify-center z-10">
              {qrCanvas}
            </div>
            <div className="w-16 h-full flex flex-col justify-end items-center pb-6 opacity-60 shrink-0">
              <div className="w-1.5 h-20 bg-slate-300 rounded-full relative">
                <div className="absolute top-0 right-[-6px] w-6 h-1.5 bg-slate-400 rounded-full" />
                <div className="absolute top-6 left-[-16px] w-5 h-4 bg-indigo-400 rounded-md" />
              </div>
              <div className="w-10 h-10 border-4 border-slate-400 rounded-full bg-slate-100 mt-2 flex items-center justify-center">
                <div className="w-4 h-4 bg-slate-500 rounded-full" />
              </div>
            </div>
            <div className="absolute bottom-2 left-5 text-[9px] font-black text-slate-800 tracking-wider">
              🛵 FAST DELIVERY
            </div>
          </div>
        );
      case 'chef':
        return (
          <div ref={frameRef} className="relative w-[260px] h-[350px] bg-white rounded-3xl shadow-xl border border-slate-200/50 flex flex-col items-center justify-between p-5 pt-8 transition-all duration-300">
            <div className="absolute top-[-16px] z-10">
              <svg className="w-14 h-12 text-slate-700" viewBox="0 0 100 80" fill="currentColor">
                <path d="M30 50 C20 50 10 40 10 30 C10 15 25 10 35 20 C40 10 60 10 65 20 C75 10 90 15 90 30 C90 40 80 50 70 50 L70 65 L30 65 Z" />
                <rect x="35" y="65" width="30" height="6" rx="2" fill="currentColor" />
              </svg>
            </div>
            <div className="flex-1 flex items-center justify-center w-full mt-3">
              {qrCanvas}
            </div>
            <div className="w-full text-center text-[10px] font-black text-slate-800 pt-3.5 select-none border-t border-slate-100 mt-2">
              👨‍🍳 SCAN FOR MENU
            </div>
          </div>
        );
      case 'pill':
        return (
          <div ref={frameRef} className="relative w-[260px] h-[330px] bg-white rounded-3xl shadow-xl border border-slate-200/50 flex flex-col items-center justify-between p-5 transition-all duration-300">
            <div className="flex-1 flex items-center justify-center w-full">
              {qrCanvas}
            </div>
            <div className="bg-slate-900 text-white font-extrabold text-center px-6 py-2.5 rounded-full tracking-wider text-[10px] select-none shadow-md mt-2">
              SCAN ME
            </div>
          </div>
        );
      default:
        return (
          <div ref={frameRef} className="p-4 bg-white rounded-3xl shadow-xl border border-slate-200/50 inline-block transition-all duration-300 flex items-center justify-center">
            {qrCanvas}
          </div>
        );
    }
  };

  return (
    <div className="flex items-center justify-center py-4 bg-slate-900/5 dark:bg-black/20 rounded-2xl p-6 min-h-[360px]">
      {renderFramedQR()}
    </div>
  );
};

export default QRPreview;
export { QRCodeStyling }; // export to let other files reference if needed
