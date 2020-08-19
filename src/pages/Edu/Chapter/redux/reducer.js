import { GET_ALL_COURSE } from './constants'
const initChapter = {
  allCourseList: [] // 存储所有课程列表
}
export default function chapterList(prevState = initChapter, action) {
  switch (action.type) {
    case GET_ALL_COURSE:
      // action.data
      return {
        ...prevState,
        allCourseList: action.data
      }
    default:
      return prevState
  }
}
