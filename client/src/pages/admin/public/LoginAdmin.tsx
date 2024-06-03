import cls from "@src/pages/admin/public/Login.module.scss";
import {MainBtn} from "@src/shared/ui/btn/main-btn/MainBtn";
import Logo from "@src/shared/assets/icons/logo/mainLogo.svg";
import {TextModule} from "@src/shared/scss";
import {IMainBaseInput} from "@src/shared/types";
import {useInput} from "@src/shared/hooks";
import {regUsername} from "@src/shared/constants";
import {BaseInput, InputValid} from "@src/shared/ui/input";
import React from "react";
import {loginFx} from "@src/app/manager";
import { useNavigate } from 'react-router-dom';

export const LoginAdmin = () => {
  const inputs: IMainBaseInput[] = [
    {
      input: {
        tag: 'username',
        label: "Логин",
        errText: "Данное поле не может быть пустым",
        type: "text",
        successText: 'Готово',
      },
      validators: useInput(
        "", {isEmpty: true, regExp: regUsername}
      )
    },
    {
      input: {
        tag: "password",
        label: "Пароль",
        errText: "Данное поле не может быть пустым",
        type: "password",
        successText: 'Готово',
      },
      validators: useInput(
        "", {isEmpty: true, regExp: regUsername}
      )
    }
  ]

  const navigate = useNavigate();

  const handlerClick = async () => {
    if ( inputs[0].validators.value && inputs[1].validators.value ){
      try {
        await loginFx({username: inputs[0].validators.value, password: inputs[1].validators.value})
        navigate("/admin/home")
      } catch (err){
        console.error(err)
      }
    } else {
      console.error("Пуста")
    }
  }

  return (
    <main className={cls.bg_page}>
      <section className={cls.login_form}>
        <div className={cls.login_form__header}>
          <div>
            <Logo/>
          </div>

          <h2 className={TextModule.h_24_bold}>Войти в админ-панель</h2>
        </div>

        <div className={cls.login_form__input}>
          {inputs.map((el, index) => <InputValid
            key={index}
            label={el.input.label && el.input.label}
            errText={el.input.errText && el.input.errText}
            successText={el.input.successText && el.input.successText}
            validators={el.validators}>
            <BaseInput
              {...el.input} {...el.validators}
            />
          </InputValid>)}
        </div>

        <MainBtn state={"green"} onClick={handlerClick}>Войти</MainBtn>
      </section>
    </main>
  );
};
