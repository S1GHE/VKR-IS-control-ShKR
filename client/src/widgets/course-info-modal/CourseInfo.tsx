import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {Courses, TCorsesDesc, TCourses} from "@src/entities/courses";
import {RightModal} from "@src/features/modals";
import cls from "@src/widgets/course-info-modal/CourseInfo.module.scss";
import {TextModule} from "@src/shared/scss";
import {MainBtn} from "@src/shared/ui/btn/main-btn/MainBtn";
import {HashLink} from "react-router-hash-link"
import {useClass} from "@src/shared/hooks";
import {PurchaseForm} from "@src/widgets/purchase-login-form";


interface CourseInfoProps {
  selectedCourse: TCourses,
  setSelectedCourse: Dispatch<SetStateAction<TCourses | false>>
}

export const CourseInfo: FC<CourseInfoProps> = ({selectedCourse, setSelectedCourse}) => {
  const [coursesDesc, setCoursesDesc] = useState<Array<TCorsesDesc>>([])
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    if (selectedCourse) {
      Courses.getCoursesDesc(selectedCourse.ID).then(
        (res) => setCoursesDesc(res.data.courses)
      )
    }
  }, [selectedCourse]);

  return (
    <RightModal isOpen={!!selectedCourse} setIsOpen={(state: null) => setSelectedCourse(state)}>
      {
        selectedCourse &&
          <div className={cls.container}>
              <div className={cls.wrapper}>
                  <div className={cls.header_modal}>
                      <h2 className={TextModule.h_32}>{selectedCourse.CourseName}</h2>
                      <button onClick={() => setSelectedCourse(null)}>
                          <div>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                   className="bi bi-x"
                                   viewBox="0 0 16 16">
                                  <path
                                      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                              </svg>
                          </div>
                      </button>
                  </div>

                  <div className={cls.hr}/>

                  <div className={cls.description_course__optional}>
                      <p className={TextModule.p_14}>Сколько стоит</p>
                      <p className={TextModule.p_14}>{selectedCourse.CoursePrice}₽</p>
                  </div>

                  <div className={cls.hr}/>

                  <div className={cls.description_course__optional}>
                      <p className={TextModule.p_14}>Сколько учиться?</p>
                      <p className={TextModule.p_14}>{selectedCourse.CourseDurations}</p>
                  </div>

                  <div className={cls.hr}/>

                  <div className={cls.description_course}>
                      <div className={cls.description_course__name}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                               className="bi bi-lightning-fill" viewBox="0 0 16 16">
                              <path
                                  d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641z"/>
                          </svg>

                          <p className={TextModule.h_24}>Что за курс?</p>
                      </div>

                      <p className={TextModule.p_14}>
                        {selectedCourse.CourseDescription}
                      </p>
                  </div>

                  <div className={cls.desc_modal}>
                    {
                      coursesDesc.map(
                        (el) => <div className={cls.desc_modal__card} key={el.ID}>
                          <p className={TextModule.p_14}>{el.Duration}</p>
                          <p className={TextModule.h_24}>{el.Name}</p>
                        </div>
                      )
                    }
                  </div>

                  <div className={cls.description_course__payment}>
                          <HashLink className={useClass([TextModule.p_14, cls.hashLink])} to={"/#consultation"}>
                      <MainBtn state={"black"} className={cls.description_course__payment__btn}>
                              Задать вопрос
                      </MainBtn>
                          </HashLink>
                      <MainBtn onClick={() => setIsFormOpen(true)} state={"green"} className={cls.description_course__payment__btn_pay}>
                          <p className={TextModule.p_14}>
                              Купить за<span className={TextModule.p_14}> {selectedCourse.CoursePrice}₽</span>
                          </p>
                      </MainBtn>
                  </div>
              </div>
          </div>
      }
      <PurchaseForm setIsOpen={setIsFormOpen} isOpen={isFormOpen}/>
    </RightModal>
  );
};