import React, { Component } from 'react'
import { getUserInfo, getUserMenu } from './redux'

import { connect } from 'react-redux'

@connect(
  state => ({ user: state.user }),
  { getUserInfo, getUserMenu }
)
class Authorized extends Component {
  async componentDidMount() {
    // 发送请求,获取用户信息和用户菜单数据

    await Promise.all([this.props.getUserInfo(), this.props.getUserMenu()])
  }

  render() {
    return this.props.render(this.props.user)
  }
}

export default Authorized
