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
import { signupApi } from "./../../services/apiServices";
import withRouter from "./../../hocs/withRouter";
import LoadingModal from "../Utility/Modal/Loading";
import PasswordStrengthScore from "../Utility/PasswordStrengthScore";

import { ERRORS, ROOT_PATH } from "../../constants/appConstants";
import Logo from "./../../images/logo.png";

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
            .password-score-container {
                padding-bottom: 30px;
            }
        }
        button {
            border-radius: 8px;
        }
    }
`;

class SignupPage extends Component<Props> {
    state: State = {
        isLoading: false,
        password: "",
    };

    formRef = React.createRef<FormInstance>();

    async signup(info: FormData): Promise<void> {
        try {
            this.setState({ isLoading: true });
            let { data }: any = await signupApi({
                display_name: info.displayName,
                email: info.email,
                password: info.password,
                confirm_password: info.confirmPassword,
            });
            message.success("Success!");
            this.setState({ isLoading: false });
        } catch (error: any) {
            message.error(error?.msg || ERRORS.unknown);
            this.setState({ isLoading: false });
        }
    }

    onChangePassword(password: string): void {
        this.setState({ password });
    }

    onSubmit(values: FormData): void {
        this.signup(values);
    }

    render() {
        return (
            <Container>
                <Row justify="center">
                    <Col xs={20} sm={18} md={14} lg={10} xl={8}>
                        <div className="card-container">
                            <div className="header">
                                <img src={Logo} alt="logo" />
                                <div className="name text-bold text-xl">
                                    Console
                                </div>
                            </div>
                            <div className="body">
                                <p className="text-center text-bold text-4xl">
                                    Sign up
                                </p>
                                <Form
                                    ref={this.formRef}
                                    layout="vertical"
                                    name="control-ref"
                                    requiredMark="optional"
                                    onFinish={this.onSubmit.bind(this)}
                                >
                                    <Form.Item
                                        name="displayName"
                                        label="Display name"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your display name!",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

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
                                        <Input.Password
                                            onChange={(e) =>
                                                this.onChangePassword(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name="confirmPassword"
                                        label="Confirm password"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please confirm your password!",
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (
                                                        !value ||
                                                        getFieldValue(
                                                            "password"
                                                        ) === value
                                                    ) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(
                                                        new Error(
                                                            "The two passwords do not match!"
                                                        )
                                                    );
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>

                                    <div className="password-score-container">
                                        <PasswordStrengthScore
                                            password={this.state.password}
                                        />
                                    </div>

                                    <Button
                                        htmlType="submit"
                                        type="primary"
                                        size="large"
                                        block
                                    >
                                        Sign up
                                    </Button>

                                    <Divider />

                                    <div className="text-secondary-color text-center">
                                        Already have an account?
                                    </div>
                                    <Link to={`${ROOT_PATH}/login`}>
                                        <Button type="link" block>
                                            Log in
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
    password: string;
};

type Query = {
    [key: string]: string[];
};

type FormData = {
    confirmPassword: string;
    displayName: string;
    email: string;
    password: string;
};

type Props = {
    navigate?: NavigateFunction;
    location?: Location;
};

export default withRouter(SignupPage);
