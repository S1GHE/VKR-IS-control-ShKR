import {useUnit} from "effector-react/effector-react.mjs";
import {$token} from "@src/app/manager/effect/adminAuth.effect";
import {MainAdmin} from "@src/pages/client";
import { Navigate } from 'react-router-dom';

export const PrivateRoute = () => {
  const token = useUnit($token)

  return token ? <MainAdmin/>: <Navigate to={"/admin"}/>
};
