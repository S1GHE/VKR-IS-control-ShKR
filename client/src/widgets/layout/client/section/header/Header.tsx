import React, {useEffect, useRef, useState} from 'react';
import HeaderStyle from '@src/widgets/layout/client/section/header/Header.module.scss'
import Logo from "@src/shared/assets/logo/mainLogo.svg"
import {MainBtn} from "@src/shared/ui/btn/main-btn/MainBtn";
import {TextModule} from "@src/shared/scss";
import {useClass, useResize} from "@src/shared/hooks";
import CaretDown from "@src/shared/assets/ui/caret.svg"
import {BigBtn} from "@src/shared/ui/btn/big-btn/BigBtn";
import BurgerImage from "@src/shared/assets/header/burger.svg"

export const Header = () => {
  const globalResize = useResize()
  const [isBurgerOpen, setIsBurgerOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && isBurgerOpen && (!event.composedPath().includes(menuRef.current))) {
        setIsBurgerOpen(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)
    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [isBurgerOpen])

  return (
    <header className={HeaderStyle.container_static}>
      <div className={HeaderStyle.container_fixed}>
        <div className={HeaderStyle.logoImage}>
          <Logo viewBox={"0 0 179 32"}/>
        </div>
        {globalResize.isScreenMd ?
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
                  <BigBtn to={'/'} state={"gray"} className={useClass([TextModule.p_16, HeaderStyle.bigButton])}>Программирование</BigBtn>
                  <BigBtn to={'/'} state={"gray"} className={useClass([TextModule.p_16, HeaderStyle.bigButton])}>Программирование</BigBtn>
                  <BigBtn to={'/'} state={"gray"} className={useClass([TextModule.p_16, HeaderStyle.bigButton])}>Программирование</BigBtn>
                  <BigBtn to={'/'} state={"gray"} className={useClass([TextModule.p_16, HeaderStyle.bigButton])}>Программирование</BigBtn>
                </div>
              </div>
            </MainBtn>
            <MainBtn to={'/'} state={"black"}>Войти</MainBtn>
          </div>
          :
          <div className={HeaderStyle.burgerImageContainer} onClick={() => setIsBurgerOpen(true)}>
            <BurgerImage viewBox='0 0 24 14'/>
          </div>
        }
      </div>
      <div className={useClass([HeaderStyle.burgerMenu, isBurgerOpen && !globalResize.isScreenMd ? HeaderStyle["open"] : HeaderStyle["closed"]])}>
        <div ref={menuRef} className={useClass([HeaderStyle.burgerMenuContent, isBurgerOpen && !globalResize.isScreenMd ? HeaderStyle["open"] : HeaderStyle["closed"]])}>
          <div className={HeaderStyle.burgerCatalog}>
            <BigBtn to={'/'} state={"gray"} className={useClass([TextModule.p_16, HeaderStyle.bigButton])}>Программирование</BigBtn>
            <BigBtn to={'/'} state={"gray"} className={useClass([TextModule.p_16, HeaderStyle.bigButton])}>Программирование</BigBtn>
            <BigBtn to={'/'} state={"gray"} className={useClass([TextModule.p_16, HeaderStyle.bigButton])}>Программирование</BigBtn>
          </div>
          <div className={HeaderStyle.burgerAdditional}>
            <BigBtn to={'/'} state={"gray"} className={useClass([TextModule.p_16, HeaderStyle.bigButton])}>Компаниям</BigBtn>
            <BigBtn to={'/'} state={"black"} className={useClass([TextModule.p_16, HeaderStyle.bigButton])}>Войти</BigBtn>
          </div>
        </div>
      </div>
    </header>
  );
};