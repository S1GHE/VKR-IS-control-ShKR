import {lazy} from "react";

export const Home = lazy(
  () => import("@src/pages/client/public/home/Home").then(
    m => ({default: m.Home})
  )
)

export const Catalog = lazy(
  () => import("@src/pages/client/public/catalog/Catalog").then(
    m => ({default: m.Catalog})
  )
)

export const MainAdmin = lazy(
  () => import("@src/pages/admin/main/Main").then(
    m => ({default: m.Main})
  )
)

export const CustomerAdmin = lazy(
  () => import("@src/pages/admin/customer/Customer").then(
    m => ({default: m.Customer})
  )
)