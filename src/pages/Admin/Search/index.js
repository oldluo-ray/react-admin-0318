import React, { Component } from 'react'
import { Tabs } from 'antd'
import { RingProgressChart } from 'bizcharts'

const { TabPane } = Tabs

export default class index extends Component {
  render() {
    return (
      <div style={{ backgroundColor: '#fff' }}>
        <Tabs defaultActiveKey='1' tabPosition={'top'} style={{ height: 220 }}>
          {[...Array(30).keys()].map(i => (
            <TabPane
              tab={
                <>
                  {`Store-${i}`}
                  <RingProgressChart
                    width={50}
                    height={50}
                    percent={Math.random()}
                  />
                </>
              }
              key={i}
              disabled={i === 28}
            >
              Content of tab {i}
            </TabPane>
          ))}
        </Tabs>
      </div>
    )
  }
}
