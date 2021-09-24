import XZXRequest from '../../index'
import { IDataType } from './types'
enum DashboardAPI {
  amountList = '/goods/amount/list',
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

export function getAmountList() {
  return XZXRequest.get<IDataType>({
    url: DashboardAPI.amountList
  })
}
export function getCategoryGoodsCount() {
  return XZXRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsCount
  })
}

export function getCategoryGoodsSale() {
  return XZXRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsSale
  })
}

export function getCategoryGoodsFavor() {
  return XZXRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsFavor
  })
}

export function getAddressGoodsSale() {
  return XZXRequest.get<IDataType>({
    url: DashboardAPI.addressGoodsSale
  })
}
