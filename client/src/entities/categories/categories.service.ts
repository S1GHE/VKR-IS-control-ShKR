import {instance} from "@src/app/api";
import {AxiosResponse} from "axios";

export type TCategories = {
  ID: string;
  Name: string;
}

export type TGetCategoriesResponse = {
  categories: Array<TCategories>;
  status: number;
}

export class Categories {
  static async getCategories(): Promise<AxiosResponse<TGetCategoriesResponse>>{
    return await instance.get("categories/")
  }
}