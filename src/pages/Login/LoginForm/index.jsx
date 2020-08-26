import React, { Component, useState } from 'react'
import { Form, Input, Button, Checkbox, Row, Col, Tabs, message } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined
} from '@ant-design/icons'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { login, mobilelogin } from '@redux/actions/login'

import { reqGetVerifyCode } from '@api/acl/oauth'

import './index.less'

const { TabPane } = Tabs

// antd中form组件表单校验的第二种方式
// rule 就是校验规则对象, 一般不用
// value 就是表单项中的值
// 要求返回一个promise. 如果是成功的promise就校验通过,如果是失败的promise就校验不通过
const validator = (rule, value) => {
  console.log(value)
  return new Promise((resolve, reject) => {
    // 自己去实现表单校验
    // 密码是必填项
    value = value && value.trim()
    if (!value) {
      // 表示没有输入密码
      return reject('请输入密码')
    }

    // 长度大于等于4
    if (value.length < 4) {
      return reject('密码不能小于4')
    }

    // 长度不能超过16
    if (value.length > 16) {
      return reject('密码不能超过16')
    }

    // 密码的值也只能是数字,字母,下户线
    // 正则.test(字符串) 如果正则匹配成功,返回true. 否则返回false
    if (!/^[0-9a-zA-Z_]+$/.test(value)) {
      return reject('密码格式不正确')
    }

    return resolve()
  })
}

// 注意: 这行代码,如果写在组件里面,组件重新渲染的时候,这行代码会被重新执行.会影响里面的值
let tabFlag = 'user' //记录tab选中的是谁
function LoginForm(props) {
  // 注意: form要从一个数组中解构出来
  const [form] = Form.useForm()

  // 存储倒计时的值
  let [downCount, setDownCount] = useState(5)
  let [isShowBtn, setIsShowBtn] = useState(true)

  const onFinish = () => {
    console.log(1111, tabFlag)
    // 1. 先判断当前是账户密码登录还是手机号登录
    // 2. 根据判断的 结果, 手动验证对应的表单项
    // 3. 如果校验通过,根据判断,去调用对应的接口发送请求,实现登录逻辑
    if (tabFlag === 'user') {
      form.validateFields(['username', 'password']).then(res => {
        const { username, password } = res
        props.login(username, password).then(token => {
          // 登录成功
          // console.log("登陆成功~");
          // 持久存储token
          localStorage.setItem('user_token', token)
          props.history.replace('/')
        })
      })
    } else {
      form.validateFields(['phone', 'verify']).then(res => {
        const { phone, verify } = res
        props.mobilelogin(phone, verify).then(token => {
          // 登录成功
          // console.log("登陆成功~");
          // 持久存储token
          localStorage.setItem('user_token', token)
          props.history.replace('/')
        })
      })
    }

    // .catch(error => {
    //   notification.error({
    //     message: "登录失败",
    //     description: error
    //   });
    // });
  }

  //获取验证码的事件处理函数
  const getCode = () => {
    // console.log('获取验证码的事件处理函数执行了')
    // 注意: 在发送请求获取验证码之前,必须要先对手机号进行校验.
    // 校验方式有两种:
    // 1. 在这个回调函数中,开发者想办法拿到手机表单项的值,然后自己写正则,进行校验.如果通过发请求,否则不发请求
    // 2. 通过antd中提供的方式,触发antd中Form组件提供的表单校验的功能.得到校验结果,如果校验通过,就发请求,否则,不发请求
    // (使用第二种)
    // 1. 使用Form.useForm() 得到一个form实例对象
    // 2. 将form实例对象和我们写在下面的Form绑定起来 <Form form={form对象}></Form>
    // 3. 调用form.validateFields() 注意:如果函数中不传参数,会触发所有表单项的校验. 如果只触发手机号的表单校验. form.validateFields(['手机号表单项的name属性的值'])
    form.validateFields(['phone']).then(async res => {
      await reqGetVerifyCode(res.phone)
      message.success('验证码获取成功')

      // 倒计时
      const timeid = setInterval(() => {
        setDownCount(--downCount)
        console.log(downCount)
        // setDownCount(downCount - 1)
        setIsShowBtn(false)
        if (downCount <= 0) {
          // 把定时器停掉
          clearInterval(timeid)
          // 倒计时时间恢复原来的值
          // 按钮也要恢复
          setDownCount(5)
          setIsShowBtn(true)
        }
      }, 1000)

      //
    })
  }

  // 监听tab切换的事件处理函数
  const handleTabChange = key => {
    console.log(key)
    tabFlag = key
  }

  // 第三方授权登录(git)事件处理函数
  const oauthLogin = () => {
    // 浏览器给服务器发送请求,获取code
    // location.href赋值为一个url时, 会直接根据这个url发送请求. 并且只要是地址栏发的请求,肯定是get请求
    window.location.href =
      'https://github.com/login/oauth/authorize?client_id=5453f1088d7dc1cf4bd1'
  }
  return (
    <>
      <Form
        // 将form对象和Form组件绑定起来
        form={form}
        name='normal_login'
        className='login-form'
        initialValues={{ remember: true }}
        // onFinish={onFinish}
      >
        <Tabs
          defaultActiveKey='user'
          tabBarStyle={{ display: 'flex', justifyContent: 'center' }}
          // 监听tab切换
          onChange={handleTabChange}
        >
          <TabPane tab='账户密码登陆' key='user'>
            <Form.Item
              name='username'
              rules={[
                {
                  required: true,
                  message: '请输入账户'
                },
                {
                  max: 16,
                  message: '长度不能超过16个字符'
                },
                {
                  min: 4,
                  message: '长度不能低于4个字符'
                },
                {
                  // 正则: 可以输入的字符是数字,字母(大小写), 下划线
                  pattern: /^[0-9A-Za-z_]+$/,
                  message: '请输入正确的用户名'
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className='form-icon' />}
                placeholder='用户名: admin'
              />
            </Form.Item>
            <Form.Item name='password' rules={[{ validator }]}>
              <Input
                prefix={<LockOutlined className='form-icon' />}
                type='password'
                placeholder='密码: 111111'
              />
            </Form.Item>
          </TabPane>
          <TabPane tab='手机号登陆' key='phone'>
            <Form.Item
              name='phone'
              rules={[
                {
                  required: true,
                  message: '请输入手机号'
                },
                {
                  pattern: /^1[\d]{10}$/,
                  message: '请输入正确的手机号'
                }
              ]}
            >
              <Input
                prefix={<MobileOutlined className='form-icon' />}
                placeholder='手机号'
              />
            </Form.Item>

            <Row justify='space-between'>
              <Col span={16}>
                <Form.Item
                  name='verify'
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码'
                    },
                    {
                      pattern: /^[\d]{6}$/,
                      message: '只能是6位数字'
                    }
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className='form-icon' />}
                    placeholder='验证码'
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Button
                  className='verify-btn'
                  onClick={getCode}
                  disabled={isShowBtn ? false : true}
                >
                  {isShowBtn ? '获取验证码' : `${downCount}秒后发送`}
                </Button>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
        <Row justify='space-between'>
          <Col span={7}>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>自动登陆</Checkbox>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Button type='link'>忘记密码</Button>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type='primary'
            // htmlType='submit'
            className='login-form-button'
            // 注册点击事件
            onClick={onFinish}
          >
            登陆
          </Button>
        </Form.Item>
        <Form.Item>
          <Row justify='space-between'>
            <Col span={16}>
              <span>
                其他登陆方式
                <GithubOutlined className='login-icon' onClick={oauthLogin} />
                <WechatOutlined className='login-icon' />
                <QqOutlined className='login-icon' />
              </span>
            </Col>
            <Col span={3}>
              <Button type='link'>注册</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </>
  )
}

export default withRouter(
  connect(
    null,
    { login, mobilelogin }
  )(LoginForm)
)
