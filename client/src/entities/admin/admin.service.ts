import {AxiosResponse} from "axios";
import {instance} from "@src/app/api";

export type TAdminLogin = {
  username: string,
  password: string
}

export type TAdmin = {
  ID: string;
  UserName: string;
  Password: string;
}

export type TGetAdmin = {
  status: number;
  admin: Array<TAdmin>
}

export class Admin {
  static async login(data: TAdminLogin):Promise<AxiosResponse<{token: string}>> {
    return await instance.post("/admin/login", data)
  }

  static async get():Promise<AxiosResponse<TGetAdmin>>{
    return await instance.get("/admin")
  }
}