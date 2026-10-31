import React, { useState } from 'react';
import { Student } from '../../types';

interface DirectorioEstudiantesProps {
  students: Student[];
  onOpenHistory: (student: Student) => void;
  onOpenCitation: (student: Student) => void;
  onOpenNewStudent: () => void;
  onPromptEditStudent: (student: Student) => void;
  onPromptDeleteStudent: (student: Student) => void;
  selectedSection: string;
  onCallStudent: (student: Student) => void;
}

export const DirectorioEstudiantes: React.FC<DirectorioEstudiantesProps> = ({
  students,
  onOpenHistory,
  onOpenCitation,
  onOpenNewStudent,
  onPromptEditStudent,
  onPromptDeleteStudent,
  selectedSection,
  onCallStudent,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'risk' | 'good'>('all');

  const filteredStudents = students.filter((s) => {
    if (selectedSection === '1° A' && s.section !== '1° A') return false;
    if (selectedSection === '3° A' && s.section !== '3° A') return false;
    if ((selectedSection === '2° C' || selectedSection === 'Tutoría 2° C') && s.section !== '2° C') return false;

    if (statusFilter === 'risk' && s.faltas < 3) return false;
    if (statusFilter === 'good' && s.faltas > 0) return false;

    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      s.surname.toLowerCase().includes(term) ||
      s.name.toLowerCase().includes(term) ||
      s.dni.includes(term) ||
      s.apoderado.name.toLowerCase().includes(term) ||
      s.address.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex flex-col w-full pb-20 gap-3">
      {/* Top Banner Directory */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-blue-100 flex items-center justify-between">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 text-blue-700">
            <span className="material-symbols-outlined text-[20px]">groups</span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-900">
              Nómina Oficial UGEL 04
            </span>
          </div>
          <h2 className="text-[18px] font-extrabold text-slate-900 leading-tight mt-0.5">
            Directorio de Estudiantes
          </h2>
          <span className="text-[12px] text-slate-500">
            {filteredStudents.length} estudiantes matriculados en {selectedSection}
          </span>
        </div>

        <button
          onClick={onOpenNewStudent}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2.5 rounded-2xl text-[12px] font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/30 active:scale-95 transition-all flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[19px]">person_add</span>
          <span>+ Agregar Alumno</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-2">
        <div className="bg-white rounded-2xl shadow-xs border border-blue-100 flex items-center px-3.5 py-2.5">
          <span className="material-symbols-outlined text-[19px] text-blue-500 mr-2">search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por estudiante, DNI, apoderado o dirección..."
            className="w-full bg-transparent text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="material-symbols-outlined text-[17px] text-slate-400 hover:text-slate-600"
            >
              close
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3.5 py-1 rounded-full text-[12px] font-bold whitespace-nowrap transition-all ${
              statusFilter === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
            }`}
          >
            Todos ({filteredStudents.length})
          </button>
          <button
            onClick={() => setStatusFilter('risk')}
            className={`px-3.5 py-1 rounded-full text-[12px] font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
              statusFilter === 'risk'
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-red-50 border border-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>Casos con Alerta ({students.filter((s) => s.faltas >= 3).length})</span>
          </button>
          <button
            onClick={() => setStatusFilter('good')}
            className={`px-3.5 py-1 rounded-full text-[12px] font-bold whitespace-nowrap transition-all ${
              statusFilter === 'good'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            Asistencia Regular ({students.filter((s) => s.faltas === 0).length})
          </button>
        </div>
      </div>

      {/* Directory List with Edit & Delete Actions */}
      <div className="flex flex-col gap-2.5">
        {filteredStudents.map((student) => {
          const isRisk = student.faltas >= 3;
          return (
            <div
              key={student.id}
              className="bg-white rounded-3xl p-4 shadow-sm border border-slate-200/80 flex flex-col gap-3 hover:border-blue-300 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-blue-50 flex-shrink-0 flex items-center justify-center border border-blue-200">
                    {student.photoUrl ? (
                      <img
                        className="w-full h-full object-cover"
                        alt={student.name}
                        src={student.photoUrl}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-[14px] font-bold text-blue-700 font-mono">
                        {student.initials}
                      </span>
                    )}
                    <span className="absolute bottom-0 right-0 bg-blue-700 text-white text-[9px] font-extrabold px-1 rounded-tl shadow-xs">
                      {student.orderNumber}
                    </span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <h3 className="text-[15px] font-extrabold text-slate-900 truncate leading-tight">
                      {student.surname}, {student.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[12px] text-slate-500 mt-0.5">
                      <span className="font-mono">DNI: {student.dni}</span>
                      <span>•</span>
                      <span className="text-blue-700 font-bold">{student.section}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {isRisk ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[11px] font-extrabold">
                      {student.faltas} Faltas
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                      Al día
                    </span>
                  )}

                  {/* Botón Editar Estudiante */}
                  <button
                    onClick={() => onPromptEditStudent(student)}
                    className="w-8 h-8 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-100 flex items-center justify-center transition-colors active:scale-95"
                    title={`Editar datos de ${student.surname}`}
                  >
                    <span className="material-symbols-outlined text-[17px]">edit</span>
                  </button>

                  {/* Botón Retirar Estudiante */}
                  <button
                    onClick={() => onPromptDeleteStudent(student)}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 flex items-center justify-center transition-colors active:scale-95"
                    title={`Retirar a ${student.surname}`}
                  >
                    <span className="material-symbols-outlined text-[19px]">person_remove</span>
                  </button>
                </div>
              </div>

              {/* Apoderado & Contact info */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex flex-col gap-1.5 text-[12px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Apoderado:</span>
                  <span className="font-bold text-slate-900">
                    {student.apoderado.name} ({student.apoderado.relationship})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Celular:</span>
                  <span className="font-bold text-blue-700 font-mono">+51 {student.apoderado.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Dirección:</span>
                  <span className="text-[12px] text-slate-700 text-right truncate max-w-[200px]">
                    {student.address}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-0.5">
                <button
                  onClick={() => onOpenCitation(student)}
                  className="flex-1 py-2.5 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>WhatsApp</span>
                </button>

                <button
                  onClick={() => onCallStudent(student)}
                  className="w-11 h-11 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform"
                  title="Llamar directamente al apoderado"
                >
                  <span className="material-symbols-outlined text-[20px]">call</span>
                </button>

                <button
                  onClick={() => onOpenHistory(student)}
                  className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform"
                  title="Ver bitácora e historial"
                >
                  <span className="material-symbols-outlined text-[20px]">folder_shared</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
