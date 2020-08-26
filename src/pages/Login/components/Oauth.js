import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginSuccessSync } from '@redux/actions/login'

// 这个是第三方授权登录成功之后会执行的组件, 在这个组件中,要做的事情就是
// 获取token,并且存储到本地缓存和redux里面
// 注意:这个组件是登录之前就可以访问的组件,所以不需要再菜单管理中配置.
// 但是需要在路由表中添加
@connect(
  null,
  { loginSuccessSync }
)
class Oauth extends Component {
  componentDidMount() {
    // 获取token --> 此时服务器已经获取到github用户数据，并注册了用户，返回token
    // console.log(this.props.location.search.split('='))
    const token = this.props.location.search.split('=')[1]

    // 将token存储到redux中
    this.props.loginSuccessSync({ token })

    // 将token存储到本地缓存中
    localStorage.setItem('user_token', token)

    // 跳转到首页
    this.props.history.replace('/')
  }

  render() {
    return <div>...正在授权</div>
  }
}
export default Oauth
