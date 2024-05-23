import {Route, Routes} from "react-router-dom";
import {FC} from "react";
import {AdminLayout, ClientLayout} from "@src/widgets/layout";
import {AdminRoutes, ClientRoutesPublic} from "@src/app/route/paths";

export const RouterApp:FC = () => {
  return (
    <Routes>
     <Route path={"/"} element={<ClientLayout/>}>
       {ClientRoutesPublic.map(
           (el) => <Route path={el.to} element={el.element} key={el.to}/>
         )}
     </Route>

      <Route path={"/admin"} element={<AdminLayout/>}>
        {AdminRoutes.map(
          (el) => <Route path={el.to} element={el.element} key={el.to}/>
        )}
      </Route>

      <Route path={"*"} element={<div>page not found</div>}/>
    </Routes>
  );
};