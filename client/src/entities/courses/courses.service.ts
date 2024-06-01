import { instance } from "@src/app/api";
import { AxiosResponse } from "axios";

export type TCourses = {
    ID: string;
    CourseName: string;
    CourseDescription: string;
    CourseDurations: string;
    CoursePrice: number;
    ImgUrl: string;
    CategoriesID: string;
}

export type TCorsesDesc = {
    ID: string;
    Name: string;
    Duration: string;
    CourseID: string;
}

export type TGetCoursesResponse = {
    courses: Array<TCourses>;
    status: number;
}

export type TGetCoursesDescResponse = {
    courses: Array<TCorsesDesc>;
    status: number;
}


export class Courses{
    static async getCourses(CategoriesId: string): Promise<AxiosResponse<TGetCoursesResponse>>{
        return await instance.get(`courses/${CategoriesId}`)
    }

    static async getCoursesDesc(CoursesID: string): Promise<AxiosResponse<TGetCoursesDescResponse>>{
        return await instance.get(`courses/desc/${CoursesID}`)
    }
}