import {Questions} from "@src/features/questions";
import cls from "@src/pages/admin/private/feed/feedback.module.scss";
import {ContainerModule, TextModule} from "@src/shared/scss";
import {QuestionsService, TQuestions} from "@src/entities/questions";
import {useEffect, useState} from "react";
import {Search} from "@src/features/search";

export const Feedback = () => {
  const [questions, setQuestions] = useState<Array<TQuestions>>([]);
  const [searchEmail, setSearchEmail] = useState<string>('');
  const [searchPhone, setSearchPhone] = useState<string>('');
  const [searchName, setSearchName] = useState<string>('');
  const [filterQuestions, setFilterQuestions] = useState<Array<TQuestions>>([])

  useEffect(() => {
    if(!!searchEmail){
      setFilterQuestions(
        questions.filter((q) => q.Email.toLowerCase().includes(searchEmail.toLowerCase()))
      )
    }else {
      setFilterQuestions(questions)
    }
  }, [questions, searchEmail]);

  useEffect(() => {
    if(!!searchPhone){
      setFilterQuestions(
        questions.filter((q) => q.Phone.toLowerCase().includes(searchPhone.toLowerCase()))
      )
    }
    else {
      setFilterQuestions(questions)
    }
  }, [questions, searchPhone])

  useEffect(() => {
    if(!!searchName){
      setFilterQuestions(
        questions.filter((q) => q.Name.toLowerCase().includes(searchName.toLowerCase()))
      )
    }
    else {
      setFilterQuestions(questions)
    }
  }, [searchName, searchPhone])

  useEffect(() => {
    QuestionsService.GetAllRecord().then(
      (res) => {
        setQuestions(res.data.question)
      }
    )
  }, []);

  return (
    <section className={ContainerModule.wrapper}>
      <div className={cls.headers}>
        <h1 className={TextModule.h_32}>
          Обратная связь
        </h1>
      </div>


      <div className={cls.body}>
        <div className={cls.head}>
          <div className={cls.table_head}>
            <div className={cls.header}>
              <div className={cls.cell}>
                <p className={TextModule.p_16}>ID</p>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-person-fill" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                </svg>
              </div>

              <div className={cls.cell}>
                <p className={TextModule.p_16}>Дата</p>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-calendar" viewBox="0 0 16 16">
                  <path
                    d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                </svg>
              </div>

              <div className={cls.cell}>
                <p className={TextModule.p_16}>Номер телефона</p>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-telephone" viewBox="0 0 16 16">
                  <path
                    d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                </svg>
              </div>

              <div className={cls.cell}>
                <p className={TextModule.p_16}>Email</p>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-envelope" viewBox="0 0 16 16">
                  <path
                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                </svg>
              </div>
            </div>
          </div>

          {filterQuestions.map(el => <Questions
            ID={el.ID} Name={el.Name} Phone={el.Phone} Email={el.Email} CreatedAt={el.CreatedAt} key={el.ID}/>)}
        </div>

        <div className={cls.filters}>
          <div className={cls.filters__icons}>
            <p className={TextModule.p_16}>Фильтры</p>

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filter"
                 viewBox="0 0 16 16">
              <path
                d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
            </svg>
          </div>

          <Search searchValue={searchName} setSearchValue={setSearchName}>Поиск по Имени</Search>
          <Search searchValue={searchEmail} setSearchValue={setSearchEmail}>Поиск по Email</Search>
          <Search searchValue={searchPhone} setSearchValue={setSearchPhone}>Поиск по Номеру</Search>
        </div>
      </div>
    </section>
  );
};
