import hyRequest from '../index'
import { IAcount, ILoginResult, IDataType } from './type'

enum loginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: IAcount) {
  return hyRequest.post<IDataType<ILoginResult>>({
    url: loginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: loginAPI.LoginUserInfo + id,
    showLoading: false
  })
}
export function requestUserMenuByRoleId(id: number) {
  return hyRequest.get<IDataType>({
    url: loginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
