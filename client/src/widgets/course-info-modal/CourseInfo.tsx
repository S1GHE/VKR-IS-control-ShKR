import React, {Dispatch, FC, SetStateAction} from 'react';
import {TCourses} from "@src/entities/courses";
import cls from "@src/widgets/course-info-modal/CourseInfo.module.scss"
import {RightModal} from "@src/features/modals";

interface CourseInfoProps {
  selectedCourse: TCourses,
  setSelectedCourse: Dispatch<SetStateAction<TCourses | false>>
}

export const CourseInfo:FC<CourseInfoProps> = ({selectedCourse, setSelectedCourse}) => {
  return (
    <RightModal isOpen={!!selectedCourse} setIsOpen={(state: null) => setSelectedCourse(state)}>
      {selectedCourse && selectedCourse.CourseName}
      <br/>
      <br/>
      <button onClick={() => setSelectedCourse(null)}>click here to close</button>
    </RightModal>
  );
};