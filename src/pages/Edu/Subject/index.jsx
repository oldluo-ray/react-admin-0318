import React, { Component } from 'react'
import { Button, Table, Tooltip } from 'antd'
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons'

import './index.less'

const columns = [
  /**
   * title: 表示这一列的标题
   * dataIndex: 表示这一列中要展示data数据的中哪一项值
   * key: 唯一id
   */
  { title: '分类名称', dataIndex: 'name', key: 'name' },
  {
    title: '操作',
    // 注意: 如果这一列不展示data中的数据,那么就可以不写dataIndex,或者是值为空的字符串
    // dataIndex: 'age',
    key: 'x',
    render: () => (
      <>
        <Tooltip title='更新课程'>
          <Button
            type='primary'
            icon={<FormOutlined />}
            style={{ marginRight: 20, width: 40 }}
            // size='large'
            // style={{ width: 40 }}
          ></Button>
        </Tooltip>
        <Tooltip title='删除课程'>
          <Button
            type='danger'
            icon={<DeleteOutlined />}
            // size='large'
            style={{ width: 40 }}
          ></Button>
        </Tooltip>
      </>
    ),
    width: 200
  }
]

const data = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description:
      'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description:
      'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.'
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable'
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description:
      'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.'
  }
]

export default class Subject extends Component {
  render() {
    return (
      <div className='subject'>
        <Button type='primary' icon={<PlusOutlined />} className='subject-btn'>
          新建
        </Button>

        <Table
          columns={columns}
          expandable={{
            expandedRowRender: record => (
              <p style={{ margin: 0 }}>{record.description}</p>
            ),
            rowExpandable: record => record.name !== 'Not Expandable'
          }}
          dataSource={data}
        />
      </div>
    )
  }
}
