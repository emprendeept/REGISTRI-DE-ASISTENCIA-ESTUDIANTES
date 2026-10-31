import React from 'react';
import { Student } from '../../types';

interface DeleteStudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmRemove: (studentId: number, permanent: boolean) => void;
}

export const DeleteStudentModal: React.FC<DeleteStudentModalProps> = ({
  student,
  isOpen,
  onClose,
  onConfirmRemove,
}) => {
  if (!isOpen || !student) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl flex flex-col gap-4 border border-slate-100 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Icon */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[28px]">person_remove</span>
          </div>
          <div>
            <h3 className="text-[17px] font-bold text-slate-900 leading-tight">
              Retirar Estudiante
            </h3>
            <span className="text-[12px] text-slate-500">
              Nómina escolar • UGEL 04
            </span>
          </div>
        </div>

        {/* Student details card */}
        <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 flex flex-col gap-1.5 text-[13px]">
          <div className="flex justify-between items-center">
            <span className="text-slate-500">N° Orden:</span>
            <span className="font-bold text-blue-700 font-mono">{student.orderNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Estudiante:</span>
            <span className="font-bold text-slate-900 text-right truncate max-w-[200px]">
              {student.surname}, {student.name}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">DNI:</span>
            <span className="font-mono text-slate-700">{student.dni}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Sección actual:</span>
            <span className="font-bold text-emerald-700">{student.section}</span>
          </div>
        </div>

        <p className="text-[12px] text-slate-600 leading-relaxed">
          ¿Desea retirar a este estudiante de la nómina activa de clases y registros de asistencia?
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            type="button"
            onClick={() => onConfirmRemove(student.id, true)}
            className="w-full py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-[13px] font-bold shadow-md shadow-red-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[19px]">delete_forever</span>
            <span>Retirar / Eliminar de la Nómina</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[13px] font-semibold transition-colors"
          >
            Cancelar y Mantener
          </button>
        </div>
      </div>
    </div>
  );
};
