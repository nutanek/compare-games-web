import React, { Component } from "react";
import {
    Row,
    Col,
    message,
    Button,
    Form,
    Input,
    Select,
    FormInstance,
} from "antd";
import { NavigateFunction, Params } from "react-router-dom";
import styled from "styled-components";
import { ERRORS, ROOT_PATH, USER_GENDER } from "../../constants/appConstants";
import { UserInfo } from "../../models/user";
import withRouter from "../../hocs/withRouter";
import { updateUserPasswordApi } from "./../../services/apiServices";
import { T, langSlug } from "../../services/translateServices";
import LoadingModal from "../Utility/Modal/Loading";
import AccountLayout from "../Layout/AccountLayout";

const { Option } = Select;

const Container = styled.div`
    .profile {
        display: flex;
        flex-direction: column;
        align-items: center;
        .avatar-wrapper {
            width: 80%;
            max-width: 200px;
            > .avatar {
                position: relative;
                overflow: hidden;
                height: 0;
                padding-bottom: 100%;
                border-radius: 100%;
                background-color: #dddddd;
                img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
        .button-edit {
            margin: 10px 0;
        }
    }
`;

const initialUser = {
    id: 0,
    email: "",
    display_name: "",
    image: "",
    gender: "",
    country: "",
    role: "",
};

class AcoountPasswordPage extends Component<Props> {
    state: State = {
        isLoading: false,
        user: initialUser as UserInfo,
    };

    formRef = React.createRef<FormInstance>();

    async updatePassword(
        values: {
            password: string;
            confirmPassword: string;
        },
        onSuccess?: () => void
    ) {
        try {
            this.setState({ isLoading: true });
            await updateUserPasswordApi({
                password: values.password,
                confirm_password: values.confirmPassword,
            });
            message.success(T("SUCCESS"));
            this.setState({
                isLoading: false,
            });
            onSuccess && onSuccess();
        } catch (error: any) {
            message.error(error?.response?.data?.msg || ERRORS.unknown);
            this.setState({ isLoading: false });
        }
    }

    onSubmit(values: { password: string; confirmPassword: string }) {
        this.updatePassword(values, () => {
            this.props.navigate && this.props.navigate(`${ROOT_PATH}/account`);
        });
    }

    render() {
        const { user } = this.state;

        return (
            <Container>
                <AccountLayout title={T("CHANGE_PASSWORD")}>
                    <Row justify="center">
                        <Col xs={24} sm={24} md={20} lg={12} xl={8}>
                            <Form
                                ref={this.formRef}
                                name="profile"
                                layout="vertical"
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                requiredMark={false}
                                onFinish={this.onSubmit.bind(this)}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label={
                                        <div className="text-bold text-md">
                                            {T("NEW_PASSWORD")}
                                        </div>
                                    }
                                    name="password"
                                    style={{ width: "100%" }}
                                    rules={[
                                        {
                                            required: true,
                                            message: T("INPUT_REQUIRED", {
                                                text: T("NEW_PASSWORD"),
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
                                    <Input.Password size="large" />
                                </Form.Item>
                                <Form.Item
                                    label={
                                        <div className="text-bold text-md">
                                            {T("CONFIRM_PASSWORD")}
                                        </div>
                                    }
                                    name="confirmPassword"
                                    style={{ width: "100%" }}
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
                                    <Input.Password size="large" />
                                </Form.Item>
                                <div className="text-center">
                                    <Button
                                        htmlType="submit"
                                        type="primary"
                                        style={{ borderRadius: 8 }}
                                        size="large"
                                    >
                                        {T("SAVE_CHANGES")}
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </AccountLayout>

                <LoadingModal isOpen={this.state.isLoading} />
            </Container>
        );
    }
}

type State = {
    isLoading: boolean;
    user: UserInfo;
};

type Props = {
    navigate?: NavigateFunction;
    location?: Location;
};

export default withRouter(AcoountPasswordPage);
