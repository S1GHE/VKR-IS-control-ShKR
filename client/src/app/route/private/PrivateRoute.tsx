import {useUnit} from "effector-react/effector-react.mjs";
import {$token} from "@src/app/manager/effect/adminAuth.effect";
import { Navigate, Outlet } from 'react-router-dom';
import {AdminLayout} from "@src/widgets/layout";

export const PrivateRoute = () => {
  const token = useUnit($token)

  return token ? <AdminLayout><Outlet/></AdminLayout>: <Navigate to={"/admin"}/>
};
