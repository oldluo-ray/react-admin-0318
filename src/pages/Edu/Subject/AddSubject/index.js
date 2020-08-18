import React, { Component } from 'react'
import { Card, Form, Input, Select, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
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
export default class index extends Component {
  render() {
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
          // onFinish={onFinish}
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
            <Select>
              {/* 注意: Option不是直接从antd中导出的.而是从Select组件上获取到的 */}
              <Select.Option value={1}>{'一级菜单'}</Select.Option>
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
