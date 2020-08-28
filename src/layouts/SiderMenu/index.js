import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
import { connect } from 'react-redux'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  GlobalOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'

//导入所有字体图标对象
import icons from '@conf/icons'

//导入defaultRoutes
import { defaultRoutes } from '@conf/routes'

const { SubMenu } = Menu

@connect(state => ({ permissionList: state.user.permissionList }))
class SiderMenu extends Component {
  // 作用: 根据数据渲染menu
  // 数据是谁: routes.js里面的defaultRoutes, redux里面的permissionList
  renderMenu = routes => {
    // 注意: map方法执行完毕之后得到根据数据生成的结构.这个结构要在renderMenu函数外面使用.所以要记得返回出去
    return routes.map(route => {
      // 1. 判断数据的hidden是否是true,如果是true就不渲染, 是false才渲染
      if (route.hidden) return

      // 获取当前数据对应的字体图标
      const Icon = icons[route.icon]
      // 2. 判断当前数据有没有二级菜单
      // 如何判断数据有没有二级菜单: 数据有没有children属性并且children的长度是否大于0
      if (route.children && route.children.length) {
        // 有二级
        return (
          <SubMenu key={route.path} icon={<Icon />} title={route.name}>
            {route.children.map(SecItem => {
              if (SecItem.hidden) return null
              return <Menu.Item key={SecItem.path}>{SecItem.name}</Menu.Item>
            })}
          </SubMenu>
        )
      } else {
        // 只有一级
        return (
          <Menu.Item key={route.path} icon={<Icon />}>
            {route.name}
          </Menu.Item>
        )
      }
    })
  }
  render() {
    return (
      <div>
        <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
          {this.renderMenu(defaultRoutes)}
          {this.renderMenu(this.props.permissionList)}
          {/* 如果Menu.Item直接被Menu包裹. 那么表示只有一级  */}
          {/* <Menu.Item key='1' icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key='2' icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item> */}
          {/* 如果Menu.Item 被SubMenu 包裹,说明有一级也有二级 */}
          {/* <SubMenu key='sub1' icon={<UserOutlined />} title='User'>
            <Menu.Item key='3'>Tom</Menu.Item>
            <Menu.Item key='4'>Bill</Menu.Item>
            <Menu.Item key='5'>Alex</Menu.Item>
          </SubMenu>
          <SubMenu key='sub2' icon={<TeamOutlined />} title='Team'>
            <Menu.Item key='6'>Team 1</Menu.Item>
            <Menu.Item key='8'>Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key='9' icon={<FileOutlined />} /> */}
        </Menu>
      </div>
    )
  }
}

export default SiderMenu
