import {Outlet} from "react-router";
import {Header, Footer} from "@src/widgets/layout/client/section";

export const ClientLayout = () => {
  return (
    <>
      <Header/>

      <main>
        <Outlet/>
      </main>

      <Footer/>
    </>
  );
};