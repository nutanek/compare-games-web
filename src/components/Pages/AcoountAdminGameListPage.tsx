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
    FormInstance,
    Table,
    Pagination,
    Popconfirm,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { Link, NavigateFunction, URLSearchParamsInit } from "react-router-dom";
import styled from "styled-components";
import queryString from "query-string";
import debounce from "lodash/debounce";
import numeral from "numeral";
import { ERRORS, ROOT_PATH, USER_GENDER } from "../../constants/appConstants";
import countries from "../../constants/countries.json";
import { Game } from "../../models/game";
import { UserGender, UserInfo } from "../../models/user";
import withRouter from "../../hocs/withRouter";
import {
    getUserSelfApi,
    updateUserSelfApi,
    getAllGamesApi,
    removeGameAdminApi,
} from "./../../services/apiServices";
import {
    getLocalUserInfo,
    setLocalUserInfo,
} from "./../../services/appServices";
import LoadingModal from "../Utility/Modal/Loading";
import AccountLayout from "../Layout/AccountLayout";

const { Option } = Select;

const Container = styled.div`
    .pagination-container {
        margin-top: 20px;
        text-align: right;
    }
    img {
        width: 80px;
        height: 80px;
        border-radius: 8px;
        object-fit: cover;
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

class AcoountAdminGameListPage extends Component<Props> {
    state: State = {
        isLoading: false,
        page: 1,
        itemsPerPage: 0,
        total: 0,
        sortingId: 1,
        keyword: "",
        games: [],
    };

    formRef = React.createRef<FormInstance>();

    debouncedChangeKeyword = debounce(this.onSearch.bind(this), 300);

    componentDidMount() {
        let queryStr = this.props.location?.search ?? "";
        this.getGameList(queryStr);
    }

    componentWillReceiveProps(nextProps: Props) {
        let queryStr = this.props.location?.search ?? "";
        let nextQueryStr = nextProps.location?.search ?? "";
        if (queryStr !== nextQueryStr) {
            this.getGameList(nextQueryStr);
        }
    }

    async getGameList(queryStr: string): Promise<void> {
        const { query, sortingId, page } = this.generateQuery(queryStr);

        try {
            this.setState({ isLoading: true });
            let { data } = await getAllGamesApi({
                filter: query,
                sorting_id: sortingId,
                keyword: this.state.keyword,
                items_per_page: 10,
                page,
            });
            this.setState({
                isLoading: false,
                title: data.title,
                page: data.page,
                itemsPerPage: data.items_per_page,
                total: data.total,
                sortingId: data.sorting_id,
                filter: data.filter,
                games: data.games,
            });
        } catch (error: any) {
            this.setState({ isLoading: false });
            message.error(error?.response?.data?.msg || ERRORS.unknown);
        }
    }

    async removeGame(id: number, onSuccess?: () => void): Promise<void> {
        try {
            this.setState({ isLoading: true });
            await removeGameAdminApi({ id });
            this.setState({
                isLoading: false,
            });
            onSuccess && onSuccess()
            message.success("Success!");
        } catch (error: any) {
            this.setState({ isLoading: false });
            message.error(error?.response?.data?.msg || ERRORS.unknown);
        }
    }

    onRemoveGame(id: number) {
        this.removeGame(id, () => {
            let queryStr = this.props.location?.search ?? "";
            this.getGameList(queryStr);
        });
    }

    generateQuery(queryStr: string): {
        query: Query;
        sortingId: number;
        page: number;
    } {
        let query = queryString.parse(queryStr);
        for (let [key, value] of Object.entries(query)) {
            if (typeof value === "string") {
                query[key] = [value];
            }
        }
        let page = 1;
        try {
            page = query.page ? parseInt(query.page[0] as string) : 1;
        } catch (error) {}
        let sortingId = 1;
        try {
            sortingId = query.sorting
                ? parseInt(query.sorting[0] as string)
                : 1;
        } catch (error) {}
        return { query: query as Query, sortingId, page };
    }

    onChangePage(page: number): void {
        this.setState({ page }, () => {
            this.redirect();
            window.scrollTo(0, 0);
        });
    }

    redirect(): void {
        let query: any = {};

        if (this.state.page !== 1) {
            query.page = this.state.page;
        }

        this.props.navigateSearch &&
            this.props.navigateSearch(`${ROOT_PATH}/account/admin/games`, {
                ...query,
            });
    }

    onClickRow(id: number) {
        this.props.navigateSearch &&
            this.props.navigateSearch(
                `${ROOT_PATH}/account/admin/game/${id}`,
                {}
            );
    }

    onChangeKeyword(value: string): void {
        this.setState({ keyword: value, page: 1 }, () =>
            this.debouncedChangeKeyword()
        );
    }

    onSearch() {
        let queryStr = this.props.location?.search ?? "";
        this.getGameList(queryStr);
        this.redirect();
    }

    render() {
        return (
            <Container>
                <AccountLayout title="All games">
                    <div>
                        <Row gutter={[10, 10]} style={{ marginBottom: 20 }}>
                            <Col xs={24} md={12} lg={10}>
                                <Input
                                    allowClear
                                    size="large"
                                    placeholder="Search games"
                                    prefix={<SearchOutlined />}
                                    value={this.state.keyword}
                                    onChange={(e) =>
                                        this.onChangeKeyword(e.target.value)
                                    }
                                />
                            </Col>
                            <Col
                                xs={24}
                                md={12}
                                lg={14}
                                style={{ textAlign: "right" }}
                            >
                                <Link to={`${ROOT_PATH}/account/admin/game`}>
                                    <Button
                                        type="primary"
                                        size="large"
                                        icon={<PlusOutlined />}
                                        style={{ borderRadius: 8 }}
                                    >
                                        Add game
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                        <Table
                            dataSource={this.state.games}
                            pagination={false}
                            columns={[
                                {
                                    responsive: ["md", "lg", "xl", "xxl"],
                                    title: "Image",
                                    dataIndex: "image",
                                    key: "image",
                                    align: "center",
                                    className: "pointer text-md",
                                    onCell: (record) => {
                                        return {
                                            onClick: () =>
                                                this.onClickRow(record.id),
                                        };
                                    },
                                    render: (value) => <img src={value} />,
                                },
                                {
                                    title: "Name",
                                    dataIndex: "name",
                                    key: "name",
                                    className: "pointer text-md",
                                    onCell: (record) => {
                                        return {
                                            onClick: () =>
                                                this.onClickRow(record.id),
                                        };
                                    },
                                },
                                {
                                    title: "Lowest price (THB)",
                                    dataIndex: "price",
                                    key: "price",
                                    align: "right",
                                    className: "pointer text-md",
                                    onCell: (record) => {
                                        return {
                                            onClick: () =>
                                                this.onClickRow(record.id),
                                        };
                                    },
                                    render: (value) => (
                                        <span>
                                            {numeral(value || 0).format(
                                                "0,0.00"
                                            )}
                                        </span>
                                    ),
                                },
                                {
                                    title: "",
                                    dataIndex: "action",
                                    key: "action",
                                    align: "right",
                                    render: (value, record, index) => (
                                        <span>
                                            <Link
                                                to={`${ROOT_PATH}/account/admin/game/${record.id}`}
                                            >
                                                <Button
                                                    type="primary"
                                                    style={{ borderRadius: 8 }}
                                                    icon={<EditOutlined />}
                                                ></Button>
                                            </Link>

                                            <Popconfirm
                                                title="Are you sure to delete this game?"
                                                onConfirm={() =>
                                                    this.onRemoveGame(record.id)
                                                }
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Button
                                                    style={{
                                                        marginLeft: 10,
                                                        borderRadius: 8,
                                                    }}
                                                    danger
                                                    type="primary"
                                                    icon={<DeleteOutlined />}
                                                ></Button>
                                            </Popconfirm>
                                        </span>
                                    ),
                                },
                            ]}
                        />
                    </div>
                    <div className="pagination-container">
                        <Pagination
                            current={this.state.page}
                            pageSize={this.state.itemsPerPage}
                            total={this.state.total}
                            showSizeChanger={false}
                            onChange={this.onChangePage.bind(this)}
                        />
                    </div>
                </AccountLayout>

                <LoadingModal isOpen={this.state.isLoading} />
            </Container>
        );
    }
}

type State = {
    page: number;
    itemsPerPage: number;
    total: number;
    sortingId: number;
    games: Game[];
    keyword: string;
    isLoading: boolean;
};

type Query = {
    [key: string]: string[];
};

type Props = {
    navigateSearch?: (pathname: string, params: URLSearchParamsInit) => void;
    location?: Location;
};

export default withRouter(AcoountAdminGameListPage);
