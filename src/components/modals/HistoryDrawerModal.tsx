import React from 'react';
import { Student } from '../../types';

interface HistoryDrawerModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenCitation: (student: Student) => void;
  onPromptEdit?: (student: Student) => void;
  onPromptDelete?: (student: Student) => void;
}

export const HistoryDrawerModal: React.FC<HistoryDrawerModalProps> = ({
  student,
  isOpen,
  onClose,
  onOpenCitation,
  onPromptEdit,
  onPromptDelete,
}) => {
  if (!isOpen || !student) return null;

  const totalClasses = student.asistencias + student.tardanzas + student.faltas + student.justificadas;
  const compliance = totalClasses > 0 ? ((student.asistencias / totalClasses) * 100).toFixed(1) : '100';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto flex flex-col gap-4 shadow-2xl max-w-md mx-auto w-full border-t border-blue-100 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto -mt-1 mb-1" />

        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-600/30 flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">
                history_edu
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="text-[17px] font-extrabold text-blue-950 truncate leading-tight">
                {student.surname}, {student.name}
              </h3>
              <span className="text-[12px] text-slate-500">
                {student.section} • Bimestre III • Cód: {student.matriculaCode}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {onPromptEdit && (
              <button
                onClick={() => {
                  onClose();
                  onPromptEdit(student);
                }}
                className="w-8 h-8 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center justify-center transition-colors"
                title="Editar datos del alumno"
              >
                <span className="material-symbols-outlined text-[17px]">edit</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Resumen rápido */}
        <div className="bg-blue-50/70 p-3.5 rounded-2xl flex items-center justify-around text-center border border-blue-100">
          <div className="flex flex-col items-center">
            <span className="text-[11px] text-emerald-800 font-bold uppercase tracking-wider">
              Presentes
            </span>
            <p className="text-[22px] text-emerald-600 font-extrabold leading-tight mt-0.5">
              {student.asistencias}
            </p>
            <span className="text-[10px] text-emerald-700 font-medium">válidas</span>
          </div>
          <div className="w-px h-8 bg-blue-200" />
          <div className="flex flex-col items-center">
            <span className="text-[11px] text-amber-800 font-bold uppercase tracking-wider">
              Tardanzas
            </span>
            <p className="text-[22px] text-amber-600 font-extrabold leading-tight mt-0.5">
              {student.tardanzas}
            </p>
            <span className="text-[10px] text-amber-700 font-medium">acumuladas</span>
          </div>
          <div className="w-px h-8 bg-blue-200" />
          <div className="flex flex-col items-center">
            <span className="text-[11px] text-red-800 font-bold uppercase tracking-wider">
              Faltas
            </span>
            <p className="text-[22px] text-red-600 font-extrabold leading-tight mt-0.5">
              {student.faltas}
            </p>
            <span className="text-[10px] text-red-700 font-medium">
              {student.faltas >= 3 ? 'Alerta Crítica' : 'registradas'}
            </span>
          </div>
        </div>

        {/* Compliance info */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-slate-900">
              Cumplimiento Asistencia Bimestral
            </span>
            <span className="text-[11px] text-slate-500">
              Umbral mínimo UGEL 04: 85%
            </span>
          </div>
          <span
            className={`text-[16px] font-extrabold px-3 py-1 rounded-full ${
              Number(compliance) < 85
                ? 'bg-red-100 text-red-700'
                : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            {compliance}%
          </span>
        </div>

        {/* Apoderado Contact Box */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[20px] text-blue-600">
              family_restroom
            </span>
            <div className="min-w-0">
              <span className="text-[12px] font-bold text-slate-900 truncate block">
                {student.apoderado.name} ({student.apoderado.relationship})
              </span>
              <span className="text-[11px] text-slate-500 font-mono block">
                Cel: {student.apoderado.phone}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenCitation(student);
            }}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>Citar</span>
          </button>
        </div>

        {/* Timeline of Last 5 Class Sessions */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-bold text-slate-900">
              Últimas 5 Sesiones (EPT - Contabilidad)
            </span>
            <span className="text-[11px] text-slate-500">Sesiones de Aula</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-[13px] font-medium text-slate-900">
                Viernes, 18 Octubre
              </span>
            </div>
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-lg text-[11px] font-bold">
              Presente (08:02 AM)
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-[13px] font-medium text-slate-900">
                Miércoles, 16 Octubre
              </span>
            </div>
            <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-lg text-[11px] font-bold">
              Tardanza (08:24 AM)
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-[13px] font-medium text-slate-900">
                Viernes, 11 Octubre
              </span>
            </div>
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-lg text-[11px] font-bold">
              Presente (07:55 AM)
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="text-[13px] font-medium text-slate-900">
                Miércoles, 09 Octubre
              </span>
            </div>
            <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-lg text-[11px] font-bold">
              {student.faltas > 0 ? 'Falta Injustificada' : 'Presente (08:00 AM)'}
            </span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-[13px] font-medium text-slate-900">
                Viernes, 04 Octubre
              </span>
            </div>
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-lg text-[11px] font-bold">
              Presente (07:50 AM)
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          {onPromptEdit && (
            <button
              onClick={() => {
                onClose();
                onPromptEdit(student);
              }}
              className="py-3 px-3.5 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-[13px] font-bold border border-blue-200 flex items-center justify-center gap-1 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">edit</span>
              <span>Editar</span>
            </button>
          )}

          {onPromptDelete && (
            <button
              onClick={() => {
                onClose();
                onPromptDelete(student);
              }}
              className="py-3 px-3.5 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 text-[13px] font-bold border border-red-200 flex items-center justify-center gap-1 active:scale-95 transition-all"
              title="Retirar de la nómina"
            >
              <span className="material-symbols-outlined text-[18px]">person_remove</span>
              <span>Retirar</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl text-[14px] font-bold shadow-md shadow-blue-600/30 active:scale-[0.98] transition-transform"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
