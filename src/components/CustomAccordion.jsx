import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CustomAccordion = ({ id, title, icon: Icon, isOpen, onToggle, children }) => {
  return (
    <div className="border border-slate-900 rounded-2xl overflow-hidden bg-slate-900/30">
      <button
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between p-4 font-bold text-sm text-slate-200 tracking-wider hover:bg-slate-900/50 transition-colors"
      >
        <span className="flex items-center gap-2.5">
          {Icon && <Icon className="w-4 h-4 text-indigo-400" />}
          {title}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-slate-900 bg-slate-950/10">
          {children}
        </div>
      )}
    </div>
  );
};

export default CustomAccordion;
