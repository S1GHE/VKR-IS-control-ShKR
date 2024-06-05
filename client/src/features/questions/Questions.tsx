import cls from "@src/features/questions/Questions.module.scss";
import {TextModule} from "@src/shared/scss";
import {MainBtn} from "@src/shared/ui/btn/main-btn/MainBtn";

export const Questions = () => {
  return (
    <div className={cls.q_row}>
      <div className={cls.q_cell}>
        <h6 className={TextModule.p_16_bold}>Ефим</h6>
        <p className={TextModule.p_12}>ID: 05f478d4-b851-47a2-9dd3-9995d67135f8</p>
      </div>

      <div className={cls.q_cell}>
        <p className={TextModule.p_16}>
          2024-06-04 14:22:54
        </p>
      </div>

      <div className={cls.q_cell}>
        <p className={TextModule.p_16}>
          +7 (993) 856-62-74
        </p>
      </div>

      <div className={cls.q_cell}>
        <p className={TextModule.p_16}>
          maksim69@yandex.ru
        </p>
      </div>

      <div>
        <MainBtn state={"gray"}>
          <p className={TextModule.p_16}>
            Написать
          </p>
        </MainBtn>
      </div>
    </div>
  );
};
