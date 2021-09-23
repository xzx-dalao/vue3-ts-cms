import { ref } from 'vue' //pageModelRef.value!.dialogVisible = true
import PageModel from '@/components/page-model'

type CallbackFn = (item?: any) => void
export function usePageModel(newCb?: CallbackFn, editCb?: CallbackFn) {
  const defaultInfo = ref({})
  const pageModelRef = ref<InstanceType<typeof PageModel>>()
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    newCb && newCb()
  }
  const handleEditData = (item: any) => {
    // pageModelRef.value!.dialogVisible = true
    defaultInfo.value = { ...item }
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    editCb && editCb(item)
  }
  return [defaultInfo, pageModelRef, handleNewData, handleEditData]
}
