import React, { useState, useEffect } from 'react'
import { Form, Input, Select, Cascader, Button } from 'antd'
import { reqAllSubjectList } from '@api/edu/subject'
import { reqGetAllTeacherList } from '@api/edu/teacher'

import './index.less'

const { Option } = Select

function SearchForm() {
  const [form] = Form.useForm()

  const [subjects, setSubjects] = useState([])
  const [teachers, setTeachers] = useState([])

  // 模拟挂载的生命周期钩子函数
  useEffect(() => {
    async function fetchData() {
      // 这样的代码会让第一次请求执行完之后,才执行第二次请求
      // await reqAllSubjectList()
      // await reqGetAllTeacherList()
      // promise.all 会同时发送两次请求,两次请求都执行完毕,才会返回结果
      const [subject, teacher] = await Promise.all([
        reqAllSubjectList(),
        reqGetAllTeacherList()
      ])

      // console.log(subject, teacher)
      setSubjects(subject)
      setTeachers(teacher)
    }
    fetchData()
  }, [])

  // const [options, setOptions] = useState([
  //   {
  //     value: 'zhejiang',
  //     label: 'Zhejiang',
  //     isLeaf: false
  //   },
  //   {
  //     value: 'jiangsu',
  //     label: 'Jiangsu',
  //     isLeaf: false
  //   }
  // ])

  const options = subjects.map(item => {
    return {
      // 相当于_id
      value: item._id,
      // 相当于title
      label: item.title,
      // 是否有二级数据. false表示有, true表示没有
      isLeaf: true
    }
  })
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions)
  }

  const loadData = selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    targetOption.loading = true

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false
      targetOption.children = [
        {
          label: `${targetOption.label} Dynamic 1`,
          value: 'dynamic1'
        },
        {
          label: `${targetOption.label} Dynamic 2`,
          value: 'dynamic2'
        }
      ]
      // setOptions([...options])
    }, 1000)
  }

  const resetForm = () => {
    form.resetFields()
  }

  return (
    <Form layout='inline' form={form}>
      <Form.Item name='title' label='标题'>
        <Input placeholder='课程标题' style={{ width: 250, marginRight: 20 }} />
      </Form.Item>
      <Form.Item name='teacherId' label='讲师'>
        <Select
          allowClear
          placeholder='课程讲师'
          style={{ width: 250, marginRight: 20 }}
        >
          {teachers.map(item => (
            <Option key={item._id} value={item._id}>
              {item.name}
            </Option>
          ))}
          {/* <Option value='lucy1'>Lucy1</Option>
          <Option value='lucy2'>Lucy2</Option>
          <Option value='lucy3'>Lucy3</Option> */}
        </Select>
      </Form.Item>
      <Form.Item name='subject' label='分类'>
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={options}
          loadData={loadData}
          onChange={onChange}
          changeOnSelect
          placeholder='课程分类'
        />
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          style={{ margin: '0 10px 0 30px' }}
        >
          查询
        </Button>
        <Button onClick={resetForm}>重置</Button>
      </Form.Item>
    </Form>
  )
}

export default SearchForm
