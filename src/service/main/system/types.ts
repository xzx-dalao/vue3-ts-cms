export interface ISystemType<T = any> {
  pageName: string
  queryInfo: T
}

export interface queryInfoType {
  offset?: number
  size?: number
}

export interface IDataType<T = any> {
  code: number
  data: T
}
