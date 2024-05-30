import {useParams} from "react-router-dom";
import {LinkCategories} from "@src/shared/ui/link";
import {TextModule} from "@src/shared/scss";
import cls from "@src/pages/client/public/catalog/catalog.module.scss";
import {useUnit} from "effector-react";
import {$allData, GetCategories} from "@src/app/manager";
import {useEffect, useState} from "react";
import { Courses, TCourses } from "@src/entities/courses";
import { CourseCard } from "@src/features/courses-card";
import { TCategories } from "@src/entities/categories";
import { useClass } from "@src/shared/hooks";

export const Catalog = () => {
  const {id} = useParams();
  const {categories} = useUnit($allData);
  const [courses, setCourses] = useState<Array<TCourses>>([])
  const [activeCategories, setActiveCategories] = useState<TCategories | null>(null);

  useEffect(() => {
    if (id) {
      Courses.getCourses(id)
        .then((res) => {
          if (res.data.courses !== null) {
            setCourses(res.data.courses);
          } else {
            setCourses([]);
          }
        })
        .catch(err => console.log(err))
    }
  }, [id])

  useEffect(() => {
    GetCategories().finally()
  }, [categories])

  useEffect(() => {
    if (categories.length > 0 && id) {
      const category = categories.find((el) => el.ID === id);
      setActiveCategories(category || null);
    }
  }, [categories, id]);

  return (
    <div>
      <h2 className={useClass([TextModule.h_32, cls.header_text])}>
        {activeCategories ?  `Курсы "${activeCategories.Name}"` : "Загрузка..."}
      </h2>
      <div className={cls.header_list}>
        {
          categories.map((el) => <LinkCategories to={`/catalog/${el.ID}`} key={el.ID}>
            <p className={TextModule.p_16}>{el.Name}</p>
          </LinkCategories>)
        }
      </div>
        {courses.length > 0 ? (
          <div className={cls.header_list_courses}>
            {courses.map((el) => (
              <CourseCard key={el.ID} CardInfo={el} NameCategories={activeCategories.Name}/> 
            ))}
          </div>
        ) : (
          <div>упс...</div>
        )}
    </div>
  );
};