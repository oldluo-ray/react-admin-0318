import React from 'react'
import { Router } from 'react-router-dom'
import history from '@utils/history'

import Layout from './layouts'

// 国际化导入的组件
import { IntlProvider } from 'react-intl'
// 导入语言包
import { zh, en } from './locales'
// 引入重置样式（antd已经重置了一部分了）
import './assets/css/reset.css'

function App() {
  return (
    <Router history={history}>
      {/* 国际化组件,包裹项目最外层的组件 */}
      {/* locale: 表示当前语言环境
          message: 表示当前要使用的语言包 */}
      <IntlProvider locale={'en'} message={en}>
        <Layout />
      </IntlProvider>
    </Router>
  )
}

export default App
