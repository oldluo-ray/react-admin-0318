// 获取所有课时

// 导入发送异步请求的request方法.项目中所有的异步请求都是调用request方法实现的
import request from '@utils/request'

const BASE_URL = '/admin/edu/lesson'

// 获取所有课程列表数据
export function reqGetLessonList(chapterId) {
  // console.log(courseId)
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: 'GET'
  })
}
