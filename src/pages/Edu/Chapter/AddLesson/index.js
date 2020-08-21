import React, { Component } from 'react'
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Divider,
  message,
  Switch,
  Upload
} from 'antd'
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

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
  render() {
    return (
      <Card
        title={
          <>
            <Link to='/edu/chapter/list'>
              <ArrowLeftOutlined />
            </Link>
            <span style={{ marginLeft: 10 }}>新增课程</span>
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
        >
          <Form.Item
            // 表单项的提示文字
            label='课时名称'
            // 表单上传数据的键
            name='lessonname'
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
            <Upload>
              <Button>
                <UploadOutlined /> 上传视频
              </Button>
            </Upload>
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
