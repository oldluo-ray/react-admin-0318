import React, { useEffect } from 'react'
import { Form, Select, Button } from 'antd'
import { connect } from 'react-redux'

import { getCourseList, getChapterList } from '../redux'

import './index.less'

const { Option } = Select

function SearchForm(props) {
  const [form] = Form.useForm()

  const resetForm = () => {
    form.resetFields()
  }

  // 在searchForm 组件挂载的时候,调用异步action.发送请求,将数据存储到redux中
  useEffect(() => {
    props.getCourseList()
  }, [])

  // console.log(props)
  const onFinish = values => {
    console.log(values)
    props.getChapterList(values.courseId)
  }
  return (
    <Form layout='inline' form={form} onFinish={onFinish}>
      <Form.Item name='courseId' label='课程'>
        <Select
          allowClear
          placeholder='课程'
          style={{ width: 250, marginRight: 20 }}
        >
          {/* <Option value='1'>1</Option>
          <Option value='2'>2</Option>
          <Option value='3'>3</Option> */}
          {props.courseList.map(item => (
            <Option value={item._id} key={item._id}>
              {item.title}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          style={{ margin: '0 10px 0 30px' }}
        >
          查询课程章节
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  )
}

export default connect(
  // state是redux中所有的属性
  state => ({ courseList: state.chapterList.allCourseList }),
  { getCourseList, getChapterList }
)(SearchForm)
