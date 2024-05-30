import {createEffect} from "effector";
import {Categories} from "@src/entities/categories";

export const GetCategories = createEffect(async () => {
  const res = await Categories.getCategories();
  return res.data.categories
})