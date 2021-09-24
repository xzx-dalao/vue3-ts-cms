import XZXRequest from '../../index'
import { IDataType } from './types'
export function getPageListData(url: string, queryInfo: any) {
  return XZXRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// url: /users/id
export function deletePageData(url: string) {
  return XZXRequest.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return XZXRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return XZXRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
