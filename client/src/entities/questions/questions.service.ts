import {AxiosResponse} from "axios";
import {authInstance} from "@src/app/api";


export type TQuestions = {
  ID: string;
  Name: string
  Phone: string
  Email: string
  CreatedAt: string
}

export class QuestionsService{
  static async GetAllRecord():Promise<AxiosResponse<{status: number, question: Array<TQuestions>}>>{
    return await authInstance.get("/question/")
  }
}