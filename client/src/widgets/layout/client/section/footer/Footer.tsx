import React, {useEffect} from 'react';
import cls from "@src/widgets/layout/client/section/footer/Footer.module.scss"
import {TextModule} from "@src/shared/scss";
import {useClass} from "@src/shared/hooks";
import Logo from "@src/shared/assets/icons/logo/mainLogo.svg";
import VKLogo from "@src/shared/assets/icons/logo/vkLogo.svg";
import TGLogo from "@src/shared/assets/icons/logo/tgLogo.svg";
import {MainBtn} from "@src/shared/ui/btn/main-btn/MainBtn";
import {Link} from "react-router-dom";
import {useUnit} from "effector-react";
import {$allData, GetCategories} from "@src/app/manager";
import {HashLink} from "react-router-hash-link"

export const Footer = () => {
  const {categories} = useUnit($allData);

  useEffect(() => {
    if (categories.length != 0) {
      GetCategories().finally();
    }
  }, []);

  return (
    <footer className={cls.container}>
      <div className={cls.wrapper}>
        <div className={cls.header}>
          <div className={cls.header_logo}>
            <Logo viewBox={"0 0 179 32"}/>
          </div>
          <div className={cls.social}>
            <a href="#">
              <MainBtn state={"gray"} className={cls.social_logo}>
                <VKLogo/>
              </MainBtn>
            </a>
            <a href="#">
              <MainBtn state={"gray"} className={cls.social_logo}>
                <TGLogo/>
              </MainBtn>
            </a>
          </div>
        </div>
        <div className={cls.content}>
          <div className={useClass([TextModule.p_16, cls.section])}>
            <div className={TextModule.p_16_bold}>Направления</div>
            {categories.map((category) =>
              <Link to={`/catalog/${category.ID}`}>{category.Name}</Link>
            )}
          </div>
          <div className={useClass([TextModule.p_16, cls.section])}>
            <div className={TextModule.p_16_bold}>Дополнительно</div>
            <HashLink to={"/#consultation"}>Консультация</HashLink>
            <HashLink to={"/#ourTeam"}>Наша команда</HashLink>
            <HashLink to={"/#location"}>Локация</HashLink>
          </div>
        </div>
      </div>
    </footer>
  );
};
