import {Slide, useScrollTrigger} from "@mui/material";
import React, {FC} from "react";

export type HideOnScrollProps = {
    window?: () => Window;
    children: React.ReactElement;
}

const HideOnScroll: FC<HideOnScrollProps> = (props) => {
    const {children, window} = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default HideOnScroll;
