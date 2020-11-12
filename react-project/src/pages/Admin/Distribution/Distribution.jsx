import React from 'react';
import axios from 'axios';
import './Distribution.scss';
import { Divider } from 'antd';
import echarts from 'echarts';
export default class Distribution extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data:[]
    }
  }
  async componentDidMount() { 
    let { data } = await axios.get("http://localhost:8080/distribution")
    this.setState({
      data
    })
    const myChart = echarts.init(this.refs.dtbt)
    let option = {
      title: {
        text: '师生人数比例',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        bottom: 10,
        left: 'center',
        data: ['学生', '老师']
      },
      series: [
        {
          type: 'pie',
          radius: '65%',
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: [
            { value: data[0], name: '学生' },
            { value: data[1], name: '老师' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    myChart.setOption(option)
  }
  render() {
    return (
      <div className="Distribution">
        <Divider>
          <h3>师生分布</h3>
        </Divider>
        <div className="dtbt" ref="dtbt"></div>
      </div>
    );
  }
}