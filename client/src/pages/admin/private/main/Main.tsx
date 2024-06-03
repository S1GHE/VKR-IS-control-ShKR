import cls from "@src/pages/admin/private/main/Main.module.scss";
import {AdminList} from "@src/widgets/admin/admin-list";

export const Main = () => {
  return (
    <section>
      Дашборды

      <div>
        <AdminList/>
      </div>
    </section>
  );
};
