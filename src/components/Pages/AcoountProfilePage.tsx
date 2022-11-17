import React, { Component } from "react";
import {
    Row,
    Col,
    message,
    Button,
    Form,
    Input,
    Divider,
    Radio,
    Select,
    Upload,
    FormInstance,
} from "antd";
import { NavigateFunction } from "react-router-dom";
import styled from "styled-components";
import { cloneDeep } from "lodash";
import {
    ERRORS,
    IMAGE_PATH,
    ROOT_PATH,
    USER_GENDER,
} from "../../constants/appConstants";
import countries from "../../constants/countries.json";
import { UserGender, UserInfo } from "../../models/user";
import withRouter from "../../hocs/withRouter";
import {
    getUserSelfApi,
    updateUserSelfApi,
    uploadImageApi,
} from "./../../services/apiServices";
import {
    getLocalUserInfo,
    setLocalUserInfo,
} from "./../../services/appServices";
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

class AcoountProfilePage extends Component<Props> {
    state: State = {
        isLoading: false,
        user: initialUser as UserInfo,
    };

    formRef = React.createRef<FormInstance>();

    componentDidMount() {
        this.getUser();
    }

    async getUser() {
        try {
            this.setState({ isLoading: true });
            let { data: user } = await getUserSelfApi();
            this.setState({
                isLoading: false,
                user,
            });
            this.formRef.current?.setFieldsValue({
                displayName: user.display_name,
                gender: user.gender,
                country: user.country,
            });
        } catch (error: any) {
            message.error(error?.response?.data?.msg || ERRORS.unknown);
            this.setState({ isLoading: false });
        }
    }

    async updateUser(
        values: {
            displayName: string;
            image: string;
            country: string;
            gender: UserGender;
        },
        onSuccess?: () => void
    ) {
        try {
            this.setState({ isLoading: true });
            await updateUserSelfApi({
                display_name: values.displayName,
                image: values.image,
                country: values.country,
                gender: values.gender,
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

    async uploadImage(file: File, onSuccess?: (image: string) => void) {
        try {
            this.setState({ isLoading: true });
            const formData = new FormData();
            formData.append("path", "users");
            formData.append("image", file);
            formData.append("width", "200");
            formData.append("height", "200");
            let { data: image } = await uploadImageApi(formData);
            this.setState({
                isLoading: false,
            });
            onSuccess && onSuccess(image.name);
        } catch (error: any) {
            message.error(error?.response?.data?.msg || ERRORS.unknown);
            this.setState({ isLoading: false });
        }
    }

    onSubmit(values: {
        displayName: string;
        gender: UserGender;
        country: string;
    }) {
        this.updateUser({ ...values, image: this.state.user.image }, () => {
            let user = getLocalUserInfo();
            user.display_name = values.displayName;
            user.image = this.state.user.image;
            setLocalUserInfo(user);
            this.forceUpdate();
            this.props.navigate && this.props.navigate(`${ROOT_PATH}/account`);
        });
    }

    onChangeImage(info: any) {
        if (info.file.status !== "uploading") {
            console.log(info.fileList[0]);
            this.uploadImage(info.fileList[0].originFileObj, (image) => {
                let user = cloneDeep(this.state.user);
                user.image = image;
                this.setState({ user });
            });
        }
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    render() {
        const { user } = this.state;

        return (
            <Container>
                <AccountLayout title="Profile">
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
                        <Row gutter={30}>
                            <Col className="profile" xs={24} lg={3}>
                                <div className="avatar-wrapper">
                                    <div className="avatar">
                                        <img
                                            src={
                                                user.image
                                                    ? `${IMAGE_PATH}/users/${user.image}`
                                                    : `${ROOT_PATH}/images/no-avatar.png`
                                            }
                                            alt="user"
                                        />
                                    </div>
                                </div>
                                <Upload
                                    beforeUpload={() => false}
                                    accept="image/png, image/gif, image/jpeg, image/jpg"
                                    fileList={[]}
                                    onChange={this.onChangeImage.bind(this)}
                                >
                                    <Button
                                        className="button-edit"
                                        style={{ borderRadius: 8 }}
                                        size="small"
                                    >
                                        {T("EDIT")}
                                    </Button>
                                </Upload>
                            </Col>
                            <Col xs={24} lg={21}>
                                <Form.Item
                                    label={
                                        <div className="text-bold text-md">
                                            {T("DISPLAY_NAME")}
                                        </div>
                                    }
                                    name="displayName"
                                    style={{ width: "100%" }}
                                    rules={[
                                        {
                                            required: true,
                                            message: T("INPUT_REQUIRED", {
                                                text: T("DISPLAY_NAME"),
                                            }),
                                        },
                                    ]}
                                >
                                    <Input className="text-md" size="large" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Divider />

                        <Form.Item
                            label={
                                <div className="text-bold text-md">
                                    {T("GENDER")}
                                </div>
                            }
                            name="gender"
                            style={{ width: "100%" }}
                        >
                            <Radio.Group>
                                <Radio value="m">
                                    <span className="text-md">
                                        {langSlug === "en"
                                            ? USER_GENDER["m"].name
                                            : USER_GENDER["m"].nameTh}
                                    </span>
                                </Radio>
                                <Radio value="f">
                                    <span className="text-md">
                                        {langSlug === "en"
                                            ? USER_GENDER["f"].name
                                            : USER_GENDER["f"].nameTh}
                                    </span>
                                </Radio>
                                <Radio value="n">
                                    <span className="text-md">
                                        {langSlug === "en"
                                            ? USER_GENDER["n"].name
                                            : USER_GENDER["n"].nameTh}
                                    </span>
                                </Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            label={
                                <div className="text-bold text-md">
                                    {T("COUNTRY_REGION")}
                                </div>
                            }
                            name="country"
                            style={{ width: "100%" }}
                        >
                            <Select
                                showSearch
                                placeholder={T("SELECT_COUNTRY")}
                                size="large"
                            >
                                {countries.map((country) => (
                                    <Option
                                        key={country.code}
                                        value={country.name}
                                    >
                                        {country.name}
                                    </Option>
                                ))}
                            </Select>
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

export default withRouter(AcoountProfilePage);
