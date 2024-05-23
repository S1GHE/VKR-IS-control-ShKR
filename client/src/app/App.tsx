import "@src/app/style/index.scss";
import {Suspense} from "react";
import {BrowserRouter} from "react-router-dom";
import {RouterApp} from "@src/app/route/RouterApp";


export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <RouterApp/>
      </BrowserRouter>
    </Suspense>
  )
}
