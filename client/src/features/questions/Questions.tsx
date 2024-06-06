import cls from "@src/features/questions/Questions.module.scss";
import {TextModule} from "@src/shared/scss";
import {MainBtn} from "@src/shared/ui/btn/main-btn/MainBtn";
import {Key, FC} from "react";

export interface IQuestions{
  ID: string;
  Name: string;
  Phone: string;
  Email: string;
  CreatedAt: string;
  key: Key
}

export const Questions:FC<IQuestions> = (props) => {
  const {
    ID, Name, Email, Phone, CreatedAt, key
  } = props;

  return (
    <div className={cls.q_row} key={key}>
      <div className={cls.q_cell__start}>
        <h6 className={TextModule.p_16_bold}>{Name}</h6>
        <p className={TextModule.p_12}>ID: {ID}</p>
      </div>

      <div className={cls.q_cell}>
        <p className={TextModule.p_16}>
          {CreatedAt}
        </p>
      </div>

      <div className={cls.q_cell}>
        <p className={TextModule.p_16}>
          {Phone}
        </p>
      </div>

      <div className={cls.q_cell}>
        <p className={TextModule.p_16}>
          {Email}
        </p>
      </div>

      <div>
        <MainBtn state={"gray"} to={`mailto:${Email}}`}>
          <p className={TextModule.p_16}>
            Написать
          </p>
        </MainBtn>
      </div>
    </div>
  );
};
