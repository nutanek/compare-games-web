import React from "react";
import {
    Row,
    Col,
    Form,
    Input,
    FormInstance,
    Checkbox,
    Button,
    Divider,
    message,
} from "antd";
import { Component } from "react";
import { Link, NavigateFunction } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components";
import {
    setLocalAccessToken,
    setLocalUserInfo,
    isLoggedIn,
} from "../../services/appServices";
import { signinApi } from "../../services/apiServices";
import withRouter from "./../../hocs/withRouter";
import LoadingModal from "../Utility/Modal/Loading";

import { ERRORS, ROOT_PATH } from "../../constants/appConstants";

const Container = styled.div`
    .card-container {
        border-radius: 8px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 0px 24px;
        overflow: hidden;
        .header {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
            padding: 30px;
            background-color: var(--main-app-color);
            img {
                height: 50px;
            }
            .name {
                color: #ffffff;
            }
        }
        .body {
            padding: 30px;
        }
        button {
            border-radius: 8px;
        }
    }
`;

class LoginPage extends Component<Props> {
    state: State = {
        isLoading: false,
    };

    formRef = React.createRef<FormInstance>();

    componentDidMount() {
        if (isLoggedIn()) {
            window.location.replace(`${ROOT_PATH}/`)
        }
    }

    async signin(info: FormData): Promise<void> {
        try {
            this.setState({ isLoading: true });
            let { data } = await signinApi({
                email: info.email,
                password: info.password,
                remember: info.remember,
            });
            setLocalAccessToken(data.access_token);
            setLocalUserInfo(data);
            message.success("Success!");
            this.setState({ isLoading: false });
            setTimeout(() =>  this.redirect(), 300)
        } catch (error: any) {
            message.error(error?.response?.data?.msg || ERRORS.unknown);
            this.setState({ isLoading: false });
        }
    }

    redirect(): void {
        let queryStr = this.props.location?.search || ''
        let query = queryString.parse(queryStr);
        if (query.callback) {
            window.location.replace(query.callback as string)
        } else {
            window.location.replace(`${ROOT_PATH}/`)
        }
    }

    onSubmit(values: FormData): void {
        this.signin(values);
    }

    render() {
        if (isLoggedIn()) {
            return null;
        }
        return (
            <Container>
                <Row justify="center">
                    <Col xs={20} sm={18} md={14} lg={10} xl={8}>
                        <div className="card-container">
                            <div className="header">
                                <img src={`${ROOT_PATH}/images/logo.png`} alt="logo" />
                                <div className="name text-bold text-xl">
                                    Console
                                </div>
                            </div>
                            <div className="body">
                                <p className="text-center text-bold text-4xl">
                                    Log in
                                </p>
                                <Form
                                    ref={this.formRef}
                                    layout="vertical"
                                    name="control-ref"
                                    requiredMark="optional"
                                    initialValues={{ remember: true }}
                                    onFinish={this.onSubmit.bind(this)}
                                >
                                    <Form.Item
                                        name="email"
                                        label="Email"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your email!",
                                            },
                                            {
                                                type: "email",
                                                message: "Email is invalid!",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="password"
                                        label="Password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your password!",
                                            },
                                            {
                                                min: 8,
                                                message:
                                                    "Password must be at least 8 characters",
                                            },
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item
                                        name="remember"
                                        valuePropName="checked"
                                    >
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>

                                    <Button
                                        htmlType="submit"
                                        type="primary"
                                        size="large"
                                        block
                                    >
                                        Log in
                                    </Button>

                                    <Link to={`${ROOT_PATH}/forgot-password`}>
                                        <Button
                                            type="link"
                                            block
                                            style={{ marginTop: 15 }}
                                        >
                                            Forgot Password?
                                        </Button>
                                    </Link>

                                    <Divider />

                                    <div className="text-secondary-color text-center">
                                        Don´t have an account?
                                    </div>
                                    <Link to={`${ROOT_PATH}/signup`}>
                                        <Button type="link" block>
                                            Sign up
                                        </Button>
                                    </Link>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>

                <LoadingModal isOpen={this.state.isLoading} />
            </Container>
        );
    }
}

type State = {
    isLoading: boolean;
};

type Query = {
    [key: string]: string[];
};

type FormData = {
    email: string;
    password: string;
    remember: boolean;
};

type Props = {
    navigate?: NavigateFunction;
    location?: Location;
};

export default withRouter(LoginPage);
