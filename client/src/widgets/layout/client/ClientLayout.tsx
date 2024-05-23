import {Outlet} from "react-router";

export const ClientLayout = () => {
  return (
    <>
      <header>
        client
      </header>

      <main>
        <Outlet/>
      </main>

      <footer>
        footer
      </footer>
    </>
  );
};