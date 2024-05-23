import "@src/app/style/index.scss";
import {Suspense} from "react";
import {BrowserRouter} from "react-router-dom";
import {RouterApp} from "@src/app/route/RouterApp";
import {GlobalProvider} from "@src/app/provider";


export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GlobalProvider>
        <BrowserRouter>
          <RouterApp/>
        </BrowserRouter>
      </GlobalProvider>
    </Suspense>
  )
}
