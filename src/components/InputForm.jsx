import React from 'react';

const InputForm = ({ activeType, formData, setFormData }) => {
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [activeType]: {
        ...prev[activeType],
        [field]: value
      }
    }));
  };

  const data = formData[activeType] || {};

  switch (activeType) {
    case 'url':
      return (
        <div className="w-full select-none">
          <h2 className="text-lg font-black text-slate-100 mb-1">Enter your website URL</h2>
          <p className="text-slate-500 text-xs mb-5">Your QR code will update automatically on typing.</p>
          <div className="relative">
            <input
              type="text"
              value={data.url || ''}
              onChange={(e) => handleInputChange('url', e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-3 bg-slate-950 border border-white/5 rounded-xl text-slate-200 placeholder-slate-700 focus:outline-none focus:border-indigo-500 font-medium text-sm transition-all duration-200 shadow-sm"
            />
          </div>
        </div>
      );
    case 'wifi':
      return (
        <div className="w-full select-none">
          <h2 className="text-lg font-black text-slate-100 mb-1">WiFi Configuration</h2>
          <p className="text-slate-500 text-xs mb-5">Configure details for your local WiFi connection.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">Network Name (SSID)</label>
              <input
                type="text"
                value={data.ssid || ''}
                onChange={(e) => handleInputChange('ssid', e.target.value)}
                placeholder="My Home WiFi"
                className="w-full px-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-slate-200 placeholder-slate-700 focus:outline-none focus:border-indigo-500 font-medium text-sm transition-all duration-200 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">Password</label>
              <input
                type="password"
                value={data.password || ''}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="••••••••"
                disabled={data.encryption === 'nopass'}
                className="w-full px-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-slate-200 placeholder-slate-700 focus:outline-none focus:border-indigo-500 font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:text-slate-600 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">Encryption Type</label>
              <select
                value={data.encryption || 'WPA'}
                onChange={(e) => handleInputChange('encryption', e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-slate-300 focus:outline-none focus:border-indigo-500 font-medium text-sm transition-all duration-200 shadow-sm cursor-pointer"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">None (Open Network)</option>
              </select>
            </div>
          </div>
        </div>
      );
    case 'text':
      return (
        <div className="w-full select-none">
          <h2 className="text-lg font-black text-slate-100 mb-1">Plain Text</h2>
          <p className="text-slate-500 text-xs mb-5">Type contents to show on scan.</p>
          <div>
            <textarea
              value={data.text || ''}
              onChange={(e) => handleInputChange('text', e.target.value)}
              placeholder="Type your message here..."
              rows={5}
              className="w-full px-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-slate-200 placeholder-slate-700 focus:outline-none focus:border-indigo-500 font-medium text-sm resize-none transition-all duration-200 shadow-sm"
            />
            <div className="text-right text-[10px] text-slate-500 mt-1.5 font-mono">
              {(data.text || '').length} characters
            </div>
          </div>
        </div>
      );
    case 'email':
      return (
        <div className="w-full select-none">
          <h2 className="text-lg font-black text-slate-100 mb-1">Email Message</h2>
          <p className="text-slate-500 text-xs mb-5">Setup a pre-written email recipient template.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">Recipient Email</label>
              <input
                type="email"
                value={data.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="hello@example.com"
                className="w-full px-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-slate-200 placeholder-slate-700 focus:outline-none focus:border-indigo-500 font-medium text-sm transition-all duration-200 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">Subject</label>
              <input
                type="text"
                value={data.subject || ''}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                placeholder="Inquiry about services"
                className="w-full px-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-slate-200 placeholder-slate-700 focus:outline-none focus:border-indigo-500 font-medium text-sm transition-all duration-200 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">Body Message</label>
              <textarea
                value={data.body || ''}
                onChange={(e) => handleInputChange('body', e.target.value)}
                placeholder="Write your email body message here..."
                rows={4}
                className="w-full px-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-slate-200 placeholder-slate-700 focus:outline-none focus:border-indigo-500 font-medium text-sm resize-none transition-all duration-200 shadow-sm"
              />
            </div>
          </div>
        </div>
      );
    case 'sms':
      return (
        <div className="w-full select-none">
          <h2 className="text-lg font-black text-slate-100 mb-1">SMS Message</h2>
          <p className="text-slate-500 text-xs mb-5">Setup a pre-written text message sender.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">Phone Number</label>
              <input
                type="tel"
                value={data.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-slate-200 placeholder-slate-700 focus:outline-none focus:border-indigo-500 font-medium text-sm transition-all duration-200 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5">Message</label>
              <textarea
                value={data.message || ''}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Type your SMS body here..."
                rows={4}
                className="w-full px-4 py-2.5 bg-slate-950 border border-white/5 rounded-xl text-slate-200 placeholder-slate-700 focus:outline-none focus:border-indigo-500 font-medium text-sm resize-none transition-all duration-200 shadow-sm"
              />
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default InputForm;
