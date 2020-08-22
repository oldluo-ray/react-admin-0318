import {
  GET_ALL_COURSE,
  GET_CHAPTER_LIST,
  GET_LESSON_LIST,
  REMOVE_CHAPTERS,
  REMOVE_LESSONS
} from './constants'
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

    case REMOVE_CHAPTERS:
      // 1. 获取章节列表
      const chapterList = [...prevState.chapterList]
      // 2. 获取要删除的章节的id
      const delChapterIds = action.data

      // 3. 遍历chapterList,过滤数据
      const newChapters = chapterList.filter(item => {
        if (delChapterIds.indexOf(item._id) > -1) {
          return false
        }
        return true
      })

      return {
        ...prevState,
        chapterList: newChapters
      }

    case REMOVE_LESSONS:
      // 注意: 因为lesson数据是存储在chapter数据的chilren属性上面,而且无法知道要删除的是哪个章节的课时,所以需要将所有章节遍历,遍历的过程中,还要遍历章节的所有课时
      // 1. 获取章节列表
      const chapterLists = [...prevState.chapterList]
      // 2. 获取要删除的课时的id
      const delLessonIds = action.data
      // 3. 遍历章节
      chapterLists.forEach(item => {
        // 过滤章节的课时数据,然后重新赋值给children属性
        item.children = item.children.filter(lessonItem => {
          if (delLessonIds.indexOf(lessonItem._id) > -1) {
            return false
          }
          return true
        })
      })

      return {
        ...prevState,
        chapterList: chapterLists
      }
    default:
      return prevState
  }
}
