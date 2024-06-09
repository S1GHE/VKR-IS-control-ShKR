import {AxiosResponse} from "axios";
import {instance} from "@src/app/api";

export type TUserRegister = {
  username: string,
  email: string,
  phone: string,
  password: string,
  firstName: string,
  lastName: string
}

export type TUserLogin = {
  username: string,
  password: string
}

export class User {
  static async register(data: TUserRegister):Promise<AxiosResponse<{token: string}>> {
    return await instance.post("/user/register", data)
  }
  static async login(data: TUserLogin):Promise<AxiosResponse<{token: string}>> {
    return await instance.post("/user/login", data)
  }
}