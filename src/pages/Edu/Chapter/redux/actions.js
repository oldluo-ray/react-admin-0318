import { reqGetAllCourse } from '@api/edu/course'
import { reqGetChapterList, reqBatchRemoveChapterList } from '@api/edu/chapter'
import { reqGetLessonList, reqBatchRemoveLessonList } from '@api/edu/lesson'
import {
  GET_ALL_COURSE,
  GET_CHAPTER_LIST,
  GET_LESSON_LIST,
  REMOVE_LESSONS,
  REMOVE_CHAPTERS
} from './constants'

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

// 获取课时列表
// 同步action
function getLessonListSync(data) {
  return { type: GET_LESSON_LIST, data }
}

export function getLessonList(chapterId) {
  return dispatch => {
    reqGetLessonList(chapterId).then(res => {
      dispatch(getLessonListSync({ res, chapterId }))
    })
  }
}

// 批量删除课时
// 同步action
function delLessonListSync(data) {
  return { type: REMOVE_LESSONS, data }
}

export function delLessonList(lessonIds) {
  return dispatch => {
    return reqBatchRemoveLessonList(lessonIds).then(res => {
      dispatch(delLessonListSync(lessonIds))
    })
  }
}

// 批量删除章节
// 同步action
function delChapterListSync(data) {
  return { type: REMOVE_CHAPTERS, data }
}

export function delChapterList(chapterIds) {
  return dispatch => {
    return reqBatchRemoveChapterList(chapterIds).then(res => {
      dispatch(delChapterListSync(chapterIds))
    })
  }
}
