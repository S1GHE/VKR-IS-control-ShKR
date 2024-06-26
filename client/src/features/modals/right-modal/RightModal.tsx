import React, {FC, useEffect, useRef} from 'react';
import cls from "@src/features/modals/right-modal/RightModal.module.scss"
import {useClass} from "@src/shared/hooks";
import {TModal} from "@src/shared/types";

export const RightModal:FC<TModal> = ({setIsOpen, isOpen, children}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && isOpen && (!event.composedPath().includes(modalRef.current))) {
        setIsOpen(null)
      }
    }
    document.body.addEventListener('click', handleClickOutside)
    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  return (
    <div className={useClass([cls.modalContainer, isOpen ? cls["open"] : cls["closed"]])}>
      <div ref={modalRef} className={useClass([cls.modal, isOpen ? cls["open"] : cls["closed"]])}>
        {children}
      </div>
    </div>
  );
};