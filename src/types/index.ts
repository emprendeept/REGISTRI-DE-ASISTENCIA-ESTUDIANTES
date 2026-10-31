export type AttendanceStatus = 'P' | 'T' | 'F' | 'J';

export interface Student {
  id: number;
  orderNumber: string; // '01', '02', etc.
  surname: string;
  name: string;
  dni: string;
  matriculaCode: string;
  section: string; // '2° C', '1° A', '3° A'
  photoUrl?: string;
  initials: string;
  gender: 'M' | 'F';
  apoderado: {
    name: string;
    relationship: string; // 'Madre', 'Padre', 'Tutor'
    phone: string;
  };
  address: string;
  notes?: string;
  // Cumulative metrics for current bim
  asistencias: number;
  tardanzas: number;
  faltas: number;
  justificadas: number;
  consecutiveAbsences?: number;
  lastAbsenceDate?: string;
  scheduledCitation?: string;
  medicalCert?: string;
}

export interface DayAttendance {
  studentId: number;
  status: AttendanceStatus | '';
  time?: string;
  note?: string;
}

export interface SessionRecord {
  date: string; // YYYY-MM-DD
  displayDate: string; // "Martes, 24 Octubre"
  section: string;
  bimester: string;
  week: string;
  shift: string;
  area: string;
  records: Record<number, { status: AttendanceStatus | ''; time?: string; note?: string }>;
  saved: boolean;
}

export interface JustificationRecord {
  id: string;
  studentName: string;
  date: string;
  type: 'Salud' | 'Entrevista' | 'Permiso' | 'Familiar';
  description: string;
  status: 'Aceptada' | 'Compromiso' | 'En Trámite';
  attachment?: string;
}

export type ActiveTab = 'asistencia-diaria' | 'registro-acumulado' | 'estudiantes' | 'reportes-tutoria';
