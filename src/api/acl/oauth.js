import request from '@utils/request'

const BASE_URL = '/oauth'

// 获取手机验证码的方法
export function reqGetVerifyCode(mobile) {
  return request({
    url: `${BASE_URL}/sign_in/digits`,
    method: 'POST',
    data: {
      mobile
    }
  })
}

// 实现手机号登录
export function mobileLogin(mobile, code) {
  return request({
    url: `${BASE_URL}/mobile`,
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
