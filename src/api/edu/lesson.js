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

// 获取上传视频token
export function reqGetUploadToken() {
  return request({
    url: '/uploadtoken',
    method: 'GET'
  })
}

// 新增课时的方法
export function addLesson({ chapterId, title, free, video }) {
  return request({
    url: `${BASE_URL}/save`,
    method: 'POST',
    data: {
      chapterId,
      title,
      free,
      video
    }
  })
}
