import React from 'react';
import { INSTITUTIONAL_INFO } from '../../data/mockData';

interface TeacherProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherProfileModal: React.FC<TeacherProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl flex flex-col gap-4 border border-blue-100 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-blue-50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 text-[22px]">
              badge
            </span>
            <h3 className="text-[16px] font-extrabold text-blue-950">
              Perfil del Docente
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex flex-col items-center text-center py-2">
          <div className="w-16 h-16 rounded-3xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 mb-2">
            <span className="material-symbols-outlined text-[36px]">person</span>
          </div>
          <h4 className="text-[17px] font-extrabold text-slate-900">
            {INSTITUTIONAL_INFO.teacher}
          </h4>
          <span className="text-[12px] text-blue-700 font-bold">
            Docente de {INSTITUTIONAL_INFO.area}
          </span>
          <span className="text-[11px] text-slate-500">
            Especialidad: {INSTITUTIONAL_INFO.specialty}
          </span>
        </div>

        <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100 flex flex-col gap-2 text-[12px]">
          <div className="flex justify-between">
            <span className="text-slate-500">Colegio:</span>
            <span className="font-bold text-blue-950 text-right">{INSTITUTIONAL_INFO.shortName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Jurisdicción:</span>
            <span className="font-semibold text-slate-800">UGEL 04 - Collique</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Turno Asignado:</span>
            <span className="font-semibold text-slate-800">Mañana (7:45 am - 1:00 pm)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Tutoría Asignada:</span>
            <span className="font-extrabold text-emerald-700">2° Grado "C"</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Estado SIAGIE:</span>
            <span className="text-emerald-700 font-extrabold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Conectado
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl text-[13px] font-bold shadow-md shadow-blue-600/30 active:scale-95 transition-transform"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};
