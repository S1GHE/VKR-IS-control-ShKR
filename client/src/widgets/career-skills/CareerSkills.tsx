import {useEffect, useState} from "react";
import {useUnit} from 'effector-react';
import {LinkCategories} from "@src/shared/ui/link";
import cls from "@src/widgets/career-skills/CareerSkills.module.scss";
import {TextModule} from "@src/shared/scss";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination} from 'swiper/modules';
import {$allData, GetCategories} from "@src/app/manager";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import {Loader} from "@src/features/loader";

export const CareerSkills = () => {
  const {categories} = useUnit($allData);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    GetCategories().finally(() => setIsLoaded(true))
  }, [])

  return (
    <div className={cls.container}>
      <div className={cls.wrapper}>
        <div className={cls.link_container}>
          <h1 className={TextModule.h_64}>Творческое развитие и знания</h1>

          <div className={cls.link_wrapper}>
            {
              categories.map((el) => <LinkCategories to={`/catalog/${el.ID}`} key={el.ID}>
                <p className={TextModule.p_16}>{el.Name}</p>
              </LinkCategories>)
            }
          </div>
        </div>
        {
          isLoaded ?
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{clickable: true}}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              slidesPerView={1}
              className={cls.slider}>
              {categories.map(el => <SwiperSlide key={el.ID} className={cls.slider__slide}>
                <div className={cls.slider__bg_gradient}></div>
                <div className={cls.slider__content}>
                  <h4 className={TextModule.h_32}>{el.Name}</h4>
                  <p className={TextModule.p_16}>{el.Description}</p>
                </div>
                <img className={cls.slider__img_container} src={el.ImageUrl} alt={el.Description}/>
              </SwiperSlide>)}
            </Swiper>
            : <div className={cls.load_container}><Loader/><p className={TextModule.p_14}>Загрузка...</p></div>
        }
      </div>
    </div>
  );
};