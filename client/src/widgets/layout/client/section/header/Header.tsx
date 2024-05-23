import React from 'react';
import HeaderStyle from '@src/widgets/layout/client/section/header/Header.module.scss'
import Logo from "@src/shared/assets/logo/mainLogo.svg"
import {MainBtn} from "@src/shared/ui/btn/main-btn/MainBtn";
import {TextModule} from "@src/shared/scss";
import {useClass} from "@src/shared/hooks";
import CaretDown from "@src/shared/assets/ui/caret.svg"
import {BigBtn} from "@src/shared/ui/btn/big-btn/BigBtn";

export const Header = () => {
  return (
    <header className={HeaderStyle.container_static}>
      <div className={HeaderStyle.container_fixed}>
        <div className={HeaderStyle.logoImage}>
          <Logo viewBox={"0 0 179 32"}/>
        </div>
        <div className={useClass([TextModule.p_16, HeaderStyle.navigationButtons])}>
          <MainBtn to={'/'} state={"gray"}>Компаниям</MainBtn>
          <MainBtn state={"gray"} className={HeaderStyle.dropButton}>
            <div className={HeaderStyle.dropButtonContent}>
              Все курсы
              <div className={HeaderStyle.dropCaretImg}>
                <CaretDown/>
              </div>
            </div>
            <div className={HeaderStyle.dropdownWrapper}>
              <div className={HeaderStyle.dropdownContainer}>
                <BigBtn to={'/'} state={"gray"} className={HeaderStyle.bigButton}>Программирование</BigBtn>
                <BigBtn to={'/'} state={"gray"} className={HeaderStyle.bigButton}>Программирование</BigBtn>
                <BigBtn to={'/'} state={"gray"} className={HeaderStyle.bigButton}>Программирование</BigBtn>
                <BigBtn to={'/'} state={"gray"} className={HeaderStyle.bigButton}>Программирование</BigBtn>
              </div>
            </div>
          </MainBtn>
          <MainBtn to={'/'} state={"black"}>Войти</MainBtn>
        </div>
      </div>
    </header>
  );
};