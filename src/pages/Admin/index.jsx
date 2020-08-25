import React, { Component } from 'react'
import Analysis from './Analysis'
import Scales from './Scales'

export default class Admin extends Component {
  render() {
    return (
      <div>
        {/* 分析组件 */}
        <Analysis></Analysis>
        {/* 销售组件 */}
        <Scales></Scales>
      </div>
    )
  }
}
