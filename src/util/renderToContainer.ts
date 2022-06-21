import {createPortal} from "react-dom";
import {ReactElement} from "react";

export type GetContainer = (() => HTMLElement | null) | HTMLElement | null | undefined;

export const resolveContainer = (getContainer: GetContainer) => {
    const container = typeof getContainer === "function" ? getContainer() : getContainer;
    return container ?? document.getElementById("app") ?? document.body;
}

const renderToContainer = (node: ReactElement, getContainer: GetContainer) => {
    const container = resolveContainer(getContainer);
    return createPortal(node, container);
}

export default renderToContainer;
