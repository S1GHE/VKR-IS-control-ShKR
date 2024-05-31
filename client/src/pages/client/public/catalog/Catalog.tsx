import { useParams } from "react-router-dom";
import { LinkBase, LinkCategories } from "@src/shared/ui/link";
import { TextModule } from "@src/shared/scss";
import cls from "@src/pages/client/public/catalog/catalog.module.scss";
import { useUnit } from "effector-react";
import { $allData, GetCategories } from "@src/app/manager";
import { useEffect, useState } from "react";
import { Courses, TCourses } from "@src/entities/courses";
import { CourseCard } from "@src/features/courses-card";
import { TCategories } from "@src/entities/categories";
import { useClass } from "@src/shared/hooks";
import { CourseInfo } from "@src/widgets/course-info-modal";
import {Loader} from "@src/features/loader";
import EmptyFallBack from "@src/shared/assets/icons/emptyFallback_image.svg";

export const Catalog = () => {
  const { id } = useParams();
  const { categories } = useUnit($allData);
  const [courses, setCourses] = useState<Array<TCourses>>([]);
  const [selectedCourse, setSelectedCourse] = useState<TCourses | null>(null);
  const [activeCategories, setActiveCategories] = useState<TCategories | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  useEffect(() => {
    GetCategories().finally();
  }, []);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      Courses.getCourses(id)
        .then((res) => {
          if (res.data.courses !== null) {
            setCourses(res.data.courses);
          } else {
            setCourses([]);
          }
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  useEffect(() => {
    if (categories.length > 0 && id) {
      const category = categories.find((el) => el.ID === id);
      setActiveCategories(category || null);
    }
  }, [categories, id]);

  return (
    <>
      <CourseInfo selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} />
      <h2 className={useClass([TextModule.h_32, cls.header_text])}>
        {activeCategories ? `Курсы «${activeCategories.Name}»` : "Загрузка..."}
      </h2>
      <div className={cls.header_list}>
        {categories.map((el) => (
          <LinkCategories to={`/catalog/${el.ID}`} key={el.ID}>
            <p className={TextModule.p_16}>{el.Name}</p>
          </LinkCategories>
        ))}
      </div>
      {isLoading ? (
        <div className={cls.not_found}><Loader/> <p className={TextModule.p_14}>Загрузка</p></div>
      ) : courses.length > 0 ? (
        <div className={cls.header_list_courses}>
          {courses.map((el) => (
            <CourseCard
              key={el.ID}
              CardInfo={el}
              NameCategories={activeCategories.Name}
              onClick={() => { setSelectedCourse(el); }}
            />
          ))}
        </div>
      ) : (
        <div className={cls.not_found}>
          <EmptyFallBack/>

          <div className={cls.not_found__text}>
            <p className={TextModule.h_24_bold}>К сожалению, у нас нет курсов по такому запросу :(</p>
            <p className={TextModule.p_14}>
              Но есть более 40 других. Пройдите бесплатную профориентацию,
              чтобы разобраться в профессиях, сравнить их и выбрать подходящий
              курс для вашего ребенка.
            </p>
          </div>
          <LinkBase state={"green"} to={"/"}>
            <p className={TextModule.p_14}>Записаться на консультацию</p>
          </LinkBase>
        </div>
      )}
    </>
  );
};