import React, { useState } from 'react';
import { Student, JustificationRecord } from '../../types';

interface JustificationModalProps {
  students: Student[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: JustificationRecord) => void;
}

export const JustificationModal: React.FC<JustificationModalProps> = ({
  students,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const [studentName, setStudentName] = useState(
    students[0] ? `${students[0].surname}, ${students[0].name}` : ''
  );
  const [date, setDate] = useState('24 Mar 2025');
  const [type, setType] = useState<'Salud' | 'Entrevista' | 'Permiso' | 'Familiar'>('Salud');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState('Certificado Médico Posta Collique');
  const [status, setStatus] = useState<'Aceptada' | 'Compromiso' | 'En Trámite'>('Aceptada');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !description) return;

    const newRecord: JustificationRecord = {
      id: `JUST-${Date.now().toString().slice(-4)}`,
      studentName,
      date,
      type,
      description,
      status,
      attachment,
    };

    onSave(newRecord);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-5 max-w-md w-full shadow-2xl flex flex-col gap-4 border border-blue-100 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-blue-50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/30">
              <span className="material-symbols-outlined text-[22px]">healing</span>
            </div>
            <div>
              <h3 className="text-[16px] font-extrabold text-blue-950 leading-tight">
                Registrar Justificación / Visita
              </h3>
              <span className="text-[11px] text-slate-500">
                Módulo de Tutoría y Convivencia Escolar
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Student selection */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-bold text-blue-950">
              Estudiante:
            </label>
            <select
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {students.map((s) => (
                <option key={s.id} value={`${s.surname}, ${s.name}`}>
                  {s.orderNumber}. {s.surname}, {s.name} ({s.section})
                </option>
              ))}
            </select>
          </div>

          {/* Type and Date in row */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-bold text-blue-950">
                Tipo de Motivo:
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Salud">Salud / Médico</option>
                <option value="Entrevista">Entrevista Apoderado</option>
                <option value="Permiso">Permiso Institucional</option>
                <option value="Familiar">Fuerza Mayor</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-bold text-blue-950">
                Fecha del Suceso:
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Ej: 24 Mar 2025"
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-bold text-blue-950">
              Descripción / Sustento:
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: Apoderada presenta receta de posta de Collique por cuadro gripal..."
              className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Attachment reference */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-bold text-blue-950">
              Documento de Respaldo:
            </label>
            <input
              type="text"
              value={attachment}
              onChange={(e) => setAttachment(e.target.value)}
              placeholder="Ej: Receta médica, FUT N° 0492, Acta firmada"
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status selector */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-bold text-blue-950">
              Dictamen de Tutoría:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Aceptada', 'Compromiso', 'En Trámite'] as const).map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatus(st)}
                  className={`py-2 rounded-xl text-[12px] font-bold border transition-all ${
                    status === st
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[13px] font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-bold shadow-md shadow-blue-600/30"
            >
              Guardar Registro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
