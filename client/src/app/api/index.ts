import axios from "axios";
import {$token} from "@src/app/manager";

// https://a27507-8a9e.c.d-f.pw/api/
// http://127.0.0.1:8080/api/

export const instance = axios.create({
  baseURL: "http://127.0.0.1:8080/api/",
  timeout: 5000
})

export const authInstance = axios.create({
  baseURL: "http://127.0.0.1:8080/api/",
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