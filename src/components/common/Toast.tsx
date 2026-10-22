import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 24,
      right: 24,
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      maxWidth: 380,
      width: 'calc(100% - 48px)',
      pointerEvents: 'none'
    }}>
      {toasts.map(toast => (
        <div
          key={toast.id}
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
            padding: '14px 16px',
            backgroundColor: 'var(--bg-modal)',
            border: `1px solid ${
              toast.type === 'success' ? 'var(--color-green)' :
              toast.type === 'error' ? 'var(--color-red)' : 'var(--color-brand)'
            }`,
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            animation: 'fadeIn 0.25s ease-out',
          }}
        >
          {toast.type === 'success' && <CheckCircle2 size={20} color="var(--color-green)" style={{ flexShrink: 0, marginTop: 2 }} />}
          {toast.type === 'error' && <AlertCircle size={20} color="var(--color-red)" style={{ flexShrink: 0, marginTop: 2 }} />}
          {toast.type === 'info' && <Info size={20} color="var(--color-brand)" style={{ flexShrink: 0, marginTop: 2 }} />}
          
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-main)' }}>{toast.title}</div>
            {toast.message && (
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{toast.message}</div>
            )}
          </div>

          <button onClick={() => removeToast(toast.id)} style={{ color: 'var(--text-muted)', padding: 2 }}>
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
