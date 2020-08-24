import React from 'react'
import { Router } from 'react-router-dom'
import history from '@utils/history'
import { connect } from 'react-redux'

import Layout from './layouts'

// 国际化导入的组件
import { IntlProvider } from 'react-intl'
// 导入antd国际化的组件
import { ConfigProvider } from 'antd'
// 导入语言包
import { zh, en } from './locales'
// 导入antd的语言包
import enUS from 'antd/es/locale/en_US'
import zhCN from 'antd/es/locale/zh_CN'
// 引入重置样式（antd已经重置了一部分了）
import './assets/css/reset.css'

function App(props) {
  // locale是当前用户的语言环境
  const locale = props.intl
  // message 根据当前用户语言环境,选择的语言包
  const message = locale === 'en' ? en : zh

  // 根据当前语言环境,判断antd中使用哪个语言包
  const antLocale = locale === 'en' ? enUS : zhCN

  console.log(locale, message)

  return (
    <Router history={history}>
      {/* 注意:antd的locale的值应该是一个语言包 */}
      <ConfigProvider locale={antLocale}>
        {/* 国际化组件,包裹项目最外层的组件 */}
        {/* locale: 表示当前语言环境
          message: 表示当前要使用的语言包 */}
        <IntlProvider locale={locale} messages={message}>
          <Layout />
        </IntlProvider>
      </ConfigProvider>
    </Router>
  )
}

export default connect(state => ({ intl: state.intl }))(App)
