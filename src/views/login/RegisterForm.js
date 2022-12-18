import React, {Component} from 'react';
// antd
import {Form, Input, Button, Row, Col} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
// 组件
import Code from '../../components/code/index';
// API
import {Register} from '../../api/account';
// 验证
import {validate_pass} from '../../utils/validate';

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            code: "",
            module: "register"
        };
    }

    /** input输入处理 */
    inputChangeUsername = (e) => {
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

    onFinish = (values) => {
        const responseData = {
            username: this.state.username,
            password: this.state.password,
            code: this.state.code
        }
        Register().then(response => {

        }).catch(error => {

        })
    }

    toggleForm = () => {
        // 调父级的方法
        this.props.switchForm("login");
    }

    render() {
        const {username, module} = this.state;
        return (
            <>
                <div className="form-header">
                    <h4 className="column">注册</h4>
                    <span onClick={this.toggleForm}>账号登录</span>
                </div>
                <div className="form-content">
                    <Form name="normal_login" className="login-form" initialValues={{ remember: true }}
                          onFinish={this.onFinish}
                    >
                        <Form.Item name="username" rules={[
                            { required: true, message: "邮箱不能为空" },
                            { type: "email", message: "邮箱格式不正确" }
                        ]}>
                            <Input onChange={this.inputChangeUsername} prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="请输入邮箱" />
                        </Form.Item>
                        <Form.Item name="password" rules={[
                            { required: true, message: "密码不能为空" },
                            ({getFieldValue})=>({
                                validator(role, value) {
                                    const passwords_value = getFieldValue("passwords");
                                    if (!validate_pass(value)) {
                                        return Promise.reject("请输入6-20位数字+字母");
                                    }
                                    if (passwords_value && value !== passwords_value) {
                                        return Promise.reject("两次密码不一致");
                                    }
                                    return Promise.resolve();
                                }
                            })
                        ]}>
                            <Input onChange={this.inputChangePassword} type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item name="passwords" rules={[
                            { required: true, message: "再次确认密码不能为空" },
                            ({getFieldValue})=>({
                                validator(role, value) {
                                    if (value !== getFieldValue("password")) {
                                        return Promise.reject("两次密码不一致");
                                    }
                                    return Promise.resolve();
                                }
                            })
                        ]}>
                            <Input type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请再次输入密码" />
                        </Form.Item>
                        <Form.Item name="code" rules={[
                            { required: true, len: 6, message: "请输入长度为6位的字符" }
                        ]}>
                            <Row gutter={13}>
                                <Col span={15}>
                                    <Input onChange={this.inputChangeCode} prefix={<LockOutlined className="site-form-item-icon"/>} placeholder="请输入验证码" />
                                </Col>
                                <Col span={9}>
                                    <Code username={username} module={module} />
                                </Col>
                            </Row>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block>
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </>
        );
    }
}

export default RegisterForm;