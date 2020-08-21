import React, { Component } from 'react'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { reqGetUploadToken } from '@api/edu/lesson'

export default class MyUpload extends Component {
  // 组件构造器中的时候,从本地缓存中,获取uploadtoken
  constructor() {
    super()

    // 从本地缓存中获取uploadToken
    // 如果之前从来没有上传过视频,本地缓存中没有token. 直接给this.tokenObj = {}
    // 如果之前存储过,赋值给存储的那个token
    const jsonStr = localStorage.getItem('uploadToken')

    if (jsonStr) {
      // 之前存过
      this.tokenObj = JSON.parse(jsonStr)
      return
    }
    this.tokenObj = {}
  }

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
      // 判断 this.tokenObj里面expires值是否过期,过期才发送请求,没过期就不用发送请求
      // 思考: 如果判断是否超过过期时间
      // 1.如果要将uploadtoken存储到本地缓存中,不直接存储7200秒. 而是计算一下,存储一个截止时间
      // 存储的时候: 存储时候的当前时间 + 7200 * 1000
      // 2. 把截止时间存到本地缓存中
      // 如果截止的时间,比当前发送请求之前的时间大,就证明upload还在有效期范围内
      if (this.tokenObj.expires && this.tokenObj.expires > Date.now()) {
        return resolve()
      }
      const res = await reqGetUploadToken()
      //   console.log(res)
      // 拿到上传token和过期时间要存起来
      // 一个要存到组件中, 一个要存到本地缓存里面
      //注意: res.expoires 是一个有效期时间是 7200秒
      // 我们需要根据这个事件计算一个截止时间
      // 注意: 因为有效期开始计时是从七牛云开始的.所以浏览器拿到的时候,可能已经开始很久了(一分钟或者其他时长). 所以在计算截止时间的时候,少算一点.
      res.expires = Date.now() + res.expires * 1000 - 2 * 60 * 1000
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
