import React, { useState } from 'react';
import { Student, AttendanceStatus } from '../../types';

interface AsistenciaDiariaProps {
  students: Student[];
  currentAttendance: Record<number, { status: AttendanceStatus | ''; note?: string; time?: string }>;
  onUpdateStatus: (studentId: number, status: AttendanceStatus, note?: string) => void;
  onUpdateNote: (studentId: number, note: string) => void;
  onMarkAllPresent: () => void;
  onClearAttendance: () => void;
  onSaveSession: () => void;
  selectedSection: string;
  onSelectSection: (section: string) => void;
  onOpenNewStudent: () => void;
  onPromptEditStudent: (student: Student) => void;
  onPromptDeleteStudent: (student: Student) => void;
}

export const AsistenciaDiaria: React.FC<AsistenciaDiariaProps> = ({
  students,
  currentAttendance,
  onUpdateStatus,
  onUpdateNote,
  onMarkAllPresent,
  onClearAttendance,
  onSaveSession,
  selectedSection,
  onSelectSection,
  onOpenNewStudent,
  onPromptEditStudent,
  onPromptDeleteStudent,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDateIndex, setCurrentDateIndex] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const dates = [
    { display: 'Lunes, 23 Octubre', bimester: 'Bimestre III • Sem. 8' },
    { display: 'Martes, 24 Octubre', bimester: 'Bimestre III • Sem. 8' },
    { display: 'Miércoles, 25 Octubre', bimester: 'Bimestre III • Sem. 8' },
    { display: 'Jueves, 26 Octubre', bimester: 'Bimestre III • Sem. 8' },
    { display: 'Viernes, 27 Octubre', bimester: 'Bimestre III • Sem. 8' },
  ];

  const currentDate = dates[currentDateIndex];

  const handlePrevDate = () => {
    if (currentDateIndex > 0) setCurrentDateIndex(currentDateIndex - 1);
  };

  const handleNextDate = () => {
    if (currentDateIndex < dates.length - 1) setCurrentDateIndex(currentDateIndex + 1);
  };

  const filteredStudents = students.filter((s) => {
    if (selectedSection === 'Tutoría 2° C' && s.section !== '2° C') return false;
    if (selectedSection === '2° C' && s.section !== '2° C') return false;
    if (selectedSection === '1° A' && s.section !== '1° A') return false;
    if (selectedSection === '3° A' && s.section !== '3° A') return false;
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      s.surname.toLowerCase().includes(term) ||
      s.name.toLowerCase().includes(term) ||
      s.dni.includes(term)
    );
  });

  let countP = 0;
  let countT = 0;
  let countF = 0;
  let countJ = 0;

  filteredStudents.forEach((student) => {
    const record = currentAttendance[student.id];
    if (record?.status === 'P') countP++;
    else if (record?.status === 'T') countT++;
    else if (record?.status === 'F') countF++;
    else if (record?.status === 'J') countJ++;
  });

  const handleSaveClick = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      onSaveSession();
      setTimeout(() => setIsSaved(false), 2000);
    }, 700);
  };

  return (
    <div className="flex flex-col w-full gap-3 pb-24">
      {/* Banner Sesión Pedagógica y Control de Fecha */}
      <section className="bg-white rounded-3xl p-4 shadow-sm border border-blue-100 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-blue-700">
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              calendar_clock
            </span>
            <span className="text-[11px] uppercase tracking-wider font-extrabold text-blue-900">
              Sesión Lectiva
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-blue-50 text-blue-900 border border-blue-200 px-3 py-1 rounded-full text-[11px] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{currentDate.bimester}</span>
          </div>
        </div>

        {/* Stepper de Fecha */}
        <div className="flex items-center justify-between bg-slate-50 rounded-2xl p-2 border border-slate-200">
          <button
            onClick={handlePrevDate}
            disabled={currentDateIndex === 0}
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 transition-colors ${
              currentDateIndex === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'bg-white hover:bg-slate-100 shadow-xs active:scale-95'
            }`}
            type="button"
            aria-label="Día anterior"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>

          <div className="flex flex-col items-center">
            <span className="text-[17px] text-blue-950 font-bold leading-tight">
              {currentDate.display}
            </span>
            <span className="text-[12px] text-slate-500 font-medium">
              Turno Mañana • EPT Contabilidad
            </span>
          </div>

          <button
            onClick={handleNextDate}
            disabled={currentDateIndex === dates.length - 1}
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-slate-700 transition-colors ${
              currentDateIndex === dates.length - 1
                ? 'opacity-30 cursor-not-allowed'
                : 'bg-white hover:bg-slate-100 shadow-xs active:scale-95'
            }`}
            type="button"
            aria-label="Día siguiente"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>

        {/* Píldoras de Secciones */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
          <button
            onClick={() => onSelectSection('1° A')}
            className={`px-3 py-1.5 rounded-xl text-[12px] font-bold flex-shrink-0 transition-all ${
              selectedSection === '1° A'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            type="button"
          >
            1° A
          </button>

          <button
            onClick={() => onSelectSection('2° C')}
            className={`px-3 py-1.5 rounded-xl text-[12px] font-bold flex-shrink-0 shadow-sm flex items-center gap-1 transition-all ${
              selectedSection === '2° C'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">school</span>
            <span>2° C (Taller)</span>
          </button>

          <button
            onClick={() => onSelectSection('3° A')}
            className={`px-3 py-1.5 rounded-xl text-[12px] font-bold flex-shrink-0 transition-all ${
              selectedSection === '3° A'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            type="button"
          >
            3° A
          </button>

          <button
            onClick={() => onSelectSection('Tutoría 2° C')}
            className={`px-3 py-1.5 rounded-xl text-[12px] font-bold flex-shrink-0 flex items-center gap-1 transition-all ${
              selectedSection === 'Tutoría 2° C'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">shield_person</span>
            <span>Tutoría 2° C</span>
          </button>
        </div>
      </section>

      {/* Métricas Rápidas */}
      <section className="grid grid-cols-4 gap-2">
        <div className="bg-white rounded-2xl p-2.5 shadow-sm flex flex-col items-center justify-center text-center border border-emerald-100">
          <span className="text-[11px] text-emerald-700 uppercase font-extrabold tracking-wider">
            Presentes
          </span>
          <span className="text-[22px] font-extrabold text-emerald-600 leading-tight mt-0.5">
            {countP}
          </span>
          <span className="w-5 h-1 rounded-full bg-emerald-500 mt-1" />
        </div>

        <div className="bg-white rounded-2xl p-2.5 shadow-sm flex flex-col items-center justify-center text-center border border-amber-100">
          <span className="text-[11px] text-amber-700 uppercase font-extrabold tracking-wider">
            Tardanzas
          </span>
          <span className="text-[22px] font-extrabold text-amber-600 leading-tight mt-0.5">
            {countT}
          </span>
          <span className="w-5 h-1 rounded-full bg-amber-500 mt-1" />
        </div>

        <div className="bg-white rounded-2xl p-2.5 shadow-sm flex flex-col items-center justify-center text-center border border-red-100">
          <span className="text-[11px] text-red-700 uppercase font-extrabold tracking-wider">
            Faltas
          </span>
          <span className="text-[22px] font-extrabold text-red-600 leading-tight mt-0.5">
            {countF}
          </span>
          <span className="w-5 h-1 rounded-full bg-red-500 mt-1" />
        </div>

        <div className="bg-white rounded-2xl p-2.5 shadow-sm flex flex-col items-center justify-center text-center border border-blue-100">
          <span className="text-[11px] text-blue-700 uppercase font-extrabold tracking-wider">
            Justific.
          </span>
          <span className="text-[22px] font-extrabold text-blue-600 leading-tight mt-0.5">
            {countJ}
          </span>
          <span className="w-5 h-1 rounded-full bg-blue-500 mt-1" />
        </div>
      </section>

      {/* Acciones Rápidas (Marcar, + Alumno, Limpiar) */}
      <section className="flex items-center gap-2">
        <button
          onClick={onMarkAllPresent}
          className="flex-1 py-2.5 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">done_all</span>
          <span>Marcar Todos</span>
        </button>

        <button
          onClick={onOpenNewStudent}
          className="py-2.5 px-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold flex items-center justify-center gap-1 shadow-md shadow-blue-600/20 active:scale-95 transition-all flex-shrink-0"
          type="button"
          title="Agregar nuevo estudiante a esta sección"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          <span>+ Agregar Alumno</span>
        </button>

        <button
          onClick={onClearAttendance}
          className="py-2.5 px-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-600 text-[12px] font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all border border-slate-200"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">restart_alt</span>
          <span>Limpiar</span>
        </button>
      </section>

      {/* Nómina y Buscador */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[17px] font-extrabold text-blue-950">
              Nómina {selectedSection.includes('Tutoría') ? 'Tutoría 2° "C"' : selectedSection}
            </span>
            <span className="bg-blue-100 text-blue-800 text-[11px] px-2.5 py-0.5 rounded-full font-bold">
              {filteredStudents.length} Alumnos
            </span>
          </div>
          <span className="text-[12px] text-slate-500 font-medium">
            UGEL 04 • Collique
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-xs border border-blue-100 flex items-center px-3 py-2">
          <span className="material-symbols-outlined text-[19px] text-blue-400 mr-2">search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por apellido, nombre o DNI..."
            className="w-full bg-transparent text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-slate-400 hover:text-slate-600 text-[16px] material-symbols-outlined"
            >
              close
            </button>
          )}
        </div>
      </div>

      {/* Roster de Estudiantes */}
      <section className="flex flex-col gap-2.5 pb-20">
        {filteredStudents.map((student) => {
          const currentRecord = currentAttendance[student.id] || { status: 'P' };
          const status = currentRecord.status;
          const note = currentRecord.note || student.notes || '';

          let indicatorBg = 'bg-emerald-500';
          if (status === 'T') indicatorBg = 'bg-amber-500';
          if (status === 'F') indicatorBg = 'bg-red-500';
          if (status === 'J') indicatorBg = 'bg-blue-500';
          if (!status) indicatorBg = 'bg-slate-300';

          return (
            <article
              key={student.id}
              className="student-card bg-white rounded-3xl p-3.5 shadow-sm border border-slate-200/80 flex flex-col gap-2.5 transition-all hover:border-blue-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Photo or Initials Avatar with order badge */}
                  <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-blue-50 flex-shrink-0 flex items-center justify-center border border-blue-200">
                    {student.photoUrl ? (
                      <img
                        className="w-full h-full object-cover"
                        alt={student.name}
                        src={student.photoUrl}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : null}
                    {!student.photoUrl && (
                      <span className="text-[13px] font-bold text-blue-700 font-mono">
                        {student.initials}
                      </span>
                    )}
                    <span className="absolute bottom-0 right-0 bg-blue-700 text-white text-[9px] font-extrabold px-1 rounded-tl shadow-xs">
                      {student.orderNumber}
                    </span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <h2 className="text-[14px] font-bold text-slate-900 leading-tight truncate">
                      {student.surname}, {student.name}
                    </h2>

                    {/* Metadata Subtitle */}
                    {status === 'T' ? (
                      <div className="flex items-center gap-1 text-amber-700 text-[12px] font-semibold mt-0.5">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        <span>Ingreso: {currentRecord.time || '08:14 AM'}</span>
                      </div>
                    ) : status === 'F' ? (
                      <div className="flex items-center gap-1 text-red-700 text-[12px] font-semibold mt-0.5">
                        <span className="material-symbols-outlined text-[14px]">warning</span>
                        <span>{student.faltas >= 3 ? 'Riesgo Crítico (>3 Faltas)' : 'Falta del Periodo'}</span>
                      </div>
                    ) : status === 'J' ? (
                      <div className="flex items-center gap-1 text-blue-800 text-[12px] mt-0.5">
                        <span className="material-symbols-outlined text-[14px] text-blue-600">receipt_long</span>
                        <span>{student.medicalCert || 'FUT / Constancia de Salud'}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-slate-500 text-[12px] mt-0.5">
                        <span className="material-symbols-outlined text-[14px] text-blue-500">badge</span>
                        <span>DNI: {student.dni}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Acciones de la Ficha: Estado, Editar Datos y Retirar */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <div
                    className={`w-3.5 h-3.5 rounded-full ${indicatorBg} shadow-xs ring-2 ring-white`}
                    title={`Estado: ${status || 'Sin marcar'}`}
                  />

                  {/* Botón Editar Estudiante */}
                  <button
                    type="button"
                    onClick={() => onPromptEditStudent(student)}
                    className="w-8 h-8 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center justify-center transition-colors active:scale-95 border border-blue-100"
                    title={`Editar datos de ${student.surname}`}
                  >
                    <span className="material-symbols-outlined text-[17px]">edit</span>
                  </button>

                  {/* Botón Retirar Estudiante */}
                  <button
                    type="button"
                    onClick={() => onPromptDeleteStudent(student)}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 flex items-center justify-center transition-colors active:scale-95"
                    title={`Retirar a ${student.surname} de la nómina`}
                  >
                    <span className="material-symbols-outlined text-[17px]">person_remove</span>
                  </button>
                </div>
              </div>

              {/* Segmento de Botones de Marcado Táctil */}
              <div className="grid grid-cols-4 gap-1.5">
                {/* Presente */}
                <button
                  type="button"
                  onClick={() => onUpdateStatus(student.id, 'P')}
                  className={`py-2 rounded-2xl text-[12px] font-bold transition-all flex flex-col items-center justify-center active:scale-95 ${
                    status === 'P'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 ring-emerald-500'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span className="text-[14px] leading-none">P</span>
                  <span className="text-[9px] uppercase tracking-wider font-semibold mt-0.5">Presente</span>
                </button>

                {/* Tarde */}
                <button
                  type="button"
                  onClick={() => onUpdateStatus(student.id, 'T', note || 'Demora por congestión vehicular')}
                  className={`py-2 rounded-2xl text-[12px] font-bold transition-all flex flex-col items-center justify-center active:scale-95 ${
                    status === 'T'
                      ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30 ring-2 ring-amber-400'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span className="text-[14px] leading-none">T</span>
                  <span className="text-[9px] uppercase tracking-wider font-semibold mt-0.5">Tarde</span>
                </button>

                {/* Falta */}
                <button
                  type="button"
                  onClick={() => onUpdateStatus(student.id, 'F', note || 'Inasistencia sin justificar')}
                  className={`py-2 rounded-2xl text-[12px] font-bold transition-all flex flex-col items-center justify-center active:scale-95 ${
                    status === 'F'
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/30 ring-2 ring-red-500'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span className="text-[14px] leading-none">F</span>
                  <span className="text-[9px] uppercase tracking-wider font-semibold mt-0.5">Falta</span>
                </button>

                {/* Justificada */}
                <button
                  type="button"
                  onClick={() => onUpdateStatus(student.id, 'J', note || 'Permiso de salud presentado')}
                  className={`py-2 rounded-2xl text-[12px] font-bold transition-all flex flex-col items-center justify-center active:scale-95 ${
                    status === 'J'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-500'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span className="text-[14px] leading-none">J</span>
                  <span className="text-[9px] uppercase tracking-wider font-semibold mt-0.5">Justif.</span>
                </button>
              </div>

              {/* Note / Observation row */}
              {(status === 'T' || status === 'F' || status === 'J' || note) && (
                <div className="pt-0.5 animate-fade-in">
                  <div className="bg-slate-50 rounded-2xl px-3 py-1.5 flex items-center gap-2 border border-slate-200">
                    <span
                      className={`material-symbols-outlined text-[17px] flex-shrink-0 ${
                        status === 'T'
                          ? 'text-amber-600'
                          : status === 'F'
                          ? 'text-red-600'
                          : 'text-blue-600'
                      }`}
                    >
                      {status === 'J' ? 'verified' : 'edit_note'}
                    </span>
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => onUpdateNote(student.id, e.target.value)}
                      placeholder="Añadir motivo o citación de apoderado..."
                      className="bg-transparent text-[12px] text-slate-800 placeholder:text-slate-400 w-full outline-none font-medium"
                    />
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </section>

      {/* Dock Inferior */}
      <div className="fixed bottom-16 left-0 right-0 z-30 px-3 py-2 pointer-events-none">
        <div className="max-w-md mx-auto bg-white/95 backdrop-blur-md p-2.5 rounded-3xl shadow-xl flex items-center gap-2.5 border border-blue-200 pointer-events-auto">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-700 shadow-xs">
            <span className="material-symbols-outlined text-[22px]">cloud_sync</span>
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[11px] text-blue-700 font-extrabold uppercase tracking-wider truncate">
              {isSaved ? 'Sincronizado con SIAGIE' : 'Control Activo'}
            </span>
            <span className="text-[12px] text-slate-600 truncate">
              {filteredStudents.length} estudiantes en nómina
            </span>
          </div>
          <button
            onClick={handleSaveClick}
            disabled={isSaving}
            className={`h-11 px-5 rounded-2xl text-white text-[13px] font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all flex-shrink-0 ${
              isSaved
                ? 'bg-emerald-600 shadow-emerald-600/30'
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30'
            }`}
            type="button"
          >
            {isSaving ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                <span>Guardando...</span>
              </>
            ) : isSaved ? (
              <>
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>¡Guardado!</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">save</span>
                <span>Guardar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
