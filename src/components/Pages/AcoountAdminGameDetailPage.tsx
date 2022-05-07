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
    DatePicker,
    InputNumber,
    Checkbox,
    Upload,
    Image,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";
import { NavigateFunction } from "react-router-dom";
import styled from "styled-components";
import { cloneDeep } from "lodash";
import {
    ERRORS,
    IMAGE_PATH,
    ROOT_PATH,
    USER_GENDER,
} from "../../constants/appConstants";
import { GameAdmin, PlatformKey, SingleGameGenre } from "../../models/game";
import withRouter from "../../hocs/withRouter";
import {
    getAllGameGenresAdminApi,
    getGameAdminApi,
    addGameAdminApi,
    updateGameAdminApi,
    uploadImageApi,
} from "./../../services/apiServices";
import LoadingModal from "../Utility/Modal/Loading";
import AccountLayout from "../Layout/AccountLayout";

const { Option } = Select;

const DATE_FORMAT = "MMM DD, YYYY";

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

const PLATFOTM = {
    ps: "PlayStation",
    xbox: "Xbox",
    nintendo: "Nintendo",
};

const initialGame: GameAdmin = {
    id: 0,
    name: "",
    image: "",
    detail: "",
    release_date: 0,
    developer: "",
    voices: [],
    subtitles: [],
    metacritic_rating: 0,
    metacritic_rating_count: 0,
    user_rating: 0,
    user_rating_count: 0,
    original_price_ps: 0,
    sale_price_ps: 0,
    original_price_xbox: 0,
    sale_price_xbox: 0,
    original_price_nintendo: 0,
    sale_price_nintendo: 0,
    in_platform_ps: false,
    in_platform_xbox: false,
    in_platform_nintendo: false,
    genres: [],
};

class AcoountAdminGameDetailPage extends Component<Props> {
    state: State = {
        isLoading: false,
        game: initialGame as GameAdmin,
        allGenres: [] as SingleGameGenre[],
    };

    formRef = React.createRef<FormInstance>();

    componentDidMount() {
        if (this.props.type === "EDIT") {
            const params = this.props.urlParams;
            this.getGame(params?.id || 0);
        }
        this.getAllGameGenresAdmin();
    }

    async getGame(id: number) {
        try {
            this.setState({ isLoading: true });
            let { data: game } = await getGameAdminApi({ id });
            this.setState({
                isLoading: false,
                game,
            });
            this.formRef.current?.setFieldsValue({
                name: game.name,
                detail: game.detail,
                releaseDate: moment.unix(game.release_date / 1000),
                developer: game.developer,
                genres: game.genres.map((genre) => genre.id),
                voices: game.voices,
                subtitles: game.subtitles,
                metacriticRating: game.metacritic_rating || 0,
                metacriticRatingCount: game.metacritic_rating_count || 0,
                originalPricePs: game.original_price_ps || 0,
                salePricePs: game.sale_price_ps || 0,
                originalPriceXbox: game.original_price_xbox || 0,
                salePriceXbox: game.sale_price_xbox || 0,
                originalPriceNintendo: game.original_price_nintendo || 0,
                salePriceNintendo: game.sale_price_nintendo || 0,
            });
        } catch (error: any) {
            message.error(error?.response?.data?.msg || ERRORS.unknown);
            this.setState({ isLoading: false });
        }
    }

    async getAllGameGenresAdmin() {
        try {
            this.setState({ isLoading: true });
            let { data: genres } = await getAllGameGenresAdminApi();
            this.setState({
                isLoading: false,
                allGenres: genres || [],
            });
        } catch (error: any) {
            message.error(error?.response?.data?.msg || ERRORS.unknown);
            this.setState({ isLoading: false });
        }
    }

    async updateGame(dataStr: string, onSuccess?: () => void) {
        try {
            this.setState({ isLoading: true });
            await updateGameAdminApi({ data: dataStr });
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

    async addGame(dataStr: string, onSuccess?: () => void) {
        try {
            this.setState({ isLoading: true });
            await addGameAdminApi({ data: dataStr });
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

    async uploadImage(file: File, onSuccess?: (image: string) => void) {
        try {
            this.setState({ isLoading: true });
            const formData = new FormData();
            formData.append("path", "games");
            formData.append("image", file);
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

    onChangeImage(info: any) {
        if (info.file.status !== "uploading") {
            console.log(info.fileList[0]);
            this.uploadImage(info.fileList[0].originFileObj, (image) => {
                let game = cloneDeep(this.state.game);
                game.image = image;
                this.setState({ game });
            });
        }
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    onSubmit(values: any) {
        let { game } = this.state;
        let data = {
            id: game.id,
            name: values.name,
            image: game.image,
            detail: values.detail,
            release_date: moment(values.releaseDate).unix() * 1000,
            developer: values.developer,
            genres: values.genres,
            voices: values.voices,
            subtitles: values.subtitles,
            metacritic_rating: values.metacriticRating,
            metacritic_rating_count: values.metacriticRatingCount,
            original_price_ps: values.originalPricePs || 0,
            sale_price_ps: values.salePricePs || 0,
            original_price_xbox: values.originalPriceXbox || 0,
            sale_price_xbox: values.salePriceXbox || 0,
            original_price_nintendo: values.originalPriceNintendo || 0,
            sale_price_nintendo: values.salePriceNintendo || 0,
            in_platform_ps: game.in_platform_ps,
            in_platform_xbox: game.in_platform_xbox,
            in_platform_nintendo: game.in_platform_nintendo,
        };

        let dataStr = JSON.stringify(data);

        if (this.props.type === "ADD") {
            this.addGame(dataStr, () => {
                this.props.navigate &&
                    this.props.navigate(`${ROOT_PATH}/account/admin/games`);
            });
        } else if (this.props.type === "EDIT") {
            this.updateGame(dataStr, () => {
                this.props.navigate &&
                    this.props.navigate(`${ROOT_PATH}/account/admin/games`);
            });
        }
    }

    onSelectPlatform(platform: string, status: boolean) {
        let game = cloneDeep(this.state.game);
        if (platform == "ps") {
            game.in_platform_ps = status;
        } else if (platform == "xbox") {
            game.in_platform_xbox = status;
        }
        if (platform == "nintendo") {
            game.in_platform_nintendo = status;
        }
        this.setState({ game });
    }

    onSelectOnSale(platform: string, status: boolean) {
        let game = cloneDeep(this.state.game);
        if (platform == "ps") {
            game.sale_price_ps = status ? 1 : 0;
            this.formRef.current?.setFieldsValue({
                salePricePs: game.sale_price_ps,
            });
        } else if (platform == "xbox") {
            game.sale_price_xbox = status ? 1 : 0;
            this.formRef.current?.setFieldsValue({
                salePriceXbox: game.sale_price_xbox,
            });
        } else if (platform == "nintendo") {
            game.sale_price_nintendo = status ? 1 : 0;
            this.formRef.current?.setFieldsValue({
                salePriceNintendo: game.sale_price_nintendo,
            });
        }
        this.setState({ game });
    }

    render() {
        let { game, allGenres, isLoading } = this.state;
        return (
            <Container>
                <AccountLayout
                    title={
                        isLoading
                            ? "game"
                            : this.props.type == "ADD"
                            ? "Add game"
                            : "Edit game"
                    }
                >
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
                            <Col xs={24} lg={21}>
                                <div className="section-header text-lg text-bold">
                                    Basic info
                                </div>

                                <Form.Item
                                    label={
                                        <div className="text-bold text-md">
                                            Image
                                        </div>
                                    }
                                    style={{ width: "100%" }}
                                >
                                    <>
                                        {game.image && (
                                            <div style={{ marginBottom: 10 }}>
                                                <Image
                                                    width={200}
                                                    src={`${IMAGE_PATH}/games/${game.image}`}
                                                />
                                            </div>
                                        )}
                                        <Upload
                                            beforeUpload={() => false}
                                            accept="image/png, image/gif, image/jpeg, image/jpg"
                                            fileList={[]}
                                            onChange={this.onChangeImage.bind(
                                                this
                                            )}
                                        >
                                            <Button
                                                type="primary"
                                                style={{ borderRadius: 8 }}
                                                size="large"
                                                icon={<UploadOutlined />}
                                            >
                                                {game.image
                                                    ? "Change image"
                                                    : "Upload image"}
                                            </Button>
                                        </Upload>
                                    </>
                                </Form.Item>

                                <Form.Item
                                    label={
                                        <div className="text-bold text-md">
                                            Name
                                        </div>
                                    }
                                    name="name"
                                    style={{ width: "100%" }}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Name is required!",
                                        },
                                    ]}
                                >
                                    <Input className="text-md" size="large" />
                                </Form.Item>

                                <Form.Item
                                    label={
                                        <div className="text-bold text-md">
                                            Description
                                        </div>
                                    }
                                    name="detail"
                                    style={{ width: "100%" }}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Description is required!",
                                        },
                                    ]}
                                >
                                    <Input.TextArea
                                        className="text-md"
                                        size="large"
                                        autoSize={{ minRows: 4, maxRows: 10 }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={
                                        <div className="text-bold text-md">
                                            Genres
                                        </div>
                                    }
                                    name="genres"
                                    style={{ width: "100%" }}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Genre is required!",
                                        },
                                    ]}
                                >
                                    <Select
                                        mode="multiple"
                                        placeholder="Please select a genre"
                                        size="large"
                                    >
                                        {allGenres.map((genre) => (
                                            <Option
                                                key={genre.id}
                                                value={genre.id}
                                            >
                                                {genre.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label={
                                        <div className="text-bold text-md">
                                            Release date
                                        </div>
                                    }
                                    name="releaseDate"
                                    style={{ width: "100%" }}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Release date is required!",
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        format={DATE_FORMAT}
                                        style={{ width: "100%" }}
                                        size="large"
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={
                                        <div className="text-bold text-md">
                                            Developer
                                        </div>
                                    }
                                    name="developer"
                                    style={{ width: "100%" }}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Developer is required!",
                                        },
                                    ]}
                                >
                                    <Input className="text-md" size="large" />
                                </Form.Item>

                                <Form.Item
                                    label={
                                        <div className="text-bold text-md">
                                            Voices
                                        </div>
                                    }
                                    name="voices"
                                    style={{ width: "100%" }}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Voices is required!",
                                        },
                                    ]}
                                >
                                    <Select
                                        mode="tags"
                                        placeholder="Please select voice languages"
                                        size="large"
                                    >
                                        <Option value="china">China</Option>
                                        <Option value="usa">U.S.A</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label={
                                        <div className="text-bold text-md">
                                            Subtitles
                                        </div>
                                    }
                                    name="subtitles"
                                    style={{ width: "100%" }}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Subtitles is required!",
                                        },
                                    ]}
                                >
                                    <Select
                                        mode="tags"
                                        placeholder="Please select subtitle languages"
                                        size="large"
                                    >
                                        <Option value="china">China</Option>
                                        <Option value="usa">U.S.A</Option>
                                    </Select>
                                </Form.Item>

                                <Row gutter={15}>
                                    <Col xs={12}>
                                        <Form.Item
                                            label={
                                                <div className="text-bold text-md">
                                                    Metacritic rating
                                                </div>
                                            }
                                            name="metacriticRating"
                                            style={{ width: "100%" }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Metacritic rating is required!",
                                                },
                                            ]}
                                        >
                                            <InputNumber
                                                style={{ width: "100%" }}
                                                className="text-md"
                                                min={0}
                                                max={5}
                                                size="large"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={12}>
                                        <Form.Item
                                            label={
                                                <div className="text-bold text-md">
                                                    Number of metacritics
                                                </div>
                                            }
                                            name="metacriticRatingCount"
                                            style={{ width: "100%" }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Number of metacritics is required!",
                                                },
                                            ]}
                                        >
                                            <InputNumber
                                                style={{ width: "100%" }}
                                                className="text-md"
                                                min={0}
                                                size="large"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <div
                                    className="section-header text-lg text-bold"
                                    style={{ marginTop: 30 }}
                                >
                                    Platforms & Pricing
                                </div>

                                {["Ps", "Xbox", "Nintendo"].map((platform) => (
                                    <div className="text-lg" key={platform}>
                                        <Checkbox
                                            style={{ marginBottom: 10 }}
                                            checked={
                                                game[
                                                    `in_platform_${
                                                        platform.toLowerCase() as PlatformKey
                                                    }`
                                                ]
                                            }
                                            onChange={(e) =>
                                                this.onSelectPlatform(
                                                    platform.toLowerCase() as PlatformKey,
                                                    e.target.checked
                                                )
                                            }
                                        >
                                            <span className="text-md">
                                                {
                                                    PLATFOTM[
                                                        platform.toLowerCase() as PlatformKey
                                                    ]
                                                }
                                            </span>
                                        </Checkbox>
                                        {game[
                                            `in_platform_${
                                                platform.toLowerCase() as PlatformKey
                                            }`
                                        ] && (
                                            <div className="price-info">
                                                <Form.Item
                                                    name={`originalPrice${platform}`}
                                                    style={{
                                                        width: "100%",
                                                        marginBottom: 0,
                                                    }}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Original price is required!",
                                                        },
                                                    ]}
                                                >
                                                    <InputNumber
                                                        disabled={
                                                            !game[
                                                                `in_platform_${
                                                                    platform.toLowerCase() as PlatformKey
                                                                }`
                                                            ]
                                                        }
                                                        addonBefore="Original price"
                                                        addonAfter="THB"
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        className="text-md"
                                                        min={0}
                                                        size="large"
                                                    />
                                                </Form.Item>

                                                <Checkbox
                                                    checked={
                                                        game[
                                                            `sale_price_${
                                                                platform.toLowerCase() as PlatformKey
                                                            }`
                                                        ] > 0
                                                    }
                                                    style={{
                                                        margin: "10px 0",
                                                    }}
                                                    onChange={(e) =>
                                                        this.onSelectOnSale(
                                                            platform.toLowerCase() as PlatformKey,
                                                            e.target.checked
                                                        )
                                                    }
                                                >
                                                    <span className="text-md">
                                                        On sale
                                                    </span>
                                                </Checkbox>
                                                {game[
                                                    `sale_price_${
                                                        platform.toLowerCase() as PlatformKey
                                                    }`
                                                ] > 0 && (
                                                    <Form.Item
                                                        name={`salePrice${platform}`}
                                                        style={{
                                                            width: "100%",
                                                        }}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    "Sale price is required!",
                                                            },
                                                            ({
                                                                getFieldValue,
                                                            }) => ({
                                                                validator(
                                                                    _,
                                                                    value
                                                                ) {
                                                                    if (
                                                                        value <
                                                                        getFieldValue(
                                                                            `originalPrice${platform}`
                                                                        )
                                                                    ) {
                                                                        return Promise.resolve();
                                                                    }
                                                                    return Promise.reject(
                                                                        new Error(
                                                                            "Sale price must be less than original price!"
                                                                        )
                                                                    );
                                                                },
                                                            }),
                                                        ]}
                                                    >
                                                        <InputNumber
                                                            addonBefore="Sale price"
                                                            addonAfter="THB"
                                                            style={{
                                                                width: "100%",
                                                            }}
                                                            className="text-md"
                                                            min={1}
                                                            size="large"
                                                        />
                                                    </Form.Item>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </Col>
                        </Row>

                        <div className="text-center">
                            <Button
                                htmlType="submit"
                                type="primary"
                                style={{ borderRadius: 8 }}
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
    game: GameAdmin;
    allGenres: SingleGameGenre[];
};

type Props = {
    urlParams?: {
        id: number;
    };
    type: "ADD" | "EDIT";
    navigate?: NavigateFunction;
    location?: Location;
};

export default withRouter(AcoountAdminGameDetailPage);
