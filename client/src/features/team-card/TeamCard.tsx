import React, {FC} from 'react';
import cls from "@src/features/team-card/TeamCard.module.scss"
import {useClass} from "@src/shared/hooks";
import {TextModule} from "@src/shared/scss";

export interface TeamCardProps {
  header: string,
  imagePath: string,
  topText: string,
  bottomText: string
}

export const TeamCard:FC<TeamCardProps> = (props) => {
  const {header, imagePath, topText, bottomText} = props

  return (
    <div className={useClass([cls.cardContainer, TextModule.p_16])}>
      <div className={cls.topSection}>
        <div className={useClass([cls.header, TextModule.h_24])}>
          {header}
        </div>
        <div className={cls.hoverSection}>
          {topText}
        </div>
      </div>
      <div className={cls.hoverSection}>
        {bottomText}
      </div>
      <img src={imagePath} alt={""} className={cls.backgroundImage}/>
    </div>
  );
};