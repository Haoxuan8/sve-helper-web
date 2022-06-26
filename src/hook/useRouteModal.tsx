import React, {
    FC,
    Ref,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef
} from "react";
import urljoin from "url-join";
import _ from "lodash";
import {
    useNavigate,
    useLocation,
    UNSAFE_RouteContext as RouteContext,
    matchRoutes
} from "react-router";
import Modal from "@/component/modal/Modal";
import uuid from "@/util/uuid";

let touchendTime: number;
let isSwipeGoBack = false;

window.addEventListener("touchstart", () => {
    isSwipeGoBack = false;
});

window.addEventListener("touchend", (event) => {
    touchendTime = Date.now();
    if (event.changedTouches.length > 0 && event.changedTouches[0].clientX < 0) {
        isSwipeGoBack = true;
    }
});

type RouteModalProps = {
    children: any;
    path: string;
    isMatchRef: any;
    childrenProps: any;
}

const RouteModal: FC<RouteModalProps> = ({
                                             children,
                                             path,
                                             isMatchRef,
                                             childrenProps,
                                             ...restProps
                                         }) => {
    useEffect(() => {
        return () => {
            isMatchRef.current = false;
        }
    }, []);

    const {matches: parentMatches} = useContext(RouteContext);

    const location = useLocation();
    const pathname = location.pathname || "/";

    // https://github.com/remix-run/react-router/blob/main/packages/react-router/index.tsx

    const routeMatch = _.last(parentMatches);
    const parentParams = routeMatch?.params ?? {};
    const parentPathnameBase = routeMatch?.pathnameBase ?? "/";

    const remainingPathname = parentPathnameBase === "/"
        ? pathname
        : pathname.slice(parentPathnameBase.length) || "/";


    const match = matchRoutes(
        [{
            path: `${path}/*`,
        }],
        {pathname: remainingPathname},
    )?.[0];

    let matches: any;
    const isMatch = match != null;
    isMatchRef.current = isMatch;
    if (!isMatch) {
        matches = [];
    } else {
        match.params = {...parentParams, ...match.params};
        match.pathname = urljoin(parentPathnameBase, match.pathname);
        match.pathnameBase = match.pathnameBase === "/"
            ? parentPathnameBase
            : urljoin(parentPathnameBase, match.pathnameBase);

        matches = _.concat(parentMatches, match);
    }

    const isRecentMove = (Date.now() - touchendTime) < 337;
    const animated = !(isSwipeGoBack && isRecentMove && isMatchRef.current === false);
    return (
        <RouteContext.Provider
            // @ts-ignore
            value={{matches}}
        >
            <Modal
                {...restProps}
                visible={isMatch}
                animated={animated}
            >
                {React.cloneElement(children, childrenProps)}
            </Modal>
        </RouteContext.Provider>
    );
};

const useRouteModal = (path: string) => {
    const navigate = useNavigate();
    const _path = useMemo(() => {
        return path ?? uuid();
    }, []);
    const isMatchRef = useRef(false);

    const propsRef = useRef({});

    const _RouteModal = useMemo(() => (props: any) => <RouteModal path={_path}
                                                                  isMatchRef={isMatchRef}
                                                                  childrenProps={propsRef.current} {...props} />, []);

    const show = useCallback((props) => {
        if (!isMatchRef.current) {
            propsRef.current = props;
            navigate(_path);
        }
    }, []);

    const close = useCallback(() => {
        if (isMatchRef.current) {
            navigate(-1);
        }
    }, []);

    return {
        Modal: _RouteModal,
        show,
        close,
    };
};

export default useRouteModal;
