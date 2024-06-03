import {$allData} from "@src/app/manager/store/categories.store";
import {$token} from "@src/app/manager/effect/adminAuth.effect";

export {
  $allData, $token
}

import {GetCategories} from "@src/app/manager/effect/categories.effect";
import {loginFx, logout, setToken} from "@src/app/manager/effect/adminAuth.effect";

export {
  GetCategories, loginFx
}