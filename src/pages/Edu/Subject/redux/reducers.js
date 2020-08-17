import { GET_SUBJECT_LIST } from './constants'

const initSubjectList = {
  total: 0, // 总数
  items: [] // 课程分类数据
}

export default function subjectList(prevState = initSubjectList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST:
      return action.data
    default:
      return prevState
  }
}
