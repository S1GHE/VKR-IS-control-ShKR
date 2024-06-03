import {lazy} from "react";
import {LoginAdmin} from "@src/pages/admin/public/LoginAdmin";
import {Setting} from "@src/pages/admin/private/settings/Setting";

export const HomeChunk = lazy(
  () => import("@src/pages/client/public/home/Home").then(
    m => ({default: m.Home})
  )
)

export const CatalogChunk = lazy(
  () => import("@src/pages/client/public/catalog/Catalog").then(
    m => ({default: m.Catalog})
  )
)

export const MainAdmin = lazy(
  () => import("@src/pages/admin/private/main/Main").then(
    m => ({default: m.Main})
  )
)

export const CustomerAdmin = lazy(
  () => import("@src/pages/admin/private/customer/Customer").then(
    m => ({default: m.Customer})
  )
)

export const AnalyticsChunk = lazy(
  () => import("@src/pages/admin/private/analytics/Analytics").then(
    m => ({default: m.Analytics})
  )
)

export const ApplicationChunk = lazy(
  () => import("@src/pages/admin/private/applications/Application").then(
    m => ({default: m.Application})
  )
)

export const FeedBackChunk = lazy(
  () => import("@src/pages/admin/private/feedback/Feedback").then(
    m => ({default: m.Feedback})
  )
)

export const SettingChunk = lazy(
  () => import("@src/pages/admin/private/settings/Setting").then(
    m => ({default: m.Setting})
  )
)

export {
  LoginAdmin
}