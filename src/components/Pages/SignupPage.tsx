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
    isLoggedIn,
    setLocalAccessToken,
    setLocalUserInfo,
} from "./../../services/appServices";
import { signupApi } from "./../../services/apiServices";
import { T, langSlug } from "../../services/translateServices";
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

class SignupPage extends Component<Props> {
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

    async signup(info: FormData): Promise<void> {
        try {
            this.setState({ isLoading: true });
            let { data } = await signupApi({
                display_name: info.displayName,
                email: info.email,
                password: info.password,
                confirm_password: info.confirmPassword,
            });
            setLocalAccessToken(data.access_token);
            setLocalUserInfo(data);
            message.success(T("SUCCESS"));
            this.setState({ isLoading: false });
            setTimeout(() => this.redirect(), 300);
        } catch (error: any) {
            message.error(error?.response?.data?.msg || ERRORS.unknown);
            this.setState({ isLoading: false });
        }
    }

    onChangePassword(password: string): void {
        this.setState({ password });
    }

    redirect(): void {
        let queryStr = this.props.location?.search || "";
        let query = queryString.parse(queryStr);
        if (query.callback) {
            window.location.replace(query.callback as string);
        } else {
            window.location.replace(`${ROOT_PATH}/`);
        }
    }

    onSubmit(values: FormData): void {
        this.signup(values);
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
                                    {T("SIGN_UP")}
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
                                        label={T("DISPLAY_NAME")}
                                        rules={[
                                            {
                                                required: true,
                                                message: T("INPUT_REQUIRED", {
                                                    text: T("DISPLAY_NAME"),
                                                }),
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="email"
                                        label={T("EMAIL")}
                                        rules={[
                                            {
                                                required: true,
                                                message: T("INPUT_REQUIRED", {
                                                    text: T("EMAIL"),
                                                }),
                                            },
                                            {
                                                type: "email",
                                                message: T("INPUT_INVALID", {
                                                    text: T("EMAIL"),
                                                }),
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="password"
                                        label={T("PASSWORD")}
                                        rules={[
                                            {
                                                required: true,
                                                message: T("INPUT_REQUIRED", {
                                                    text: T("PASSWORD"),
                                                }),
                                            },
                                            {
                                                min: 8,
                                                message:
                                                    langSlug === "en"
                                                        ? "Password must be at least 8 characters"
                                                        : "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร",
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
                                        label={T("CONFIRM_PASSWORD")}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: T("INPUT_REQUIRED", {
                                                    text: T("CONFIRM_PASSWORD"),
                                                }),
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
                                                            langSlug == "en"
                                                                ? "The two passwords do not match!"
                                                                : "รหัสผ่านทั้งคู่ไม่ตรงกัน"
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
                                        {T("SIGN_UP")}
                                    </Button>

                                    <Divider />

                                    <div className="text-secondary-color text-center">
                                        {T("ALREADY_ACCOUNT")}
                                    </div>
                                    <Link to={`${ROOT_PATH}/login`}>
                                        <Button type="link" block>
                                            {T("LOGIN")}
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
