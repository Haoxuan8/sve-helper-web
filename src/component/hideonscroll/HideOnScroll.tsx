import {Slide, useScrollTrigger} from "@mui/material";
import React, {FC, useLayoutEffect} from "react";
import {useUpdate} from "ahooks";

export type HideOnScrollProps = {
    window?: () => any;
    children: React.ReactElement;
}

const HideOnScroll: FC<HideOnScrollProps> = (props) => {
    const trigger = useScrollTrigger({
        target: props.window?.() ? props.window() : (document.getElementById("app") ?? undefined),
    });

    const update = useUpdate();

    useLayoutEffect(() => {
        update();
    }, []);

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {props.children}
        </Slide>
    );
}

export default HideOnScroll;
