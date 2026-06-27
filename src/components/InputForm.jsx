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
        <div className="flex-1 flex flex-col justify-center px-12 max-w-2xl mx-auto w-full select-none">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Enter your website URL</h2>
          <p className="text-slate-400 text-sm mb-8">Your QR code will be generated automatically.</p>
          <div className="relative">
            <input
              type="text"
              value={data.url || ''}
              onChange={(e) => handleInputChange('url', e.target.value)}
              placeholder="https://example.com"
              className="w-full px-5 py-4 border border-slate-200 rounded-2xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-300 font-medium text-lg transition-all duration-200 shadow-sm"
            />
          </div>
        </div>
      );
    case 'wifi':
      return (
        <div className="flex-1 flex flex-col justify-center px-12 max-w-2xl mx-auto w-full select-none">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">WiFi Configuration</h2>
          <p className="text-slate-400 text-sm mb-8">Configure your local WiFi network details.</p>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2">Network Name (SSID)</label>
              <input
                type="text"
                value={data.ssid || ''}
                onChange={(e) => handleInputChange('ssid', e.target.value)}
                placeholder="My Home WiFi"
                className="w-full px-4 py-3.5 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-300 font-medium transition-all duration-200 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2">Password</label>
              <input
                type="password"
                value={data.password || ''}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="••••••••"
                disabled={data.encryption === 'nopass'}
                className="w-full px-4 py-3.5 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-300 font-medium transition-all duration-200 disabled:bg-slate-50 disabled:text-slate-400 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2">Encryption Type</label>
              <select
                value={data.encryption || 'WPA'}
                onChange={(e) => handleInputChange('encryption', e.target.value)}
                className="w-full px-4 py-3.5 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-medium transition-all duration-200 bg-white shadow-sm"
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
        <div className="flex-1 flex flex-col justify-center px-12 max-w-2xl mx-auto w-full select-none">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Plain Text</h2>
          <p className="text-slate-400 text-sm mb-8">Enter message or text to display on scan.</p>
          <div>
            <textarea
              value={data.text || ''}
              onChange={(e) => handleInputChange('text', e.target.value)}
              placeholder="Type your message here..."
              rows={6}
              className="w-full px-4 py-3.5 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-300 font-medium resize-none transition-all duration-200 shadow-sm"
            />
            <div className="text-right text-xs text-slate-400 mt-1 font-mono">
              {(data.text || '').length} characters
            </div>
          </div>
        </div>
      );
    case 'email':
      return (
        <div className="flex-1 flex flex-col justify-center px-12 max-w-2xl mx-auto w-full select-none">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Email Message</h2>
          <p className="text-slate-400 text-sm mb-8">Setup a pre-written email form.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Recipient Email</label>
              <input
                type="email"
                value={data.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="hello@example.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-300 font-medium transition-all duration-200 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Subject</label>
              <input
                type="text"
                value={data.subject || ''}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                placeholder="Inquiry about services"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-300 font-medium transition-all duration-200 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Body Message</label>
              <textarea
                value={data.body || ''}
                onChange={(e) => handleInputChange('body', e.target.value)}
                placeholder="Write your email body message here..."
                rows={4}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-300 font-medium resize-none transition-all duration-200 shadow-sm"
              />
            </div>
          </div>
        </div>
      );
    case 'sms':
      return (
        <div className="flex-1 flex flex-col justify-center px-12 max-w-2xl mx-auto w-full select-none">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">SMS Message</h2>
          <p className="text-slate-400 text-sm mb-8">Setup a pre-written text message recipient.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Phone Number</label>
              <input
                type="tel"
                value={data.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-300 font-medium transition-all duration-200 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Message</label>
              <textarea
                value={data.message || ''}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Type your SMS body here..."
                rows={5}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-slate-300 font-medium resize-none transition-all duration-200 shadow-sm"
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
