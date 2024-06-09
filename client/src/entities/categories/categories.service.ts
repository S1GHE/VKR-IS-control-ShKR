import {instance} from "@src/app/api";
import {AxiosResponse} from "axios";

export type TCategories = {
  ID: string;
  Name: string;
  Description: string;
  ImageUrl: string;

}

export type TGetCategoriesResponse = {
  categories: Array<TCategories>;
  status: number;
}

export type TPostCategories={
  status: number
  msg: string
  categoriesId: string,
}

export class Categories {
  static async getCategories(): Promise<AxiosResponse<TGetCategoriesResponse>>{
    return await instance.get("categories/")
  }

  static async postCategories(formData: FormData):Promise<AxiosResponse<TPostCategories>>{
    return await instance.post("categories/", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}