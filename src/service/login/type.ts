export interface IAcount {
  name: string
  password: string
}
export interface ILoginResult {
  id: number
  name: string
  token: string
}

export interface IDataType<T = any> {
  code: number
  data: T
}
