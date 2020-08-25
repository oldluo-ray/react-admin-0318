import React, { Component } from 'react'
import Analysis from './Analysis'
import Scales from './Scales'
import Static from './Static'
import Search from './Search'

export default class Admin extends Component {
  render() {
    return (
      <div>
        {/* 分析组件 */}
        <Analysis></Analysis>
        {/* 销售组件 */}
        <Scales></Scales>
        {/* Static组件 */}
        <Static></Static>
        <Search></Search>
      </div>
    )
  }
}
