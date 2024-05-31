import {FC} from "react";
import {Link} from "react-router-dom";
import {TBaseLink} from "@src/shared/ui/link";
import {useClass} from "@src/shared/hooks";
import cls from "@src/shared/ui/link/link-base/LinkBase.module.scss"

export interface ILinkBase extends TBaseLink {
  state: "green" | "gray"
}

export const LinkBase:FC<ILinkBase> = (props) => {
  const {children, to, key, state} = props;

  return (
    <Link to={to} key={key} className={useClass([
      cls.base_link, cls[state]
    ])}>
      {children}
    </Link>
  );
};
