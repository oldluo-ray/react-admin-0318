import { GET_USER_INFO, GET_USER_MENU } from './constants'
const initUser = {
  name: '', // 当前用户用户名
  avatar: '', // 当前用户头像
  permissionValueList: [], // 当前用户按钮权限的数组
  permissionList: [] // 当前用户路由权限的数组
}
export default function user(prevState = initUser, action) {
  switch (action.type) {
    case GET_USER_INFO:
      console.log('用户信息', action.data)
      return {
        ...prevState,
        ...action.data
      }
    case GET_USER_MENU:
      console.log('用户菜单', action.data)
      return {
        ...prevState,
        ...action.data
      }
    default:
      return prevState
  }
}
