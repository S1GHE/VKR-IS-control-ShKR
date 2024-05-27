import {useEffect, useState} from "react";
import {TCategories, Categories} from "@src/entities/categories";
import {LinkCategories} from "@src/shared/ui/link";
import cls from "@src/widgets/career-skills/CareerSkills.module.scss";
import {TextModule} from "@src/shared/scss";
import phtoto from "@src/shared/assets/img/Su1wYFPcmT8.jpg"

export const CareerSkills = () => {
  const [categories, setCategories] = useState<Array<TCategories>>([]);

  useEffect(() => {
    Categories.getCategories().then(
      (res) => {
        setCategories(res.data.categories)
      }
    ).catch((err) => console.log(err))
  }, [])

  return (
    <div className={cls.container}>
      <div className={cls.wrapper}>
        <div className={cls.link_container}>
          <h1 className={TextModule.h_64}>Получите актуальную специальность Ильдар</h1>

          <div className={cls.link_wrapper}>
            {
              categories.map((el) => <LinkCategories to={"#"} key={el.ID}>
                <p className={TextModule.p_16}>{el.Name}</p>
              </LinkCategories>)
            }
          </div>
        </div>

        <div className={cls.slider}>
          <img src={phtoto} alt={phtoto}/>
        </div>
      </div>
    </div>
  );
};