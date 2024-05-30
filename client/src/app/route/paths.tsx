import {ReactNode} from "react";
import {Catalog, CustomerAdmin, Home, MainAdmin} from "@src/pages/client";

interface IPaths {
  to: string
  element: ReactNode
}

export const ClientRoutesPublic:Array<IPaths> = [
  {to: "/", element: <Home/>},
  {to: "/catalog/:id", element: <Catalog/>}
]

export const AdminRoutes: Array<IPaths> = [
  {to: "/admin", element: <MainAdmin/>},
  {to: "/admin/customer", element: <CustomerAdmin/>}
]