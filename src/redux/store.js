import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducer'

const middleware =
  // 注意: process是node环境下的一个全局对象. 应该项目编译的时候,是在node环境下运行,所以可以直接使用. process.env.NODE_ENV可以返回当前代码执行的环境:
  // 开发环境: development
  // 生产环境: production
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(thunk))
    : applyMiddleware(thunk)

export default createStore(reducer, middleware)
