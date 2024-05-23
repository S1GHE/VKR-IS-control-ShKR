import {Outlet} from "react-router"

export const AdminLayout = () => {
  return (
    <>
      <header>
        Admin
      </header>

      <main>
        <Outlet/>
      </main>
    </>
  );
};
