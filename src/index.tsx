import "core-js";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import App from "./App";
import "./style/index.scss";

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>
    , document.getElementById("root")
);
