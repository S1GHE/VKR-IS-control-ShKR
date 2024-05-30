import {useParams} from "react-router-dom";
import {LinkCategories} from "@src/shared/ui/link";
import {TextModule} from "@src/shared/scss";
import cls from "@src/pages/client/public/catalog/catalog.module.scss";
import {useUnit} from "effector-react";
import {$allData, GetCategories} from "@src/app/manager";
import {useEffect} from "react";

export const Catalog = () => {
  const {id} = useParams();
  const {categories} = useUnit($allData);

  useEffect(() => {
    GetCategories().finally()
  }, [categories])

  return (
    <div>
      <div className={cls.header_list}>
        {
          categories.map((el) => <LinkCategories to={`/catalog/${el.ID}`} key={el.ID}>
            <p className={TextModule.p_16}>{el.Name}</p>
          </LinkCategories>)
        }
      </div>
      {id}
    </div>
  );
};