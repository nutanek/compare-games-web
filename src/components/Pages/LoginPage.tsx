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
} from "antd";
import { Component } from "react";
import { Link, NavigateFunction } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components";
import withRouter from "./../../hocs/withRouter";
import LoadingModal from "../Utility/Modal/Loading";

import { ROOT_PATH } from "../../constants/appConstants";
import Logo from "./../../images/logo.png";

const Container = styled.div`
    .card-container {
        border-radius: 8px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
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

    render() {
        return (
            <Container>
                <Row justify="center">
                    <Col xs={20} sm={18} md={14} lg={10} xl={6}>
                        <div className="card-container">
                            <div className="header">
                                <img src={Logo} alt="logo" />
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
                                    <Form.Item name="remember">
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>

                                    <Button type="primary" size="large" block>
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

type Props = {
    navigate?: NavigateFunction;
    location?: Location;
};

export default withRouter(LoginPage);
