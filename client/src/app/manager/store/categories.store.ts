import {createStore, combine} from "effector";
import {TCategories} from "@src/entities/categories";
import {GetCategories} from "@src/app/manager/effect/categories.effect";

const $categories = createStore<Array<TCategories>>([])
  .on(GetCategories.doneData, (_, categories) => categories)

export const $allData = combine({
  categories: $categories
})