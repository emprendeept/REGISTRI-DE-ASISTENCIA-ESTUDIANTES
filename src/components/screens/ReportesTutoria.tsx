import React from 'react';
import { Student, JustificationRecord } from '../../types';
import { INSTITUTIONAL_INFO } from '../../data/mockData';
import { ReportType } from '../modals/OfficialReportModal';

interface ReportesTutoriaProps {
  students: Student[];
  justifications: JustificationRecord[];
  onOpenCitation: (student: Student) => void;
  onCallStudent: (student: Student) => void;
  onOpenHistory: (student: Student) => void;
  onOpenNewJustification: () => void;
  onOpenReportModal: (type: ReportType) => void;
}

export const ReportesTutoria: React.FC<ReportesTutoriaProps> = ({
  students,
  justifications,
  onOpenCitation,
  onCallStudent,
  onOpenHistory,
  onOpenNewJustification,
  onOpenReportModal,
}) => {
  // Casos Críticos Oficiales de Tutoría 2° C
  const kevinStudent =
    students.find((s) => s.surname.includes('CESPEDES')) ||
    students.find((s) => s.faltas >= 3) ||
    students[0];

  const anaStudent =
    students.find((s) => s.surname.includes('ROJAS')) ||
    students.find((s) => s.tardanzas >= 2 && s.id !== kevinStudent?.id) ||
    students[1];

  const mateoStudent =
    students.find((s) => s.surname.includes('QUISPE')) ||
    students.find((s) => s.id !== kevinStudent?.id && s.id !== anaStudent?.id) ||
    students[2];

  return (
    <div className="flex flex-col w-full gap-4 pb-20">
      {/* BANNER DESTACADO INSTITUCIONAL DE TUTORÍA (Azulino, Verde y Blanco) */}
      <section className="w-full rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 p-4 text-white shadow-lg shadow-blue-900/20 relative overflow-hidden border border-blue-500/20">
        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-[11px] font-bold border border-white/10">
              <span className="material-symbols-outlined text-[15px] text-emerald-300">shield</span>
              <span>Acompañamiento Integral</span>
            </div>
            <span className="text-[11px] text-blue-200 bg-blue-900/60 px-3 py-1 rounded-xl font-bold border border-blue-400/20">
              Bimestre I - 2025
            </span>
          </div>

          <div className="mt-1">
            <h2 className="text-[19px] font-extrabold text-white leading-tight">
              Módulo de Tutoría y Convivencia Escolar
            </h2>
            <p className="text-[12px] text-blue-100 mt-1">
              Sección a cargo:{' '}
              <strong className="font-extrabold text-emerald-300">2° Grado "C"</strong> • Tutor: {INSTITUTIONAL_INFO.teacher} ({INSTITUTIONAL_INFO.specialty})
            </p>
          </div>

          {/* Métricas Clave de Tutoría */}
          <div className="grid grid-cols-3 gap-2 mt-2 pt-1">
            <div className="flex flex-col bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/10">
              <span className="text-[10px] uppercase tracking-wider text-blue-200 font-bold">
                Estudiantes
              </span>
              <span className="text-[20px] font-extrabold text-white leading-tight">
                {students.length}
              </span>
              <span className="text-[10px] text-emerald-300 font-bold">
                100% matriculados
              </span>
            </div>

            <div className="flex flex-col bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/10">
              <span className="text-[10px] uppercase tracking-wider text-blue-200 font-bold">
                En Riesgo
              </span>
              <span className="text-[20px] font-extrabold text-amber-300 leading-tight">
                {students.filter((s) => s.faltas >= 3).length}
              </span>
              <span className="text-[10px] text-red-200 font-medium">
                &gt;3 inasistencias
              </span>
            </div>

            <div className="flex flex-col bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/10">
              <span className="text-[10px] uppercase tracking-wider text-blue-200 font-bold">
                Citaciones
              </span>
              <span className="text-[20px] font-extrabold text-emerald-300 leading-tight">
                6
              </span>
              <span className="text-[10px] text-blue-100 font-medium">
                5 atendidas
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN: ALERTAS TEMPRANAS DE DESERCIÓN E INASISTENCIA CRÓNICA */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-blue-950">
            <span className="material-symbols-outlined text-blue-700 text-[22px]">
              notification_important
            </span>
            <h3 className="text-[16px] font-extrabold tracking-tight">
              Alertas de Inasistencia Crónica
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-[11px] font-bold">
            Casos Críticos
          </span>
        </div>
        <p className="text-[12px] text-slate-500">
          Estudiantes que superan el umbral normativo UGEL 04 para prevención oportuna del abandono escolar.
        </p>

        {/* Tarjeta Estudiante 1: Kevin Mendoza */}
        {kevinStudent && (
          <div className="w-full bg-white rounded-3xl p-4 shadow-sm border border-slate-200/80 flex flex-col gap-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center font-bold text-[13px] flex-shrink-0">
                  {kevinStudent.orderNumber}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] font-extrabold text-slate-900 truncate leading-tight">
                    {kevinStudent.surname}, {kevinStudent.name}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Apoderada: {kevinStudent.apoderado.name} ({kevinStudent.apoderado.relationship})
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-extrabold flex-shrink-0">
                Riesgo Alto
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-red-600 text-[17px]">cancel</span>
                <span className="text-[12px] text-slate-800">
                  <strong>{kevinStudent.faltas} Faltas</strong> acumuladas
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-amber-600 text-[17px]">
                  trending_up
                </span>
                <span className="text-[12px] text-amber-700 font-bold">3 consecutivas</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-slate-500 text-[12px] px-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-blue-500">
                  history_edu
                </span>
                Última falta: Lun 24 Mar
              </span>
              <span className="text-red-600 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">error</span>
                Sin justificar
              </span>
            </div>

            {/* Acciones de Contacto Rápido en Verde y Azulino */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onOpenCitation(kevinStudent)}
                className="flex-1 min-h-[42px] rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-[0.98] transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Citar por WhatsApp</span>
              </button>
              <button
                onClick={() => onCallStudent(kevinStudent)}
                className="w-11 h-11 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform"
                title="Llamar directamente"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
              </button>
              <button
                onClick={() => onOpenHistory(kevinStudent)}
                className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform"
                title="Ver bitácora"
              >
                <span className="material-symbols-outlined text-[20px]">folder_shared</span>
              </button>
            </div>
          </div>
        )}

        {/* Tarjeta Estudiante 2: Ana Rojas */}
        {anaStudent && (
          <div className="w-full bg-white rounded-3xl p-4 shadow-sm border border-slate-200/80 flex flex-col gap-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[13px] flex-shrink-0">
                  {anaStudent.orderNumber}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] font-extrabold text-slate-900 truncate leading-tight">
                    {anaStudent.surname}, {anaStudent.name}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Apoderado: {anaStudent.apoderado.name} ({anaStudent.apoderado.relationship})
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex-shrink-0">
                Riesgo Medio
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-amber-600 text-[17px]">warning</span>
                <span className="text-[12px] text-slate-800">
                  <strong>{anaStudent.faltas} Faltas</strong> acumuladas
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-blue-600 text-[17px]">schedule</span>
                <span className="text-[12px] text-slate-800">{anaStudent.tardanzas} Tardanzas</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-slate-500 text-[12px] px-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">
                  check_circle
                </span>
                Citación enviada: 20 Mar
              </span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">event</span>
                Cita: Jue 27 (11:00 am)
              </span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onOpenCitation(anaStudent)}
                className="flex-1 min-h-[42px] rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-[12px] font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all"
              >
                <span className="material-symbols-outlined text-[18px] text-blue-600">
                  mark_chat_read
                </span>
                <span>Recordar Cita (WA)</span>
              </button>
              <button
                onClick={() => onCallStudent(anaStudent)}
                className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform"
                title="Llamar directamente"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
              </button>
              <button
                onClick={() => onOpenHistory(anaStudent)}
                className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform"
                title="Ver bitácora"
              >
                <span className="material-symbols-outlined text-[20px]">folder_shared</span>
              </button>
            </div>
          </div>
        )}

        {/* Tarjeta Estudiante 3: Quispe Paucar, Mateo */}
        {mateoStudent && (
          <div className="w-full bg-white rounded-3xl p-4 shadow-sm border border-slate-200/80 flex flex-col gap-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[13px] flex-shrink-0">
                  {mateoStudent.orderNumber}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] font-extrabold text-slate-900 truncate leading-tight">
                    {mateoStudent.surname}, {mateoStudent.name}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Apoderada: {mateoStudent.apoderado.name} ({mateoStudent.apoderado.relationship})
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold flex-shrink-0">
                En Observación
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-slate-400 text-[17px]">receipt_long</span>
                <span className="text-[12px] text-slate-800">{mateoStudent.faltas} Faltas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-emerald-600 text-[17px]">verified</span>
                <span className="text-[12px] text-emerald-700 font-bold">2 Justificadas</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-slate-500 text-[12px] px-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">
                  medical_services
                </span>
                Certificado MINSA N° 4029
              </span>
              <span className="text-emerald-700 font-bold">Reposo Médico</span>
            </div>
          </div>
        )}
      </section>

      {/* SECCIÓN: REGISTRO DE JUSTIFICACIONES Y VISITAS */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-blue-950">
            <span className="material-symbols-outlined text-blue-700 text-[22px]">
              quick_reference_all
            </span>
            <h3 className="text-[16px] font-extrabold tracking-tight">
              Justificaciones y Visitas
            </h3>
          </div>
          <button
            onClick={onOpenNewJustification}
            className="text-[12px] text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>+ Registrar</span>
          </button>
        </div>

        {/* Listado de Atenciones Recientes */}
        <div className="flex flex-col gap-1.5 bg-white rounded-3xl p-3 shadow-sm border border-slate-200/80">
          {justifications.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`material-symbols-outlined text-[20px] flex-shrink-0 ${
                    item.type === 'Salud' ? 'text-emerald-600' : 'text-blue-600'
                  }`}
                >
                  {item.type === 'Salud' ? 'healing' : 'groups'}
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] text-slate-900 truncate font-bold">
                    {item.studentName}
                  </span>
                  <span className="text-[11px] text-slate-500 truncate">
                    {item.description}
                  </span>
                </div>
              </div>
              <span
                className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold flex-shrink-0 ml-2 ${
                  item.status === 'Aceptada'
                    ? 'text-emerald-800 bg-emerald-100'
                    : item.status === 'Compromiso'
                    ? 'text-amber-800 bg-amber-100'
                    : 'text-blue-800 bg-blue-100'
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN: GRÁFICOS Y ESTADÍSTICAS SEMANALES / MENSUALES */}
      <section className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-blue-950">
            <span className="material-symbols-outlined text-blue-700 text-[22px]">
              bar_chart
            </span>
            <h3 className="text-[16px] font-extrabold tracking-tight">
              Comportamiento de Asistencia
            </h3>
          </div>
          <span className="text-[12px] text-slate-500 font-medium">
            Aula 2° C
          </span>
        </div>

        {/* TARJETA: Tardanzas por Día Escolar */}
        <div className="w-full bg-white rounded-3xl p-4 shadow-sm border border-slate-200/80 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-slate-900">
                Tardanzas por Día Escolar
              </span>
              <span className="text-[11px] text-red-600 font-semibold flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[14px]">priority_high</span>
                Pico crítico: Lunes 1° bloque (7:45 am - 8:30 am)
              </span>
            </div>
            <span className="text-[11px] text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full font-bold border border-blue-200">
              Marzo 2025
            </span>
          </div>

          {/* Gráfico SVG de barras de días en Azulino y Verde */}
          <div className="w-full pt-1">
            <svg
              className="w-full h-32"
              fill="none"
              viewBox="0 0 320 120"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line stroke="#f1f5f9" strokeDasharray="2 2" strokeWidth="1" x1="20" x2="300" y1="20" y2="20" />
              <line stroke="#f1f5f9" strokeDasharray="2 2" strokeWidth="1" x1="20" x2="300" y1="55" y2="55" />
              <line stroke="#e2e8f0" strokeWidth="1" x1="20" x2="300" y1="90" y2="90" />

              {/* Lunes (Pico en Azulino Oscuro) */}
              <rect fill="#1d4ed8" height="66" rx="6" width="28" x="36" y="24" />
              <text fill="#1d4ed8" fontFamily="Inter" fontSize="11" fontWeight="800" textAnchor="middle" x="50" y="16">9</text>
              <text fill="#0f172a" fontFamily="Inter" fontSize="11" fontWeight="700" textAnchor="middle" x="50" y="105">Lun</text>

              {/* Martes (Verde) */}
              <rect fill="#059669" height="22" rx="6" width="28" x="94" y="68" />
              <text fill="#059669" fontFamily="Inter" fontSize="11" fontWeight="700" textAnchor="middle" x="108" y="60">3</text>
              <text fill="#64748b" fontFamily="Inter" fontSize="11" textAnchor="middle" x="108" y="105">Mar</text>

              {/* Miércoles (Verde) */}
              <rect fill="#059669" height="15" rx="6" width="28" x="152" y="75" />
              <text fill="#059669" fontFamily="Inter" fontSize="11" fontWeight="700" textAnchor="middle" x="166" y="67">2</text>
              <text fill="#64748b" fontFamily="Inter" fontSize="11" textAnchor="middle" x="166" y="105">Mié</text>

              {/* Jueves (Azulino suave) */}
              <rect fill="#3b82f6" height="29" rx="6" width="28" x="210" y="61" />
              <text fill="#2563eb" fontFamily="Inter" fontSize="11" fontWeight="700" textAnchor="middle" x="224" y="53">4</text>
              <text fill="#64748b" fontFamily="Inter" fontSize="11" textAnchor="middle" x="224" y="105">Jue</text>

              {/* Viernes (Azulino suave) */}
              <rect fill="#3b82f6" height="36" rx="6" width="28" x="268" y="54" />
              <text fill="#2563eb" fontFamily="Inter" fontSize="11" fontWeight="700" textAnchor="middle" x="282" y="46">5</text>
              <text fill="#64748b" fontFamily="Inter" fontSize="11" textAnchor="middle" x="282" y="105">Vie</text>
            </svg>
          </div>

          <div className="p-3 bg-blue-50 rounded-2xl flex items-start gap-2 text-blue-900 border border-blue-200">
            <span className="material-symbols-outlined text-[18px] text-blue-600 flex-shrink-0 mt-0.5">
              lightbulb
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-[12px] leading-snug">
                <strong>Acción Tutorial:</strong> Enviar recordatorio dominical a padres de 2° C para anticipar movilidad en Av. Túpac Amaru y zona Collique.
              </span>
            </div>
          </div>
        </div>

        {/* TARJETA: Comparativo Mensual de Asistencia Efectiva */}
        <div className="w-full bg-white rounded-3xl p-4 shadow-sm border border-slate-200/80 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold text-slate-900">
              Tasa Mensual de Asistencia
            </span>
            <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200">
              Meta SIAGIE: 90%
            </span>
          </div>

          <div className="flex flex-col gap-2.5 mt-0.5">
            {/* Marzo */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-[12px]">
                <span className="font-semibold text-slate-900">Marzo (Apertura escolar)</span>
                <span className="font-bold text-blue-700">87.4%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: '87.4%' }} />
              </div>
            </div>

            {/* Meta Bimestre */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center text-[12px]">
                <span className="text-slate-500 font-medium">Promedio Meta Institucional</span>
                <span className="font-bold text-emerald-600">92.0%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: '92%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN: GENERADOR DE INFORMES Y REPORTES OFICIALES (Azulino, Verde y Blanco) */}
      <section className="flex flex-col gap-2.5 mb-4">
        <div className="flex items-center gap-1.5 text-blue-950">
          <span className="material-symbols-outlined text-blue-700 text-[22px]">
            description
          </span>
          <h3 className="text-[16px] font-extrabold tracking-tight">
            Generación de Informes Oficiales
          </h3>
        </div>
        <p className="text-[12px] text-slate-500">
          Formatos normativos listos para exportación y visación de Dirección y Subdirección pedagógica.
        </p>

        {/* Botón 1: Consolidado SIAGIE (Azulino) */}
        <div className="bg-white p-3.5 rounded-3xl shadow-sm border border-slate-200/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">dataset</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[14px] font-extrabold text-slate-900 truncate">
                Consolidado Mensual SIAGIE
              </span>
              <span className="text-[11px] text-slate-500 truncate">
                Formato oficial MINEDU • 2° "C"
              </span>
            </div>
          </div>
          <button
            onClick={() => onOpenReportModal('siagie')}
            className="min-h-[40px] px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold flex items-center gap-1 shadow-md shadow-blue-600/25 active:scale-95 transition-transform flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[17px]">download</span>
            <span>Exportar</span>
          </button>
        </div>

        {/* Botón 2: Padrón Asistencia Reunión Padres (Blanco y Slate) */}
        <div className="bg-white p-3.5 rounded-3xl shadow-sm border border-slate-200/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">badge</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[14px] font-extrabold text-slate-900 truncate">
                Padrón Entrega de Libretas
              </span>
              <span className="text-[11px] text-slate-500 truncate">
                Planilla de firmas de apoderados
              </span>
            </div>
          </div>
          <button
            onClick={() => onOpenReportModal('padron')}
            className="min-h-[40px] px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[12px] font-bold flex items-center gap-1 active:scale-95 transition-transform flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[17px]">print</span>
            <span>Imprimir</span>
          </button>
        </div>

        {/* Botón 3: Reporte de Tutoría Bimestral (Verde Esmeralda) */}
        <div className="bg-white p-3.5 rounded-3xl shadow-sm border border-slate-200/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">assignment_turned_in</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[14px] font-extrabold text-slate-900 truncate">
                Informe Bimestral de Convivencia
              </span>
              <span className="text-[11px] text-slate-500 truncate">
                EPT Contabilidad + Tutoría Aula
              </span>
            </div>
          </div>
          <button
            onClick={() => onOpenReportModal('informe')}
            className="min-h-[40px] px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold flex items-center gap-1 shadow-md shadow-emerald-600/25 active:scale-95 transition-transform flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[17px]">picture_as_pdf</span>
            <span>PDF</span>
          </button>
        </div>
      </section>
    </div>
  );
};
