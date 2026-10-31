import React, { useState } from 'react';
import { Student } from '../../types';

interface NewStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (newStudent: Omit<Student, 'id' | 'orderNumber' | 'asistencias' | 'tardanzas' | 'faltas' | 'justificadas'>) => void;
  defaultSection?: string;
}

export const NewStudentModal: React.FC<NewStudentModalProps> = ({
  isOpen,
  onClose,
  onAddStudent,
  defaultSection = '2° C',
}) => {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState('');
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [dni, setDni] = useState('');
  const [section, setSection] = useState(defaultSection.includes('Tutoría') ? '2° C' : defaultSection || '2° C');
  const [matriculaCode, setMatriculaCode] = useState('');
  const [gender, setGender] = useState<'M' | 'F'>('M');
  const [apoderadoName, setApoderadoName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Sin restricciones de datos: si el usuario escribió en un solo campo o apellidos separados
    let finalSurname = surname.trim();
    let finalName = name.trim();

    if (!finalSurname && !finalName && fullName.trim()) {
      const parts = fullName.trim().split(' ');
      if (parts.length >= 2) {
        finalSurname = parts.slice(0, Math.ceil(parts.length / 2)).join(' ');
        finalName = parts.slice(Math.ceil(parts.length / 2)).join(' ');
      } else {
        finalName = fullName.trim();
        finalSurname = 'Estudiante';
      }
    }

    if (!finalSurname && !finalName) {
      finalSurname = 'Estudiante';
      finalName = `Nuevo ${(Math.random() * 100).toFixed(0)}`;
    }

    const initials = `${finalSurname.charAt(0) || 'E'}${finalName.charAt(0) || 'N'}`.toUpperCase();
    const finalDni = dni.trim() || `${Math.floor(70000000 + Math.random() * 9999999)}`;
    const finalCode = matriculaCode.trim() || `2024-00${Math.floor(100 + Math.random() * 900)}`;

    onAddStudent({
      surname: finalSurname.toUpperCase(),
      name: finalName,
      dni: finalDni,
      matriculaCode: finalCode,
      section: section || '2° C',
      gender,
      initials,
      address: address.trim() || 'Collique, Comas',
      notes: notes.trim(),
      apoderado: {
        name: apoderadoName.trim() || 'Apoderado Legal',
        relationship: 'Familiar',
        phone: phone.trim() || '987654321',
      },
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl flex flex-col gap-4 border border-blue-100 max-h-[92vh] overflow-y-auto animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header en Azulino y Blanco */}
        <div className="flex items-center justify-between pb-3 border-b border-blue-50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/30">
              <span className="material-symbols-outlined text-[24px]">person_add</span>
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-blue-950 leading-tight">
                Agregar Estudiante a la Nómina
              </h3>
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Sin restricciones de datos • Registro libre
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Apellidos y Nombres Flexibles */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-bold text-blue-950">Apellidos:</label>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Ej: QUISPE FLORES"
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-bold text-blue-950">Nombres:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Carlos Daniel"
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* DNI y Sección */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-bold text-blue-950">DNI / Documento:</label>
              <input
                type="text"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="Cualquier número o código"
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-mono"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-bold text-blue-950">Grado y Sección:</label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-medium"
              >
                <option value="2° C">2° Grado "C" (Tutoría / Taller)</option>
                <option value="1° A">1° Grado "A"</option>
                <option value="3° A">3° Grado "A"</option>
                <option value="4° B">4° Grado "B"</option>
                <option value="5° A">5° Grado "A"</option>
              </select>
            </div>
          </div>

          {/* Género y Código Opcionales */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-bold text-blue-950">Género:</label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setGender('M')}
                  className={`py-2 rounded-xl text-[12px] font-bold transition-all ${
                    gender === 'M'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Varón
                </button>
                <button
                  type="button"
                  onClick={() => setGender('F')}
                  className={`py-2 rounded-xl text-[12px] font-bold transition-all ${
                    gender === 'F'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Mujer
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-bold text-blue-950">Cód. Matrícula (Opcional):</label>
              <input
                type="text"
                value={matriculaCode}
                onChange={(e) => setMatriculaCode(e.target.value)}
                placeholder="Ej: 2024-00120"
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Datos del Apoderado (Opcionales) */}
          <div className="bg-blue-50/60 p-3.5 rounded-2xl border border-blue-100 flex flex-col gap-2.5 mt-1">
            <div className="flex items-center gap-1.5 text-blue-900 font-bold text-[12px]">
              <span className="material-symbols-outlined text-[17px] text-blue-600">contact_phone</span>
              <span>Datos del Apoderado / Contacto (Opcional)</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-slate-700">Nombre Apoderado:</label>
                <input
                  type="text"
                  value={apoderadoName}
                  onChange={(e) => setApoderadoName(e.target.value)}
                  placeholder="Madre, Padre o Tutor"
                  className="bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-[12px] text-slate-900"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-slate-700">Teléfono / WhatsApp:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej: 987654321"
                  className="bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-[12px] text-slate-900 font-mono"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-slate-700">Dirección / Zona en Collique:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ej: Collique 3ra Zona, Av. Revolución..."
                className="bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-[12px] text-slate-900"
              />
            </div>
          </div>

          {/* Observaciones iniciales */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-bold text-blue-950">Nota / Observación inicial (Opcional):</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Estudiante recién incorporado / Traslado"
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Botones de Acción en Verde y Azulino */}
          <div className="flex gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[13px] font-bold transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-[13px] font-bold shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[19px]">check_circle</span>
              <span>Guardar Estudiante</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
