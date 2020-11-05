import React from 'react';
import axios from 'axios';
import './DelTt.scss';
import { Divider, Input, Button, Popconfirm, message } from 'antd';
export default class DelTt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }
  confirm = async () => {
    if (!this.state.value) {
      message.warning("请输入工号")
    } else if (this.state.value[0] === 'T') {
      let { data } = await axios.get("http://localhost:8080/DelTt", {
        params: {
          teacherID: this.state.value
        }
      })
      if (data * 1) {
        message.success("删除成功");
      } else {
        message.error("用户不存在");
      }
    } else {
      message.warning("请输入正确的格式")
    }
  }
  change = (ev) => {
    this.setState({
      value: ev.target.value
    })
  }
  render() {
    return (
      <div className="DelTt">
        <Divider>
          <h3>删除教工</h3>
        </Divider>
        <Input
          allowClear
          placeholder="请输入工号"
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