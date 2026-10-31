import React from 'react';
import { ActiveTab } from '../types';
import { INSTITUTIONAL_INFO } from '../data/mockData';

interface HeaderProps {
  activeTab: ActiveTab;
  activeSection: string;
  onSelectSection: (section: string) => void;
  onOpenTeacherProfile: () => void;
  onOpenNewStudent: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  activeSection,
  onSelectSection,
  onOpenTeacherProfile,
  onOpenNewStudent,
}) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'asistencia-diaria':
        return 'Asistencia Diaria';
      case 'registro-acumulado':
        return 'Registro Acumulado';
      case 'estudiantes':
        return 'Directorio de Estudiantes';
      case 'reportes-tutoria':
        return 'Reportes Tutoría';
      default:
        return 'Control de Asistencia';
    }
  };

  return (
    <header className="fixed top-0 w-full z-40 bg-white/95 backdrop-blur-xl shadow-md shadow-blue-900/5 border-b border-blue-100 pt-safe">
      <div className="h-36 px-4 flex flex-col justify-between py-2.5 max-w-md mx-auto">
        {/* Top bar with School Crest, Name, Quick Add and Profile */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              alt="Insignia Cáceres"
              className="h-10 w-auto object-contain flex-shrink-0 drop-shadow-sm"
              src={INSTITUTIONAL_INFO.logoPath}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-[11px] text-blue-700 uppercase tracking-wider truncate leading-tight">
                {INSTITUTIONAL_INFO.schoolName}
              </span>
              <h1 className="text-[19px] text-slate-900 font-extrabold tracking-tight truncate leading-tight">
                {getTabTitle()}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Quick Add Student Button in Header */}
            <button
              onClick={onOpenNewStudent}
              aria-label="Agregar Estudiante"
              className="h-9 px-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 shadow-md shadow-emerald-600/30 active:scale-95 transition-all text-[12px] font-bold"
              title="Agregar Estudiante"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span className="hidden xs:inline">+ Alumno</span>
            </button>

            {/* Teacher Profile Trigger Avatar */}
            <button
              onClick={onOpenTeacherProfile}
              aria-label="Perfil del Docente"
              className="w-9 h-9 rounded-full bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-700/30 active:scale-95 transition-all"
              title="Perfil Docente - Prof. Valerio Cristóbal"
            >
              <span className="material-symbols-outlined text-[20px]">
                person
              </span>
            </button>
          </div>
        </div>

        {/* Institutional Teacher & Specialty Sub-bar (Azulino y Verde) */}
        <div className="bg-blue-50/80 px-3 py-1 rounded-xl flex items-center justify-between text-slate-600 text-[11px] border border-blue-100">
          <span className="font-bold text-blue-950 truncate">
            {INSTITUTIONAL_INFO.teacher}
          </span>
          <span className="text-blue-300">|</span>
          <span className="truncate">Área: {INSTITUTIONAL_INFO.area}</span>
          <span className="text-blue-300">|</span>
          <span className="truncate text-emerald-700 font-extrabold">
            {INSTITUTIONAL_INFO.specialty}
          </span>
        </div>

        {/* Section Switching Pills (Azulino, Verde, Blanco) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => onSelectSection('1° A')}
            className={`px-3 py-1 rounded-full text-[12px] font-bold flex-shrink-0 min-h-[32px] flex items-center justify-center transition-all ${
              activeSection === '1° A'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 ring-2 ring-blue-600/20'
                : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
            }`}
          >
            1° A
          </button>

          <button
            onClick={() => onSelectSection('2° C')}
            className={`px-3.5 py-1 rounded-full text-[12px] font-bold flex-shrink-0 min-h-[32px] flex items-center gap-1 transition-all ${
              activeSection === '2° C'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 ring-2 ring-blue-600/20'
                : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">school</span>
            <span>2° C (Taller)</span>
          </button>

          <button
            onClick={() => onSelectSection('3° A')}
            className={`px-3 py-1 rounded-full text-[12px] font-bold flex-shrink-0 min-h-[32px] flex items-center justify-center transition-all ${
              activeSection === '3° A'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 ring-2 ring-blue-600/20'
                : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
            }`}
          >
            3° A
          </button>

          <button
            onClick={() => onSelectSection('Tutoría 2° C')}
            className={`px-3.5 py-1 rounded-full text-[12px] flex-shrink-0 min-h-[32px] flex items-center gap-1 font-extrabold transition-all ${
              activeSection === 'Tutoría 2° C'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-600/20'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              verified
            </span>
            <span>Tutoría 2° C</span>
          </button>
        </div>
      </div>
    </header>
  );
};
