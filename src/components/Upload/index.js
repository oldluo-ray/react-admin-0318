import React, { Component } from 'react'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

export default class MyUpload extends Component {
  handleBeforeUpload = (file, fileList) => {
    // 注意: 在BeforeUpload做两件事件
    // 1. 判断上传的视频的大小,如果超过限制值就不传了
    // 20M
    const MAX_SIZE = 5 * 1024 * 1024
    // 2. 给本地服务器发送请求,获取token
    return new Promise((resolve, reject) => {
      if (file.size < MAX_SIZE) {
        resolve()
      }
      return reject()
    })
  }
  handleCustomRequest = () => {
    console.log('实现将视频上传到七牛云的操作')
  }
  render() {
    return (
      <Upload
        // beforeUpload 是上传视频之前调用的函数.实现给本地服务器发送请求,获取token
        // beforeUpload 返回false/失败的promise,后面的customRequest就执行了
        beforeUpload={this.handleBeforeUpload}
        // customRequest 是真正将视频上传到七牛云的时候执行的
        customRequest={this.handleCustomRequest}
      >
        <Button>
          <UploadOutlined /> 上传视频
        </Button>
      </Upload>
    )
  }
}
