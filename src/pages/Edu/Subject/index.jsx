import React, { Component } from 'react'
import { Button, Table, Tooltip, Input, message, Modal } from 'antd'
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import {
  getSubjectList,
  getSecSubjectList,
  updateSubjectList,
  delSubjectList
} from './redux'

import { reqUpdateSubject } from '@api/edu/subject'

import './index.less'

// 使用高阶组件时,如果用修饰器语法: 传入展示组件的调用可以不写了
@connect(
  state => ({ subjectList: state.subjectList }),
  { getSubjectList, getSecSubjectList, updateSubjectList, delSubjectList }
)
class Subject extends Component {
  // constructor() {
  //   super()

  //   this.page = 1
  // }

  state = {
    // 如果subjectid有值,就渲染input框, 如果没有就渲染一个普通的标题
    subjectid: '',
    title: ''
  }

  page = 1

  componentDidMount() {
    // 组件挂载的时候,去调用异步anction,发送请求
    this.props.getSubjectList(1, 10)
  }

  // 页码发生变化时,触发的回调函数
  handleChange = (page, pageSize) => {
    console.log('页码变化')
    // 将当前页码的值赋值为当前组件实例的page属性
    this.page = page

    this.props.getSubjectList(page, pageSize)
  }

  handleShowSizeChange = (page, pageSize) => {
    console.log('页数变化')
    // console.log(page, pageSize)
    this.props.getSubjectList(page, pageSize)
  }

  // 点击可展开按钮的事件处理函数
  handleExpand = (expanded, record) => {
    // console.log(expanded, record)
    //如果是展开,就发送请求获取二级菜单数据
    if (expanded) {
      //发送请求,获取二级菜单数据
      // 一级课程的_id是二级课程的parentId
      this.props.getSecSubjectList(record._id)
    }
  }

  // 点击跳转到新增课程分类的组件
  handleToAdd = () => {
    //利用编程式导航进行路由跳转
    this.props.history.push('/edu/subject/add')
  }

  // 更新按钮的事件处理函数
  handleUpdate = ({ _id, title }) => () => {
    // 我点击的是哪条数据的更新按钮.拿到这条数据的_id
    // console.log(_id)
    // 将_id 赋值给state里面的subjectid
    this.setState({
      subjectid: _id,
      title: title
    })

    //记录旧的标题名称
    this.title = title
  }

  // 更改课程分类标题受控组件的事件处理函数
  handleUpdateChange = e => {
    this.setState({
      title: e.target.value
    })
  }

  // 取消按钮的事件处理函数
  handleCancle = () => {
    this.setState({
      subjectid: '',
      title: ''
    })
  }
  // 确认按钮的事件处理函数
  handleUpdateConfirm = async () => {
    //如果输入框是空的,那么就不能更新
    if (!this.state.title.trim()) {
      message.success('请输入正确的标题名称')
      return
    }

    //判断新的标题名称和旧的标题名称不能相同
    if (this.state.title === this.title) {
      message.success('新的标题名称和旧的标题名称不能相同')
      return
    }

    let id = this.state.subjectid
    let title = this.state.title
    // await reqUpdateSubject(id, title)
    await this.props.updateSubjectList(id, title)

    // console.log(res)
    // 提示用户
    message.success('数据更新成功')
    this.setState({
      subjectid: '',
      title: ''
    })
    // 重新请求一级菜单数据即可
    // 由于前面直接修改了redux的数据了,所以不需要重新获取最新数据
    // this.props.getSubjectList(1, 10)
  }

  // 删除课程分类的事件处理函数
  handleDel = record => () => {
    Modal.confirm({
      title: (
        <div>
          你确定要删除
          <span style={{ color: 'red', margin: '0 10px' }}>{record.title}</span>
          课程分类嘛?
        </div>
      ),
      onOk: async () => {
        // record._id 就是要删除的数据的id
        await this.props.delSubjectList(record._id)
        message.success('数据删除成功')
      }
    })
  }

  render() {
    // console.log(1)
    // 注意: columns里面的数据,要动态变化,所以要放到render函数中
    const columns = [
      /**
       * title: 表示这一列的标题
       * dataIndex: 表示这一列中要展示data数据的中哪一项值
       * key: 唯一id
       */
      // 注意: 后台返回的数据,课程分类名称的属性是title.不是name.所以记得改一下
      {
        title: '分类名称',
        // dataIndex: 'title',
        key: 'name',

        render: record => {
          // 如果subjectid和当前数据的_id一样,这一行展示input,否则直接展示标题
          if (this.state.subjectid === record._id) {
            return (
              <Input
                style={{ width: 300 }}
                value={this.state.title}
                onChange={this.handleUpdateChange}
              ></Input>
            )
          }
          // 展示标题
          return record.title
        }
      },
      {
        title: '操作',
        // 注意: 如果这一列不展示data中的数据,那么就可以不写dataIndex,或者是值为空的字符串
        // dataIndex: 'age',
        key: 'x',
        // 注意: 表格中每一次渲染(行)的时候,都会调用一次这个render函数
        render: record => {
          // 这里决定了操作这一列返回什么结构.如果subjectid有值,返回返回确认和取消按钮,如果没有值,就返回更新和删除按钮
          // 注意: 只修改当前这行数据
          if (this.state.subjectid === record._id) {
            // 返回确认和取消
            return (
              <>
                <Button
                  type='primary'
                  style={{ marginRight: 10 }}
                  onClick={this.handleUpdateConfirm}
                >
                  确认
                </Button>
                <Button type='danger' onClick={this.handleCancle}>
                  取消
                </Button>
              </>
            )
          } else {
            return (
              <>
                <Tooltip title='更新课程'>
                  <Button
                    type='primary'
                    icon={<FormOutlined />}
                    style={{ marginRight: 20, width: 40 }}
                    onClick={this.handleUpdate(record)}
                  ></Button>
                </Tooltip>
                <Tooltip title='删除课程'>
                  <Button
                    type='danger'
                    icon={<DeleteOutlined />}
                    // size='large'
                    style={{ width: 40 }}
                    onClick={this.handleDel(record)}
                  ></Button>
                </Tooltip>
              </>
            )
          }
        },
        width: 200
      }
    ]
    // console.log(this.props)
    return (
      <div className='subject'>
        <Button
          type='primary'
          icon={<PlusOutlined />}
          className='subject-btn'
          onClick={this.handleToAdd}
        >
          新建
        </Button>

        <Table
          // 表示表格的列的数据
          columns={columns}
          expandable={{
            // // 控制展开的行展示的内容
            // expandedRowRender: record => (
            //   <p style={{ margin: 0 }}>{record.description}</p>
            // ),
            // // 控制对应这一行是否有展开按钮, true就是有,false就是没有
            // rowExpandable: record => record.name !== 'Not Expandable'
            onExpand: this.handleExpand
          }}
          dataSource={this.props.subjectList.items}
          // dataSource={data}
          // 注意: table组件,在渲染数据的时候,默认使dataSource数据中的key属性的值作为底层列表渲染key的值. 但是我们后台返回的数据没有key属性.table组件支持,我们通过rowkey指定使用我们自己数据中某个属性作为key的值
          rowKey='_id'
          pagination={{
            // 表示总共有多少条数据, pagination,底层默认一页是10条数据,所以数据是30条,就分3页
            total: this.props.subjectList.total,
            // 是否展示一页展示几条数据的修改项
            showSizeChanger: true,
            // 控制一页展示几条的选项
            pageSizeOptions: ['5', '10', '15'],
            // 展示快速跳转到那一页
            showQuickJumper: true,
            defaultPageSize: 10, // 默认分页器认为每页是10条,改为5条,
            // onChange: (page, pageSize) => {
            //   console.log(page, pageSize)
            // }
            // 是页码变化的时候会触发的回调函数
            onChange: this.handleChange,
            // 一页展示的数据条数变化的时候触发的函数
            onShowSizeChange: this.handleShowSizeChange,
            // current控制分页器,哪个页码高亮
            current: this.page
          }}
        />
      </div>
    )
  }
}

export default Subject
