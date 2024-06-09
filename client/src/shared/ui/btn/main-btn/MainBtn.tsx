import {FC} from "react";
import {IMainBtnType} from "@src/shared/ui/btn/main-btn/MainBtnType";
import {useClass} from "@src/shared/hooks";
import classes from "@src/shared/ui/btn/main-btn/mainBtn.module.scss";
import {Link} from "react-router-dom";

export const MainBtn: FC<IMainBtnType> = (props) => {
  const {
    state = "white",
    disabled = false,
    children,
    className,
    onClick,
    to,
    type
  } = props;

  return (
    <>
      {
        to ?
          <Link className={
            useClass([
              className, classes.main_btn, classes[state]
            ])} onClick={onClick} to={to}>
            {children}
          </Link>
          :
          <button type={type} className={
            useClass([
              className, classes.main_btn, classes[state]
            ])} onClick={onClick} disabled={disabled}>
            {children}
          </button>
      }
    </>
  );
};
