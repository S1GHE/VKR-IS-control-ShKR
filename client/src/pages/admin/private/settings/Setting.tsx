import cls from "@src/pages/admin/private/settings/settings.module.scss";
import { ContainerModule, TextModule } from "@src/shared/scss";
import { IMainBaseInput } from "@src/shared/types";
import { useInput } from "@src/shared/hooks";
import { regUsername } from "@src/shared/constants";
import { BaseInput, InputValid } from "@src/shared/ui/input";
import React, { useState } from "react";
import { MainBtn } from "@src/shared/ui/btn/main-btn/MainBtn";
import { Categories } from "@src/entities/categories";

export const Setting = () => {
  const inputs: IMainBaseInput[] = [
    {
      input: {
        tag: 'Name',
        label: "Название курса",
        errText: "Некорректно",
        type: "text",
        successText: 'Готово',
      },
      validators: useInput(
        "", { isEmpty: true, regExp: regUsername }
      )
    },
    {
      input: {
        tag: "Description",
        label: "Описание курса",
        errText: "Некорректно",
        type: "text",
        successText: 'Готово',
      },
      validators: useInput(
        "", { isEmpty: true, regExp: regUsername }
      )
    },
    {
      input: {
        tag: "Duration",
        label: "Длительность курса",
        errText: "Некорректно",
        type: "text",
        successText: 'Готово',
      },
      validators: useInput('', {
        isEmpty: true, regExp: regUsername
      }),
    },
    {
      input: {
        tag: "Price",
        label: "Цена курса",
        errText: "Некорректно",
        placeholder: "Указывать в рублях",
        type: "text",
        successText: 'Готово',
      },
      validators: useInput('', {
        isEmpty: true, regExp: regUsername
      }),
    },
    {
      input: {
        tag: "Category",
        label: "Категория курса",
        errText: "Некорректно",
        placeholder: "ID Категории",
        type: "text",
        successText: 'Готово',
      },
      validators: useInput('', {
        isEmpty: true, regExp: regUsername
      }),
    },
  ];

  const moduleInputs: IMainBaseInput[] = [
    {
      input: {
        tag: 'ModuleName',
        label: "Название модуля",
        errText: "Некорректно",
        type: "text",
        successText: 'Готово',
      },
      validators: useInput(
        "", { isEmpty: true, regExp: regUsername }
      )
    },
    {
      input: {
        tag: 'ModuleDuration',
        label: "Длительность модуля",
        errText: "Некорректно",
        type: "text",
        successText: 'Готово',
      },
      validators: useInput(
        "", { isEmpty: true, regExp: regUsername }
      )
    },
    {
      input: {
        tag: 'ModuleCourseId',
        label: "ID курса",
        errText: "Некорректно",
        type: "text",
        successText: 'Готово',
      },
      validators: useInput(
        "", { isEmpty: true, regExp: regUsername }
      )
    },
  ];

  const addNewCategories: IMainBaseInput[] = [
    {
      input: {
        tag: 'CategoryName',
        label: "Название курса",
        errText: "Некорректно",
        type: "text",
        successText: 'Готово',
      },
      validators: useInput(
        "", { isEmpty: true, regExp: regUsername }
      )
    },
    {
      input: {
        tag: 'CategoryDescription',
        label: "Описание курса",
        errText: "Некорректно",
        type: "text",
        successText: 'Готово',
      },
      validators: useInput(
        "", { isEmpty: true, regExp: regUsername }
      )
    },
  ];

  const [image, setImage] = useState<File | null>(null);

  const handleCategoriesSubmit = () => {

    const formData = new FormData();
    formData.append("nameCategories", addNewCategories[0].validators.value);
    formData.append("description", addNewCategories[1].validators.value);
    if (image) {
      formData.append("image", image);
    }

    console.log("Submitting form with data:", formData);

    Categories.postCategories(formData)
      .then(res => {
        console.log("Response received:", res);
      })
      .catch(err => {
        console.error('Error uploading data:', err);
      });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log("File selected:", event.target.files[0]);
      setImage(event.target.files[0]);
    }
  };

  return (
    <section className={ContainerModule.wrapper}>
      <div className={cls.text_header}>
        <h2 className={TextModule.h_32}>Настройка курсов</h2>
      </div>

      <form className={cls.flex_add}>
        <div className={cls.add_course}>
          <p className={TextModule.h_24}>Добавить курс</p>

          {inputs.map((el, index) =>
            <div className={cls.input} key={`${el.input.tag}-${index}`}>
              <InputValid validators={el.validators}
                          label={el.input.label}
                          errText={el.input.errText}
                          successText={el.input.successText}
              >
                <BaseInput
                  {...el.input} {...el.validators}
                />
              </InputValid>
            </div>
          )}
          <input type="file" onChange={handleFileChange} />

          <MainBtn state="green" onClick={() => console.log(inputs)}>Добавить курс</MainBtn>
        </div>

        <div className={cls.add_course}>
          <p className={TextModule.h_24}>Добавить модуль к курсу</p>

          {moduleInputs.map((el, index) =>
            <div className={cls.input} key={`${el.input.tag}-${index}`}>
              <InputValid validators={el.validators}
                          label={el.input.label}
                          errText={el.input.errText}
                          successText={el.input.successText}
              >
                <BaseInput
                  {...el.input} {...el.validators}
                />
              </InputValid>
            </div>
          )}

          <MainBtn state="green">Добавить модуль</MainBtn>
        </div>

        <form className={cls.add_course} onSubmit={handleCategoriesSubmit}>
          <p className={TextModule.h_24}>Добавить новую категорию</p>

          {addNewCategories.map((el, index) =>
            <div className={cls.input} key={`${el.input.tag}-${index}`}>
              <InputValid validators={el.validators}
                          label={el.input.label}
                          errText={el.input.errText}
                          successText={el.input.successText}
              >
                <BaseInput
                  {...el.input} {...el.validators}
                />
              </InputValid>
            </div>
          )}

          <input type="file" onChange={handleFileChange} />

          <MainBtn onClick={handleCategoriesSubmit} state="green">Добавить категорию</MainBtn>
        </form>
      </form>
    </section>
  );
};
