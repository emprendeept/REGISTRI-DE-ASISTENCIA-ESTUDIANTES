import React, { useState } from 'react';
import { Student } from '../../types';

interface RegistroAcumuladoProps {
  students: Student[];
  onOpenHistory: (student: Student) => void;
  onOpenCitation: (student: Student) => void;
  onExportSiagie: () => void;
  onPromptEditStudent: (student: Student) => void;
  onPromptDeleteStudent: (student: Student) => void;
  selectedSection: string;
  onSelectSection: (section: string) => void;
}

export const RegistroAcumulado: React.FC<RegistroAcumuladoProps> = ({
  students,
  onOpenHistory,
  onOpenCitation,
  onExportSiagie,
  onPromptEditStudent,
  onPromptDeleteStudent,
  selectedSection,
  onSelectSection,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'risk' | 'perfect'>('all');
  const [selectedBimester, setSelectedBimester] = useState('Bimestre III (Acumulado)');
  const [showBimesterMenu, setShowBimesterMenu] = useState(false);

  // Filter students based on active section
  const sectionStudents = students.filter((s) => {
    if (selectedSection === 'Tutoría 2° C') return s.section === 'Tutoría 2° C';
    if (selectedSection === '2° C') return s.section === '2° C';
    if (selectedSection === '1° A') return s.section === '1° A';
    if (selectedSection === '3° A') return s.section === '3° A';
    return true;
  });

  const riskStudents = sectionStudents.filter((s) => s.faltas >= 3);
  const perfectStudents = sectionStudents.filter((s) => s.faltas === 0 && s.tardanzas === 0);

  const filteredStudents = sectionStudents.filter((student) => {
    if (selectedFilter === 'risk' && student.faltas < 3) return false;
    if (selectedFilter === 'perfect' && (student.faltas > 0 || student.tardanzas > 0)) return false;
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      student.surname.toLowerCase().includes(term) ||
      student.name.toLowerCase().includes(term) ||
      student.dni.includes(term) ||
      student.matriculaCode.includes(term)
    );
  });

  // Calculate live cumulative metrics for this section
  const totalAsistencias = sectionStudents.reduce((acc, s) => acc + s.asistencias, 0);
  const totalTardanzas = sectionStudents.reduce((acc, s) => acc + s.tardanzas, 0);
  const totalFaltas = sectionStudents.reduce((acc, s) => acc + s.faltas, 0);
  const totalRecords = totalAsistencias + totalTardanzas + totalFaltas;
  const attendanceRate = totalRecords > 0 ? ((totalAsistencias / totalRecords) * 100).toFixed(1) : '91.4';

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Rango / Bimestre Selector & Metadata Banner */}
      <div className="bg-white rounded-3xl p-4 shadow-sm mb-3.5 flex flex-col gap-3 border border-blue-100">
        <div className="flex items-center justify-between gap-2 relative">
          <div className="flex items-center gap-2 text-blue-700">
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              date_range
            </span>
            <span className="text-[15px] text-blue-950 font-extrabold">
              {selectedBimester}
            </span>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowBimesterMenu(!showBimesterMenu)}
              className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full shadow-xs text-blue-700 text-[12px] font-bold active:scale-95 transition-transform border border-blue-200"
              id="periodModalBtn"
            >
              <span>Cambiar</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>

            {showBimesterMenu && (
              <div className="absolute right-0 top-8 z-30 bg-white rounded-2xl shadow-xl border border-blue-100 p-1.5 w-52 animate-scale-up">
                {['Bimestre I', 'Bimestre II', 'Bimestre III (Acumulado)', 'Bimestre IV (Proyección)', 'Consolidado Anual'].map(
                  (bim) => (
                    <button
                      key={bim}
                      onClick={() => {
                        setSelectedBimester(bim);
                        setShowBimesterMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-[12px] rounded-xl transition-colors ${
                        selectedBimester === bim
                          ? 'bg-blue-600 text-white font-bold'
                          : 'hover:bg-blue-50 text-slate-800'
                      }`}
                    >
                      {bim}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sección Activa y Selector Rápido */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
          <button
            onClick={() => onSelectSection('1° A')}
            className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
              selectedSection === '1° A'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Taller 1° A
          </button>
          <button
            onClick={() => onSelectSection('2° C')}
            className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
              selectedSection === '2° C'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Taller 2° C
          </button>
          <button
            onClick={() => onSelectSection('3° A')}
            className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
              selectedSection === '3° A'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Taller 3° A
          </button>
          <button
            onClick={() => onSelectSection('Tutoría 2° C')}
            className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
              selectedSection === 'Tutoría 2° C'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            Tutoría 2° C
          </button>
        </div>

        {/* Indicador de Días Lectivos */}
        <div className="flex items-center justify-between bg-slate-50 px-3.5 py-2 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[12px] text-slate-600 font-medium">
              Nómina Activa: <strong className="text-blue-900">{selectedSection}</strong>
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[18px] text-blue-700 font-extrabold leading-tight">42</span>
            <span className="text-[11px] text-slate-500">días lectivos</span>
          </div>
        </div>
      </div>

      {/* Tarjetas Métricas Globales del Aula */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Asistencia Promedio Card */}
        <div className="col-span-2 bg-gradient-to-br from-blue-700 to-blue-900 text-white p-4 rounded-3xl shadow-md shadow-blue-900/20 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] text-blue-200 uppercase tracking-wider font-bold">
              Asistencia Promedio ({selectedSection})
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-[30px] font-extrabold leading-none">
                {attendanceRate}%
              </span>
              <span className="text-[11px] text-white bg-emerald-500 px-2 py-0.5 rounded-full font-bold shadow-xs">
                +2.1% vs BII
              </span>
            </div>
            <span className="text-[12px] text-blue-100 mt-1">
              Meta institucional: &gt;88%
            </span>
          </div>

          <div className="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-blue-800"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="text-emerald-400"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray={`${Math.min(Number(attendanceRate), 100)}, 100`}
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <span className="material-symbols-outlined absolute text-[24px] text-emerald-300">
              school
            </span>
          </div>
        </div>

        {/* Total Asistencias */}
        <div className="bg-white p-3.5 rounded-3xl shadow-sm border border-emerald-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-bold">Asistencias</span>
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
              <span className="material-symbols-outlined text-[15px]">check</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-[22px] text-slate-900 font-extrabold leading-tight block">
              {totalAsistencias}
            </span>
            <p className="text-[11px] text-emerald-600 font-bold mt-0.5">Registros válidos</p>
          </div>
        </div>

        {/* Total Tardanzas */}
        <div className="bg-white p-3.5 rounded-3xl shadow-sm border border-amber-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 font-bold">Tardanzas</span>
            <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
              <span className="material-symbols-outlined text-[15px]">schedule</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-[22px] text-amber-600 font-extrabold leading-tight block">
              {totalTardanzas}
            </span>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {totalRecords > 0 ? ((totalTardanzas / totalRecords) * 100).toFixed(1) : '0'}% del total
            </p>
          </div>
        </div>

        {/* Total Faltas Injustificadas Banner */}
        <div className="col-span-2 bg-red-50 text-red-900 p-3.5 rounded-3xl shadow-sm flex items-center justify-between border border-red-200">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[16px] font-extrabold text-red-950">
                  {totalFaltas} Faltas
                </span>
                <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">
                  Injustificadas
                </span>
              </div>
              <span className="text-[11px] text-slate-600 truncate">
                {riskStudents.length} alumnos en umbral crítico SIAGIE
              </span>
            </div>
          </div>
          <button
            onClick={() => setSelectedFilter('risk')}
            className="bg-white text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-2xl text-[12px] font-bold shadow-xs active:scale-95 transition-transform flex items-center gap-1 flex-shrink-0 ml-2 border border-red-200"
          >
            <span>Revisar</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Buscador y Acciones SIAGIE */}
      <div className="flex flex-col gap-2 mb-3.5">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-white rounded-2xl shadow-xs border border-blue-100 flex items-center px-3.5 py-2.5">
            <span className="material-symbols-outlined text-[19px] text-blue-400 mr-2">search</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por apellido o nombre..."
              className="w-full bg-transparent text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="material-symbols-outlined text-[17px] text-slate-400"
              >
                close
              </button>
            )}
          </div>

          <button
            onClick={onExportSiagie}
            className="bg-blue-600 hover:bg-blue-700 text-white h-11 px-4 rounded-2xl text-[13px] font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30 active:scale-95 transition-transform flex-shrink-0"
            id="exportBtn"
            title="Exportar archivo oficial SIAGIE MINEDU"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>SIAGIE</span>
          </button>
        </div>

        {/* Filtros Rápidos */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3.5 py-1 rounded-full text-[12px] font-bold whitespace-nowrap transition-all ${
              selectedFilter === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
            }`}
          >
            Todos ({sectionStudents.length})
          </button>

          <button
            onClick={() => setSelectedFilter('risk')}
            className={`px-3.5 py-1 rounded-full text-[12px] font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
              selectedFilter === 'risk'
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-red-50 border border-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>Alerta de Riesgo ({riskStudents.length})</span>
          </button>

          <button
            onClick={() => setSelectedFilter('perfect')}
            className={`px-3.5 py-1 rounded-full text-[12px] font-bold whitespace-nowrap transition-all ${
              selectedFilter === 'perfect'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
            }`}
          >
            100% Asistencia ({perfectStudents.length})
          </button>
        </div>
      </div>

      {/* Lista de Estudiantes Acumulado */}
      <div className="flex flex-col gap-2.5">
        {filteredStudents.map((student) => {
          const totalDays = 42;
          const compliance = ((student.asistencias / totalDays) * 100).toFixed(1);
          const isRisk = student.faltas >= 3;
          const isPerfect = student.faltas === 0 && student.tardanzas === 0;
          const isTardyReincident = student.tardanzas >= 5;

          return (
            <div
              key={student.id}
              className="student-card bg-white rounded-3xl p-4 shadow-sm border border-slate-200/80 flex flex-col gap-2.5 transition-all hover:border-blue-300"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-7 h-7 rounded-xl text-[12px] flex items-center justify-center flex-shrink-0 font-extrabold ${
                      isPerfect
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {student.orderNumber}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <h2 className="text-[14px] font-bold text-slate-900 truncate leading-tight">
                      {student.surname}, {student.name}
                    </h2>
                    <span className="text-[11px] text-slate-500 truncate">
                      Cód. Matrícula: {student.matriculaCode} • {student.section}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {/* Badge Alerta Semáforo */}
                  {isRisk ? (
                    <div className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-0.5 rounded-full flex-shrink-0">
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                      <span className="text-[11px] font-bold">Riesgo {student.faltas} Faltas</span>
                    </div>
                  ) : isPerfect ? (
                    <div className="flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex-shrink-0">
                      <span className="material-symbols-outlined text-[13px]">star</span>
                      <span className="text-[11px] font-bold">100% Óptimo</span>
                    </div>
                  ) : isTardyReincident ? (
                    <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full flex-shrink-0">
                      <span className="material-symbols-outlined text-[13px]">warning_amber</span>
                      <span className="text-[11px] font-bold">Reincidente Tard.</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full flex-shrink-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[11px] font-medium">Regular</span>
                    </div>
                  )}

                  {/* Botón Editar Estudiante */}
                  <button
                    onClick={() => onPromptEditStudent(student)}
                    className="w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-100 flex items-center justify-center transition-colors"
                    title={`Editar datos de ${student.surname}`}
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>

                  {/* Botón Retirar */}
                  <button
                    onClick={() => onPromptDeleteStudent(student)}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-600 flex items-center justify-center transition-colors"
                    title={`Retirar a ${student.surname}`}
                  >
                    <span className="material-symbols-outlined text-[16px]">person_remove</span>
                  </button>
                </div>
              </div>

              {/* Barra de Asistencia Visual */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center text-slate-600 text-[11px]">
                  <span>Cumplimiento lectivo</span>
                  <span
                    className={`font-bold ${
                      isRisk
                        ? 'text-red-600'
                        : isTardyReincident
                        ? 'text-amber-600'
                        : 'text-emerald-600'
                    }`}
                  >
                    {compliance}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isRisk
                        ? 'bg-red-500'
                        : isTardyReincident
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(Number(compliance), 100)}%` }}
                  />
                </div>
              </div>

              {/* Badges Contadores */}
              <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                <div className="px-2 py-1.5 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-100 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-bold text-emerald-700">Asistencias</span>
                  <span className="text-[16px] font-extrabold leading-tight">
                    {student.asistencias} d
                  </span>
                </div>

                <div className="px-2 py-1.5 rounded-2xl bg-amber-50 text-amber-800 border border-amber-100 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-bold text-amber-700">Tardanzas</span>
                  <span className="text-[16px] font-extrabold leading-tight">
                    {student.tardanzas} d
                  </span>
                </div>

                <div className="px-2 py-1.5 rounded-2xl bg-red-50 text-red-800 border border-red-100 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-bold text-red-700">Faltas</span>
                  <span className="text-[16px] font-extrabold leading-tight">
                    {student.faltas} d
                  </span>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex items-center justify-between pt-1">
                {isRisk ? (
                  <button
                    onClick={() => onOpenCitation(student)}
                    className="text-red-700 font-bold text-[12px] flex items-center gap-1 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl border border-red-200 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[16px]">mail</span>
                    <span>Citar Apoderado</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-slate-500">
                    {student.apoderado.name} ({student.apoderado.relationship})
                  </span>
                )}

                <button
                  onClick={() => onOpenHistory(student)}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3.5 py-1.5 rounded-xl text-[12px] font-bold flex items-center gap-1 active:scale-95 transition-transform"
                >
                  <span>Historial detallado</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
