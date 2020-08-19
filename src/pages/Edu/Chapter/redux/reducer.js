import { GET_ALL_COURSE, GET_CHAPTER_LIST } from './constants'
const initChapter = {
  allCourseList: [], // 存储所有课程列表,
  chapterList: []
}
export default function chapterList(prevState = initChapter, action) {
  switch (action.type) {
    case GET_ALL_COURSE:
      // action.data
      return {
        ...prevState,
        allCourseList: action.data
      }

    case GET_CHAPTER_LIST:
      return {
        ...prevState,
        chapterList: action.data.items
      }
    default:
      return prevState
  }
}
