import React from 'react';
import axios from 'axios';
import './DelSt.scss';
import { Divider, Input, Button, Popconfirm, message } from 'antd';
export default class DelSt extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value:'',
        }
    }
    confirm = async () => {
        if (!this.state.value) {
            message.warning("请输入学号")
        } else if (this.state.value[0] === 'T' || this.state.value[0] === 'a') { 
            message.warning("请输入正确的格式")
        } else {
            let {data} = await axios.get("http://localhost:8080/delSt", {
                params: {
                    studentID: this.state.value
                }
            })
            if (data * 1) {
                message.success("删除成功");
            } else { 
                message.error("用户不存在");
            }
        }
    }
    change = (ev) => {
        this.setState({
            value: ev.target.value
        })
    }
    render() {
            return (
                <div className="DelSt">
                    <Divider>
                        <h3>删除学生</h3>
                    </Divider>
                    <Input
                        allowClear
                        placeholder="请输入学号"
                        onChange={this.change}
                    />
                    <Popconfirm
                        placement="top"
                        title={'你确定要删除吗？'}
                        onConfirm={this.confirm}
                        okText="是"
                        cancelText="否">
                        <Button type="primary">删除</Button>
                    </Popconfirm>
                </div>
            );
    }
}