import {ReactNode} from "react";
import {
  AnalyticsChunk,
  ApplicationChunk,
  CatalogChunk,
  CustomerAdmin, FeedBackChunk,
  HomeChunk,
  MainAdmin, SettingChunk
} from "@src/pages/client";

interface IPaths {
  to: string
  element: ReactNode
}

export const ClientRoutesPublic:Array<IPaths> = [
  {to: "/", element: <HomeChunk/>},
  {to: "/catalog/:id", element: <CatalogChunk/>}
]

export const AdminRoutes: Array<IPaths> = [
  // Дашборды
  {to: "/admin/home", element: <MainAdmin/>},
  {to: "/admin/customer", element: <CustomerAdmin/>},
  // Аналитка
  {to: "/admin/analytics", element: <AnalyticsChunk/>},
  // Заявки на курсы
  {to: "/admin/application", element: <ApplicationChunk/>},
  // Обратная свзь
  {to: "/admin/feed", element: <FeedBackChunk/>},
  // Настйроки курсов
  {to: "/admin/settings", element: <SettingChunk/>}
]