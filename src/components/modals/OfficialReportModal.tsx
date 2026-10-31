import React from 'react';
import { Student } from '../../types';
import { INSTITUTIONAL_INFO } from '../../data/mockData';

export type ReportType = 'siagie' | 'padron' | 'informe';

interface OfficialReportModalProps {
  type: ReportType | null;
  students: Student[];
  isOpen: boolean;
  onClose: () => void;
  onDownloadFeedback: (reportTitle: string) => void;
}

export const OfficialReportModal: React.FC<OfficialReportModalProps> = ({
  type,
  students,
  isOpen,
  onClose,
  onDownloadFeedback,
}) => {
  if (!isOpen || !type) return null;

  const getReportTitle = () => {
    switch (type) {
      case 'siagie':
        return 'Consolidado Mensual de Asistencia SIAGIE';
      case 'padron':
        return 'Padrón de Firmas - Entrega de Libretas y Cuadernos';
      case 'informe':
        return 'Informe Bimestral de Tutoría y Convivencia Escolar';
    }
  };

  const handleDownload = () => {
    onDownloadFeedback(getReportTitle());
    onClose();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 shadow-2xl flex flex-col gap-4 border border-blue-100 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-blue-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/30">
              <span className="material-symbols-outlined text-[22px]">
                {type === 'siagie' ? 'dataset' : type === 'padron' ? 'badge' : 'picture_as_pdf'}
              </span>
            </div>
            <div>
              <h3 className="text-[17px] font-extrabold text-blue-950 leading-tight">
                {getReportTitle()}
              </h3>
              <span className="text-[11px] text-slate-500">
                MINEDU • UGEL 04 Comas - Collique • Periodo 2025
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

        {/* Official Header Block */}
        <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100 flex flex-col gap-1.5 text-[12px]">
          <div className="flex justify-between items-center text-slate-900 font-bold">
            <span className="text-slate-500">Institución Educativa:</span>
            <span className="text-blue-700 text-right">{INSTITUTIONAL_INFO.schoolName}</span>
          </div>
          <div className="flex justify-between items-center text-slate-900">
            <span className="text-slate-500">Docente Tutor:</span>
            <span className="font-semibold">{INSTITUTIONAL_INFO.teacher} ({INSTITUTIONAL_INFO.specialty})</span>
          </div>
          <div className="flex justify-between items-center text-slate-900">
            <span className="text-slate-500">Grado y Sección:</span>
            <span className="font-extrabold text-emerald-700">2° Grado "C" de Secundaria</span>
          </div>
          <div className="flex justify-between items-center text-slate-900">
            <span className="text-slate-500">Total Estudiantes en Nómina:</span>
            <span className="font-bold text-blue-900">{students.length} alumnos</span>
          </div>
        </div>

        {/* Content Preview based on Report Type */}
        {type === 'siagie' && (
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-bold text-blue-950">
              Vista Previa de Matriz Formato SIAGIE (Extracto de Alumnos):
            </span>
            <div className="border border-slate-200 rounded-2xl overflow-x-auto bg-slate-50 max-h-60">
              <table className="w-full text-[11px] text-left border-collapse">
                <thead>
                  <tr className="bg-blue-50 text-blue-950 font-bold border-b border-blue-100">
                    <th className="p-2.5">N°</th>
                    <th className="p-2.5">DNI</th>
                    <th className="p-2.5">Apellidos y Nombres</th>
                    <th className="p-2.5 text-center text-emerald-700">Asist.</th>
                    <th className="p-2.5 text-center text-amber-700">Tard.</th>
                    <th className="p-2.5 text-center text-red-700">Faltas</th>
                    <th className="p-2.5 text-center">% Cumplimiento</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {students.slice(0, 10).map((s) => {
                    const total = s.asistencias + s.tardanzas + s.faltas + s.justificadas;
                    const percent = total > 0 ? ((s.asistencias / total) * 100).toFixed(1) : '100';
                    return (
                      <tr key={s.id} className="hover:bg-white transition-colors">
                        <td className="p-2.5 font-mono text-blue-700 font-bold">{s.orderNumber}</td>
                        <td className="p-2.5 font-mono text-slate-600">{s.dni}</td>
                        <td className="p-2.5 font-bold text-slate-900">{s.surname}, {s.name}</td>
                        <td className="p-2.5 text-center font-extrabold text-emerald-600">{s.asistencias}</td>
                        <td className="p-2.5 text-center font-extrabold text-amber-600">{s.tardanzas}</td>
                        <td className="p-2.5 text-center font-extrabold text-red-600">{s.faltas}</td>
                        <td className="p-2.5 text-center font-extrabold text-blue-700">{percent}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <span className="text-[11px] text-slate-500 italic">
              * Mostrando los primeros registros de la nómina activa para previsualización.
            </span>
          </div>
        )}

        {type === 'padron' && (
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-bold text-blue-950">
              Planilla de Firmas de Apoderados para Entrega de Documentos:
            </span>
            <div className="border border-slate-200 rounded-2xl overflow-x-auto bg-slate-50 max-h-60">
              <table className="w-full text-[11px] text-left border-collapse">
                <thead>
                  <tr className="bg-blue-50 text-blue-950 font-bold border-b border-blue-100">
                    <th className="p-2.5">N°</th>
                    <th className="p-2.5">Estudiante</th>
                    <th className="p-2.5">Apoderado Responsable</th>
                    <th className="p-2.5">Parentesco</th>
                    <th className="p-2.5 text-center">Firma / Huella</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {students.slice(0, 8).map((s) => (
                    <tr key={s.id}>
                      <td className="p-2.5 font-mono font-bold text-blue-700">{s.orderNumber}</td>
                      <td className="p-2.5 font-bold text-slate-900">{s.surname}, {s.name}</td>
                      <td className="p-2.5 text-slate-700">{s.apoderado.name}</td>
                      <td className="p-2.5 text-slate-500">{s.apoderado.relationship}</td>
                      <td className="p-2.5 text-center">
                        <div className="w-24 h-6 border-b border-dashed border-slate-300 mx-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {type === 'informe' && (
          <div className="flex flex-col gap-2.5 text-[12px] text-slate-700 leading-relaxed">
            <span className="font-extrabold text-[13px] text-blue-900">
              Dictamen Pedagógico y Convivencia Escolar Bimestral:
            </span>
            <p className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <strong>I. Diagnóstico de Asistencia:</strong> La sección 2° "C" presenta una tasa promedio de asistencia efectiva del <strong>91.4%</strong>, superando la meta institucional proyectada del 88.0%. Sin embargo, se identificaron casos que superan las 3 inasistencias injustificadas acumuladas.
            </p>
            <p className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <strong>II. Acciones Tutoriales Ejecutadas:</strong> Se remitieron citaciones formales a padres de familia vía WhatsApp institucional y cuaderno de control, logrando atender el 83% de los compromisos de puntualidad y presentación de certificados MINSA.
            </p>
            <div className="flex justify-between items-center pt-4 text-center">
              <div className="flex flex-col items-center flex-1">
                <div className="w-40 border-b border-slate-400 mb-1" />
                <span className="font-bold text-[11px] text-slate-900">{INSTITUTIONAL_INFO.teacher}</span>
                <span className="text-[10px] text-slate-500">Tutor 2° Grado "C"</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <div className="w-40 border-b border-slate-400 mb-1" />
                <span className="font-bold text-[11px] text-slate-900">V° B° Subdirección Pedagógica</span>
                <span className="text-[10px] text-slate-500">UGEL 04 - Collique</span>
              </div>
            </div>
          </div>
        )}

        {/* Modal Actions en Azulino y Verde */}
        <div className="flex items-center gap-2 pt-2 border-t border-blue-50">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[13px] font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Imprimir Formato</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex-1 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Descargar {type === 'informe' ? 'PDF Oficial' : 'Excel / SIAGIE'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
