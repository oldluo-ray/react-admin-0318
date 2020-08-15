/*
  将所有组件引入模块
*/
import { lazy } from 'react'

const Admin = () => lazy(() => import('@pages/Admin'))
const User = () => lazy(() => import('@pages/Acl/User'))
const AddOrUpdateUser = () =>
  lazy(() => import('@pages/Acl/User/components/AddOrUpdateUser'))
const AssignUser = () =>
  lazy(() => import('@pages/Acl/User/components/AssignUser'))
const Role = () => lazy(() => import('@pages/Acl/Role'))
const Permission = () => lazy(() => import('@pages/Acl/Permission'))
const AssignRole = () =>
  lazy(() => import('@pages/Acl/Role/components/AssignRole'))
const AddOrUpdateRole = () =>
  lazy(() => import('@pages/Acl/Role/components/AddOrUpdateRole'))
const Chapter = () => lazy(() => import('@pages/Edu/Chapter'))
const Comment = () => lazy(() => import('@pages/Edu/Comment'))
const Course = () => lazy(() => import('@pages/Edu/Course'))
const Teacher = () => lazy(() => import('@pages/Edu/Teacher'))
const Subject = () => lazy(() => import('@pages/Edu/Subject'))
const Settings = () => lazy(() => import('@pages/User/Settings'))
const Center = () => lazy(() => import('@pages/User/Center'))
const Test = () => lazy(() => import('@pages/Edu/Test'))

export default {
  Admin,
  User,
  AddOrUpdateUser,
  AssignUser,
  Role,
  Permission,
  AssignRole,
  AddOrUpdateRole,
  Chapter,
  Comment,
  Course,
  Teacher,
  Settings,
  Center,
  Test,
  Subject
}
