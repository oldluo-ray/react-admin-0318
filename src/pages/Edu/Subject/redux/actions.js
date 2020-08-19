import {
  reqGetSubject,
  reqGetSecSubject,
  reqUpdateSubject,
  reqDelSubject
} from '@api/edu/subject'

import {
  GET_SUBJECT_LIST,
  GET_SEC_SUBJECT_LIST,
  UPDATE_SUBJECT,
  DELETE_SUBJECT
} from './constants'
/**
 * 获取一级课程分类
 */
const getSubjectListSync = list => ({
  type: GET_SUBJECT_LIST,
  data: list
})

export const getSubjectList = (page, limit) => {
  return dispatch => {
    return reqGetSubject(page, limit).then(response => {
      dispatch(getSubjectListSync(response))
      return response.total
    })
  }
}

// 获取二级课程分类
const getSecSubjectListSync = list => ({
  type: GET_SEC_SUBJECT_LIST,
  data: list
})

export const getSecSubjectList = parentId => {
  return dispatch => {
    return reqGetSecSubject(parentId).then(response => {
      dispatch(getSecSubjectListSync(response))
      return response.total
    })
  }
}

// 更新课程分类数据同步action
//data = {
//   id:
//   title:
// }
const updateSubjectListSync = data => ({
  type: UPDATE_SUBJECT,
  data
})

export const updateSubjectList = (id, title) => {
  return dispatch => {
    // 这里写return 是为了返回promise
    return reqUpdateSubject(id, title).then(response => {
      //注意: 这个异步action两个作用:
      // 1. 在这里发送异步请求,更新后台的数据
      // 2. 要让reducer执行一次,修改redux里面的数据
      dispatch(updateSubjectListSync({ id, title }))
      // 这个return 是为了让异步action调用之后可以拿到一个返回值
      return 123
    })
  }
}

// 删除课程分类数据同步action

const delSubjectListSync = data => ({
  type: DELETE_SUBJECT,
  data
})

export const delSubjectList = id => {
  return dispatch => {
    // 这里写return 是为了返回promise
    return reqDelSubject(id).then(response => {
      //注意: 这个异步action两个作用:
      // 1. 在这里发送异步请求,更新后台的数据
      // 2. 要让reducer执行一次,修改redux里面的数据
      dispatch(delSubjectListSync(id))
      // 这个return 是为了让异步action调用之后可以拿到一个返回值
      return 123
    })
  }
}
