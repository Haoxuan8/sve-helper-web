import {cloneElement, CSSProperties, ReactElement} from "react";
import classNames from "classnames";


export interface NativeProps {
    className?: string;
    style?: CSSProperties;
}

export const withNativeProps = <P extends NativeProps>(props: P, element: ReactElement) => {
    const p = {
        ...element.props,
    };
    if (props.className) {
        p.className = classNames(p.className, props.className);
    }
    if (props.style) {
        p.style = {
            ...p.style,
            ...props.style,
        }
    }
    for (const key in props) {
        if (!props.hasOwnProperty(key)) continue;
        if (key.startsWith("data-") || key.startsWith("aria-")) {
            p[key] = props[key];
        }
    }
    return cloneElement(element, p);
}
