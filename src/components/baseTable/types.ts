export interface ITableItemList {
  prop?: string
  label: string
  minWidth: string
  slotName?: string
}

export interface ITableContentType {
  propList: ITableItemList[]
  showSelectColumn?: boolean
  showIndexColumn?: boolean
  title?: string
}
