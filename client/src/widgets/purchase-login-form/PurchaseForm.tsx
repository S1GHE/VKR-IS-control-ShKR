import React, {FC, useEffect, useState} from 'react';
import {CentreModal} from "@src/features/modals";
import {IMainBaseInput} from "@src/shared/types";
import {useClass, useInput} from "@src/shared/hooks";
import {regEmail, regName, regPhone, regUsername} from "@src/shared/constants";
import {BaseInput, InputValid} from "@src/shared/ui/input";
import cls from "@src/widgets/purchase-login-form/PurchaseForm.module.scss"
import {TextModule} from "@src/shared/scss";
import {MainBtn} from "@src/shared/ui/btn/main-btn/MainBtn";

interface PurchaseFormProps {
  isOpen: boolean
  setIsOpen: (i: boolean) => void
}

const defaultIsValidState = {
  username: false,
  email: false,
  phone: false,
  password: false,
  firstName: false,
  lastName: false
}

export const PurchaseForm: FC<PurchaseFormProps> = (props) => {
  const {isOpen, setIsOpen} = props
  const [areInputsValid, setAreInputsValid] = useState<Record<string, boolean>>(defaultIsValidState)

  const loginInputs: IMainBaseInput[] = [
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
        tag: "email",
        label: "Почта",
        errText: "Данное поле не может быть пустым",
        type: "text",
        successText: 'Готово',
      },
      validators: useInput(
        "", {isEmpty: true, regExp: regEmail}
      )
    },
    {
      input: {
        tag: "phone",
        label: "Номер телефона",
        errText: "Данное поле не может быть пустым",
        type: "text",
        successText: 'Готово',
      },
      validators: useInput(
        "", {isEmpty: true, regExp: regPhone}
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
    },
    {
      input: {
        tag: "firstName",
        label: "Имя",
        errText: "Данное поле не может быть пустым",
        type: "text",
        successText: 'Готово',
      },
      validators: useInput(
        "", {isEmpty: true, regExp: regName}
      )
    },
    {
      input: {
        tag: "lastName",
        label: "Фамилия",
        errText: "Данное поле не может быть пустым",
        type: "text",
        successText: 'Готово',
      },
      validators: useInput(
        "", {isEmpty: true, regExp: regName}
      )
    }
  ]

  const purchaseInput = {
    input: {
      tag: "desires",
      label: "Ваши пожелания",
      errText: "Данное поле не может быть пустым",
      type: "text",
      successText: 'Готово',
    },
    validators: useInput(
      "", {isEmpty: true, regExp: /^./}
    )
  }

  useEffect(() => {
    let isValid = {}
    loginInputs.map((item) => {
      if (item.input.tag) {
        if (!item.validators.isDirty){
          isValid={...isValid, [item.input.tag]: false}
        } else if (item.validators.isDirty && !item.validators.isValid) {
          isValid={...isValid, [item.input.tag]: false}
        } else {
          isValid={...isValid, [item.input.tag]: true}
        }
      }
      setAreInputsValid(isValid)
    })
  }, [loginInputs[0].validators.value, loginInputs[1].validators.value, loginInputs[2].validators.value, loginInputs[3].validators.value,loginInputs[4].validators.value, loginInputs[5].validators.value,
    loginInputs[0].validators.isDirty, loginInputs[1].validators.isDirty, loginInputs[2].validators.isDirty, loginInputs[3].validators.isDirty, loginInputs[4].validators.isDirty, loginInputs[5].validators.isDirty,
    loginInputs[0].validators.isValid, loginInputs[1].validators.isValid, loginInputs[2].validators.isValid, loginInputs[3].validators.isValid, loginInputs[4].validators.isValid, loginInputs[5].validators.isValid]);


  return (
    <CentreModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={useClass([cls.head, TextModule.h_24])}>Регистрация</div>
      {loginInputs.map((el, index) =>
        <div className={cls.input}>
          <InputValid
            key={index}
            label={el.input.label && el.input.label}
            errText={el.input.errText && el.input.errText}
            successText={el.input.successText && el.input.successText}
            validators={el.validators}
          >
            <BaseInput
              {...el.input} {...el.validators}
            />
          </InputValid>
        </div>
      )}
      <div className={useClass([cls.head, TextModule.h_24])}>Покупка</div>
      <div className={cls.input}>
        <InputValid
          label={purchaseInput.input.label && purchaseInput.input.label}
          errText={purchaseInput.input.errText && purchaseInput.input.errText}
          successText={purchaseInput.input.successText && purchaseInput.input.successText}
          validators={purchaseInput.validators}>
          <BaseInput
            {...purchaseInput.input} {...purchaseInput.validators}
          />
        </InputValid>
      </div>
      <div className={cls.buttons}>
        <MainBtn className={TextModule.p_14} state={"black"}
                 onClick={() => setIsOpen(false)}>Назад</MainBtn>
        <MainBtn disabled={Object.values(areInputsValid).includes(false)} className={TextModule.p_14} state={"green"}>Купить</MainBtn>
      </div>
    </CentreModal>
  );
};