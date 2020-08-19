import { reqGetAllCourse } from '@api/edu/course'
import { GET_ALL_COURSE } from './constants'

// 获取所有课程列表数据的action
// 同步action
function getCourseListSync(data) {
  return { type: GET_ALL_COURSE, data }
}

// 异步action
export function getCourseList() {
  return dispatch => {
    // 发送异步请求
    reqGetAllCourse().then(res => {
      // console.log(res)
      dispatch(getCourseListSync(res))
    })
  }
}
