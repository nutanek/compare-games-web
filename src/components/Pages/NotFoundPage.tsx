import { Link } from "react-router-dom";
import { Result, Button } from "antd";
import { ROOT_PATH } from "../../constants/appConstants";
import { T, langSlug } from "../../services/translateServices";

const NotFoundPage = () => (
    <Result
        status="404"
        title="404"
        subTitle={
            langSlug === "en"
                ? "Sorry, the page you visited does not exist."
                : "ขออภัย!, หน้าที่คุณเข้าไม่มีในระบบ"
        }
        extra={
            <Link to={`${ROOT_PATH}/`}>
                <Button type="primary">{T("BACK_HOME")}</Button>
            </Link>
        }
    />
);

export default NotFoundPage;
