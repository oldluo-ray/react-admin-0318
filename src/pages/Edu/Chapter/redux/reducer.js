import { GET_ALL_COURSE, GET_CHAPTER_LIST, GET_LESSON_LIST } from './constants'
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
      action.data.items.forEach(item => {
        item.children = []
      })
      return {
        ...prevState,
        chapterList: action.data.items
      }

    case GET_LESSON_LIST:
      //把拿到的数据添加到章节数据的children里面
      // action.data.res 就是一个数组,数组中存储了lesson数据
      // 需要获取到章节的_id
      // action.data.chapterId 章节id
      const newChapterList = [...prevState.chapterList]
      newChapterList.forEach(item => {
        if (item._id === action.data.chapterId) {
          item.children = action.data.res
        }
      })

      return {
        ...prevState,
        chapterList: newChapterList
      }
    default:
      return prevState
  }
}
