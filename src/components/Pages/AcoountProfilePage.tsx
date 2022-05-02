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
    AutoComplete,
    Select,
    FormInstance,
} from "antd";
import { Link, NavigateFunction, Params } from "react-router-dom";
import styled from "styled-components";
import cloneDeep from "lodash/cloneDeep";
import { ERRORS, ROOT_PATH, USER_GENDER } from "../../constants/appConstants";
import countries from "../../constants/countries.json";
import { UserGender, UserInfo } from "../../models/user";
import withRouter from "../../hocs/withRouter";
import { getUserSelf, updateUserSelf } from "./../../services/apiServices";
import {
    getLocalUserInfo,
    setLocalUserInfo,
} from "./../../services/appServices";
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
            let { data: user } = await getUserSelf();
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
            await updateUserSelf({
                display_name: values.displayName,
                image: values.image,
                country: values.country,
                gender: values.gender,
            });
            message.success("Success!");
            this.setState({
                isLoading: false,
            });
            onSuccess && onSuccess();
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
                                        <img src={user.image} alt="user" />
                                    </div>
                                </div>
                                <Button
                                    className="button-edit"
                                    shape="round"
                                    size="small"
                                >
                                    Edit
                                </Button>
                            </Col>
                            <Col xs={24} lg={21}>
                                <Form.Item
                                    label={
                                        <div className="text-bold text-md">
                                            Display name
                                        </div>
                                    }
                                    name="displayName"
                                    style={{ width: "100%" }}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your display name!",
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
                                <div className="text-bold text-md">Gender</div>
                            }
                            name="gender"
                            style={{ width: "100%" }}
                        >
                            <Radio.Group>
                                <Radio value="m">
                                    <span className="text-md">
                                        {USER_GENDER["m"]}
                                    </span>
                                </Radio>
                                <Radio value="f">
                                    <span className="text-md">
                                        {USER_GENDER["f"]}
                                    </span>
                                </Radio>
                                <Radio value="n">
                                    <span className="text-md">
                                        {USER_GENDER["n"]}
                                    </span>
                                </Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            label={
                                <div className="text-bold text-md">
                                    Country/region of residence
                                </div>
                            }
                            name="country"
                            style={{ width: "100%" }}
                        >
                            <Select
                                showSearch
                                placeholder="Select a country"
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
                                shape="round"
                                size="large"
                            >
                                Save changes
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
