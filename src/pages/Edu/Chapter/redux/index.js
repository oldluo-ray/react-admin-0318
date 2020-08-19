// 导入actions和reducer,集中暴露出去
import { getCourseList, getChapterList, getLessonList } from './actions'
import chapterList from './reducer'

export { getCourseList, chapterList, getChapterList, getLessonList }
