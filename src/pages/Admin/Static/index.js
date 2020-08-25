import React, { Component } from 'react'
import { Card, Radio } from 'antd'
import {
  Chart,
  registerShape,
  Geom,
  Axis,
  Tooltip,
  Interval,
  Interaction,
  Coordinate,
  Annotation
} from 'bizcharts'

// 图标里面的数据
const data = [
  {
    type: '分类一',
    value: 20
  },
  {
    type: '分类二',
    value: 18
  },
  {
    type: '分类三',
    value: 32
  },
  {
    type: '分类四',
    value: 15
  },
  {
    type: 'Other',
    value: 15
  }
]

// 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
const sliceNumber = 0.01

// 自定义 other 的图形，增加两条线
registerShape('interval', 'sliceShape', {
  draw(cfg, container) {
    const points = cfg.points
    let path = []
    path.push(['M', points[0].x, points[0].y])
    path.push(['L', points[1].x, points[1].y - sliceNumber])
    path.push(['L', points[2].x, points[2].y - sliceNumber])
    path.push(['L', points[3].x, points[3].y])
    path.push('Z')
    path = this.parsePath(path)
    return container.addShape('path', {
      attrs: {
        fill: cfg.color,
        path: path
      }
    })
  }
})

export default class index extends Component {
  state = {
    value: 0
  }
  // 单选按钮变化的事件处理函数
  handleChange = e => {
    // console.log(args)
    // 可以拿到单选按钮的value值
    console.log(e.target.value)
  }

  intervalClick = e => {
    console.log(e.data.data.value)
    this.setState({
      value: e.data.data.value
    })
  }
  render() {
    return (
      <div>
        <Card
          title={'销售额类型占比'}
          extra={
            <>
              {/* onchange: 切换单选按钮会触发
            defaultValue: 默认值(可以控制高亮) */}
              <Radio.Group defaultValue='a' onChange={this.handleChange}>
                <Radio.Button value='a'>Hangzhou</Radio.Button>
                <Radio.Button value='b'>Shanghai</Radio.Button>
                <Radio.Button value='c'>Beijing</Radio.Button>
                <Radio.Button value='d'>Chengdu</Radio.Button>
              </Radio.Group>
            </>
          }
        >
          {/* 
            图标示例中所有的图标组件,最外层都是要使用Chart组件包裹
            data 就是 图表需要的数据
            height: 图表的高度
            autoFit: 图表自适应父容器的宽高
            onIntervalClick: 点击图表数据,会触发这个函数
          */}
          <Chart
            data={data}
            height={500}
            autoFit
            onIntervalClick={this.intervalClick}
          >
            {/* 坐标系组件
                type: 坐标系类型(图表样式不同)
                radius: 整个图表的半径 取值 0~1
                innerRadius: 内部空白部分的半径 0~1
              */}
            <Coordinate type='theta' radius={0.8} innerRadius={0.8} />
            {/* 坐标轴组件: 
              visible: 表示是否展示 */}
            <Axis visible={false} />
            {/* 提示的内容 
                showTitle: 是否展示标题
                showContent: 是否展示内容
                如果子节点有内容,那就可以自定义提示内容结构
            */}
            <Tooltip showTitle={false} showContent={true}>
              {(type, values) => {
                return (
                  <div style={{ padding: 10 }}>
                    <span
                      style={{
                        backgroundColor: values[0].color,
                        borderRadius: '50%',
                        display: 'inline-block',
                        width: 10,
                        height: 10,
                        marginRight: 10
                      }}
                    ></span>
                    <span style={{ marginRight: 10 }}>{type}:</span>
                    <span>{values[0].value}</span>
                  </div>
                )
              }}
            </Tooltip>

            {/* 
             Interval组件,真正决定图表画成什么样子
             adjust: 图表样式的一个类型
             position: 使用data中哪个数据去画图
             color: 图表的颜色,根据数据中某个字段决定有多少个颜色
             shape: 具体的图形的样式
             */}
            <Interval
              adjust='stack'
              position='value'
              color='type'
              shape='sliceShape'
            />
            {/* 图表交互效果
            type: 交互效果类型 */}
            <Interaction type='element-single-selected' />
            {/* 图形标注 
            Annotation.Text 文本图形标注
            
            */}
            <Annotation.Text
              // 控制图形标注的位置
              position={['50%', '45%']}
              content='销售量'
              style={{
                lineHeight: '240px',
                fontSize: '30',
                fill: '#f00', //颜色
                textAlign: 'center'
              }}
            />

            <Annotation.Text
              // 控制图形标注的位置
              position={['50%', '55%']}
              content={this.state.value}
              style={{
                lineHeight: '240px',
                fontSize: '30',
                textAlign: 'center'
              }}
            />
          </Chart>
        </Card>
      </div>
    )
  }
}
