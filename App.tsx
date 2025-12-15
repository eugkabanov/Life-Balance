import React, { useState, useCallback } from 'react';
import { OPTIONS, OptionKey } from './types';
import { Toggle } from './components/Toggle';
import { TriangleVis } from './components/TriangleVis';

const App: React.FC = () => {
  const [activeKeys, setActiveKeys] = useState<OptionKey[]>([]);
  const [lastRemoved, setLastRemoved] = useState<OptionKey | null>(null);

  const handleToggle = useCallback((key: OptionKey) => {
    setLastRemoved(null); // Reset notification

    setActiveKeys((prev) => {
      // If already active, just remove it
      if (prev.includes(key)) {
        return prev.filter((k) => k !== key);
      }

      // If less than 2, simply add
      if (prev.length < 2) {
        return [...prev, key];
      }

      // If trying to add 3rd, randomly remove one of the existing ones
      // "Randomly toggle one of it to off"
      const randomIndex = Math.floor(Math.random() * prev.length);
      const keyToRemove = prev[randomIndex];
      
      setLastRemoved(keyToRemove);
      
      const newKeys = prev.filter((_, index) => index !== randomIndex);
      return [...newKeys, key];
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary opacity-[0.03] rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent opacity-[0.03] rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-5xl z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Visualization */}
        <div className="order-2 lg:order-1 flex flex-col items-center justify-center space-y-8">
          <div className="relative w-full">
            <TriangleVis activeKeys={activeKeys} />
            
            {/* Notification Toast for random removal */}
            {lastRemoved && (
              <div className="absolute bottom-10 left-0 right-0 mx-auto w-max animate-bounce">
                <div className="bg-slate-800 border border-slate-700 text-slate-300 px-4 py-2 rounded-full shadow-lg text-sm flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 block"></span>
                  <span>
                    <span className="font-bold text-white">
                      {OPTIONS.find(o => o.key === lastRemoved)?.label}
                    </span> пожертвован(о) ради баланса
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <div className="text-center space-y-2 max-w-md text-slate-400 text-sm">
            <p>
              Вы можете выбрать только два из трех.
            </p>
            <p className="opacity-60">
              Попытка выбрать третий вариант приведет к случайной потере одного из уже выбранных.
            </p>
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="order-1 lg:order-2 space-y-6">
          <div className="space-y-2 mb-8">
            <h1 className="text-4xl font-black text-white tracking-tight">
              Теория <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Нереальности</span>
            </h1>
            <p className="text-slate-400 text-lg">
              Управляйте приоритетами своей жизни. Но помните: нельзя иметь всё сразу.
            </p>
          </div>

          <div className="space-y-4">
            {OPTIONS.map((option) => (
              <Toggle
                key={option.key}
                config={option}
                isActive={activeKeys.includes(option.key)}
                onToggle={handleToggle}
              />
            ))}
          </div>
          
          <div className="pt-6 border-t border-slate-800 mt-6 flex justify-between text-slate-500 text-xs uppercase tracking-widest font-semibold">
            <span>Системный статус</span>
            <span className={activeKeys.length === 2 ? "text-amber-500" : "text-green-500"}>
              {activeKeys.length === 2 ? "ПРЕДЕЛ ДОСТИГНУТ" : "СТАБИЛЬНО"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;