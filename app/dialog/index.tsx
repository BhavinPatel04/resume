import React, { useEffect, useRef } from "react";
import "./index.css";

interface DialogProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  open,
  title,
  children,
  onClose,
}: DialogProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [open]);

  return (
    <dialog ref={ref} onClose={onClose}>
      <div className="dialog__title flex items-center justify-between p-16 pb-0">
        <h2>{title}</h2>
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close button"
        >
          ×
        </button>
      </div>
      <div className="dialog__body p-16 pt-8">{children}</div>
    </dialog>
  );
};

export default Dialog;
