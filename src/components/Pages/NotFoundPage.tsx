import { Link } from "react-router-dom";
import { Result, Button } from "antd";
import { ROOT_PATH } from "../../constants/appConstants";

const NotFoundPage = () => (
    <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
            <Link to={`${ROOT_PATH}/`}>
                <Button type="primary">Back Home</Button>
            </Link>
        }
    />
);

export default NotFoundPage;
