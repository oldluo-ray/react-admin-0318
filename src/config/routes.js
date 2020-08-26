// 1. 分包
// 注意: react脚手架中使用webpack. webpack会将所有文件打包成一个js文件. 这样会导致用户在请求页面的时候,响应时间比较长
// 所以,开发时要优化用户体验:
// 实现: 利用分包. webpack打包文件之后,就不是打包成一个js文件.而是打包成多个.这样会同时发送多个请求,每一个请求的文件体积较小.所以响应速度快
// react分包的方式: import('文件路径')

// 2. 懒加载
// import Login from '@pages/Login' 这种导入方式,会导致login文件中的内容上来先执行不遍
// 为了优化代码,提高用户体验.希望让组件,在使用的时候,才加载代码
// 实现:
// 1. 导入react
// 2. const 组件名 = React.lazy(() => import('组件路径'))
// 3. 在使用懒加载导入的组件的时候,一定要使用Suspense组件包裹懒加载的组件

/* 
	注意:fallback的组件是在加载 懒加载组件的时候执行
	<Suspense fallback={正在加载的组件}>
  <懒加载的组件 />
</Suspense> */

import React from 'react'
// import Login from '@pages/Login'
// import NotFound from '@pages/404'
// import Oauth from '@pages/Login/components/Oauth'

// 懒加载的方式
const Login = React.lazy(() => import('@pages/Login'))
const NotFound = React.lazy(() => import('@pages/404'))
const Oauth = React.lazy(() => import('@pages/Login/components/Oauth'))

//#region
/* export const asyncRoutes = [
	{
		path: "/acl",
		component: "",
		name: "权限管理",
		icon: "lock",
		redirect: "/acl/user/list",
		hidden: false,
		children: [
			{
				path: "/user",
				fullpath: "/user/list",
				component: "User",
				name: "用户管理",
				icon: "",
				redirect: "noredirect",
				children: [
					{
						path: "/add",
						component: "AddOrUpdateUser",
						name: "添加",
						icon: "",
						redirect: "noredirect",
						hidden: true,
					},
					{
						path: "/update/:id",
						component: "AddOrUpdateUser",
						name: "修改",
						icon: "",
						redirect: "noredirect",
						hidden: true,
					},
					{
						path: "",
						component: "",
						name: "删除",
						icon: "",
						redirect: "noredirect",
						hidden: true,
					},
					{
						path: "/assign/:id",
						component: "AssignUser",
						name: "分配角色",
						icon: "",
						redirect: "noredirect",
						hidden: true,
					},
				],
			},
			{
				path: "/role",
				fullpath: "/role/list",
				component: "Role",
				name: "角色管理",
				icon: "",
				redirect: "noredirect",
				hidden: false,
				children: [
					{
						path: "/assign/:id",
						component: "AssignRole",
						name: "分配角色",
						icon: "",
						redirect: "noredirect",
						hidden: true,
					},
					{
						path: "/add",
						component: "AddOrUpdateRole",
						name: "添加",
						icon: "",
						redirect: "noredirect",
						hidden: true,
					},
					{
						path: "",
						component: "",
						name: "删除",
						icon: "",
						redirect: "noredirect",
						hidden: true,
					},
					{
						path: "/update/:id",
						component: "AddOrUpdateRole",
						name: "修改",
						icon: "",
						redirect: "noredirect",
						hidden: true,
					},
				],
			},
			{
				path: "/menu/list",
				component: "Permission",
				name: "菜单管理",
				icon: "",
				redirect: "noredirect",
				hidden: false,
			},
		],
	},
	{
		path: "/edu",
		component: "",
		name: "教育管理",
		icon: "read",
		redirect: "/edu/chapter/list",
		hidden: false,
		children: [
			{
				path: "/chapter",
				fullpath: "/chapter/list",
				component: "Chapter",
				name: "章节管理",
				icon: "",
				redirect: "noredirect",
				hidden: false,
			},
			{
				path: "/comment",
				fullpath: "/comment/list",
				component: "Comment",
				name: "评论管理",
				icon: "",
				redirect: "noredirect",
				hidden: false,
			},
			{
				path: "/course",
				fullpath: "/course/list",
				component: "Course",
				name: "课程管理",
				icon: "",
				redirect: "noredirect",
				hidden: false,
			},
			{
				path: "/subject",
				fullpath: "/subject/list",
				component: "Subject",
				name: "课程分类管理",
				icon: "",
				redirect: "noredirect",
				hidden: false,
			},
			{
				path: "/teacher",
				fullpath: "/teacher/list",
				component: "Teacher",
				name: "讲师管理",
				icon: "",
				redirect: "noredirect",
				hidden: false,
			},
		],
	},
	{
		path: "/account",
		component: "",
		name: "个人管理",
		icon: "user",
		redirect: "/account/settings",
		hidden: false,
		children: [
			{
				path: "/settings",
				component: "Settings",
				name: "个人设置",
				icon: "",
				redirect: "noredirect",
				hidden: false,
			},
			{
				path: "/list",
				component: "Center",
				name: "个人中心",
				icon: "",
				redirect: "noredirect",
				hidden: false,
			},
		],
	},
]; */
//#endregion

// 常量路由
export const constantRoutes = [
  {
    path: '/login',
    component: Login,
    title: '登录'
  },
  {
    path: '/oauth',
    component: Oauth,
    title: 'git授权'
  },
  { path: '*', component: NotFound }
]

/**
 * 登录后 默认路由
 */
export const defaultRoutes = [
  // 首页
  {
    path: '/',
    component: 'Admin',
    icon: 'home',
    name: '后台管理系统'
  }
  // { path: "*", redirect: "/404", component: NotFound, hidden: true }
]
