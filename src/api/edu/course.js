// 获取所有课程列表数据

// 导入发送异步请求的request方法.项目中所有的异步请求都是调用request方法实现的
import request from '@utils/request'

const BASE_URL = '/admin/edu/course'

// 获取所有课程列表数据
export function reqGetAllCourse() {
  return request({
    url: `${BASE_URL}`,
    method: 'GET'
  })
}
