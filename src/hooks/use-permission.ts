import { useStore } from '@/store'
export function usePermission(pageName: string, handleName: string): any {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handleName}`
  // name = "coderwhy"
  // !name -> false
  // !!name -> true
  return !!permissions.find((item) => item === verifyPermission) //转为boolean值
}
