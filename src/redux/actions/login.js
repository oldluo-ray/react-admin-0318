import { reqLogin, reqLogout } from '@api/acl/login'
import { mobileLogin } from '@api/acl/oauth'
import { LOGIN_SUCCESS, REMOVE_TOKEN } from '../constants/login'

/**
 * 登陆
 */
export const loginSuccessSync = user => ({
  type: LOGIN_SUCCESS,
  data: user
})

// 这个login是账户密码登录到login
export const login = (username, password) => {
  return dispatch => {
    return reqLogin(username, password).then(response => {
      dispatch(loginSuccessSync(response))
      // 返回token，外面才能接受
      return response.token
    })
  }
}

// 手机号登录的异步action
export const mobilelogin = (mobile, code) => {
  return dispatch => {
    return mobileLogin(mobile, code).then(response => {
      dispatch(loginSuccessSync(response))
      // 返回token，外面才能接受
      return response.token
    })
  }
}

/**
 * 删除token
 */
export const removeToken = () => ({
  type: REMOVE_TOKEN
})

/**
 * 登出
 */
export const logout = () => {
  return dispatch => {
    return reqLogout().then(() => {
      dispatch(removeToken())
    })
  }
}
