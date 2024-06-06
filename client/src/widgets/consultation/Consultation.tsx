import React, {useState} from 'react';
import cls from "@src/widgets/consultation/Consultation.module.scss"
import {useClass, useInput} from "@src/shared/hooks";
import {IMainBaseInput} from "@src/shared/types";
import {regEmail, regName, regPhone} from "@src/shared/constants";
import {BaseInput, Checkbox, InputValid} from "@src/shared/ui/input";
import {BigBtn} from "@src/shared/ui/btn/big-btn/BigBtn";
import {TextModule} from "@src/shared/scss";

export const Consultation = () => {
  const [isAgree, setIsAgree] = useState(false)

  const inputs: IMainBaseInput[] = [
    {
      input: {
        tag: 'firstName',
        label: "Имя",
        errText: "Некорректно",
        type: "text",
        successText: 'Готово',
      },
      validators: useInput(
        "", {isEmpty: true, regExp: regName}
      )
    },
    {
      input: {
        tag: "phone",
        label: "Телефон",
        errText: "Некорректно",
        type: "text",
        successText: 'Готово',
      },
      validators: useInput(
        "", {isEmpty: true, regExp: regPhone}
      )
    },
    {
      input: {
        tag: "email",
        label: "Эл. адрес",
        errText: "Некорректно",
        placeholder: "example@gmail.com",
        type: "email",
        successText: 'Готово',
      },
      validators: useInput('', {
        isEmpty: true, regExp: regEmail
      }),
    }
  ]

  return (
    <div id="consultation" className={cls.container}>
      <div className={cls.flexContainer}>
        <div className={cls.inputs}>
          <div className={useClass([TextModule.h_32, cls.consultationHeader])}>
            Все еще не с нами?
            Запишитесь на консультацию!
          </div>
          {
            inputs.map((el, index) =>
              <div className={cls.input} key={el.input.tag}>
                <InputValid validators={el.validators}
                            key={index}
                            label={el.input.label && el.input.label}
                            errText={el.input.errText && el.input.errText}
                            successText={el.input.successText && el.input.successText}
                >
                  <BaseInput
                    {...el.input} {...el.validators}
                  />
                </InputValid>
              </div>
            )}
          <div className={useClass([cls.agreement, TextModule.p_12_white])}>
            <div><Checkbox variety={"blue"} checkValue={isAgree} setCheckValue={setIsAgree}/></div>
            <p className={TextModule.p_14}>
              Даю свое согласие на обработку указаных мной персональных данных.
              <a className={cls.link}>
                Политики конфиденциальности
              </a> в целях обработки заявки и обратной связи по ней.
            </p>
          </div>
          <BigBtn className={TextModule.p_16} state={"white"}>
            Спросить
          </BigBtn>
        </div>
      </div>
    </div>
  );
};
