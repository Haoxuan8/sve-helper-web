import React, {useLayoutEffect} from "react";
import {Box, Fade, useScrollTrigger} from "@mui/material";
import {useUpdate} from "ahooks";

export type BackTopProps = {
    window?: () => Window;
    children: React.ReactElement;
}

const BackTop = (props: BackTopProps) => {
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: props.window ? props.window() : (document.getElementById("app") ?? undefined),
        disableHysteresis: true,
        threshold: 100,
    });

    const update = useUpdate();

    useLayoutEffect(() => {
        update();
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({
                block: "center",
                behavior: "smooth"
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{position: 'fixed', bottom: 16, right: 16}}
            >
                {props.children}
            </Box>
        </Fade>
    );
}

export default BackTop;
