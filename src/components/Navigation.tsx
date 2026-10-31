import React from 'react';
import { ActiveTab } from '../types';

interface NavigationProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  pendingSyncCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  pendingSyncCount = 0,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: string; badge?: number }[] = [
    { id: 'asistencia-diaria', label: 'Asistencia', icon: 'how_to_reg', badge: pendingSyncCount },
    { id: 'registro-acumulado', label: 'Acumulado', icon: 'analytics' },
    { id: 'estudiantes', label: 'Estudiantes', icon: 'group' },
    { id: 'reportes-tutoria', label: 'Tutoría', icon: 'assignment_late' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-white/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(30,58,138,0.08)] border-t border-blue-100">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`relative flex flex-col items-center justify-center gap-1 w-20 h-14 rounded-2xl transition-all active:scale-95 ${
                isActive
                  ? 'text-blue-700 font-bold'
                  : 'text-slate-500 hover:text-blue-900'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[24px] transition-transform duration-200"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {item.icon}
                </span>

                {item.badge && item.badge > 0 && !isActive ? (
                  <span className="absolute -top-1 -right-2 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[16px] text-center shadow-xs animate-pulse">
                    {item.badge}
                  </span>
                ) : null}
              </div>

              <span
                className={`text-[11px] text-center leading-none tracking-tight ${
                  isActive ? 'font-bold text-blue-700' : 'font-medium'
                }`}
              >
                {item.label}
              </span>

              {isActive && (
                <div className="absolute bottom-1 w-6 h-1 rounded-full bg-blue-600 animate-fade-in" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
