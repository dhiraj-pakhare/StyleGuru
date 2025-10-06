import React, { useRef, useEffect } from 'react';

export default function ModalFocusTrap({ open, onClose, children }) {
  const trapRef = useRef();

  useEffect(() => {
    if (!open || !trapRef.current) return;
    const focusable = trapRef.current.querySelectorAll(
      'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const trapElement = trapRef.current;
    trapElement.addEventListener('keydown', handleKeyDown);
    return () => trapElement.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <div ref={trapRef} tabIndex={-1} aria-modal="true" role="dialog">
      {children}
    </div>
  );
} 