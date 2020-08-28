import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'
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

import { connect } from 'react-redux'

import { withRouter } from 'react-router-dom'
import SiderMenu from '../SiderMenu'

import './index.less'

import logo from '@assets/images/logo.png'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu
@withRouter
@connect(state => ({ user: state.user }))
class PrimaryLayout extends Component {
  state = {
    collapsed: false
  }

  onCollapse = collapsed => {
    console.log(collapsed)
    this.setState({ collapsed })
  }
  render() {
    // console.log(this.props.user)
    const { name, avatar, permissionList } = this.props.user

    // 获取地址栏的路径
    const pathname = this.props.location.pathname
    // /edu/subjet/list
    // /account/settings
    // /

    // 注意: 如果正则后面不加g. 那么值返回匹配到的第一个值. 如果加了g.表示全局匹配.返回所有匹配项
    const reg = /[/][a-z]*/g

    const matchArr = pathname.match(reg)

    // 拼接path路径,然后根据路径找对应名称
    const firstPath = matchArr[0]
    const SecPath = matchArr[1]
    const thirdPath = matchArr[2] || ''

    // 根据路径,找名字
    let firstName
    let SecName
    SecPath &&
      permissionList.forEach(route => {
        if (route.path === firstPath) {
          firstName = route.name

          route.children.forEach(secRoute => {
            if (secRoute.path === SecPath + thirdPath) {
              SecName = secRoute.name
            }
          })
        }
      })

    console.log(firstName, SecName)

    return (
      <Layout className='layout'>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className='logo'>
            <img src={logo} alt='' />
            {!this.state.collapsed && <h1>硅谷教育管理系统</h1>}
          </div>
          <SiderMenu></SiderMenu>
          {/* <Menu theme='dark' defaultSelectedKeys={['1']} mode='inline'>
            <Menu.Item key='1' icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key='2' icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key='sub1' icon={<UserOutlined />} title='User'>
              <Menu.Item key='3'>Tom</Menu.Item>
              <Menu.Item key='4'>Bill</Menu.Item>
              <Menu.Item key='5'>Alex</Menu.Item>
            </SubMenu>
            <SubMenu key='sub2' icon={<TeamOutlined />} title='Team'>
              <Menu.Item key='6'>Team 1</Menu.Item>
              <Menu.Item key='8'>Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key='9' icon={<FileOutlined />} />
          </Menu> */}
        </Sider>

        <Layout className='site-layout'>
          <Header className='layout-header'>
            <img src={avatar} alt='' />
            <span>{name}</span>
            <GlobalOutlined />
          </Header>
          <Content>
            <div className='layout-nav'>
              {!firstName ? (
                <div>首页</div>
              ) : (
                <Breadcrumb>
                  <Breadcrumb.Item>{firstName}</Breadcrumb.Item>
                  <Breadcrumb.Item>{SecName}</Breadcrumb.Item>
                </Breadcrumb>
              )}

              <div>{SecName}</div>
            </div>

            <div className='layout-content'>Bill is a cat.</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default PrimaryLayout
