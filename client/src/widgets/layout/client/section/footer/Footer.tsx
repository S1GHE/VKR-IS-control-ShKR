import React from 'react';
import cls from "@src/widgets/layout/client/section/footer/Footer.module.scss"
import {TextModule} from "@src/shared/scss";
import {useClass} from "@src/shared/hooks";
import Logo from "@src/shared/assets/icons/logo/mainLogo.svg";
import VKLogo from "@src/shared/assets/icons/logo/vkLogo.svg";
import TGLogo from "@src/shared/assets/icons/logo/tgLogo.svg";
import {MainBtn} from "@src/shared/ui/btn/main-btn/MainBtn";
import {Link} from "react-router-dom";

export const Footer = () => {
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
            <div>Звукорежиссура</div>
            <div>Фото и видеопроизводство</div>
            <div>Дизайн</div>
            <div>VR и AR</div>
          </div>
          <div className={useClass([TextModule.p_16, cls.section])}>
            <div className={TextModule.p_16_bold}>Дополнительно</div>
            <Link to={'#consultation'}>Консультация</Link>
            <div>Наша команда</div>
            <div>Локация</div>
          </div>
        </div>
      </div>
    </footer>
  );
};