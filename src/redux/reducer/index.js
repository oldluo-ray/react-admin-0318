import { combineReducers } from 'redux'

import loading from './loading'
import token from './login'

import user from '@comps/Authorized/redux/reducer.js'
import { userList } from '@pages/Acl/User/redux'
import { roleList } from '@pages/Acl/Role/redux'
import { menuList } from '@pages/Acl/Permission/redux'
import { subjectList } from '@pages/Edu/Subject/redux'
import { chapterList } from '@pages/Edu/Chapter/redux'
import { courseList } from '@pages/Edu/Course/redux'
import intl from './intl'

console.log(user)
export default combineReducers({
  loading,
  user,
  token,
  userList,
  roleList,
  menuList,
  subjectList,
  chapterList,
  courseList,
  intl
})
