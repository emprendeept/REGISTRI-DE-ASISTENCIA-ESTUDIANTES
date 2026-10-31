import React, { useState } from 'react';
import { Student } from '../../types';
import { INSTITUTIONAL_INFO } from '../../data/mockData';

interface WhatsAppModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onSent: (studentName: string) => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  student,
  isOpen,
  onClose,
  onSent,
}) => {
  if (!isOpen || !student) return null;

  const [copied, setCopied] = useState(false);
  const faltasCount = student.faltas || 4;
  const apoderadoName = student.apoderado.name;
  const phone = student.apoderado.phone;

  const messageText =
    `Estimada(o) apoderada(o) ${apoderadoName}:\n` +
    `Le saluda el ${INSTITUTIONAL_INFO.teacher}, tutor de ${INSTITUTIONAL_INFO.gradeSection} de la ${INSTITUTIONAL_INFO.schoolName}.\n\n` +
    `Le informamos que el estudiante *${student.surname}, ${student.name}* registra *${faltasCount} inasistencias* acumuladas. ` +
    `Solicitamos su presencia urgente para coordinar la justificación y salvaguardar su continuidad escolar ante la UGEL 04.\n\n` +
    `📅 Fecha sugerida: Día hábil de 8:00 am a 10:00 am en la oficina de Tutoría / Dirección.`;

  const handleOpenWhatsApp = () => {
    const url = `https://wa.me/51${phone}?text=${encodeURIComponent(messageText)}`;
    window.open(url, '_blank');
    onSent(student.name);
    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDirectRegister = () => {
    onSent(student.name);
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
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/30">
              <span className="material-symbols-outlined text-[22px]">chat</span>
            </div>
            <div>
              <h3 className="text-[16px] font-extrabold text-blue-950 leading-tight">
                Citación Formal por WhatsApp
              </h3>
              <span className="text-[11px] text-emerald-700 font-bold">
                I.E. Andrés Avelino Cáceres D. • UGEL 04
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

        {/* Recipient Details */}
        <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100 flex flex-col gap-1.5 text-[12px]">
          <div className="flex justify-between text-slate-900">
            <span className="text-slate-500 font-medium">Estudiante:</span>
            <span className="font-bold">{student.surname}, {student.name}</span>
          </div>
          <div className="flex justify-between text-slate-900">
            <span className="text-slate-500 font-medium">Apoderado:</span>
            <span className="font-semibold">{student.apoderado.name} ({student.apoderado.relationship})</span>
          </div>
          <div className="flex justify-between text-slate-900">
            <span className="text-slate-500 font-medium">Celular / WhatsApp:</span>
            <span className="font-bold text-blue-700 font-mono">+51 {phone}</span>
          </div>
          <div className="flex justify-between text-slate-900">
            <span className="text-slate-500 font-medium">Faltas acumuladas:</span>
            <span className="font-extrabold text-red-600">{faltasCount} Faltas (Alerta)</span>
          </div>
        </div>

        {/* Message Preview Box */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
            <span>Plantilla oficial del mensaje</span>
            <button
              onClick={handleCopy}
              className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">content_copy</span>
              <span>{copied ? '¡Copiado!' : 'Copiar texto'}</span>
            </button>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-[12px] text-slate-800 whitespace-pre-line font-mono leading-relaxed max-h-48 overflow-y-auto">
            {messageText}
          </div>
        </div>

        {/* Actions in Verde & Azulino */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={handleOpenWhatsApp}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl text-[14px] font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
            <span>Abrir en WhatsApp</span>
          </button>

          <button
            onClick={handleDirectRegister}
            className="w-full bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 py-2.5 rounded-2xl text-[13px] font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-blue-600">check_circle</span>
            <span>Registrar Citación como Enviada</span>
          </button>
        </div>
      </div>
    </div>
  );
};
