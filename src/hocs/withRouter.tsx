import React from "react";
import {
    useNavigate,
    useLocation,
    createSearchParams,
    URLSearchParamsInit,
} from "react-router-dom";

const useNavigateSearch = () => {
    const navigate = useNavigate();
    return (pathname: string, params: URLSearchParamsInit) =>
        navigate({ pathname, search: `?${createSearchParams(params)}` });
};

const withRouter = <T extends unknown>(C: React.ComponentType<T>) => {
    const Wrapper = (props: T) => {
        const navigate = useNavigate();
        const navigateSearch = useNavigateSearch();
        const location = useLocation();

        return (
            <C
                {...(props as T)}
                navigate={navigate}
                navigateSearch={navigateSearch}
                location={location}
            />
        );
    };
    return Wrapper;
};

export default withRouter;
