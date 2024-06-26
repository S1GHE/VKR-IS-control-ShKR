import React, {useContext, useEffect, useState} from 'react';
import HeaderStyle from '@src/widgets/layout/client/section/header/Header.module.scss'
import Logo from "@src/shared/assets/icons/logo/mainLogo.svg"
import {MainBtn} from "@src/shared/ui/btn/main-btn/MainBtn";
import {TextModule} from "@src/shared/scss";
import {useClass} from "@src/shared/hooks";
import CaretDown from "@src/shared/assets/icons/ui/caret.svg"
import {BigBtn} from "@src/shared/ui/btn/big-btn/BigBtn";
import BurgerImage from "@src/shared/assets/icons/header/burger.svg"
import { Link } from 'react-router-dom';
import {BottomModal} from "@src/features/modals";
import {GlobalContext} from "@src/app/provider";
import {$allData, GetCategories} from "@src/app/manager";
import {useUnit} from "effector-react";

export const Header = () => {
  const {globalResize} = useContext(GlobalContext)!;
  const {categories} = useUnit($allData);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false)

  useEffect(() => {
    if (categories.length != 0) {
      GetCategories().finally();
    }
  }, []);

  return (
    <header className={HeaderStyle.container_static}>
      <div className={HeaderStyle.container_fixed}>
        <Link to={'/'} className={HeaderStyle.logoImage}>
          <Logo viewBox={"0 0 179 32"}/>
        </Link>
        {globalResize.isScreenMd ?
          <div className={useClass([TextModule.p_16, HeaderStyle.navigationButtons])}>
            <MainBtn state={"gray"} className={HeaderStyle.dropButton}>
              <div className={HeaderStyle.dropButtonContent}>
                Все курсы
                <div className={HeaderStyle.dropCaretImg}>
                  <CaretDown/>
                </div>
              </div>
              <div className={HeaderStyle.dropdownWrapper}>
                <div className={HeaderStyle.dropdownContainer}>
                  {categories.map((category) =>
                    <BigBtn to={`/catalog/${category.ID}`} state={"gray"} className={useClass([TextModule.p_16, HeaderStyle.bigButton])}>{category.Name}</BigBtn>
                  )}
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
      {!globalResize.isScreenMd &&
        <BottomModal isOpen={isBurgerOpen} setIsOpen={setIsBurgerOpen}>
          <div className={HeaderStyle.burgerCatalog}>
            {categories.map((category) =>
              <BigBtn to={`/catalog/${category.ID}`} state={"gray"} className={useClass([TextModule.p_16, HeaderStyle.bigButton])}>{category.Name}</BigBtn>
            )}
          </div>
          <div className={HeaderStyle.burgerAdditional}>
            <BigBtn to={'/'} state={"black"} className={useClass([TextModule.p_16, HeaderStyle.bigButton])}>Войти</BigBtn>
          </div>
        </BottomModal>
      }
    </header>
  );
};