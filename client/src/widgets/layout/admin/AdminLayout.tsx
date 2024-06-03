import {FC, ReactNode} from "react";
import {SlideMenu} from "@src/widgets/slide-menu/SlideMenu";
import cls from "@src/widgets/layout/admin/AdminLayout.module.scss";

export const AdminLayout:FC<{children: ReactNode}> = ({children}) => {
  return (
    <main className={cls.main}>
      <SlideMenu/>
      <section className={cls.outlet}>
        {children}
      </section>
    </main>
  );
};
