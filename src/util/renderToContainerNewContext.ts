import ReactDOM from "react-dom";
import {GetContainer, resolveContainer} from "./renderToContainer";
import {ReactElement} from "react";

const renderToContainerNewContext = (element: ReactElement, getContainer: GetContainer) => {
    const container = document.createElement("div");
    const body = resolveContainer(getContainer);
    body.appendChild(container);
    const unmount = () => {
        const unmountResult = ReactDOM.unmountComponentAtNode(container);
        if (unmountResult && container.parentNode) {
            container.parentNode.removeChild(container);
        }
    };
    ReactDOM.render(element, container);
    return unmount;
}

export default renderToContainerNewContext;
