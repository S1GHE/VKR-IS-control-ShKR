import cls from "@src/features/loader/loader.module.scss";

export const Loader = () => {
  return (
    <div className={cls.loader}>
        <div className={cls.loader__bar}></div>
        <div className={cls.loader__bar}></div>
        <div className={cls.loader__bar}></div>
        <div className={cls.loader__bar}></div>
        <div className={cls.loader__bar}></div>
        <div className={cls.loader__ball}></div>
    </div>
  )
}
