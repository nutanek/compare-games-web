import React from "react";
import {
    Row,
    Col,
    Form,
    Input,
    FormInstance,
    Button,
    Modal,
    message,
} from "antd";
import { Component } from "react";
import { Link, NavigateFunction } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components";
import { isLoggedIn } from "./../../services/appServices";
import { resetPassword } from "./../../services/apiServices";
import withRouter from "./../../hocs/withRouter";
import LoadingModal from "../Utility/Modal/Loading";
import PasswordStrengthScore from "../Utility/PasswordStrengthScore";

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
            .password-score-container {
                padding-bottom: 30px;
            }
        }
        button {
            border-radius: 8px;
        }
    }
`;

class ResetPasswordPage extends Component<Props> {
    state: State = {
        isLoading: false,
        password: "",
    };

    formRef = React.createRef<FormInstance>();

    componentDidMount() {
        if (isLoggedIn()) {
            window.location.replace(`${ROOT_PATH}/`);
        }
    }

    async resetPassword(info: FormData): Promise<void> {
        try {
            let queryStr = this.props.location?.search || "";
            let query = queryString.parse(queryStr);
            this.setState({ isLoading: true });
            await resetPassword({
                token: query.token,
                password: info.password,
                confirm_password: info.confirmPassword,
            });
            this.setState({ isLoading: false });
            Modal.success({
                title: "Your password have changed",
                centered: true,
                maskClosable: true,
                afterClose: () => {
                    window.location.replace(`${ROOT_PATH}/`);
                },
            });
        } catch (error: any) {
            message.error(error?.response?.data?.msg || ERRORS.unknown);
            this.setState({ isLoading: false });
        }
    }

    onChangePassword(password: string): void {
        this.setState({ password });
    }

    onSubmit(values: FormData): void {
        this.resetPassword(values);
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
                                <img
                                    src={`${ROOT_PATH}/images/logo.png`}
                                    alt="logo"
                                />
                                <div className="name text-bold text-xl">
                                    Console
                                </div>
                            </div>
                            <div className="body">
                                <p className="text-center text-bold text-4xl">
                                    Reset Password
                                </p>
                                <Form
                                    ref={this.formRef}
                                    layout="vertical"
                                    name="control-ref"
                                    requiredMark="optional"
                                    onFinish={this.onSubmit.bind(this)}
                                >
                                    <Form.Item
                                        name="password"
                                        label="New password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your new password!",
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
                                        label="Confirm new password"
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please confirm your new password!",
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
                                        Submit
                                    </Button>
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
    password: string;
    confirmPassword: string;
};

type Props = {
    navigate?: NavigateFunction;
    location?: Location;
};

export default withRouter(ResetPasswordPage);
