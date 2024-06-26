import React, {FC, useEffect, useRef} from 'react';
import {TModal} from "@src/shared/types";
import {useClass} from "@src/shared/hooks";
import cls from "@src/features/modals/centre-modal/CentreModal.module.scss"

export const CentreModal:FC<TModal> = ({setIsOpen, isOpen, children}) => {
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
    <div className={useClass([cls.container, isOpen ? cls["open"] : cls["closed"]])}>
      <div ref={modalRef} className={cls.modal}>
        {children}
      </div>
    </div>
  );
};