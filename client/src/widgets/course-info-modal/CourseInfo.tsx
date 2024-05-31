import React, {Dispatch, FC, SetStateAction} from 'react';
import {TCourses} from "@src/entities/courses";
import {RightModal} from "@src/features/modals";
import cls from "@src/widgets/course-info-modal/CourseInfo.module.scss";
import {TextModule} from "@src/shared/scss";

interface CourseInfoProps {
  selectedCourse: TCourses,
  setSelectedCourse: Dispatch<SetStateAction<TCourses | false>>
}

export const CourseInfo: FC<CourseInfoProps> = ({selectedCourse, setSelectedCourse}) => {
  return (
    <RightModal isOpen={!!selectedCourse} setIsOpen={(state: null) => setSelectedCourse(state)}>
      {
        selectedCourse ? <div className={cls.wrapper}>
          <div className={cls.header_modal}>
            <h2 className={TextModule.h_24}>{selectedCourse.CourseName}</h2>
            <button onClick={() => setSelectedCourse(null)}>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x"
                     viewBox="0 0 16 16">
                  <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
              </div>
            </button>
          </div>
        </div> : <div>

        </div>
      }
    </RightModal>
  );
};