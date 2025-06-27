import axios, { AxiosPromise } from "axios"

interface LoginPayload {
  user_email: string
  user_password: string
}

export function loginUser(payload: LoginPayload): AxiosPromise {
  const url = `http://127.0.0.1:8000/api/v1/users/login`
  return axios.post(url, payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
}

interface RegisterPayload {
  user_name: string
  user_email: string
  user_password: string
  user_created: string
}
export function registerUser(payload: RegisterPayload): AxiosPromise {
  const url = `http://127.0.0.1:8000/api/v1/users/register`
  return axios.post(url, payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
}
