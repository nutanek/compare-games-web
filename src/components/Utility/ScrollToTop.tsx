import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = (props: Props) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return <>{props.children}</>;
};

type Props = {
    children: JSX.Element | JSX.Element[];
};

export default ScrollToTop;
