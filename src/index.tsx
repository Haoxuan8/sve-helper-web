import "core-js";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import App from "./App";
import "./style/index.scss";
import muiTheme from "@/style/muiTheme";
import {ThemeProvider} from "@mui/material";

const isDev = process.env.NODE_ENV === "development";


ReactDOM.render(
    <HashRouter>
        <ThemeProvider theme={muiTheme}>
            <App />
        </ThemeProvider>
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
