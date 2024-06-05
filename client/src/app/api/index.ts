import axios from "axios";
import {$token} from "@src/app/manager";

export const instance = axios.create({
  baseURL: "https://a27507-8a9e.c.d-f.pw/api/",
  timeout: 5000
})

export const authInstance = axios.create({
  baseURL: "https://a27507-8a9e.c.d-f.pw/api/",
  timeout: 5000
})

export const getToken = (): string | null => {
  return $token.getState()
}
authInstance.interceptors.request.use(
  config => {
    const token = getToken()

    if (token){
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(token)

    return config
  },
  error => {
    return Promise.reject(error)
  }
)