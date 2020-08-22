import React, { Component } from 'react'
import { Button, message, Tooltip, Modal, Alert, Table } from 'antd'
import {
  FullscreenOutlined,
  RedoOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import dayjs from 'dayjs'
import Player from 'griffith'

import relativeTime from 'dayjs/plugin/relativeTime'

import { connect } from 'react-redux'
import SearchForm from './SearchForm'
import { getLessonList } from './redux'

import './index.less'

dayjs.extend(relativeTime)

@connect(
  state => ({
    chapterList: state.chapterList.chapterList
  }),
  { getLessonList }
)
class Chapter extends Component {
  state = {
    searchLoading: false,
    previewVisible: false,
    previewImage: '',
    selectedRowKeys: [],
    play_url: ''
  }

  showImgModal = img => {
    return () => {
      this.setState({
        previewVisible: true,
        previewImage: img
      })
    }
  }

  handleImgModal = () => {
    this.setState({
      previewVisible: false
    })
  }

  componentDidMount() {
    // const { page, limit } = this.state;
    // this.handleTableChange(page, limit);
  }

  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true
    })

    this.getcourseList({ page, limit }).finally(() => {
      this.setState({
        tableLoading: false,
        page,
        limit
      })
    })
  }

  getcourseList = ({ page, limit, Coursename, nickName }) => {
    return this.props
      .getcourseList({ page, limit, Coursename, nickName })
      .then(total => {
        if (total === 0) {
          message.warning('暂无用户列表数据')
          return
        }
        message.success('获取用户列表数据成功')
      })
  }

  onSelectChange = selectedRowKeys => {
    this.setState({
      selectedRowKeys
    })
  }

  // 获取课时数据的事件处理函数
  handleGetLesson = (expand, record) => {
    // console.log(expand, record)
    if (expand) {
      // 展开的时候,去请求课时数据
      // [
      // {
      //     "free": true,
      //     "video": "http://qbpxkfq77.bkt.clouddn.com/lh4GZyjT-g",
      //     "gmtCreate": "2020-06-11T16:00:00.000Z",
      //     "gmtModified": "2020-06-11T16:00:00.000Z",
      //     "_id": "5ee343f7d9dce01d50447cc0",
      //     "chapterId": "5ee2cefcd9dce01d50447cb6",
      //     "title": "肖申克~"
      // },
      this.props.getLessonList(record._id)
    }
  }

  // 跳转到新增课时页面的回调函数
  handleGoAddLesson = data => () => {
    this.props.history.push('/edu/chapter/addlesson', data)
  }

  // 预览视频,展示modal窗口的事件处理函数
  handlePreviewVideo = record => () => {
    this.setState({
      previewVisible: true,
      play_url: record.video
    })
    // this.play_url = record.video
  }

  // 批量删除的回调函数
  handleBatchRemove = () => {
    // 1. 从selectedRowKeys找到那些是章节的id, 哪些是课时的id
    // 思路:遍历所有章节数据, 遍历过程中,如果selectedRowKeys的值,和某一个章节的_id是一样的.说明这个id是章节id. 在遍历的过程中把是章节id的值,过滤出来,剩下的就是课时
    // [
    //   '5f4083d344cac92d8849aad5',
    //   '5f4085bf44cac92d8849aad6',
    //   '5ee2cf0dd9dce01d50447cb8',
    //   '5ee2cefcd9dce01d50447cb6'
    // ]
    // 1.1 拿到所有章节数据
    // 1.2 遍历章节
    const chapterIdList = []
    this.props.chapterList.forEach(item => {
      // 1.3 判断是否章节id
      if (this.state.selectedRowKeys.indexOf(item._id) > -1) {
        // 找到了
        chapterIdList.push(item._id)
      }
    })

    // console.log(chapterIdList)

    // 从selectedRowKeys 找到课时,存到一个新的数组中
    const lessonIdList = this.state.selectedRowKeys.filter(item => {
      // 遍历过程中,查看item是否在chapterIdList里面,如果在说明章节id,否则是课时id
      if (chapterIdList.indexOf(item) > -1) {
        return false
      }
      return true
    })

    console.log(chapterIdList, lessonIdList)

    // 1.4 过滤章节id
  }

  render() {
    const { previewVisible, previewImage, selectedRowKeys } = this.state

    const columns = [
      {
        title: '章节名称',
        dataIndex: 'title'
      },
      {
        title: '是否免费',
        dataIndex: 'free',
        // 注意: 如果不写dataIndex的时候,render指向的函数接收的数据,肯定是一行数据. 但是如果dataIndex写值了,那么render指向的函数接收的数据就是一行数据中指定的某一个属性的值
        // 比如 上面的dataIndex的值是free.是否render函数中只能接收到一行数据中free属性的值
        render: isFree => {
          // 如果是章节数据 isFree 是 undefined
          // 如果是课时数据 isFree 返回的是 布尔值
          return isFree === true ? '是' : isFree === false ? '否' : ''
        }
      },
      {
        title: '视频',
        // dataIndex: 'free',
        render: record => {
          if (record.free) {
            return (
              <Button onClick={this.handlePreviewVideo(record)}>预览</Button>
            )
          }
          return null
        }
      },
      {
        title: '操作',
        width: 210,
        fixed: 'right',
        render: data => {
          return (
            <div>
              <Tooltip title='新增课时'>
                <Button type='primary' onClick={this.handleGoAddLesson(data)}>
                  <PlusOutlined />
                </Button>
              </Tooltip>
              <Tooltip title='更新章节'>
                <Button type='primary' style={{ margin: '0 10px' }}>
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title='删除章节'>
                <Button type='danger'>
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </div>
          )
        }
      }
    ]

    const data = [
      {
        id: '111',
        title: '第一章节',
        children: [
          {
            id: '1',
            title: '第一课时',
            free: false,
            videoSourceId: '756cf06db9cb4f30be85a9758b19c645'
          },
          {
            id: '2',
            title: '第二课时',
            free: true,
            videoSourceId: '2a02d726622f4c7089d44cb993c531e1'
          },
          {
            id: '3',
            title: '第三课时',
            free: true,
            videoSourceId: '4e560c892fdf4fa2b42e0671aa42fa9d'
          }
        ]
      },
      {
        id: '222',
        title: '第二章节',
        children: [
          {
            id: '4',
            title: '第一课时',
            free: false,
            videoSourceId: '756cf06db9cb4f30be85a9758b19c645'
          },
          {
            id: '5',
            title: '第二课时',
            free: true,
            videoSourceId: '2a02d726622f4c7089d44cb993c531e1'
          },
          {
            id: '6',
            title: '第三课时',
            free: true,
            videoSourceId: '4e560c892fdf4fa2b42e0671aa42fa9d'
          }
        ]
      },
      {
        id: '333',
        title: '第三章节',
        children: [
          {
            id: '1192252824606289921',
            title: '第一课时',
            free: false,
            videoSourceId: '756cf06db9cb4f30be85a9758b19c645'
          },
          {
            id: '1192628092797730818',
            title: '第二课时',
            free: true,
            videoSourceId: '2a02d726622f4c7089d44cb993c531e1'
          },
          {
            id: '1192632495013380097',
            title: '第三课时',
            free: true,
            videoSourceId: '4e560c892fdf4fa2b42e0671aa42fa9d'
          }
        ]
      }
    ]

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    }

    const sources = {
      hd: {
        play_url: this.state.play_url,
        bitrate: 1,
        duration: 1000,
        format: '',
        height: 500,
        size: 160000,
        width: 500
      }
    }

    return (
      <div>
        <div className='course-search'>
          <SearchForm />
        </div>
        <div className='course-table'>
          <div className='course-table-header'>
            <h3>课程章节列表</h3>
            <div>
              <Button type='primary' style={{ marginRight: 10 }}>
                <PlusOutlined />
                <span>新增</span>
              </Button>
              <Button
                type='danger'
                style={{ marginRight: 10 }}
                onClick={this.handleBatchRemove}
              >
                <span>批量删除</span>
              </Button>
              <Tooltip title='全屏' className='course-table-btn'>
                <FullscreenOutlined />
              </Tooltip>
              <Tooltip title='刷新' className='course-table-btn'>
                <RedoOutlined />
              </Tooltip>
              <Tooltip title='设置' className='course-table-btn'>
                <SettingOutlined />
              </Tooltip>
            </div>
          </div>
          <Alert
            message={
              <span>
                <InfoCircleOutlined
                  style={{ marginRight: 10, color: '#1890ff' }}
                />
                {`已选择 ${selectedRowKeys.length} 项`}
              </span>
            }
            type='info'
            style={{ marginBottom: 20 }}
          />
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.chapterList}
            rowKey='_id'
            expandable={{
              onExpand: this.handleGetLesson
            }}
          />
        </div>
        {/*  直接使用这个modal去预览视频 */}
        <Modal
          visible={previewVisible}
          title='预览课时'
          footer={null}
          onCancel={this.handleImgModal}
          // modal关闭,但是视频还在播放. 解决办法: modal关闭的时候,销毁子节点
          destroyOnClose={true}
        >
          <Player
            sources={sources}
            id={'1'}
            cover={'http://localhost:3000/logo512.png'}
            duration={1000}
          ></Player>
        </Modal>
      </div>
    )
  }
}

export default Chapter
