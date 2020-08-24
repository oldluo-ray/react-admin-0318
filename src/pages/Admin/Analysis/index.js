import React, { Component } from 'react'
// 使用antd的栅格布局
import { Row, Col, Statistic, Progress } from 'antd'
import Card from '@comps/Card'
import {
  QuestionCircleOutlined,
  CaretUpOutlined,
  CaretDownOutlined
} from '@ant-design/icons'

import { AreaChart, ColumnChart } from 'bizcharts'

import './index.less'

// 注意: 如果数据值不变,放到组件外面, 如果数据的值要动态变化,一定要记得写在render里面
const RowCol = {
  // xs, md, lg 表示不同的屏幕尺寸 具体见antd文档
  // span表示元素在行中占的格数
  // 一行共24个格
  xs: { span: 24 },
  md: { span: 12 },
  lg: { span: 6 }
}

// 数据源
const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 13 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 5 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 }
]

const columnsdata = [
  {
    type: '家具家电',
    sales: 38
  },
  {
    type: '粮油副食',
    sales: 52
  },
  {
    type: '生鲜水果',
    sales: 61
  },
  {
    type: '美容洗护',
    sales: 145
  },
  {
    type: '母婴用品',
    sales: 48
  },
  {
    type: '进口食品',
    sales: 38
  },
  {
    type: '食品饮料',
    sales: 38
  },
  {
    type: '家庭清洁',
    sales: 38
  }
]

export default class index extends Component {
  render() {
    return (
      <div>
        {/* gutter的值是数组时: 第一个是水平方向间隔,第二个是垂直方向间隔 */}
        <Row gutter={[16, 16]}>
          <Col {...RowCol}>
            <Card
              title={<Statistic title='总销售额' prefix='￥' value={129983} />}
              // extra={<QuestionCircleOutlined />}
              footer={'日销售额 ￥12,423'}
            >
              <span>
                周同比 12%{' '}
                <CaretUpOutlined style={{ color: 'red', marginRight: 10 }} />
              </span>
              <span>
                日同比 10% <CaretDownOutlined style={{ color: 'green' }} />
              </span>
            </Card>
          </Col>
          <Col {...RowCol}>
            <Card
              title={<Statistic title='总销售额' prefix='￥' value={129983} />}
              // extra={<QuestionCircleOutlined />}
              footer={'日销售额 ￥12,423'}
            >
              <AreaChart
                // data: 图表的数据源
                data={data}
                // title: 图表的标题
                // title={{
                //   // 表示展示
                //   visible: true,
                //   // 标题内容
                //   text: '面积图'
                // }}
                // 水平方向展示哪个数据
                xField='year'
                // 垂直方向展示哪个数据
                yField='value'
                // 图表默认有内边距,使用padding属性去掉内边距
                padding='0'
                // 水平方向坐标系
                xAxis={{
                  visible: false
                }}
                // 垂直方向坐标系
                yAxis={{
                  visible: false
                }}
                // 是否以曲线展示数据(是否丝滑)
                smooth={true}
                color={['hotpink']}
              />
            </Card>
          </Col>
          <Col {...RowCol}>
            <Card
              title={<Statistic title='总销售额' prefix='￥' value={129983} />}
              // extra={<QuestionCircleOutlined />}
              footer={'日销售额 ￥12,423'}
            >
              <ColumnChart
                data={columnsdata}
                // title={{
                //   visible: true,
                //   text: '基础柱状图'
                // }}
                forceFit
                padding='0'
                xField='type'
                yField='sales'
                // 水平方向坐标系
                xAxis={{
                  visible: false
                }}
                // 垂直方向坐标系
                yAxis={{
                  visible: false
                }}
                // meta可以配置数据
                meta={{
                  // type表示 配置数中type属性的这项数据
                  type: {
                    // 给type起别名
                    alias: '类别'
                  },
                  sales: {
                    alias: '销售额(万)'
                  }
                }}
              />
            </Card>
          </Col>
          <Col {...RowCol}>
            <Card
              title={<Statistic title='总销售额' prefix='￥' value={129983} />}
              // extra={<QuestionCircleOutlined />}
              footer={'日销售额 ￥12,423'}
            >
              <Progress
                // 进度值
                percent={80.9}
                // 渐变颜色
                strokeColor={{
                  from: '#108ee9',
                  to: '#87d068'
                }}
                // 有波动效果
                status='active'
              ></Progress>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
