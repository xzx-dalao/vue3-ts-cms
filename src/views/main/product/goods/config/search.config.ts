import { IForm } from '@/components/baseForm/types'

export const searchFormConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '商品名称',
      placeholder: '请输入商品名称',
      rules: []
    },
    {
      field: 'address',
      type: 'input',
      label: '商品地址',
      placeholder: '请输入商品地址',
      rules: []
    },
    {
      field: 'enable',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      rules: [],
      options: [
        { title: '上架', value: 1 },
        { title: '下架', value: 0 }
      ]
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      rules: [],
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  labelWidth: '100px',
  itemLayout: { padding: '10px 40px' },
  colLayout: { span: 8 }
}
