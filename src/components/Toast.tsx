import React from 'react';

export interface ToastData {
  title: string;
  message: string;
  icon?: string;
  isError?: boolean;
}

interface ToastProps {
  toast: ToastData | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  if (!toast) return null;

  return (
    <div
      onClick={onClose}
      className="fixed bottom-20 left-4 right-4 z-50 max-w-md mx-auto bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 transition-all transform animate-bounce-in cursor-pointer border border-white/10"
      role="status"
      aria-live="polite"
    >
      <span
        className={`material-symbols-outlined text-[24px] flex-shrink-0 ${
          toast.isError ? 'text-primary-fixed' : 'text-tertiary-fixed'
        }`}
      >
        {toast.icon || (toast.isError ? 'error' : 'check_circle')}
      </span>
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-[13px] font-bold truncate leading-tight text-white">
          {toast.title}
        </span>
        <span className="text-[12px] text-surface-variant truncate mt-0.5">
          {toast.message}
        </span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="text-white/60 hover:text-white p-1 rounded-full"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
};
