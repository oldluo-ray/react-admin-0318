import React, { Component } from 'react'
import { Card, Form, Input, Button, Switch, message } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import MyUpload from '@comps/Upload'
import { addLesson } from '@api/edu/lesson'

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
export default class AddLesson extends Component {
  onFinish = async values => {
    console.log(values)
    const { title, free, video } = values
    // 拿到章节id
    const chapterId = this.props.location.state._id
    const data = {
      chapterId,
      title,
      free,
      video
    }
    await addLesson(data)
    message.success('课时添加成功')
    this.props.history.push('/edu/chapter/list')
  }
  render() {
    return (
      <Card
        title={
          <>
            <Link to='/edu/chapter/list'>
              <ArrowLeftOutlined />
            </Link>
            <span style={{ marginLeft: 10 }}>新增课时</span>
          </>
        }
      >
        <Form
          {...layout}
          name='chapter'
          // 表单校验通过了会触发
          onFinish={this.onFinish}
          // 表单校验没有通过触发
          // onFinishFailed={onFinishFailed}
          // 给表单里面的表单项添加默认值:
          initialValues={{
            // lessonname: '呵呵',
            free: true
          }}
        >
          <Form.Item
            // 表单项的提示文字
            label='课时名称'
            // 表单上传数据的键
            name='title'
            // 配置表单校验
            rules={[
              {
                required: true, // 表示这个表单项是必填项
                // 表单校验不成功的提示文字
                message: '请输入课时!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            valuePropName='checked'
            // 表单项的提示文字
            label='是否免费'
            // 表单上传数据的键
            name='free'
            // 配置表单校验
            rules={[
              {
                required: true, // 表示这个表单项是必填项
                // 表单校验不成功的提示文字
                message: '请选择是否免费'
              }
            ]}
          >
            {/* 注意: Switch的值是checked属性控制,但是Form.Item组件默认控制表单项的value属性,
            由于switch没有value属性,所以报错:  Warning: [antd: Switch] `value` is not validate prop, do you mean `checked`? 
            
            解决方式: 告诉Form.Item控制switch的checked 
            Form.Item组件身上的属性valuePropName='checked'
            
            */}
            <Switch
              checkedChildren='开启'
              unCheckedChildren='关闭'
              defaultChecked
            />
          </Form.Item>

          <Form.Item
            // 表单项的提示文字
            label='上传视频'
            // 表单上传数据的键
            name='video'
            // 配置表单校验
            rules={[
              {
                required: true, // 表示这个表单项是必填项
                // 表单校验不成功的提示文字
                message: '请选择视频'
              }
            ]}
          >
            {/* 注意: 上传视频代码比较多,所以单独抽取出来放到MyUpload组件中 */}
            <MyUpload></MyUpload>
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
