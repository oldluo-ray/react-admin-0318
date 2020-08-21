import React, { Component } from 'react'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { reqGetUploadToken } from '@api/edu/lesson'

export default class MyUpload extends Component {
  handleBeforeUpload = (file, fileList) => {
    // 注意: 在BeforeUpload做两件事件
    // 1. 判断上传的视频的大小,如果超过限制值就不传了
    // 20M
    const MAX_SIZE = 5 * 1024 * 1024

    return new Promise(async (resolve, reject) => {
      if (file.size > MAX_SIZE) {
        return reject()
      }

      // 2. 给本地服务器发送请求,获取token
      const res = await reqGetUploadToken()
      //   console.log(res)
      // 拿到上传token和过期时间要存起来
      // 一个要存到组件中, 一个要存到本地缓存里面
      this.tokenObj = res
      // 由于localstorage里面不能直接存储对象,要转成json字符串
      const jsonStr = JSON.stringify(res)
      localStorage.setItem('uploadToken', jsonStr)
      resolve()
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
