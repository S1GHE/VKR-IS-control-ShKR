import {Route, Routes} from "react-router-dom";
import {FC} from "react";
import {AdminLayout, ClientLayout} from "@src/widgets/layout";
import {AdminRoutes, ClientRoutesPublic} from "@src/app/route/paths";
import {PrivateRoute} from "@src/app/route/private/PrivateRoute";
import {LoginAdmin} from "@src/pages/admin/public/LoginAdmin";

export const RouterApp:FC = () => {
  return (
    <Routes>
     <Route path={"/"} element={<ClientLayout/>}>
       {ClientRoutesPublic.map(
           (el) => <Route path={el.to} element={el.element} key={el.to}/>
         )}
     </Route>

      <Route element={<PrivateRoute/>}>
        {AdminRoutes.map(
          (el) => <Route path={el.to} element={el.element} key={el.to}/>
        )}
      </Route>

      <Route path={"*"} element={<div>page not found</div>}/>
      <Route path={"/admin"} element={<LoginAdmin/>}/>
    </Routes>
  );
};