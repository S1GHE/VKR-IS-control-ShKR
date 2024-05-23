import React, {FC} from 'react';
import cls from "@src/shared/ui/btn/big-btn/BigBtn.module.scss"
import {useClass} from "@src/shared/hooks";
import {IBigBtnType} from "@src/shared/ui/btn/big-btn/BigBtnType";
import {Link} from "react-router-dom";

export const BigBtn:FC<IBigBtnType> = (props) => {
  const {children, state, className, disabled, onClick, to} = props

  return (
    <>
      {
        to ?
          <Link className={
            useClass([
              className, cls.main_btn, cls[state]
            ])} onClick={onClick} to={to}>
            {children}
          </Link>
          :
          <button className={
            useClass([
              className, cls.main_btn, cls[state]
            ])} onClick={onClick} disabled={disabled}>
            {children}
          </button>
      }
    </>
  );
};