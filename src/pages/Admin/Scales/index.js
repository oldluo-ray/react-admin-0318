import React, { Component } from 'react'

import { Card, Button, DatePicker } from 'antd'

// 导入moment. 是前端常用的格式化日期的js库
import moment from 'moment'

// 带页签的card, 展示页签需要的数据
const tabListNoTitle = [
  {
    key: 'scales',
    tab: '销售量'
  },
  {
    key: 'visit',
    tab: '访问量'
  }
]

// 页签对应的内容的数据
const contentListNoTitle = {
  scales: <p>scales content</p>,
  visit: <p>visit content</p>
}

// 导出日期范围组件
const { RangePicker } = DatePicker
export default class index extends Component {
  state = {
    noTitleKey: 'scales',
    dateFlag: 'day', // day/week/month/year,
    rangDate: [moment(), moment()]
  }

  // 页签切换的回调函数
  onTabChange = key => {
    // console.log(key)
    this.setState({
      noTitleKey: key
    })
  }

  // 按钮的点击事件
  handleBtnClick = flag => () => {
    let rangDate = []
    switch (flag) {
      case 'day':
        rangDate = [moment(), moment()]
        break
      case 'week':
        rangDate = [moment(), moment().add(7, 'd')]
        break
      case 'month':
        rangDate = [moment(), moment().add(1, 'M')]
        break
      case 'year':
        rangDate = [moment(), moment().add(1, 'y')]
        break
    }

    // flag: day/week/month/year
    this.setState({
      // 实现高亮
      dateFlag: flag,
      // 修改rangDate的值,点击按钮实现日期范围选择,展示最新的范围
      rangDate
    })
  }

  // 点击rangePicker修改日期的回调函数
  handleRangePickerChange = momentArr => {
    // console.log(args)
    this.setState({
      // momentArr就是我们自己选择的日期moment对象组成的数组
      rangDate: momentArr
    })
  }
  render() {
    // 右侧按钮和日期选择组件
    const Extra = (
      <>
        <Button
          type={this.state.dateFlag === 'day' ? 'link' : 'text'}
          onClick={this.handleBtnClick('day')}
        >
          今日
        </Button>
        <Button
          type={this.state.dateFlag === 'week' ? 'link' : 'text'}
          onClick={this.handleBtnClick('week')}
        >
          本周
        </Button>
        <Button
          type={this.state.dateFlag === 'month' ? 'link' : 'text'}
          onClick={this.handleBtnClick('month')}
        >
          本月
        </Button>
        <Button
          type={this.state.dateFlag === 'year' ? 'link' : 'text'}
          onClick={this.handleBtnClick('year')}
        >
          本年
        </Button>
        <RangePicker
          value={this.state.rangDate}
          onChange={this.handleRangePickerChange}
        ></RangePicker>
      </>
    )

    return (
      <div>
        <Card
          style={{ width: '100%' }}
          // 定义页签的名称
          tabList={tabListNoTitle}
          // 控制页签高亮
          activeTabKey={this.state.noTitleKey}
          // 决定右侧额外部分展示的结构
          tabBarExtraContent={Extra}
          // 切换页签的回调函数
          onTabChange={this.onTabChange}
        >
          {contentListNoTitle[this.state.noTitleKey]}
        </Card>
      </div>
    )
  }
}
