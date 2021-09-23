import { ILoginMoudle } from './module/login/types'
import { ISystemMoudle } from './module/main/system/types'
import { IDashboardState } from './module/main/analysis/types'
export interface IRootState {
  name: string
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}
export interface IRootWithModule {
  login: ILoginMoudle
  system: ISystemMoudle
  dashboard: IDashboardState
}
export type IStoreType = IRootState & IRootWithModule
