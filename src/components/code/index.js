import React, {Component} from 'react';
// antd
import {Button, message} from "antd";
// API
import {GetCode} from "../../api/account";
// 验证
import {validate_email} from '../../utils/validate';
// 定时器
let timer = null;

// class 组件
class Code extends Component {
    constructor(props) {
        super(props); // 初始化默认值
        this.state = {
            username: props.username,
            button_text: "获取验证码",
            button_loading: false,
            button_disabled: false,
            module: props.module
        }
    }

    // this.props.username 每次都会去获取
    componentWillReceiveProps({username}) {
        this.setState({
            username
        })
    }

    // 销毁组件
    componentWillUnmount() {
        clearInterval(timer);
        timer = null;
    }

    /**
     * 获取验证码
     */
    getCode = () => {
        const {username} = this.state;
        if (!username) {
            message.warning("用户名不能为空", 2);
            return;
        }
        if (!validate_email(username)) {
            message.warning("邮箱格式不正确", 2);
            return;
        }
        this.setState({
            button_loading: true,
            button_text: "发送中"
        });
        const requestData = {
            username,
            module: this.state.module
        }
        GetCode(requestData).then(response => {
            message.success(response.data.message);
            // 执行倒计时
            this.countDown();
        }).catch(error => {
            this.setState({
                button_loading: false,
                button_text: "重新获取"
            });
        })
    }

    /**
     * 倒计时
     */
    countDown = () => {
        // 倒计时时间
        let sec = 60;
        // 修改状态
        this.setState({
            button_loading: false,
            button_disabled: true,
            button_text: `${sec}s`
        });

        timer = setInterval(() => {
            sec--;
            if (sec <= 0) {
                this.setState({
                    button_text: `重新获取`,
                    button_disabled: false
                });
                clearInterval(timer);
                return;
            }
            this.setState({
                button_text: `${sec}s`
            });
        }, 1000);
    }

    render() {
        let {button_text, button_disabled, button_loading} = this.state;
        return <Button type="danger" disabled={button_disabled} loading={button_loading} block onClick={this.getCode}>{button_text}</Button>;
    }
}

export default Code;