import React, {FC, ReactNode, useEffect, useRef} from 'react';
import cls from "@src/features/modals/bottom-modal/BottomModal.module.scss"
import {useClass} from "@src/shared/hooks";

interface BottomModalProps {
  isOpen: boolean
  setIsOpen: (i: boolean) => void
  children: ReactNode
}

export const BottomModal:FC<BottomModalProps> = ({isOpen, setIsOpen, children}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && isOpen && (!event.composedPath().includes(modalRef.current))) {
        setIsOpen(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)
    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  return (
    <div className={useClass([cls.modal, isOpen ? cls["open"] : cls["closed"]])}>
      <div ref={modalRef} className={useClass([cls.modalContent, isOpen ? cls["open"] : cls["closed"]])}>
        {children}
      </div>
    </div>
  );
};