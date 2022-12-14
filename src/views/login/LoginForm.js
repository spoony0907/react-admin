import React, {Component} from 'react';
// antd
import {Form, Input, Button, Row, Col} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
// 验证
import {validate_password} from '../../utils/validate';
// API
import {Login} from '../../api/account';
// 组件
import Code from '../../components/code/index';
// 加密
import CryptoJs from 'crypto-js';

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            code: "",
            module: "login",
            loading: false
        };
    }

    // 登录
    onFinish = (values) => {
        const requestData = {
            username: this.state.username,
            password: CryptoJs.MD5(this.state.password).toString(),
            code: this.state.code
        }
        this.setState({
            loading: true
        })
        Login(requestData).then(response => {
            console.log(response);
            this.setState({
                loading: false
            })
        }).catch(error => {
            this.setState({
                loading: false
            })
        })
        console.log("Received values of form: ", values);
    }

    /** input输入处理 */
    inputChange = (e) => {
        let value = e.target.value;
        this.setState({
            username: value
        })
    }
    inputChangePassword = (e) => {
        let value = e.target.value;
        this.setState({
            password: value
        })
    }
    inputChangeCode = (e) => {
        let value = e.target.value;
        this.setState({
            code: value
        })
    }

    toggleForm = () => {
        // 调父级的方法
        this.props.switchForm("register");
    }

    render() {
        const {username, module, loading} = this.state;
        // const _this = this;
        return (
            <>
                <div className="form-header">
                    <h4 className="column">登录</h4>
                    <span onClick={this.toggleForm}>账号注册</span>
                </div>
                <div className="form-content">
                    <Form name="normal_login" className="login-form" initialValues={{ remember: true }}
                          onFinish={this.onFinish}
                    >
                        <Form.Item name="username" rules={[
                                { required: true, message: "邮箱不能为空" },
                                { type: "email", message: "邮箱格式不正确" }
                                // ({getFieldValue}) => ({
                                //     validator(rule, value) {
                                //         if (validate_email(value)) {
                                //             _this.setState({
                                //                 code_button_disabled: false
                                //             })
                                //             return Promise.resolve();
                                //         }
                                //         return Promise.reject("邮箱格式不正确");
                                //     }
                                // })
                        ]}>
                            <Input value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="email" />
                        </Form.Item>
                        <Form.Item name="password" rules={[
                            { required: true, message: "密码不能为空" },
                            // ({ getFieldValue }) => ({
                            //     validator(rule, value) {
                            //         if (value.length < 6)
                            //             return Promise.reject("不能小于6位");
                            //         else
                            //             return Promise.resolve();
                            //     }
                            // })
                            // { min: 6, message: "不能小于6位" },
                            // { max: 20, message: "不能大于20位" }
                            { pattern: validate_password, message: "请输入6-20位数字+字母" }
                        ]}>
                            <Input onChange={this.inputChangePassword} type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item name="code" rules={[
                            { required: true, message: "验证码不能为空" },
                            { len:6, message: "请输入长度为6位的验证码" }
                        ]}>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input onChange={this.inputChangeCode} prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="Code" />
                                </Col>
                                <Col span={9}>
                                    <Code username={username} module={module} />
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" loading={loading} htmlType="submit" className="login-form-button" block>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </>
        );
    }
}

export default LoginForm;