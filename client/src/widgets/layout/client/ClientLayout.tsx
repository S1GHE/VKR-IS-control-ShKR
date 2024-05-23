import {Outlet} from "react-router";
import {Header, Footer} from "@src/widgets/layout/client/section";
import {ContainerModule} from "@src/shared/scss";

export const ClientLayout = () => {
  return (
    <>
      <Header/>

      <main className={ContainerModule.container}>
        <div className={ContainerModule.wrapper}>
          <Outlet/>
        </div>
      </main>

      <Footer/>
    </>
  );
};