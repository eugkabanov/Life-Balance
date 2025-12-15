import React from 'react';
import { OptionConfig } from '../types';
import { Clock, Armchair, PiggyBank } from 'lucide-react';

interface ToggleProps {
  config: OptionConfig;
  isActive: boolean;
  onToggle: (key: any) => void;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({ config, isActive, onToggle }) => {
  const Icon = config.key === 'time' ? Clock : config.key === 'comfort' ? Armchair : PiggyBank;

  return (
    <div 
      className={`
        relative overflow-hidden group p-4 rounded-xl border transition-all duration-300 cursor-pointer
        ${isActive 
          ? `bg-opacity-20 border-opacity-50` 
          : 'bg-surface border-slate-700 hover:border-slate-600'}
      `}
      style={{
        backgroundColor: isActive ? `${config.color}20` : undefined,
        borderColor: isActive ? config.color : undefined,
        boxShadow: isActive ? `0 0 20px -5px ${config.color}40` : 'none'
      }}
      onClick={() => onToggle(config.key)}
    >
      <div className="flex items-center justify-between z-10 relative">
        <div className="flex items-center space-x-4">
          <div 
            className={`p-2 rounded-lg transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400'}`}
            style={{ backgroundColor: isActive ? config.color : 'rgba(255,255,255,0.05)' }}
          >
            <Icon size={24} />
          </div>
          <div className="flex flex-col">
            <span className={`font-bold text-lg ${isActive ? 'text-white' : 'text-slate-300'}`}>
              {config.label}
            </span>
            <span className="text-xs text-slate-500 hidden sm:block">
              {config.description}
            </span>
          </div>
        </div>

        {/* Switch UI */}
        <div className={`
          w-14 h-8 rounded-full p-1 transition-colors duration-300 flex items-center
          ${isActive ? '' : 'bg-slate-800'}
        `}
        style={{ backgroundColor: isActive ? config.color : undefined }}
        >
          <div className={`
            bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300
            ${isActive ? 'translate-x-6' : 'translate-x-0'}
          `} />
        </div>
      </div>
    </div>
  );
};