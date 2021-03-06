import "core-js";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import App from "./App";
import "./style/index.scss";
import {configResponsive} from "ahooks";
import ConfigContextProvider from "@/context/ConfigContextProvider";
import ThemeProvider from "@/context/ThemeProvider";

const isDev = process.env.NODE_ENV === "development";

configResponsive({
    md: 900,
    lg: 1200,
});


ReactDOM.render(
    <HashRouter>
        <ConfigContextProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </ConfigContextProvider>
    </HashRouter>
    , document.getElementById("root")
);

if (("serviceWorker" in navigator) && !isDev) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(registration => {
            console.log("SW registered: ", registration);
        }).catch(registrationError => {
            console.log("SW registration failed: ", registrationError);
        });
    })
}
