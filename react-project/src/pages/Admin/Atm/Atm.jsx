import React from 'react';
import axios from 'axios';
import { Input, Button, message } from 'antd';
import { List, Typography, Table } from 'antd';
import { Divider } from 'antd';
import './Atm.scss';

export default class Tmessage extends React.Component {
    constructor(props) {
        super(props);
        //私有的数据
        this.state = {
            data: ''
        }
    }
    data1 = [];
    data2 = [];
    add() {
        this.data1 = [];
        this.data2 = [];
        let y = this.refs.i1.input.value.trim();
        if (y) {
            axios.get(`http://localhost:8080/atm?userID=${y}`).then(({ data }) => {
                if (data == 0) {
                    message.warning('此工号不存在');
                    return;
                }
                if (data.length) {
                    this.setState({ data });//将后端传上来的数据传到私有的数据
                }
            });
        } else {
            message.warning('请输入内容', 1);
        }
    }
    keyDown = (e) => { 
        if (e.keyCode === 13) { 
            this.add()
        }
    }
    componentDidMount() { 
        document.addEventListener("keydown", this.keyDown)
    }
    componentWillUnmount() { 
        document.removeEventListener("keydown", this.keyDown)
    }
    render() {
        // 获取私有的数据
        let arr = this.state.data;
        if (arr.length) {
            //基本信息
            let index1 = 0;
            let arrtitle1 = ['姓名：', '学号：', '性别：', '出生年份：', '学历：', '级别：', '入职年份：', '学院：'];
            delete arr[0].url;//删除属性以及属性值
            for (let i in arr[0]) {//将数据push到data1中
                this.data1.push(arrtitle1[index1] + arr[0][i]);
                index1++;
            }
            // 课程信息
            // 表头
            const columns = [
                {
                    title: '课程号',
                    dataIndex: 'courseID',
                    key: 'courseID',
                    align: 'center'
                },
                {
                    title: '科目',
                    dataIndex: 'courseName',
                    key: 'courseName',
                    align: 'center'
                },
                {
                    title: '上课时间',
                    dataIndex: 'courseTime',
                    key: 'courseTime',
                    align: 'center'
                },
                {
                    title: '上课地点',
                    dataIndex: 'classRoom',
                    key: 'classRoom',
                    align: 'center'
                },
                {
                    title: '周数',
                    dataIndex: 'courseWeek',
                    key: 'courseWeek',
                    align: 'center'
                },
                {
                    title: '类型',
                    dataIndex: 'courseType',
                    key: 'courseType',
                    align: 'center'
                },
                {
                    title: '学分',
                    dataIndex: 'score',
                    key: 'score',
                    align: 'center'
                }
            ];
            // 表的数据
            const dataSource = arr[1]
            return (
                <div className="atm">
                    <Divider><h3>查看教师信息</h3></Divider>
                    <div className="d1 clearfix">
                        <Input allowClear placeholder="请输入工号" ref="i1" />
                        <Button type="primary" onClick={this.add.bind(this)}>查找</Button>
                    </div>
                    <div className="d2">
                        <List
                            size="small"
                            header={<div className="title">基本信息</div>}
                            bordered
                            dataSource={this.data1}
                            renderItem={item => <List.Item>{item}</List.Item>}
                        />
                    </div>
                    <div className="d3">
                        <h3 className="h3">课程信息</h3>
                        <Table size="small" bordered="true" columns={columns} dataSource={dataSource} />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="atm">
                    <Divider><h3>查看教师信息</h3></Divider>
                    <Input allowClear placeholder="请输入工号" ref="i1" />
                    <Button type="primary" onClick={this.add.bind(this)}>查找</Button>
                </div>
            )
        }

    }
}