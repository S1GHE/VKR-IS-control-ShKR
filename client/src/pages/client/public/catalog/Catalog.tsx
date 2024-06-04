import {useParams} from "react-router-dom";
import {LinkBase, LinkCategories} from "@src/shared/ui/link";
import {TextModule} from "@src/shared/scss";
import cls from "@src/pages/client/public/catalog/catalog.module.scss";
import {useUnit} from "effector-react";
import {$allData, GetCategories} from "@src/app/manager";
import {useEffect, useState} from "react";
import {Courses, TCourses} from "@src/entities/courses";
import {CourseCard} from "@src/features/courses-card";
import {TCategories} from "@src/entities/categories";
import {useClass, useResize} from "@src/shared/hooks";
import {CourseInfo} from "@src/widgets/course-info-modal";
import {Loader} from "@src/features/loader";
import EmptyFallBack from "@src/shared/assets/icons/emptyFallback_image.svg";
import {MainBtn} from "@src/shared/ui/btn/main-btn/MainBtn";
import {BottomModal} from "@src/features/modals";
import {Search} from "@src/features/search";

export const Catalog = () => {
  const {id} = useParams();
  const [searchValue, setSearchValue] = useState<string>('')
  const {categories} = useUnit($allData);
  const [courses, setCourses] = useState<Array<TCourses>>([]);
  const [filteredCourses, setFilteredCourses] = useState<Array<TCourses>>([])
  const [selectedCourse, setSelectedCourse] = useState<TCourses | null>(null);
  const [activeCategories, setActiveCategories] = useState<TCategories | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bottomOpen, setBottomOpen] = useState<boolean>(false);
  const globalResize = useResize()

  useEffect(() => {
    if (!!searchValue) {
      setFilteredCourses(courses.filter((course) => course.CourseName.toLowerCase().includes(searchValue.toLowerCase())))
    } else {
      setFilteredCourses(courses)
    }
  }, [searchValue, courses])


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
            setFilteredCourses(res.data.courses.filter((course) => course.CourseName.includes(searchValue)))
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
      <CourseInfo selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse}/>
      <h2 className={useClass([TextModule.h_32, cls.header_text])}>
        {activeCategories ? `Курсы «${activeCategories.Name}»` : "Загрузка..."}
      </h2>

      {
        globalResize.isScreenMd ?
          <div className={cls.header}>
            <div className={cls.header_list}>
              {categories.map((el) => (
                <LinkCategories to={`/catalog/${el.ID}`} key={el.ID}>
                  <p className={TextModule.p_16}>{el.Name}</p>
                </LinkCategories>
              ))}
            </div>
            <Search className={cls.search} searchValue={searchValue} setSearchValue={setSearchValue}>Какой навык или курс вы ищете?</Search>
          </div>
        :
          <>
            <div className={cls.cat_container}>
              <Search className={cls.search} searchValue={searchValue} setSearchValue={setSearchValue}>Что ищете?</Search>
              <MainBtn state={"black"} onClick={() => setBottomOpen(!bottomOpen)}>
                <p className={TextModule.p_14}>
                  Направления
                </p>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-list-task" viewBox="0 0 16 16">
                  <path fill-rule="evenodd"
                        d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z"/>
                  <path
                    d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z"/>
                  <path fill-rule="evenodd"
                        d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z"/>
                </svg>
              </MainBtn>
            </div>
            <BottomModal isOpen={bottomOpen} setIsOpen={setBottomOpen}>
              <div className={cls.categories_modal}>
                {categories.map((el) => (
                  <MainBtn state={"gray"} to={`/catalog/${el.ID}`} onClick={() => setBottomOpen(!bottomOpen)}
                           key={el.ID}>
                    <p className={TextModule.p_16}>{el.Name}</p>
                  </MainBtn>
                ))}
              </div>
            </BottomModal>
          </>
      }
      {isLoading ? (
        <div className={cls.not_found}><Loader/> <p className={TextModule.p_14}>Загрузка</p></div>
      ) : filteredCourses.length > 0 ? (
        <div className={cls.header_list_courses}>
          {filteredCourses.map((el) => (
            <CourseCard
              key={el.ID}
              CardInfo={el}
              NameCategories={activeCategories.Name}
              onClick={() => {
                setSelectedCourse(el);
              }}
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
          <a href={"#consultation"}>
            <LinkBase state={"green"} to={"/"}>
              <p className={TextModule.p_14}>Записаться на консультацию</p>
            </LinkBase>
          </a>
        </div>
      )}
    </>
  );
};