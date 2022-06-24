const getContainer = (): HTMLElement => {
    const container = document.getElementById("alert-container");
    if (container) {
        return container;
    } else {
        const div = document.createElement("div");
        div.setAttribute("id", "alert-container");
        div.setAttribute("class", "fixed top-0 left-0 w-full pointer-events-none z-50");
        const body = document.getElementById("app") ?? document.body;
        body.appendChild(div);
        return div;
    }
}

export default getContainer;
