import React, { Component } from 'react'
import { Card, Form, Input, Select, Button, Divider, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { reqGetSubject, reqAddSubject } from '@api/edu/subject'

//表单布局属性
const layout = {
  // antd把一个宽度分为24份
  // 表单文字描述部分
  labelCol: {
    span: 3
  },
  // 表单项部分
  wrapperCol: {
    span: 6
  }
}
export default class AddSubject extends Component {
  page = 1 // 存储要获取第几页 (页数)
  state = {
    total: 0,
    items: []
  }
  async componentDidMount() {
    // 以上来就获取一级课程分类数据(请求的是分页数据,不是所有数据)
    // 并且第二页数据要拼接在第一页数据后面,不是原来redux逻辑中,第二页数据覆盖第一页
    // 所以这里不需要操作redux
    // 直接调用发送异步请求的函数,将数据存储到当前组件的状态中
    // reqGetSubject返回的是一个promise对象,所以直接配合await和async可以直接获取到数据
    // this.page++ ,加加在你后面,先将1赋值给函数, 然后page的值加一, 变成了2
    const res = await reqGetSubject(this.page++, 10)

    // console.log(res)
    /**
     * {
     *  total:值,
     *  items: 值
     * }
     */
    // this.setState({
    //   total: res.total,
    //   items: res.items
    // })
    this.setState(res)
  }

  // 点击加载更多数据,去获取一级课程分类的数据
  handleGetSubject = async () => {
    // 注意: 请求第2,3,4...页的逻辑都是执行这个事件处理函数,所以需要知道到底要请求第几页数据
    // 解决: 定义一个变量,去存储当前要请求的数据的页数
    // 因为当前使用的是类组件,最好存到类组件实例的身上
    const res = await reqGetSubject(this.page++, 10)
    // 这里拿到的数据是第2,3,4.. 页的数据,需要新的数据和原来的数据拼接起来
    const newItems = [...this.state.items, ...res.items]

    this.setState({
      items: newItems
    })
  }

  // 点击提交按钮,表单校验通过会触发的回调函数
  onFinish = async values => {
    // 给后台发送请求
    // console.log(values)
    await reqAddSubject(values.subjectname, values.parentid)
    message.success('添加课程分类成功')
    // console.log('请求成功了')
    // 添加成功之后,跳回到list页面
    this.props.history.push('/edu/subject/list')
  }

  render() {
    console.log(this.state)
    return (
      <Card
        title={
          <>
            <Link to='/edu/subject/list'>
              <ArrowLeftOutlined />
            </Link>
            <span style={{ marginLeft: 10 }}>新增课程</span>
          </>
        }
      >
        <Form
          {...layout}
          name='subject'
          // 表单校验通过了会触发
          onFinish={this.onFinish}
          // 表单校验没有通过触发
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            // 表单项的提示文字
            label='课程分类名称'
            // 表单上传数据的键
            name='subjectname'
            // 配置表单校验
            rules={[
              {
                required: true, // 表示这个表单项是必填项
                // 表单校验不成功的提示文字
                message: '请输入课程分类!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='父级分类id'
            name='parentid'
            rules={[
              {
                required: true,
                message: '请选择分类id'
              }
            ]}
          >
            <Select
              dropdownRender={menu => {
                // 注意: menu计时咱们一开始渲染的option
                // console.log(menu)
                return (
                  <div>
                    {menu}
                    <Divider style={{ margin: '4px 0' }} />
                    {this.state.total <= this.state.items.length ? (
                      <div style={{ color: 'red', marginLeft: 10 }}>
                        {' '}
                        没有更多数据了
                      </div>
                    ) : (
                      <Button type='link' onClick={this.handleGetSubject}>
                        点击加载更多
                      </Button>
                    )}
                  </div>
                )
              }}
            >
              {/* 注意: Option不是直接从antd中导出的.而是从Select组件上获取到的 */}
              {/* 一级菜单是写死的 */}
              <Select.Option value={0} key={0}>
                {'一级菜单'}
              </Select.Option>
              {/* 后面的其他一级课程分类都是动态渲染的 */}
              {this.state.items.map(item => (
                <Select.Option value={item._id} key={item._id}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            {/* htmlType的值是submit,表示这个按钮是一个提交按钮 */}
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
