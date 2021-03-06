import { ITableContentType } from '@/components/baseTable/types'
export const contentTableConfig: ITableContentType = {
  title: '类别列表',
  propList: [
    { prop: 'name', label: '角色名称', minWidth: '120' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
