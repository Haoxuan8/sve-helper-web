import React, {FC, useCallback, useRef, useState} from "react";
import {useSpring, animated as springAnimated} from "@react-spring/web";
import {mergeProps} from "@/util/withDefaultProps";
import {useResponsive, useUnmountedRef} from "ahooks";
import {NativeProps, withNativeProps} from "@/util/nativeProps";
import renderToContainer from "@/util/renderToContainer";

export type ModalProps = {
    visible: boolean;
    afterClose?: () => void;
    animated: boolean;
    children: any;
} & NativeProps;

const defaultProps = {};

const Modal: FC<ModalProps> = (p) => {
    const props = mergeProps(defaultProps, p);
    const container = useRef<HTMLElement | null>(null);
    const responsive = useResponsive();
    const unmountedRef = useUnmountedRef();

    const getContainer = useCallback(() => {
        if (container.current == null) {
            const _container = document.createElement("div");
            const containerId = `modal-container-${new Date().getTime()}`;
            _container.setAttribute("id", containerId);
            const body = document.getElementById("app") ?? document.body;
            body.appendChild(_container);
            container.current = _container;
        }
        return container.current;
    }, []);

    const removeContainer = useCallback(() => {
        container.current?.parentNode?.removeChild?.(container.current);
        container.current = null;
    }, []);

    const [active, setActive] = useState(props.visible);
    const styles = useSpring({
        ...(responsive.md ? {y: props.visible ? "0vh" : "100vh"} : {x: props.visible ? "0vw" : "100vw"}),
        immediate: !props.animated,
        config: {
            tension: 180,
            friction: 22,
            clamp: true,
        },
        onStart: () => {
            if (props.visible) {
                setActive(true);
            }
        },
        onRest: () => {
            if (!unmountedRef.current) {
                setActive(props.visible);
                if (!props.visible) {
                    removeContainer(); // 动画结束后删除dom节点
                    props.afterClose?.();
                }
            }
        },
    });

    if (active) {
        const node = withNativeProps(
            props,
            <springAnimated.div
                className="fixed inset-0 bg-white z-9998"
                style={{
                    ...styles,
                }}
            >
                {props.children}
            </springAnimated.div>
        );

        return renderToContainer(node, getContainer());
    } else {
        return null;
    }
};

export default Modal;
