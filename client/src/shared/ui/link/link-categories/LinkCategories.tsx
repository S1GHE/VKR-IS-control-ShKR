import {FC} from "react";
import {TBaseLink} from "@src/shared/ui/link/type/LinkType";
import cls from "@src/shared/ui/link/link-categories/LinkCategories.module.scss";
import {Link, useResolvedPath, useMatch} from "react-router-dom";

export const LinkCategories: FC<TBaseLink> = (props) => {
  const {children, to, key} = props;
  const resolved = useResolvedPath(to)
  const match = useMatch({path: resolved.pathname, end: true})

  return (
    <Link to={to} key={key} className={match ? cls.link_categories__active : cls.link_categories}>
      {children}
    </Link>
  );
};