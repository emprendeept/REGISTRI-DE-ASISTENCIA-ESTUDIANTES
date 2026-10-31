import React, { useState, useEffect } from 'react';
import { Student } from '../../types';

interface EditStudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveStudent: (updatedStudent: Student) => void;
}

export const EditStudentModal: React.FC<EditStudentModalProps> = ({
  student,
  isOpen,
  onClose,
  onSaveStudent,
}) => {
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [dni, setDni] = useState('');
  const [section, setSection] = useState('2° C');
  const [orderNumber, setOrderNumber] = useState('');
  const [matriculaCode, setMatriculaCode] = useState('');
  const [gender, setGender] = useState<'M' | 'F'>('M');
  const [apoderadoName, setApoderadoName] = useState('');
  const [relationship, setRelationship] = useState('Madre');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (student) {
      setSurname(student.surname || '');
      setName(student.name || '');
      setDni(student.dni || '');
      setSection(student.section || '2° C');
      setOrderNumber(student.orderNumber || '01');
      setMatriculaCode(student.matriculaCode || '');
      setGender(student.gender || 'M');
      setApoderadoName(student.apoderado?.name || '');
      setRelationship(student.apoderado?.relationship || 'Madre');
      setPhone(student.apoderado?.phone || '');
      setAddress(student.address || '');
      setNotes(student.notes || '');
    }
  }, [student]);

  if (!isOpen || !student) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalSurname = surname.trim() || student.surname;
    const finalName = name.trim() || student.name;
    const initials = `${finalSurname.charAt(0) || 'E'}${finalName.charAt(0) || 'N'}`.toUpperCase();

    const updatedStudent: Student = {
      ...student,
      orderNumber: orderNumber.trim() || student.orderNumber,
      surname: finalSurname.toUpperCase(),
      name: finalName,
      dni: dni.trim() || student.dni,
      matriculaCode: matriculaCode.trim() || student.matriculaCode,
      section: section || student.section,
      gender,
      initials,
      address: address.trim(),
      notes: notes.trim(),
      apoderado: {
        name: apoderadoName.trim() || student.apoderado.name,
        relationship: relationship || student.apoderado.relationship,
        phone: phone.trim() || student.apoderado.phone,
      },
    };

    onSaveStudent(updatedStudent);
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
              <span className="material-symbols-outlined text-[24px]">edit</span>
            </div>
            <div>
              <h3 className="text-[17px] font-extrabold text-blue-950 leading-tight">
                Editar Datos del Estudiante
              </h3>
              <span className="text-[11px] text-emerald-700 font-semibold">
                N° Orden: {orderNumber} • Cód: {student.matriculaCode}
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
          {/* N° Orden y Sección */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-bold text-blue-950">N° de Orden:</label>
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Ej: 01"
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-bold"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-bold text-blue-950">Grado y Sección:</label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="2° C">2° Grado "C" (Tutoría / Taller)</option>
                <option value="1° A">1° Grado "A"</option>
                <option value="3° A">3° Grado "A"</option>
                <option value="4° B">4° Grado "B"</option>
                <option value="5° A">5° Grado "A"</option>
              </select>
            </div>
          </div>

          {/* Apellidos y Nombres */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-bold text-blue-950">Apellidos:</label>
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Ej: QUISPE FLORES"
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-bold text-blue-950">Nombres:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Carlos Daniel"
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* DNI y Cód. Matrícula */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-bold text-blue-950">DNI / Documento:</label>
              <input
                type="text"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                placeholder="Número de DNI"
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[12px] font-bold text-blue-950">Cód. Matrícula SIAGIE:</label>
              <input
                type="text"
                value={matriculaCode}
                onChange={(e) => setMatriculaCode(e.target.value)}
                placeholder="Ej: 2024-00412"
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
          </div>

          {/* Género */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-bold text-blue-950">Género:</label>
            <div className="grid grid-cols-2 gap-2">
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

          {/* Datos del Apoderado */}
          <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100 flex flex-col gap-2.5 mt-0.5">
            <div className="flex items-center gap-1.5 text-blue-900 font-bold text-[12px]">
              <span className="material-symbols-outlined text-[17px] text-blue-600">contact_phone</span>
              <span>Datos del Apoderado / Familiar</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-slate-700">Nombre del Apoderado:</label>
                <input
                  type="text"
                  value={apoderadoName}
                  onChange={(e) => setApoderadoName(e.target.value)}
                  placeholder="Ej: Carmen Huamán"
                  className="bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-[12px] text-slate-900"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-slate-700">Parentesco:</label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-[12px] text-slate-900"
                >
                  <option value="Madre">Madre</option>
                  <option value="Padre">Padre</option>
                  <option value="Tutor">Tutor Legal</option>
                  <option value="Abuelo/a">Abuelo / Abuela</option>
                  <option value="Tío/a">Tío / Tía</option>
                  <option value="Hermano/a">Hermano / Hermana</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-slate-700">Celular / WhatsApp:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej: 987654321"
                  className="bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-[12px] text-slate-900 font-mono"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-slate-700">Dirección en Collique:</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Av., Jr., Mz., Lt."
                  className="bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-[12px] text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Observaciones y Certificados */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-bold text-blue-950">Observación / Historial de Tutoría:</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: Certificado médico presentado, horario de transporte, etc."
              className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-[12px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Botones de Guardar / Cancelar en Azulino y Verde */}
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
              className="flex-1 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-[13px] font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[19px]">save</span>
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
