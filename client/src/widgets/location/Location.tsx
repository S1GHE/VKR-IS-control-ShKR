import React from 'react';
import cls from "@src/widgets/location/Location.module.scss"
import {useClass} from "@src/shared/hooks";
import {TextModule} from "@src/shared/scss";

export const Location = () => {
  return (
    <div className={cls.locationContainer}>
      <div className={useClass([cls.head, TextModule.h_32])}>
        Нас не надо искать!
      </div>

      <iframe width="100%" height="600" className={cls.iframe}
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A45f2f70210467039f6328c10427b1aa298114e677a79e8eac73665924ed6e5a7&amp;width=732&amp;height=490&amp;lang=ru_RU&amp;scroll=false">
      </iframe>
    </div>
  );
};