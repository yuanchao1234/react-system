import React from 'react';
import axios from 'axios';
// import './/Selectcourse.css';
// import { Divider } from 'antd';
import { Table, Divider, Tag } from 'antd';



const columns = [
    {
        title: '课程名称',
        dataIndex: 'courseName',
        key: 'courseName',
        align: 'center'
        // render: text => <a>{text}</a>,
    },
    {
        title: '上课时间',
        dataIndex: 'courseTime',
        key: 'courseTime',
        align: 'center'
    },
    {
        title: '课程类型',
        dataIndex: 'courseType',
        key: 'courseType',
        align: 'center'
    },
    {
        title: '上课周数',
        key: 'courseWeek',
        dataIndex: 'courseWeek',
        align: 'center'
    },
    {
        title: '学分',
        dataIndex: 'score',
        key: 'score',
        align: 'center'
    },
    {
        title: '讲师',
        dataIndex: 'userName',
        key: 'userName',
        align: 'center'
    },
];
export default class Didcourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pagination: {
                pageSize: 4,
            },
        }
    }
    data = [];
    componentDidMount() {
        let _ = this;
        var userID = sessionStorage.getItem("userID");
        axios.get(`http://localhost:8080/selectcourse?studentID=${userID}`).then(({ data }) => {
            let arr = data.map(function (item, index) {
                item.key = `${index + 1}`;
                return item;
            });
            this.setState({ data: arr });
        });
    }
    render() {
        let arr = this.state.data;
        let _ = this;
        if (arr) {
            this.data = arr;
            return <>
                <Divider><h3>课程表</h3></Divider>
                <Table pagination={this.state.pagination} bordered="true" columns={columns} dataSource={this.data} />
            </>;
            {/*<table>
                 <thead>
                    <tr>
                        <th className="name">课程名称</th>
                        <th>上课时间</th>
                        <th>课程类型</th>
                        <th>上课周数</th>
                        <th>学分</th>
                        <th>讲师</th>
                    </tr>
                </thead>
                <tbody>
                    {arr.map(function (item, index) {
                        return <tr key={index}>
                            <td>{item.courseName}</td>
                            <td>{item.courseTime}</td>
                            <td>{item.courseType}</td>
                            <td>{item.courseWeek}</td>
                            <td>{item.score}</td>
                            <td>{item.userName}</td>
                        </tr>;
                    })}
                </tbody>
            </table> */}

        } else {
            return (<ul>
                <p></p>
            </ul>);
        }
    }
}