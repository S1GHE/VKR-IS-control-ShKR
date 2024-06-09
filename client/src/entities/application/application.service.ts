import {AxiosResponse} from "axios";
import {authInstance, instance} from "@src/app/api";

export type TApplications = {
  ID: string;
  UserID: string;
  CourseID: string;
  Status: string;
  Notes: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export type TGetApplicationRespnse = {
  applications: Array<TApplications>;
  status: number;
}

export type TPutApplications = {
  msg: string,
  status: number
}

export class ApplicationService{
  static async get(): Promise<AxiosResponse<TGetApplicationRespnse>>{
    return await instance.get("/application/")
  }

  static async update(id: string, NewStatus: string): Promise<AxiosResponse<TPutApplications>>{
    return await authInstance.put("/application/", {
      ID: id,
      Status:NewStatus
    })
  }
}