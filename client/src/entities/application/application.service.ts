import {AxiosResponse} from "axios";
import {instance} from "@src/app/api";

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

export class ApplicationService{
  static async get(): Promise<AxiosResponse<TGetApplicationRespnse>>{
    return await instance.get("/application/")
  }
}