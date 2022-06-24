import {
    Alert as MuiAlert,
    AlertProps as MuiAlertProps,
} from "@mui/material";
import React, {FC, useEffect, useRef, useState} from "react";
import {useSpring, animated} from "react-spring";
import {useUnmountedRef} from "ahooks";
import renderToContainer, {GetContainer} from "@/util/renderToContainer";
import {mergeProps} from "@/util/withDefaultProps";
import getContainer from "@/component/alert/getContainer";

export type AlertProps = {
    visible?: boolean,
    afterClose?: () => void,
    duration?: number,
    getContainer?: GetContainer,
} & MuiAlertProps;

const defaultProps = {
    duration: 5,
    visible: false,
}

const Alert: FC<AlertProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const [active, setActive] = useState(props.visible);
    const unmountedRef = useUnmountedRef();
    const clearTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!props.visible && clearTimerRef.current != null) clearTimeout(clearTimerRef.current);
    }, [props.visible]);

    const styles = useSpring({
        opacity: props.visible ? 1 : 0,
        y: props.visible ? 0 : -40,
        config: {
            mass: 1,
            tension: 180,
            friction: 14,
            clamp: true,
        },
        onStart: () => {
            setActive(true);
            if (props.duration > 0) {
                clearTimerRef.current = setTimeout(() => {
                    if (!unmountedRef.current && props.onClose) {
                        // @ts-ignore
                        props.onClose();
                    }
                }, props.duration * 1000);
            }
        },
        onRest: () => {
            if (!unmountedRef.current) {
                setActive(props.visible);
                if (!props.visible) {
                    if (props.afterClose) {
                        props.afterClose();
                    }
                }
            }
        }
    })

    if (active) {
        return renderToContainer((
            <animated.div
                style={{...styles}}
            >
                <div className="max-w-4xl mx-auto">
                    <div className="m-2 pointer-events-auto">
                        <MuiAlert
                            {...props}
                        />
                    </div>
                </div>
            </animated.div>
        ), props.getContainer ?? getContainer);
    } else {
        return null;
    }
}


export default Alert;
