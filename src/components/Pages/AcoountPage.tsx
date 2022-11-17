import { Component } from "react";
import { Row, Col, message, Button } from "antd";
import { Link, NavigateFunction, Params } from "react-router-dom";
import styled from "styled-components";
import { ERRORS, ROOT_PATH, USER_GENDER } from "../../constants/appConstants";
import { UserInfo } from "../../models/user";
import withRouter from "../../hocs/withRouter";
import { getUserSelfApi } from "./../../services/apiServices";
import { T, langSlug } from "../../services/translateServices";
import LoadingModal from "../Utility/Modal/Loading";
import AccountLayout from "../Layout/AccountLayout";

const Container = styled.div`
    .section-header {
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        background-color: #eeeeee;
        border-radius: 8px;
        button {
            background-color: transparent;
            border-radius: 8px;
        }
    }
    .section-info {
        padding: 15px;
        .title {
            color: #666666;
        }
        .ant-col {
            padding: 15px 10px;
        }
        .ant-row {
            &:not(:last-child) {
                border-bottom: 1px solid #eeeeee;
            }
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

class AcoountPage extends Component<Props> {
    state: State = {
        isLoading: false,
        user: initialUser as UserInfo,
    };

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
        } catch (error: any) {
            message.error(error?.response?.data?.msg || ERRORS.unknown);
            this.setState({ isLoading: false });
        }
    }

    render() {
        const { user } = this.state;
        return (
            <Container>
                <AccountLayout title={T('USER_INFO')}>
                    <>
                        <div className="section-header">
                            <div className="text-lg text-bold">
                                {T("PROFILE")}
                            </div>
                            <Link to={`${ROOT_PATH}/account/profile`}>
                                <Button size="middle">{T("EDIT")}</Button>
                            </Link>
                        </div>
                        <div className="section-info text-md">
                            <Row>
                                <Col className="title" xs={10}>
                                    {T("DISPLAY_NAME")}
                                </Col>
                                <Col xs={14}>{user.display_name || "-"}</Col>
                            </Row>
                            <Row>
                                <Col className="title" xs={10}>
                                    {T("GENDER")}
                                </Col>
                                <Col xs={14}>
                                    {user.gender
                                        ? langSlug === "en"
                                            ? USER_GENDER[user.gender]?.name
                                            : USER_GENDER[user.gender]?.nameTh
                                        : "-"}
                                </Col>
                            </Row>
                            <Row>
                                <Col className="title" xs={10}>
                                    {T("COUNTRY_REGION")}
                                </Col>
                                <Col xs={14}>{user.country || "-"}</Col>
                            </Row>
                        </div>

                        <div className="section-header">
                            <div className="text-lg text-bold">
                                {T("CONTACTS")}
                            </div>
                        </div>
                        <div className="section-info text-md">
                            <Row>
                                <Col className="title" xs={10}>
                                    {T("EMAIL_ADDRESS")}
                                </Col>
                                <Col xs={14}>{user.email}</Col>
                            </Row>
                        </div>

                        <div className="section-header">
                            <div className="text-lg text-bold">
                                {T("PASSWORD")}
                            </div>
                            <Link to={`${ROOT_PATH}/account/password`}>
                                <Button size="middle">{T("EDIT")}</Button>
                            </Link>
                        </div>
                        <div className="section-info text-md">
                            <Row>
                                <Col className="title" xs={10}>
                                    {T("PASSWORD")}
                                </Col>
                                <Col className="text-2xl" xs={14}>
                                    ••••••
                                </Col>
                            </Row>
                        </div>
                    </>
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

export default withRouter(AcoountPage);
