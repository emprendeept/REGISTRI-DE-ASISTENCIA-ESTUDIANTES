/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Student, AttendanceStatus, ActiveTab, JustificationRecord } from './types';
import { INITIAL_STUDENTS, INITIAL_JUSTIFICATIONS } from './data/mockData';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Toast, ToastData } from './components/Toast';
import { AsistenciaDiaria } from './components/screens/AsistenciaDiaria';
import { RegistroAcumulado } from './components/screens/RegistroAcumulado';
import { DirectorioEstudiantes } from './components/screens/DirectorioEstudiantes';
import { ReportesTutoria } from './components/screens/ReportesTutoria';
import { HistoryDrawerModal } from './components/modals/HistoryDrawerModal';
import { WhatsAppModal } from './components/modals/WhatsAppModal';
import { JustificationModal } from './components/modals/JustificationModal';
import { OfficialReportModal, ReportType } from './components/modals/OfficialReportModal';
import { TeacherProfileModal } from './components/modals/TeacherProfileModal';
import { NewStudentModal } from './components/modals/NewStudentModal';
import { EditStudentModal } from './components/modals/EditStudentModal';
import { DeleteStudentModal } from './components/modals/DeleteStudentModal';

export default function App() {
  // Main state with localStorage persistence (v4 for official rosters)
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem('cacerista_students_v4');
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  const [justifications, setJustifications] = useState<JustificationRecord[]>(() => {
    try {
      const saved = localStorage.getItem('cacerista_justifications_v4');
      return saved ? JSON.parse(saved) : INITIAL_JUSTIFICATIONS;
    } catch {
      return INITIAL_JUSTIFICATIONS;
    }
  });

  const [currentAttendance, setCurrentAttendance] = useState<
    Record<number, { status: AttendanceStatus | ''; note?: string; time?: string }>
  >(() => {
    try {
      const saved = localStorage.getItem('cacerista_attendance_v4');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }

    const defaults: Record<number, { status: AttendanceStatus | ''; note?: string; time?: string }> = {};
    INITIAL_STUDENTS.forEach((s) => {
      if (s.faltas >= 3) {
        defaults[s.id] = { status: 'F', note: 'Inasistencia sin justificar' };
      } else if (s.tardanzas >= 3) {
        defaults[s.id] = { status: 'T', note: 'Tardanza en 1° bloque matinal', time: '08:14 AM' };
      } else {
        defaults[s.id] = { status: 'P' };
      }
    });
    return defaults;
  });

  // Navigation & selection
  const [activeTab, setActiveTab] = useState<ActiveTab>('asistencia-diaria');
  const [selectedSection, setSelectedSection] = useState<string>('2° C');
  const [toast, setToast] = useState<ToastData | null>(null);

  // Modals state
  const [historyStudent, setHistoryStudent] = useState<Student | null>(null);
  const [citationStudent, setCitationStudent] = useState<Student | null>(null);
  const [editTargetStudent, setEditTargetStudent] = useState<Student | null>(null);
  const [deleteTargetStudent, setDeleteTargetStudent] = useState<Student | null>(null);
  const [isJustificationOpen, setIsJustificationOpen] = useState(false);
  const [reportModalType, setReportModalType] = useState<ReportType | null>(null);
  const [isTeacherProfileOpen, setIsTeacherProfileOpen] = useState(false);
  const [isNewStudentOpen, setIsNewStudentOpen] = useState(false);

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem('cacerista_students_v4', JSON.stringify(students));
    } catch {
      // Ignored
    }
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem('cacerista_attendance_v4', JSON.stringify(currentAttendance));
    } catch {
      // Ignored
    }
  }, [currentAttendance]);

  useEffect(() => {
    try {
      localStorage.setItem('cacerista_justifications_v4', JSON.stringify(justifications));
    } catch {
      // Ignored
    }
  }, [justifications]);

  const showToast = (title: string, message: string, icon = 'check_circle', isError = false) => {
    setToast({ title, message, icon, isError });
    setTimeout(() => {
      setToast((curr) => (curr?.title === title ? null : curr));
    }, 3800);
  };

  // Status updates
  const handleUpdateStatus = (studentId: number, status: AttendanceStatus, note?: string) => {
    setCurrentAttendance((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status,
        note: note !== undefined ? note : prev[studentId]?.note,
        time: status === 'T' ? '08:14 AM' : undefined,
      },
    }));
  };

  const handleUpdateNote = (studentId: number, note: string) => {
    setCurrentAttendance((prev) => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || { status: 'P' }),
        note,
      },
    }));
  };

  const handleMarkAllPresent = () => {
    const updated = { ...currentAttendance };
    // Only mark students in currently active section
    const activeSectionStudents = students.filter((s) => {
      if (selectedSection === 'Tutoría 2° C') return s.section === 'Tutoría 2° C';
      if (selectedSection === '2° C') return s.section === '2° C';
      if (selectedSection === '1° A') return s.section === '1° A';
      if (selectedSection === '3° A') return s.section === '3° A';
      return false;
    });

    activeSectionStudents.forEach((s) => {
      updated[s.id] = { status: 'P' };
    });
    setCurrentAttendance(updated);
    showToast('Nómina Marcada', `Se marcaron como Presentes los alumnos de ${selectedSection}.`, 'done_all');
  };

  const handleClearAttendance = () => {
    const updated = { ...currentAttendance };
    const activeSectionStudents = students.filter((s) => {
      if (selectedSection === 'Tutoría 2° C') return s.section === 'Tutoría 2° C';
      if (selectedSection === '2° C') return s.section === '2° C';
      if (selectedSection === '1° A') return s.section === '1° A';
      if (selectedSection === '3° A') return s.section === '3° A';
      return false;
    });

    activeSectionStudents.forEach((s) => {
      updated[s.id] = { status: '' };
    });
    setCurrentAttendance(updated);
    showToast('Registro Limpiado', `Se restableció el control para ${selectedSection}.`, 'restart_alt');
  };

  const handleSaveSession = () => {
    showToast(
      'Sincronizado con SIAGIE',
      `La sesión pedagógica de ${selectedSection} fue guardada exitosamente.`,
      'cloud_done'
    );
  };

  const handleExportSiagie = () => {
    setReportModalType('siagie');
  };

  const handleCallStudent = (student: Student) => {
    showToast(
      'Llamada Telefónica',
      `Contactando a ${student.apoderado.name} (${student.apoderado.phone})...`,
      'call'
    );
  };

  const handleCitationSent = (studentName: string) => {
    showToast(
      'Citación Registrada',
      `Se envió el requerimiento formal al apoderado de ${studentName}.`,
      'mark_chat_read'
    );
  };

  // AGREGAR ESTUDIANTE (Sin restricciones)
  const handleAddStudent = (
    newStudentData: Omit<Student, 'id' | 'orderNumber' | 'asistencias' | 'tardanzas' | 'faltas' | 'justificadas'>
  ) => {
    const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
    const sameSectionStudents = students.filter((s) => s.section === newStudentData.section);
    const orderNumber = (sameSectionStudents.length + 1).toString().padStart(2, '0');

    const newStudent: Student = {
      ...newStudentData,
      id: newId,
      orderNumber,
      asistencias: 42,
      tardanzas: 0,
      faltas: 0,
      justificadas: 0,
    };

    setStudents((prev) => [...prev, newStudent]);
    setCurrentAttendance((prev) => ({
      ...prev,
      [newId]: { status: 'P' },
    }));

    showToast(
      'Estudiante Agregado',
      `${newStudent.surname}, ${newStudent.name} fue incorporado a ${newStudent.section}.`,
      'person_add'
    );
  };

  // EDITAR ESTUDIANTE
  const handleSaveEditedStudent = (updatedStudent: Student) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );

    if (historyStudent && historyStudent.id === updatedStudent.id) {
      setHistoryStudent(updatedStudent);
    }

    showToast(
      'Datos Actualizados',
      `Se guardaron los cambios para ${updatedStudent.surname}, ${updatedStudent.name}.`,
      'check_circle'
    );
  };

  // RETIRAR ESTUDIANTE
  const handleConfirmRemoveStudent = (studentId: number) => {
    const target = students.find((s) => s.id === studentId);
    if (!target) return;

    setStudents((prev) => prev.filter((s) => s.id !== studentId));
    setCurrentAttendance((prev) => {
      const copy = { ...prev };
      delete copy[studentId];
      return copy;
    });

    setDeleteTargetStudent(null);

    showToast(
      'Estudiante Retirado',
      `Se retiró a ${target.surname}, ${target.name} de la nómina escolar.`,
      'person_remove'
    );
  };

  const handleSaveJustification = (newRecord: JustificationRecord) => {
    setJustifications((prev) => [newRecord, ...prev]);
    showToast(
      'Justificación Registrada',
      `Se guardó el sustento para ${newRecord.studentName}.`,
      'verified'
    );
  };

  const handleReportFeedback = (reportTitle: string) => {
    showToast(
      'Descarga Oficial Generada',
      `Se procesó "${reportTitle}" en formato normativo MINEDU.`,
      'download_done'
    );
  };

  // Tutoria students (Tutoría 2° C)
  const tutoriaStudents = students.filter((s) => s.section === 'Tutoría 2° C');

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 antialiased flex flex-col justify-between">
      {/* Mobile viewport container */}
      <div className="w-full max-w-md mx-auto min-h-screen flex flex-col bg-white relative shadow-2xl border-x border-slate-200">
        {/* Header en Azulino y Blanco con botón + Alumno */}
        <Header
          activeTab={activeTab}
          activeSection={selectedSection}
          onSelectSection={setSelectedSection}
          onOpenTeacherProfile={() => setIsTeacherProfileOpen(true)}
          onOpenNewStudent={() => setIsNewStudentOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full px-4 pt-36 pb-20 bg-slate-50/60">
          {activeTab === 'asistencia-diaria' && (
            <AsistenciaDiaria
              students={students}
              currentAttendance={currentAttendance}
              onUpdateStatus={handleUpdateStatus}
              onUpdateNote={handleUpdateNote}
              onMarkAllPresent={handleMarkAllPresent}
              onClearAttendance={handleClearAttendance}
              onSaveSession={handleSaveSession}
              selectedSection={selectedSection}
              onSelectSection={setSelectedSection}
              onOpenNewStudent={() => setIsNewStudentOpen(true)}
              onPromptEditStudent={(student) => setEditTargetStudent(student)}
              onPromptDeleteStudent={(student) => setDeleteTargetStudent(student)}
            />
          )}

          {activeTab === 'registro-acumulado' && (
            <RegistroAcumulado
              students={students}
              onOpenHistory={(student) => setHistoryStudent(student)}
              onOpenCitation={(student) => setCitationStudent(student)}
              onExportSiagie={handleExportSiagie}
              onPromptEditStudent={(student) => setEditTargetStudent(student)}
              onPromptDeleteStudent={(student) => setDeleteTargetStudent(student)}
              selectedSection={selectedSection}
              onSelectSection={setSelectedSection}
            />
          )}

          {activeTab === 'estudiantes' && (
            <DirectorioEstudiantes
              students={students}
              onOpenHistory={(student) => setHistoryStudent(student)}
              onOpenCitation={(student) => setCitationStudent(student)}
              onOpenNewStudent={() => setIsNewStudentOpen(true)}
              onPromptEditStudent={(student) => setEditTargetStudent(student)}
              onPromptDeleteStudent={(student) => setDeleteTargetStudent(student)}
              selectedSection={selectedSection}
              onCallStudent={handleCallStudent}
            />
          )}

          {activeTab === 'reportes-tutoria' && (
            <ReportesTutoria
              students={tutoriaStudents.length > 0 ? tutoriaStudents : students}
              justifications={justifications}
              onOpenCitation={(student) => setCitationStudent(student)}
              onCallStudent={handleCallStudent}
              onOpenHistory={(student) => setHistoryStudent(student)}
              onOpenNewJustification={() => setIsJustificationOpen(true)}
              onOpenReportModal={(type) => setReportModalType(type)}
            />
          )}
        </main>

        {/* Bottom Navigation en Azulino y Blanco */}
        <Navigation
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          pendingSyncCount={0}
        />

        {/* Feedback Toast */}
        <Toast toast={toast} onClose={() => setToast(null)} />

        {/* Modals */}
        <HistoryDrawerModal
          student={historyStudent}
          isOpen={!!historyStudent}
          onClose={() => setHistoryStudent(null)}
          onOpenCitation={(student) => setCitationStudent(student)}
          onPromptEdit={(student) => setEditTargetStudent(student)}
          onPromptDelete={(student) => setDeleteTargetStudent(student)}
        />

        <WhatsAppModal
          student={citationStudent}
          isOpen={!!citationStudent}
          onClose={() => setCitationStudent(null)}
          onSent={handleCitationSent}
        />

        <JustificationModal
          students={students}
          isOpen={isJustificationOpen}
          onClose={() => setIsJustificationOpen(false)}
          onSave={handleSaveJustification}
        />

        <OfficialReportModal
          type={reportModalType}
          students={students}
          isOpen={!!reportModalType}
          onClose={() => setReportModalType(null)}
          onDownloadFeedback={handleReportFeedback}
        />

        <TeacherProfileModal
          isOpen={isTeacherProfileOpen}
          onClose={() => setIsTeacherProfileOpen(false)}
        />

        {/* AGREGAR ESTUDIANTE (Sin restricciones) */}
        <NewStudentModal
          isOpen={isNewStudentOpen}
          onClose={() => setIsNewStudentOpen(false)}
          onAddStudent={handleAddStudent}
          defaultSection={selectedSection}
        />

        {/* EDITAR ESTUDIANTE */}
        <EditStudentModal
          student={editTargetStudent}
          isOpen={!!editTargetStudent}
          onClose={() => setEditTargetStudent(null)}
          onSaveStudent={handleSaveEditedStudent}
        />

        {/* RETIRAR ESTUDIANTE */}
        <DeleteStudentModal
          student={deleteTargetStudent}
          isOpen={!!deleteTargetStudent}
          onClose={() => setDeleteTargetStudent(null)}
          onConfirmRemove={handleConfirmRemoveStudent}
        />
      </div>
    </div>
  );
}
