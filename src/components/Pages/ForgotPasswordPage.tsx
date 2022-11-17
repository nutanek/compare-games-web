import React from "react";
import {
    Row,
    Col,
    Form,
    Input,
    FormInstance,
    Button,
    Divider,
    Modal,
    message,
} from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Component } from "react";
import { Link, NavigateFunction } from "react-router-dom";
import queryString from "query-string";
import styled from "styled-components";
import { isLoggedIn } from "../../services/appServices";
import { forgotPasswordApi } from "../../services/apiServices";
import { T, langSlug } from "../../services/translateServices";
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

class ForgotPasswordPage extends Component<Props> {
    state: State = {
        isLoading: false,
    };

    formRef = React.createRef<FormInstance>();

    componentDidMount() {
        if (isLoggedIn()) {
            window.location.replace(`${ROOT_PATH}/`);
        }
    }

    async sendRestLink(info: FormData): Promise<void> {
        try {
            this.setState({ isLoading: true });
            await forgotPasswordApi({ email: info.email });
            this.setState({ isLoading: false });
            Modal.success({
                title:
                    langSlug === "en"
                        ? "We've sent the link"
                        : "ส่งลิงก์เรียบร้อยแล้ว",
                content: `${
                    langSlug === "en"
                        ? "Please check your email inbox"
                        : "กรุณาตรวจสอบกล่องข้อความในอีเมล"
                } (${info.email})`,
                centered: true,
                okText: T("OK"),
            });
        } catch (error: any) {
            message.error(error?.response?.data?.msg || ERRORS.unknown);
            this.setState({ isLoading: false });
        }
    }

    onSubmit(values: FormData): void {
        this.sendRestLink(values);
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
                                    {T("FORGOT_PASSWORD")}?
                                </p>

                                <p className="text-secondary-color text-center">
                                    {langSlug === "en"
                                        ? `Enter your email and we'll send you a link
                                    to reset your password.`
                                        : `กรุณากรอกอีเมลของคุณ จากนั้นระบบจะส่งลิงก์สำหรับตั้งรหัสผ่านใหม่ให้ทางอีเมล`}
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

                                    <Button
                                        htmlType="submit"
                                        type="primary"
                                        size="large"
                                        block
                                    >
                                        {T("SUBMIT")}
                                    </Button>

                                    <Divider />

                                    <Link to={`${ROOT_PATH}/login`}>
                                        <Button
                                            type="link"
                                            block
                                            icon={<LeftOutlined />}
                                        >
                                            {T("BACK_LOGIN")}
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
};

type Props = {
    navigate?: NavigateFunction;
    location?: Location;
};

export default withRouter(ForgotPasswordPage);
