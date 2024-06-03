import {AxiosResponse} from "axios";
import {instance} from "@src/app/api";

export type TAdminLogin = {
  username: string,
  password: string
}

export class Admin {
  static async login(data: TAdminLogin):Promise<AxiosResponse<{token: string}>> {
    return await instance.post("/admin/login", data)
  }
}