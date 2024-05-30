import {ReactNode} from "react";
import {CatalogChunk, CustomerAdmin, HomeChunk, MainAdmin} from "@src/pages/client";

interface IPaths {
  to: string
  element: ReactNode
}

export const ClientRoutesPublic:Array<IPaths> = [
  {to: "/", element: <HomeChunk/>},
  {to: "/catalog/:id", element: <CatalogChunk/>}
]

export const AdminRoutes: Array<IPaths> = [
  {to: "/admin", element: <MainAdmin/>},
  {to: "/admin/customer", element: <CustomerAdmin/>}
]