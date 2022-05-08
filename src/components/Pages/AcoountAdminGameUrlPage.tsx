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
    Alert,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import { NavigateFunction } from "react-router-dom";
import styled from "styled-components";
import { ERRORS, ROOT_PATH } from "../../constants/appConstants";
import { GameAdmin } from "../../models/game";
import withRouter from "../../hocs/withRouter";
import { addGameFromUrlAdminApi } from "./../../services/apiServices";
import LoadingModal from "../Utility/Modal/Loading";
import AccountLayout from "../Layout/AccountLayout";

const Container = styled.div`
    .section-header {
        padding: 15px 20px;
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
        background-color: #eeeeee;
        border-radius: 8px;
    }
    .price-info {
        padding: 0 0 25px 25px;
        .ant-input-number {
            border-radius: 0 !important;
        }
    }
`;

class AcoountAdminGameUrlPage extends Component<Props> {
    state: State = {
        isLoading: false,
        gameId: 0,
    };

    formRef = React.createRef<FormInstance>();

    async addGameFromUrlAdmin(url: string, onSuccess?: (id: number) => void) {
        try {
            this.setState({ isLoading: true, gameId: 0 });
            let { data } = await addGameFromUrlAdminApi({ url });
            message.success("Success!");
            this.setState({
                isLoading: false,
            });
            onSuccess && onSuccess(data.id);
            this.formRef.current?.setFieldsValue({
                url: "",
            });
        } catch (error: any) {
            message.error(error?.response?.data?.msg || ERRORS.unknown);
            this.setState({ isLoading: false });
        }
    }

    onSubmit(values: any) {
        this.addGameFromUrlAdmin(values.url, (id) => {
            this.setState({ gameId: id });
        });
    }

    render() {
        let { isLoading, gameId } = this.state;
        return (
            <Container>
                <AccountLayout title={"Add game from PlayStation URL"}>
                    <Form
                        ref={this.formRef}
                        name="game_url"
                        layout="vertical"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        requiredMark={false}
                        onFinish={this.onSubmit.bind(this)}
                        autoComplete="off"
                    >
                        <Row gutter={30}>
                            <Col xs={24}>
                                <Form.Item
                                    label={
                                        <div className="text-bold text-md">
                                            PlayStation game URL
                                        </div>
                                    }
                                    name="url"
                                    style={{ width: "100%" }}
                                    rules={[
                                        {
                                            required: true,
                                            message: "URL is required!",
                                        },
                                    ]}
                                >
                                    <Input
                                        className="text-md"
                                        size="large"
                                        placeholder="https://store.playstation.com/en-th/product/xxxxx"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        {!!gameId && (
                            <Alert
                                style={{ marginBottom: 15 }}
                                message={
                                    <>
                                        Success!{" "}
                                        <a
                                            href={`${ROOT_PATH}/account/admin/game/${gameId}`}
                                            target="_blank"
                                        >
                                            View game detail
                                        </a>
                                    </>
                                }
                                type="success"
                            />
                        )}

                        <div className="text-center">
                            <Button
                                htmlType="submit"
                                type="primary"
                                style={{ borderRadius: 8 }}
                                size="large"
                            >
                                Submit
                            </Button>
                        </div>
                    </Form>
                </AccountLayout>

                <LoadingModal isOpen={isLoading} />
            </Container>
        );
    }
}

type State = {
    isLoading: boolean;
    gameId: number;
};

type Props = {
    navigate?: NavigateFunction;
    location?: Location;
};

export default withRouter(AcoountAdminGameUrlPage);
