import { reqGetAllCourse } from '@api/edu/course'
import { reqGetChapterList } from '@api/edu/chapter'
import { GET_ALL_COURSE, GET_CHAPTER_LIST } from './constants'

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

// 获取所有章节列表的action
// 同步action
function getChapterListSync(data) {
  // console.log(data)
  return { type: GET_CHAPTER_LIST, data }
}

// 异步action
export function getChapterList(courseId) {
  return dispatch => {
    // 发送异步请求
    return reqGetChapterList(courseId).then(res => {
      // console.log(res)
      dispatch(getChapterListSync(res))
    })
  }
}
