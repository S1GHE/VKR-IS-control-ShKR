import {FC} from "react";
import {TBaseLink} from "@src/shared/ui/link/type/LinkType";
import cls from "@src/shared/ui/link/link-categories/LinkCategories.module.scss";
import {Link} from "react-router-dom";

export const LinkCategories: FC<TBaseLink> = (props) => {
  const {children, to, key} = props;

  return (
    <Link to={to} key={key} className={cls.link_categories}>
      {children}
    </Link>
  );
};