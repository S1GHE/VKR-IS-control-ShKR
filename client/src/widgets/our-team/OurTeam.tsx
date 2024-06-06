import React from 'react';
import {TeamCard} from "@src/features/team-card";
import cls from "@src/widgets/our-team/OurTeam.module.scss"
import {TextModule} from "@src/shared/scss";
import {useClass} from "@src/shared/hooks";
import {TeamMembers} from "@src/widgets/our-team/model/teamMembers";

export const OurTeam = () => {
  return (
    <div className={cls.container} id="ourTeam">
      <h2 className={useClass([cls.head, TextModule.h_32])}>Знакомьтесь с нашей командой специалистов</h2>
      <div className={cls.TeamCards}>
        {TeamMembers.map((member) =>
          <TeamCard
            topText={member.topText}
            bottomText={member.bottomText}
            key={member.header}
            header={member.header}
            imagePath={member.imagePath}
          />
        )}
      </div>
    </div>
  );
};