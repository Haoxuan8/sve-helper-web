import {NativeProps, withNativeProps} from "@/util/nativeProps";
import React, {FC, useEffect, useRef} from "react";
import {mergeProps} from "@/util/withDefaultProps";
import {Box, CircularProgress} from "@mui/material";
import {useInViewport} from "ahooks";

export type LoadMoreProps = {
    hasMore: boolean;
    loading: boolean;
    loadMore: () => void;
} & NativeProps;

const defaultProps = {};

const LoadMore: FC<LoadMoreProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const ref = useRef<HTMLElement>(null);
    const [inViewport] = useInViewport(ref);

    useEffect(() => {
        if (inViewport && !props.loading) {
            props.loadMore();
        }
    }, [inViewport]);

    if (props.hasMore || props.loading) {
        return withNativeProps(
            props,
            (
                <Box ref={ref}
                     sx={{display: "flex", justifyContent: "center", my: 6}}>
                    <CircularProgress/>
                </Box>
            )
        )
    }
    return (
        <Box sx={{my: 6}} className="flex justify-center">
            —— 没有更多了 ——
        </Box>
    );
}

export default LoadMore;
